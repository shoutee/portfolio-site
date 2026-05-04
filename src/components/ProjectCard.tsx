"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project, TechCategory } from "@/lib/types";
import { sanitizeExternalUrl, formatYearMonth } from "@/lib/utils";

// カテゴリに応じたバッジカラー（YAML: colors.primary/secondary/tertiary）
const CATEGORY_COLORS: Record<TechCategory, { bg: string; text: string }> = {
  ai:       { bg: "rgba(168, 85, 247, 0.20)", text: "#a855f7" },
  frontend: { bg: "rgba(0, 212, 255, 0.15)",  text: "#00d4ff" },
  backend:  { bg: "rgba(255, 107, 43, 0.15)", text: "#ff8f5e" },
  tool:     { bg: "rgba(147, 153, 178, 0.15)", text: "#9399b2" },
} as const;

interface ProjectCardProps {
  project: Project;
  /** カードのリスト順。0 のとき LCP 対策で eager loading + priority を有効化 */
  index?: number;
}

/**
 * ポートフォリオの1プロジェクトを表示するカード。
 * - Hover / Active: globals.css の .project-card クラスで CSS 制御
 *   (@media hover:hover でタッチデバイスへの誤適用を防ぐ)
 * - 外部URLは sanitizeExternalUrl() でXSS対策済み
 * - 画像読み込み失敗時はグラデーションプレースホルダーを表示
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const safeGithubUrl = sanitizeExternalUrl(project.githubUrl);
  const safeDemoUrl   = sanitizeExternalUrl(project.demoUrl);

  return (
    <article
      className="project-card relative overflow-hidden rounded-[10px] border"
      style={{
        background: "var(--color-bg-surface)",
        borderColor: "var(--color-bg-border)",
      }}
    >
      {/* サムネイル（16/9） */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {imgError ? (
          /* 画像読み込み失敗時のフォールバック */
          <div
            className="absolute inset-0 flex items-center justify-center text-xs"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,107,43,0.12), rgba(0,212,255,0.08))",
              color: "var(--color-text-muted)",
            }}
            aria-label={project.imageAlt}
          >
            No Image
          </div>
        ) : (
          <Image
            src={project.imagePath}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            /* index=0 のカードはファーストビューに表示されるため LCP 対策で eager */
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            onError={() => setImgError(true)}
          />
        )}
        {/* グラデーションオーバーレイ */}
        <div className="card-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
      </div>

      {/* カード本文 */}
      <div className="p-3">
        <h3
          className="text-sm font-semibold leading-snug line-clamp-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          {project.title}
        </h3>
        <p
          className="mt-1 text-xs leading-relaxed line-clamp-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>

        {/* タグ（text-[10px] → text-xs に変更: 可読性最低基準 12px） */}
        <ul className="mt-2 flex flex-wrap gap-1" aria-label="使用技術">
          {project.tags.map((tag) => {
            const colors = CATEGORY_COLORS[tag.category];
            return (
              <li
                key={tag.label}
                className="rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.06em]"
                style={{ background: colors.bg, color: colors.text }}
              >
                {tag.label}
              </li>
            );
          })}
        </ul>

        {/* 外部リンク（sanitize済みURLのみ表示） */}
        {(safeGithubUrl || safeDemoUrl) && (
          <div className="mt-2 flex gap-3">
            {safeGithubUrl && (
              <a
                href={safeGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wide transition-colors duration-150"
                style={{ color: "var(--color-secondary)" }}
              >
                GitHub
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            )}
            {safeDemoUrl && (
              <a
                href={safeDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wide transition-colors duration-150"
                style={{ color: "var(--color-primary)" }}
              >
                Demo
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            )}
          </div>
        )}

        {/* 日付（text-[11px] → text-xs、Invalid Date ガード済み） */}
        <time
          dateTime={project.date}
          className="mt-2 block text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          {formatYearMonth(project.date)}
        </time>
      </div>
    </article>
  );
}
