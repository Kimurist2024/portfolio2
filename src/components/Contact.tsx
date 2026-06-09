"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { withBase } from "@/lib/paths";
import { revealProps } from "@/lib/motion";
import { ContactForm } from "./ContactForm";

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
  { label: "GitHub", value: "Kimurist2024", href: profile.github, icon: "github" },
  { label: "X (Twitter)", value: "@dLb7PgqVBXenB2l", href: profile.x, icon: "x" },
  { label: "Zenn", value: "@kimurist", href: profile.zenn, icon: "zenn" },
  { label: "Qiita", value: "@Kimurist2024", href: profile.qiita, icon: "qiita" },
  { label: "Resume", value: "Download PDF", href: withBase("/resume.pdf"), icon: "file" },
];

export function Contact() {
  const reduce = useReducedMotion();
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-border)] px-[var(--gutter)] py-[var(--space-section)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-deep)]/15 blur-[140px]" />
      </div>

      <div className="relative">
        <motion.div
          {...revealProps(reduce, { y: 20, duration: 0.6 })}
          className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
        >
          <span className="h-px w-12 bg-[var(--color-accent)]" />
          <span className="text-[var(--color-text-dim)]">05</span>
          <span>Contact</span>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[var(--text-display)] leading-[0.92]">
              <SplitLine reduce={reduce}>
                <span className="block text-[var(--color-text)]">Let&rsquo;s</span>
              </SplitLine>
              <SplitLine reduce={reduce} delay={0.08}>
                <span className="block font-serif italic font-normal text-[var(--color-text-muted)]">
                  build something
                </span>
              </SplitLine>
              <SplitLine reduce={reduce} delay={0.16}>
                <span className="block gradient-text-blue">together.</span>
              </SplitLine>
            </h2>

            <p className="mt-8 max-w-lg text-[var(--text-body)] leading-[1.85] text-[var(--color-text-body)]">
              共同研究、インターン、お仕事のご相談、技術的な議論など、お気軽にご連絡ください。
              Email か X からのご連絡が一番反応が早いです。
            </p>

            <motion.a
              href={`mailto:${profile.email}`}
              {...revealProps(reduce, { y: 20, duration: 0.5, delay: 0.3 })}
              className="focus-ring group mt-10 inline-flex items-center gap-4 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-card)] px-6 py-4 text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)] active:scale-[0.99]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text)]">
                Say hello
              </span>
              <span className="text-[var(--text-body)] text-[var(--color-text)]">{profile.email}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-accent)] text-white transition-transform duration-300 group-hover:rotate-45">
                <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 10L10 2M10 2H4M10 2V8" />
                </svg>
              </span>
            </motion.a>

            <div className="mt-12 flex items-center gap-4">
              <span className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
                or send a message
              </span>
              <span className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            <ContactForm />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="space-y-0">
              {LINKS.map((l, i) => (
                <motion.li key={l.label} {...revealProps(reduce, { x: 24, y: 0, duration: 0.5, delay: 0.05 + i * 0.06 })}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") || l.href.startsWith("/") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="focus-ring group flex items-center justify-between gap-4 border-b border-[var(--color-border)] py-5 transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <Icon kind={l.icon} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                        {l.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                        {l.value}
                      </span>
                      <span className="text-[var(--color-text-dim)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
                        →
                      </span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SplitLine({
  children,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Icon({ kind }: { kind: string }) {
  const className = "h-3.5 w-3.5 text-[var(--color-accent)]";
  if (kind === "mail")
    return (
      <svg viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1.5" y="3" width="11" height="8" rx="1" />
        <path d="M2 4l5 4 5-4" />
      </svg>
    );
  if (kind === "github")
    return (
      <svg viewBox="0 0 14 14" className={className} fill="currentColor">
        <path d="M7 .5C3.4.5.5 3.4.5 7c0 2.9 1.9 5.3 4.4 6.2.3.1.4-.1.4-.3v-1.1c-1.8.4-2.2-.8-2.2-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.7.1 1 .7 1 .7.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.9-1.4-.2-2.9-.7-2.9-3.2 0-.7.3-1.3.7-1.7-.1-.2-.3-.9.1-1.8 0 0 .6-.2 1.8.7.5-.2 1.1-.2 1.7-.2.6 0 1.2.1 1.7.2 1.3-.9 1.8-.7 1.8-.7.4.9.1 1.6.1 1.8.4.5.7 1 .7 1.7 0 2.5-1.5 3-2.9 3.2.2.2.4.6.4 1.2v1.7c0 .2.1.4.4.3 2.6-.9 4.4-3.3 4.4-6.2C13.5 3.4 10.6.5 7 .5z" />
      </svg>
    );
  if (kind === "x")
    return (
      <svg viewBox="0 0 14 14" className={className} fill="currentColor">
        <path d="M10.5 1.5h2L8.2 6.4l5 6.6h-3.9L6.2 9 2.6 13H.6l4.6-5.3L0 1.5h4l2.8 3.7L10.5 1.5zM9.8 11.7h1.1L4.3 2.7H3.1l6.7 9z" />
      </svg>
    );
  if (kind === "zenn")
    return (
      <svg viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M3 11l4-8 4 8H8L7 9 6 11z" fill="currentColor" />
      </svg>
    );
  if (kind === "qiita")
    return (
      <svg viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="7" cy="7" r="5" />
        <path d="M9 9l2.2 2.2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 1.5h5l4 4v7a1 1 0 01-1 1h-8a1 1 0 01-1-1v-10a1 1 0 011-1z" />
      <path d="M7.5 1.5v4h4" />
    </svg>
  );
}
