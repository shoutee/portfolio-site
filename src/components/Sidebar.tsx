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
import type { NavItem } from "@/lib/types";

// アイコン名→コンポーネントのマッピング（動的 import を避けて型安全に）
const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  LayoutGrid,
  User,
  Mail,
} as const;

interface SidebarProps {
  navItems: readonly NavItem[];
  activeId: string;
  onNavClick: (href: string, id: string) => void;
}

/**
 * 左側固定サイドバー。
 * - 展開: 220px（アイコン + ラベル）/ 折りたたみ: 64px（アイコンのみ）
 * - YAML: components.sidebar_nav
 */
export function Sidebar({ navItems, activeId, onNavClick }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const width = collapsed ? 64 : 220;

  return (
    <aside
      className="hidden lg:flex flex-col border-r transition-[width] duration-250"
      style={{
        width,
        minWidth: width,
        background: "var(--color-bg-surface)",
        borderColor: "var(--color-bg-border)",
        // sticky: TopBarの高さ(56px)以下から画面下まで
        position: "sticky",
        top: 56,
        height: "calc(100vh - 56px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      aria-label="サイドナビゲーション"
    >
      {/* ナビリンク */}
      <nav className="flex flex-col gap-1 p-2 pt-4">
        {navItems.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? Home;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.href, item.id)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150"
              style={{
                background: isActive
                  ? "rgba(255, 107, 43, 0.12)"
                  : "transparent",
                color: isActive
                  ? "var(--color-primary-light)"
                  : "var(--color-text-secondary)",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              title={collapsed ? item.label : undefined}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-bg-elevated)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }
              }}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={18}
                style={{
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-text-secondary)",
                  flexShrink: 0,
                }}
              />
              {!collapsed && (
                <span className="truncate animate-fade-in">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 折りたたみボタン */}
      <button
        className="mt-auto m-2 flex items-center justify-center rounded-lg p-2 transition-colors duration-150"
        style={{
          background: "var(--color-bg-elevated)",
          color: "var(--color-text-muted)",
        }}
        onClick={toggleCollapse}
        aria-label={collapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--color-text-primary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--color-text-muted)";
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
