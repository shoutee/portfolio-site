"use client";

import type { FilterOption, TechCategory } from "@/lib/types";

interface FilterChipsProps {
  options: readonly FilterOption[];
  active: "" | TechCategory;
  onChange: (value: "" | TechCategory) => void;
}

/**
 * カテゴリフィルターのピル群。
 * - タッチターゲット: min-h-[44px] で最低高さを確保
 * - text-xs (12px): text-[11px] から引き上げ（可読性最低基準）
 * - aria-pressed でスクリーンリーダーに選択状態を伝える
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
              /* py-3 + text-xs で高さ ≈ 44px（タッチターゲット確保） */
              className="rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] transition-colors duration-150"
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
