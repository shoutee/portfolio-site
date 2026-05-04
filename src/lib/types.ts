// =============================================================================
// ポートフォリオサイト — 型定義
// =============================================================================

/** テクノロジータグの種類（バッジ色を決定するため） */
export type TechCategory =
  | "ai"       // AI/LLM 系 → tertiary (purple)
  | "frontend" // フロントエンド → secondary (cyan)
  | "backend"  // バックエンド → primary (orange)
  | "tool"     // ツール・インフラ → muted

/** 個別のテクノロジータグ */
export interface TechTag {
  readonly label: string;
  readonly category: TechCategory;
}

/** プロジェクトのステータス */
export type ProjectStatus = "completed" | "in_progress" | "archived";

/** ポートフォリオの1プロジェクト */
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imagePath: string;   // public/ 起点の絶対パス
  readonly imageAlt: string;    // アクセシビリティ用 alt（必須）
  readonly tags: readonly TechTag[];
  readonly status: ProjectStatus;
  readonly date: string;        // ISO 8601 形式 (YYYY-MM-DD)
  readonly githubUrl?: string;  // レンダリング前に sanitizeExternalUrl() で検証すること
  readonly demoUrl?: string;
}

/** Sidebar で使用できるアイコン名（Lucide Icons）
 *  ICON_MAP のキーと同期して管理する */
export type ValidIconName = "Home" | "LayoutGrid" | "User" | "Mail";

/** サイドバーのナビゲーションアイテム */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: ValidIconName;
  // 型レベルで外部URLを排除: ページ内アンカー or 内部パスのみ許容
  readonly href: `#${string}` | `/${string}`;
}

/** カテゴリフィルター */
export interface FilterOption {
  readonly value: "" | TechCategory;  // "" = すべて
  readonly label: string;
}

/**
 * ナビゲーションクリックのハンドラー型。
 * TopBar / Sidebar で共通利用する。
 * id は省略可能（TopBar はセクション id を渡し、Sidebar は nav item id を渡す）。
 */
export type NavClickHandler = (href: `#${string}` | `/${string}`, id?: string) => void;
