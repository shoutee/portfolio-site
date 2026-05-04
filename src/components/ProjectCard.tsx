"use client";

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
}

/**
 * ポートフォリオの1プロジェクトを表示するカード。
 * - サムネイル 16/9、グラデーションオーバーレイ
 * - Hover: translateY(-3px) scale(1.02) + orange glow
 * - next/image で遅延読み込み（loading="lazy"）
 * - 外部URLは sanitizeExternalUrl() でXSS対策済み
 * - YAML: components.card
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const safeGithubUrl = sanitizeExternalUrl(project.githubUrl);
  const safeDemoUrl   = sanitizeExternalUrl(project.demoUrl);

  return (
    <article
      className="group relative overflow-hidden rounded-[10px] border transition-[transform,box-shadow] duration-150"
      style={{
        background: "var(--color-bg-surface)",
        borderColor: "var(--color-bg-border)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px) scale(1.02)";
        el.style.boxShadow = "0 8px 32px rgba(255, 107, 43, 0.25)";
        el.style.borderColor = "rgba(255, 107, 43, 0.40)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.borderColor = "var(--color-bg-border)";
      }}
    >
      {/* サムネイル（16/9） */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.imagePath}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
        {/* グラデーションオーバーレイ (YAML: card_scrim) */}
        <div
          className="card-scrim absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
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

        {/* タグ */}
        <ul className="mt-2 flex flex-wrap gap-1" aria-label="使用技術">
          {project.tags.map((tag) => {
            const colors = CATEGORY_COLORS[tag.category];
            return (
              <li
                key={tag.label}
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em]"
                style={{ background: colors.bg, color: colors.text }}
              >
                {tag.label}
              </li>
            );
          })}
        </ul>

        {/* 外部リンク（sanitize済みURLのみ表示） */}
        {(safeGithubUrl || safeDemoUrl) && (
          <div className="mt-2 flex gap-2">
            {safeGithubUrl && (
              <a
                href={safeGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold uppercase tracking-wide transition-colors duration-150"
                style={{ color: "var(--color-secondary)" }}
              >
                GitHub
              </a>
            )}
            {safeDemoUrl && (
              <a
                href={safeDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold uppercase tracking-wide transition-colors duration-150"
                style={{ color: "var(--color-primary)" }}
              >
                Demo
              </a>
            )}
          </div>
        )}

        {/* 日付（Invalid Date ガード済み） */}
        <time
          dateTime={project.date}
          className="mt-2 block text-[11px]"
          style={{ color: "var(--color-text-muted)" }}
        >
          {formatYearMonth(project.date)}
        </time>
      </div>
    </article>
  );
}
