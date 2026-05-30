"use client";

import { useEffect, useState } from "react";

type ThemeId = "ocean" | "matcha" | "rose" | "teal";

const THEMES: { id: ThemeId; label: string; color: string }[] = [
  { id: "ocean", label: "ocean", color: "#1f6feb" },
  { id: "matcha", label: "matcha", color: "#6f9e3f" },
  { id: "rose", label: "rose", color: "#e0467f" },
  { id: "teal", label: "teal", color: "#0fb3a6" },
];

export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>("ocean");

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as ThemeId) || "ocean";
    setActive(current);
  }, []);

  function apply(id: ThemeId) {
    if (id === "ocean") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = id;
    }
    try {
      localStorage.setItem("theme", id);
    } catch {
      /* private mode — ignore */
    }
    setActive(id);
  }

  const activeLabel = THEMES.find((t) => t.id === active)?.label ?? "ocean";

  return (
    <div className="flex flex-col items-center gap-3">
      {THEMES.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => apply(t.id)}
            aria-label={`${t.label} theme`}
            aria-pressed={isActive}
            className="grid h-7 w-7 place-items-center rounded-full outline-none transition-transform duration-200 hover:scale-110 focus-visible:scale-110"
          >
            <span
              className="block h-[18px] w-[18px] rounded-full transition-all"
              style={{
                background: t.color,
                boxShadow: isActive
                  ? `0 0 0 2px var(--color-bg), 0 0 0 4px ${t.color}`
                  : "none",
              }}
            />
          </button>
        );
      })}
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] [writing-mode:vertical-rl]">
        {activeLabel}
      </span>
    </div>
  );
}
