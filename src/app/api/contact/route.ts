import { NextRequest, NextResponse } from "next/server";

// This route reads the client IP and request body per request — never prerender it.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// --- Limits & config (no magic numbers inline) -----------------------------

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 practical maximum
const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 10;

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Recipient is pinned server-side and NEVER taken from the request body, so a
 * caller cannot turn this endpoint into an open relay to arbitrary inboxes.
 */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "ryuhki2003@gmail.com";
/** Must be a Resend-verified sender. Defaults to Resend's shared test sender. */
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

// --- Validation -------------------------------------------------------------

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// Pragmatic email shape check; the real signal is a successful delivery.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

function validate(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "リクエスト本文が不正です。" };
  }

  const body = input as Record<string, unknown>;

  // Honeypot: a real user never fills a hidden field. Treat as spam.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return { ok: false, error: "送信を受け付けられませんでした。" };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: "お名前を確認してください。" };
  }
  if (
    email.length === 0 ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email)
  ) {
    return { ok: false, error: "メールアドレスを確認してください。" };
  }
  if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "メッセージを確認してください。" };
  }

  return { ok: true, data: { name, email, message } };
}

// --- Rate limiting ----------------------------------------------------------

// In-memory sliding window. Fluid Compute reuses instances so this catches the
// common burst case, but it is NOT shared across instances. For hard limits,
// back this with Vercel KV / Upstash Redis.
const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string, now: number): boolean {
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestLog.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

// --- Sending ----------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(payload: ContactPayload, apiKey: string): Promise<boolean> {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br>");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: payload.email,
      subject: `[Portfolio] ${payload.name} さんからのお問い合わせ`,
      html: `<p><strong>From:</strong> ${safeName} (${safeEmail})</p><hr><p>${safeMessage}</p>`,
    }),
  });

  return response.ok;
}

// --- Handler ----------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loud but generic — never leak which env var is missing to clients.
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { success: false, error: "ただいまフォーム送信を準備中です。Email からご連絡ください。" },
      { status: 503 },
    );
  }

  const now = Date.now();
  const ip = getClientIp(request);
  if (isRateLimited(ip, now)) {
    return NextResponse.json(
      { success: false, error: "送信回数が上限に達しました。時間をおいて再度お試しください。" },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "リクエスト本文が不正です。" },
      { status: 400 },
    );
  }

  const result = validate(raw);
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }

  try {
    const sent = await sendEmail(result.data, apiKey);
    if (!sent) {
      console.error("[contact] Resend API returned a non-OK response");
      return NextResponse.json(
        { success: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 },
      );
    }
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : "unknown error";
    console.error("[contact] send failed:", detail);
    return NextResponse.json(
      { success: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
