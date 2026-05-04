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
  readonly id: string;            // URL-safe な一意ID（例: "subagent-skill"）
  readonly title: string;         // プロジェクトタイトル
  readonly description: string;   // 1〜2文の説明
  readonly imagePath: string;     // /images/xxx.png（public/ 起点の絶対パス）
  readonly imageAlt: string;      // アクセシビリティ用 alt テキスト
  readonly tags: readonly TechTag[];
  readonly status: ProjectStatus;
  readonly date: string;          // ISO 8601 形式 (YYYY-MM-DD)
  readonly githubUrl?: string;    // 外部リンクは string のみ許容（URL検証済み前提）
  readonly demoUrl?: string;
}

/** サイドバーのナビゲーションアイテム */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;          // Lucide アイコン名（表示はコンポーネント側で解決）
  // 型レベルで外部URLを排除: ページ内アンカー or 内部パスのみ許容
  readonly href: `#${string}` | `/${string}`;
}

/** カテゴリフィルター */
export interface FilterOption {
  readonly value: string;         // "" = すべて
  readonly label: string;
}
