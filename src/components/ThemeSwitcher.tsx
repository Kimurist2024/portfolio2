"use client";

import { useEffect, useState } from "react";

type ThemeId = "ocean" | "matcha" | "rose" | "teal";

// Dot colors mirror each palette's actual accent.
const THEMES: { id: ThemeId; label: string; color: string }[] = [
  { id: "ocean", label: "Ocean", color: "#1f6feb" },
  { id: "matcha", label: "Matcha", color: "#5f8a33" },
  { id: "rose", label: "Rose", color: "#d33f78" },
  { id: "teal", label: "Teal", color: "#0a9c91" },
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

  return (
    <div role="group" aria-label="Color theme" className="flex flex-col items-center gap-3.5">
      {THEMES.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => apply(t.id)}
            title={`${t.label} theme`}
            aria-label={`${t.label} theme`}
            aria-pressed={isActive}
            className="focus-ring grid h-6 w-6 place-items-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <span
              className="block h-5 w-5 rounded-full transition-shadow duration-200"
              style={{
                background: t.color,
                boxShadow: isActive
                  ? `0 0 0 2.5px var(--color-card), 0 0 0 5px ${t.color}, 0 2px 6px rgba(10,14,26,0.25)`
                  : "0 0 0 2.5px var(--color-card), 0 1px 4px rgba(10,14,26,0.28)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
