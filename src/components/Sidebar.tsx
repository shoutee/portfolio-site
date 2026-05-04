"use client";

import { useState, useCallback } from "react";
import {
  Home,
  LayoutGrid,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { NavItem, ValidIconName, NavClickHandler } from "@/lib/types";

// ValidIconName でキーを制約 — ICON_MAP に存在しないアイコン名は型エラー
const ICON_MAP: Record<ValidIconName, LucideIcon> = {
  Home,
  LayoutGrid,
  User,
  Mail,
};

interface SidebarProps {
  navItems: readonly NavItem[];
  activeId: string;
  onNavClick: NavClickHandler;
}

/**
 * 左側固定サイドバー。
 * - 展開: 220px（アイコン + ラベル）/ 折りたたみ: 64px（アイコンのみ）
 * - duration-[250ms]: Tailwind v4 任意値構文（旧 duration-250 は無効）
 * - 折りたたみ時: aria-label でアイコンのみでも読み上げ対応
 */
export function Sidebar({ navItems, activeId, onNavClick }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const width = collapsed ? 64 : 220;

  return (
    <aside
      /* duration-250 → duration-[250ms]: Tailwind v4 任意値構文 */
      className="hidden lg:flex flex-col border-r transition-[width] duration-[250ms]"
      style={{
        width,
        minWidth: width,
        background: "var(--color-bg-surface)",
        borderColor: "var(--color-bg-border)",
        position: "sticky",
        top: 56,
        height: "calc(100vh - 56px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      aria-label="サイドナビゲーション"
    >
      <nav className="flex flex-col gap-1 p-2 pt-4">
        {navItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.href, item.id)}
              /* btn-ghost が @media(hover:hover) でホバーをカバー — JSハンドラー不要 */
              className="btn-ghost flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150"
              style={{
                background: isActive ? "rgba(255, 107, 43, 0.12)" : "transparent",
                color: isActive
                  ? "var(--color-primary-light)"
                  : "var(--color-text-secondary)",
                justifyContent: collapsed ? "center" : "flex-start",
                /* タッチターゲット確保 */
                minHeight: 44,
              }}
              /* 折りたたみ時: title (tooltip) + aria-label でスクリーンリーダー対応 */
              title={collapsed ? item.label : undefined}
              aria-label={collapsed ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={18}
                style={{
                  color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              {!collapsed && (
                <span className="truncate animate-fade-in">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 折りたたみボタン — btn-ghost が hover をカバー */}
      <button
        className="btn-ghost mt-auto m-2 flex h-10 w-auto items-center justify-center rounded-lg p-2 transition-colors duration-150"
        style={{
          background: "var(--color-bg-elevated)",
          color: "var(--color-text-muted)",
        }}
        onClick={toggleCollapse}
        aria-label={collapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
      >
        {collapsed ? (
          <ChevronRight size={16} aria-hidden="true" />
        ) : (
          <ChevronLeft size={16} aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
