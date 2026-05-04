"use client";

import type { FilterOption } from "@/lib/types";

interface FilterChipsProps {
  options: readonly FilterOption[];
  active: string;
  onChange: (value: string) => void;
}

/**
 * カテゴリフィルターのピル群。
 * - YAML: components.tag_chip
 * - active 時: orange border + translucent background
 */
export function FilterChips({ options, active, onChange }: FilterChipsProps) {
  return (
    <ul className="flex flex-wrap gap-2" role="list" aria-label="カテゴリフィルター">
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <li key={opt.value}>
            <button
              onClick={() => onChange(opt.value)}
              className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors duration-150"
              style={
                isActive
                  ? {
                      background: "rgba(255, 107, 43, 0.15)",
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary-light)",
                    }
                  : {
                      background: "var(--color-bg-elevated)",
                      borderColor: "var(--color-bg-border)",
                      color: "var(--color-text-secondary)",
                    }
              }
              aria-pressed={isActive}
            >
              {opt.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
