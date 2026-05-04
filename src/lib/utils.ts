// =============================================================================
// セキュリティユーティリティ
// =============================================================================

// http: を除外: ポートフォリオが参照するリンクはすべて HTTPS のみ許可
const ALLOWED_PROTOCOLS = ["https:"] as const;

/**
 * 外部URLをレンダリング前に検証する。
 * `javascript:` / `data:` / `http:` など危険・非推奨スキームを undefined に変換し
 * `<a href={url}>` 経由のXSSを防ぐ。
 *
 * NOTE: プロトコル検証のみ実施。URL の出所が信頼できる静的データである前提で使用すること。
 *       ユーザー入力や CMS 由来の URL には追加バリデーションが必要。
 *
 * @example
 * sanitizeExternalUrl("https://github.com/user") // → "https://github.com/user"
 * sanitizeExternalUrl("javascript:alert(1)")      // → undefined (+ dev warning)
 * sanitizeExternalUrl("http://example.com")       // → undefined (http: 不可)
 * sanitizeExternalUrl(undefined)                  // → undefined
 */
export function sanitizeExternalUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (!(ALLOWED_PROTOCOLS as readonly string[]).includes(parsed.protocol)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[sanitizeExternalUrl] ブロック (protocol: ${parsed.protocol}): ${url}`);
      }
      return undefined;
    }
    return url;
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[sanitizeExternalUrl] パース失敗: ${url}`);
    }
    return undefined;
  }
}

/**
 * ISO 8601 日付文字列を「YYYY年M月」形式にフォーマットする。
 * 無効な日付の場合は元の文字列をそのまま返す（"Invalid Date" を表示しない）。
 */
export function formatYearMonth(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
}
