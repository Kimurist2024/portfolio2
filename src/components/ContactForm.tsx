"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] shadow-[var(--shadow-sm)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-accent)_30%,transparent)] aria-[invalid=true]:border-red-500/60";
const LABEL_CLASS =
  "block font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    setStatus("submitting");
    setError("");

    try {
      // Trailing slash matches `trailingSlash: true` and avoids a 308 hop.
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body: { success?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !body.success) {
        setError(body.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError("ネットワークエラーが発生しました。接続を確認してください。");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.06] p-8"
        role="status"
      >
        <p className="font-display text-2xl text-[var(--color-text)]">
          メッセージを送信しました。
        </p>
        <p className="mt-2 text-[var(--color-text-muted)]">
          ご連絡ありがとうございます。折り返しご返信します。
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
      {/* Honeypot — hidden from humans, tempting to bots. Must stay empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={LABEL_CLASS}>
            Name
          </label>
          <input id="name" name="name" type="text" required maxLength={100} className={FIELD_CLASS} placeholder="山田 太郎" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input id="email" name="email" type="email" required maxLength={254} className={FIELD_CLASS} placeholder="you@example.com" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} className={`${FIELD_CLASS} resize-y`} placeholder="ご相談内容をお書きください。" />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={status === "submitting" ? undefined : { scale: 1.02 }}
        className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-white shadow-[var(--shadow-sm)] transition-[background-color,transform] duration-300 hover:bg-[var(--color-accent-deep)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em]">
          {status === "submitting" ? "Sending…" : "Send message"}
        </span>
        {status === "submitting" ? (
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ) : (
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        )}
      </motion.button>
    </form>
  );
}
