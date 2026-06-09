import { profile } from "@/data/profile";
import { withBase } from "@/lib/paths";
import { PixelAvatar } from "./PixelAvatar";
import { ThemeSwitcher } from "./ThemeSwitcher";

const SOCIALS = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "X", href: profile.x, icon: "x" },
  { label: "Zenn", href: profile.zenn, icon: "zenn" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Resume", href: withBase("/resume.pdf"), icon: "file" },
] as const;

const NAV = [
  { n: "01", label: "About", href: "#about" },
  { n: "02", label: "Experience", href: "#experience" },
  { n: "03", label: "Projects", href: "#projects" },
  { n: "04", label: "Writing", href: "#writing" },
  { n: "05", label: "Contact", href: "#contact" },
] as const;

export function SidePanel() {
  return (
    <aside className="relative flex flex-col gap-8 border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] px-6 py-16 lg:h-screen lg:gap-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/12 blur-[120px]" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-7 text-center">
        <PixelAvatar />

        <div className="space-y-3.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            hi, i&rsquo;m
          </p>
          <h1 className="font-display text-[var(--text-section)] leading-[1.02]">
            <span className="gradient-text-blue">{profile.name}</span>
          </h1>
          <p className="mx-auto max-w-xs text-[var(--text-lead)] leading-relaxed text-[var(--color-text-muted)]">
            {profile.tagline}
          </p>
          <p className="flex items-center justify-center gap-2.5 text-sm text-[var(--color-text)]">
            <span className="block h-1.5 w-1.5 rotate-45 bg-[var(--color-accent)]" />
            {profile.role}
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            Open to internships
          </div>
        </div>

        <a
          href="#contact"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-white shadow-[var(--shadow-sm)] transition-[background-color,transform] duration-300 hover:bg-[var(--color-accent-deep)] active:scale-[0.98]"
        >
          Get in touch <span aria-hidden>→</span>
        </a>

        <div className="flex items-center gap-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") || s.href.startsWith("/") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="focus-ring text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              <SocialIcon kind={s.icon} />
            </a>
          ))}
        </div>

        <nav aria-label="Sections" className="flex flex-col gap-2.5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              <span className="text-[var(--color-text-dim)]">{item.n}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Theme dots: on the divider (desktop), at the panel foot (mobile) */}
      <div className="relative flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:z-20 lg:-translate-y-1/2 lg:translate-x-1/2">
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const cls = "h-5 w-5";
  if (kind === "github")
    return (
      <svg viewBox="0 0 16 16" className={cls} fill="currentColor" aria-hidden>
        <path d="M8 .5C3.9.5.5 3.9.5 8c0 3.3 2.2 6.1 5.1 7.1.4.1.5-.2.5-.4v-1.3c-2.1.4-2.5-.9-2.5-.9-.4-.9-.8-1.1-.8-1.1-.7-.5 0-.5 0-.5.8.1 1.1.8 1.1.8.7 1.1 1.7.8 2.2.6.1-.5.3-.8.5-1-1.7-.2-3.4-.8-3.4-3.7 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.1.8.6-.2 1.2-.2 1.9-.2.6 0 1.3.1 1.9.2 1.4-1 2.1-.8 2.1-.8.4 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2 0 2.9-1.7 3.5-3.4 3.7.3.2.5.7.5 1.4v2c0 .2.1.5.5.4A7.5 7.5 0 0 0 15.5 8c0-4.1-3.4-7.5-7.5-7.5z" />
      </svg>
    );
  if (kind === "x")
    return (
      <svg viewBox="0 0 16 16" className={cls} fill="currentColor" aria-hidden>
        <path d="M12 1.5h2.3L9.3 7.3l5.9 7.7h-4.6L7 10.1 2.8 15H.5l5.4-6.2L0 1.5h4.7l3.3 4.4L12 1.5zm-.8 12.1h1.3L4.8 2.8H3.4l7.8 10.8z" />
      </svg>
    );
  if (kind === "zenn")
    return (
      <svg viewBox="0 0 16 16" className={cls} fill="currentColor" aria-hidden>
        <path d="M3 12.5l4.6-9 4.6 9H9.6L8 9.3l-1.6 3.2z" />
      </svg>
    );
  if (kind === "mail")
    return (
      <svg viewBox="0 0 16 16" className={cls} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
        <path d="M2.5 4.5 8 9l5.5-4.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" className={cls} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M3 1.5h6l4 4v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
      <path d="M9 1.5v4h4" />
    </svg>
  );
}
