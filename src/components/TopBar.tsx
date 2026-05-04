"use client";

import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/types";

interface TopBarProps {
  navItems: readonly NavItem[];
  onNavClick: (href: string) => void;
}

/**
 * サイト上部の固定ナビゲーションバー。
 * - Frosted glass エフェクト (YAML: effects.frosted_glass)
 * - モバイル時はハンバーガーメニュー
 * - href はページ内アンカーのみ許容（外部URLはここでは使わない）
 */
export function TopBar({ navItems, onNavClick }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      onNavClick(href);
    },
    [onNavClick]
  );

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <header
      className="frosted sticky top-0 z-50 border-b"
      style={{ height: 56, borderColor: "var(--color-bg-border)" }}
    >
      <div
        className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5"
      >
        {/* ロゴ */}
        <a
          href="#hero"
          className="text-base font-extrabold tracking-tight"
          style={{ color: "var(--color-primary)" }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#hero");
          }}
        >
          hirari
          <span style={{ color: "var(--color-secondary)" }}>123</span>
          <span
            className="ml-1 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-secondary)" }}
          >
            .dev
          </span>
        </a>

        {/* PC ナビゲーション */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--color-bg-elevated)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-text-secondary)";
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* モバイル ハンバーガー */}
        <button
          className="flex items-center justify-center rounded-lg p-2 md:hidden"
          style={{ background: "var(--color-bg-elevated)" }}
          onClick={toggleMobile}
          aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={20} style={{ color: "var(--color-text-primary)" }} />
          ) : (
            <Menu size={20} style={{ color: "var(--color-text-primary)" }} />
          )}
        </button>
      </div>

      {/* モバイルドロワー */}
      {mobileOpen && (
        <nav
          className="frosted border-b px-5 py-3 md:hidden"
          style={{ borderColor: "var(--color-bg-border)" }}
          aria-label="モバイルナビゲーション"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.href)}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--color-bg-elevated)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
