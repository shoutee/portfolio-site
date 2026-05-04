import type { Project, NavItem, FilterOption } from "@/lib/types";

// =============================================================================
// ポートフォリオプロジェクト一覧
// imagePath は public/ 起点の絶対パス（next/image の src に直接渡す）
// =============================================================================

export const PROJECTS: readonly Project[] = [
  {
    id: "piyopiyo-ai-school",
    title: "ぴよぴよAIマーケスクール",
    description:
      "NotebookLM を活用して制作した AI × Webマーケティング講座のランディングページバナー。未経験者向けに「やさしいAI×Webマーケで未来をひらく」コンセプトを視覚化。",
    imagePath: "/images/project-01.png",
    imageAlt: "ぴよぴよAIマーケスクール — やさしいAI×Webマーケで未来をひらくバナー画像",
    tags: [
      { label: "NotebookLM", category: "ai" },
      { label: "AI生成", category: "ai" },
      { label: "LPデザイン", category: "frontend" },
    ],
    status: "completed",
    date: "2026-04-05",
  },
  {
    id: "tetris-game-manus",
    title: "テトリス風パズルゲーム",
    description:
      "Manus を使って構築したブラウザ動作のテトリス型パズルゲーム。キーボード・スマホ操作対応、レベルアップ・ハードドロップなど本格的なゲームメカニクスを実装。",
    imagePath: "/images/project-02.png",
    imageAlt: "テトリス風パズルゲームのスクリーンショット — レベル1、紫とコーラルカラーのブロック",
    tags: [
      { label: "Manus", category: "ai" },
      { label: "TypeScript", category: "frontend" },
      { label: "Next.js", category: "frontend" },
      { label: "ゲーム", category: "tool" },
    ],
    status: "completed",
    date: "2026-05-03",
  },
] as const;

// =============================================================================
// サイドバーナビゲーション
// =============================================================================

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home",     label: "ホーム",       icon: "Home",       href: "#hero" },
  { id: "work",     label: "制作実績",     icon: "LayoutGrid", href: "#work" },
  { id: "about",    label: "About",        icon: "User",        href: "#about" },
  { id: "contact",  label: "コンタクト",   icon: "Mail",        href: "#contact" },
] as const;

// =============================================================================
// フィルターオプション
// =============================================================================

export const FILTER_OPTIONS: readonly FilterOption[] = [
  { value: "",         label: "すべて" },
  { value: "ai",       label: "AI" },
  { value: "frontend", label: "フロント" },
  { value: "tool",     label: "ツール" },
] as const;
