"use client";

import { useState, useCallback, useRef } from "react";
import { GitBranch, Zap, Bot, Code2 } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { ProjectCard } from "@/components/ProjectCard";
import { FilterChips } from "@/components/FilterChips";
import { PROJECTS, NAV_ITEMS, FILTER_OPTIONS } from "@/data/projects";
import type { TechCategory } from "@/lib/types";

// =============================================================================
// ポートフォリオページ
// =============================================================================

export default function PortfolioPage() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeFilter, setActiveFilter] = useState("");

  // セクションの ref（スクロール用）
  const heroRef    = useRef<HTMLElement>(null);
  const workRef    = useRef<HTMLElement>(null);
  const aboutRef   = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  /** ナビクリック: スムーズスクロール + activeNav 更新
   *  useRef は常に同一オブジェクトを返すため依存配列に含めても再生成しない
   */
  const handleNavClick = useCallback(
    (href: string, id?: string) => {
      const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
        "#hero":    heroRef,
        "#work":    workRef,
        "#about":   aboutRef,
        "#contact": contactRef,
      };
      refMap[href]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (id) setActiveNav(id);
    },
    [heroRef, workRef, aboutRef, contactRef]
  );

  /** カテゴリフィルター */
  const filteredProjects = activeFilter
    ? PROJECTS.filter((p) =>
        p.tags.some((t) => t.category === (activeFilter as TechCategory))
      )
    : PROJECTS;

  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      {/* ─── トップバー ─── */}
      <TopBar
        navItems={NAV_ITEMS}
        onNavClick={(href) => handleNavClick(href)}
      />

      <div className="flex flex-1 mx-auto w-full max-w-[1440px]">
        {/* ─── サイドバー（LG以上のみ） ─── */}
        <Sidebar
          navItems={NAV_ITEMS}
          activeId={activeNav}
          onNavClick={handleNavClick}
        />

        {/* ─── メインコンテンツ ─── */}
        <main className="flex-1 overflow-x-hidden px-5 pb-16" style={{ minWidth: 0 }}>

          {/* ============================================================
              Hero
              ============================================================ */}
          <section
            id="hero"
            ref={heroRef}
            className="flex flex-col justify-center py-16 md:py-20 animate-fade-in"
          >
            {/* バッジ */}
            <span
              className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest animate-badge-pop"
              style={{
                background: "rgba(0, 212, 255, 0.10)",
                borderColor: "var(--color-secondary)",
                color: "var(--color-secondary)",
              }}
            >
              <Zap size={12} aria-hidden="true" />
              AI-Powered Development
            </span>

            {/* ヘッドライン */}
            <h1
              className="text-4xl font-extrabold leading-tight tracking-tight md:text-[3.5rem]"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}
            >
              Building with
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Agents
              </span>
            </h1>

            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Claude Code SubAgent・Manus・NotebookLM など最先端の AI 開発ツールを
              活用して制作した成果物のポートフォリオです。
            </p>

            {/* CTA ボタン */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => handleNavClick("#work", "work")}
                className="rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-150"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                  boxShadow: "0 4px 14px rgba(255, 107, 43, 0.35)",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "var(--color-primary-light)";
                  btn.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "var(--color-primary)";
                  btn.style.transform = "";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
              >
                制作実績を見る
              </button>

              <a
                href="https://github.com/hirari123"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors duration-150"
                style={{
                  borderColor: "var(--color-bg-border)",
                  color: "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.background = "var(--color-bg-elevated)";
                  a.style.color = "var(--color-text-primary)";
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.background = "transparent";
                  a.style.color = "var(--color-text-secondary)";
                }}
              >
                <GitBranch size={16} aria-hidden="true" />
                GitHub
              </a>
            </div>

            {/* スタット */}
            <dl className="mt-10 flex flex-wrap gap-8">
              {([
                { label: "制作実績", value: `${PROJECTS.length}件` },
                { label: "使用AIツール", value: "3+" },
                { label: "技術スタック", value: "5+" },
              ] as const).map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt
                    className="text-[11px] font-medium uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {stat.label}
                  </dt>
                  <dd
                    className="mt-1 text-2xl font-extrabold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ============================================================
              制作実績
              ============================================================ */}
          <section
            id="work"
            ref={workRef}
            className="py-8 border-t"
            style={{ borderColor: "var(--color-bg-border)" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-xl font-bold tracking-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                制作実績
              </h2>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-secondary)" }}
              >
                {filteredProjects.length} 件
              </span>
            </div>

            {/* フィルター */}
            <div className="mb-6">
              <FilterChips
                options={FILTER_OPTIONS}
                active={activeFilter}
                onChange={setActiveFilter}
              />
            </div>

            {/* プロジェクトグリッド */}
            {filteredProjects.length > 0 ? (
              <ul
                className="grid gap-3"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                }}
                role="list"
                aria-label="制作実績一覧"
              >
                {filteredProjects.map((project, i) => (
                  <li
                    key={project.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="flex h-40 items-center justify-center rounded-xl border text-sm"
                style={{
                  borderColor: "var(--color-bg-border)",
                  color: "var(--color-text-muted)",
                }}
                role="status"
              >
                このカテゴリの実績はまだありません
              </div>
            )}
          </section>

          {/* ============================================================
              About
              ============================================================ */}
          <section
            id="about"
            ref={aboutRef}
            className="py-8 border-t"
            style={{ borderColor: "var(--color-bg-border)" }}
          >
            <h2
              className="mb-6 text-xl font-bold tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              About
            </h2>
            <div
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-bg-surface)",
                borderColor: "var(--color-bg-border)",
              }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(255, 107, 43, 0.15)" }}
                  aria-hidden="true"
                >
                  <Bot size={32} style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    hirari123
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    AI 開発ツールを活用してプロダクトを制作しています。
                    Claude Code SubAgent・Manus・NotebookLM などを駆使し、
                    アイデアを素早く形にすることが得意です。
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="スキル">
                    {[
                      "Claude Code",
                      "SubAgent",
                      "Manus",
                      "NotebookLM",
                      "Next.js",
                      "TypeScript",
                    ].map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
                        style={{
                          background: "var(--color-bg-elevated)",
                          borderColor: "var(--color-bg-border)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              Contact
              ============================================================ */}
          <section
            id="contact"
            ref={contactRef}
            className="py-8 border-t"
            style={{ borderColor: "var(--color-bg-border)" }}
          >
            <h2
              className="mb-6 text-xl font-bold tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              Contact
            </h2>
            <div
              className="rounded-xl border p-6 text-center"
              style={{
                background: "var(--color-bg-surface)",
                borderColor: "var(--color-bg-border)",
              }}
            >
              <Code2
                size={40}
                className="mx-auto mb-4"
                style={{ color: "var(--color-primary)" }}
                aria-hidden="true"
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                お仕事のご依頼・ご質問は GitHub までお気軽にどうぞ。
              </p>
              <a
                href="https://github.com/hirari123"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-150"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                  boxShadow: "0 4px 14px rgba(255, 107, 43, 0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--color-primary-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--color-primary)";
                }}
              >
                <GitBranch size={16} aria-hidden="true" />
                GitHub を開く
              </a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
