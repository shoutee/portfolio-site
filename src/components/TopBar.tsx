"use client";

import { useState, useCallback, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem, NavClickHandler } from "@/lib/types";

interface TopBarProps {
  navItems: readonly NavItem[];
  /** TopBar からも id を渡すことでサイドバーのアクティブ状態と同期する */
  onNavClick: NavClickHandler;
}

/**
 * サイト上部の固定ナビゲーションバー。
 * - Frosted glass エフェクト
 * - モバイル時はハンバーガーメニュー（drawerSlideDown アニメーション付き）
 * - タッチターゲット最低 44px（py-3 相当）
 */
export function TopBar({ navItems, onNavClick }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = useCallback(
    (href: NavItem["href"], id: string) => {
      setMobileOpen(false);
      onNavClick(href, id);
    },
    [onNavClick]
  );

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  /** WAI-ARIA Menu Button: Escape でドロワーを閉じる */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className="frosted sticky top-0 z-50 border-b"
      style={{ height: 56, borderColor: "var(--color-bg-border)" }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5">
        {/* ロゴ */}
        <a
          href="#hero"
          className="text-base font-extrabold tracking-tight"
          style={{ color: "var(--color-primary)" }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#hero", "home");
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

        {/* PC ナビゲーション — btn-ghost クラスで DRY 化 */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.href, item.id)}
              /* タッチターゲット確保: py-3 で高さ ≈ 44px */
              className="btn-ghost rounded-lg px-4 py-3 text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* モバイル ハンバーガー — タッチターゲット 44px */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          style={{ background: "var(--color-bg-elevated)" }}
          onClick={toggleMobile}
          aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? (
            <X size={20} style={{ color: "var(--color-text-primary)" }} />
          ) : (
            <Menu size={20} style={{ color: "var(--color-text-primary)" }} />
          )}
        </button>
      </div>

      {/* モバイルドロワー — mobile-drawer クラスで出現アニメーション */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="mobile-drawer frosted border-b px-5 py-2 md:hidden"
          style={{ borderColor: "var(--color-bg-border)" }}
          aria-label="モバイルナビゲーション"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.href, item.id)}
              /* タッチターゲット: min-h-[44px] */
              className="btn-ghost flex min-h-[44px] w-full items-center rounded-lg px-3 text-left text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
