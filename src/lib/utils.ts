// =============================================================================
// セキュリティユーティリティ
// =============================================================================

const ALLOWED_PROTOCOLS = ["https:", "http:"] as const;

/**
 * 外部URLをレンダリング前に検証する。
 * `javascript:` / `data:` など危険なスキームを undefined に変換することで
 * `<a href={url}>` 経由のXSSを防ぐ。
 *
 * @example
 * sanitizeExternalUrl("https://github.com/user") // → "https://github.com/user"
 * sanitizeExternalUrl("javascript:alert(1)")      // → undefined
 * sanitizeExternalUrl(undefined)                  // → undefined
 */
export function sanitizeExternalUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (!(ALLOWED_PROTOCOLS as readonly string[]).includes(parsed.protocol)) {
      return undefined;
    }
    return url;
  } catch {
    return undefined; // URL パース失敗 = 不正な値
  }
}

/**
 * ISO 8601 日付文字列を「YYYY年M月」形式にフォーマットする。
 * 無効な日付の場合は元の文字列を返す。
 */
export function formatYearMonth(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
}
