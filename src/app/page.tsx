"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { GitBranch, Zap, Bot, Code2 } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { ProjectCard } from "@/components/ProjectCard";
import { FilterChips } from "@/components/FilterChips";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PROJECTS, NAV_ITEMS, FILTER_OPTIONS } from "@/data/projects";
import type { TechCategory } from "@/lib/types";

export default function PortfolioPage() {
  const [activeNav, setActiveNav] = useState("home");
  /** FilterOption.value が "" | TechCategory に絞られているため型ガード不要 */
  const [activeFilter, setActiveFilter] = useState<"" | TechCategory>("");

  const heroRef    = useRef<HTMLElement>(null);
  const workRef    = useRef<HTMLElement>(null);
  const aboutRef   = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  /**
   * ナビクリック: スムーズスクロール + activeNav 更新。
   * useRef は常に同一オブジェクトを返すため依存配列に含めても再生成しない。
   */
  const handleNavClick = useCallback(
    (href: string, id?: string) => {
      const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
        "#hero":    heroRef,
        "#work":    workRef,
        "#about":   aboutRef,
        "#contact": contactRef,
      };
      if (process.env.NODE_ENV === "development" && !refMap[href]) {
        console.warn(`[handleNavClick] unknown href: ${href}`);
      }
      refMap[href]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (id) setActiveNav(id);
    },
    // useRef オブジェクトは参照安定のため依存配列は空でよい
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /** カテゴリフィルター — useMemo でメモ化。型が "" | TechCategory なので型ガード不要 */
  const filteredProjects = useMemo(
    () =>
      activeFilter
        ? PROJECTS.filter((p) => p.tags.some((t) => t.category === activeFilter))
        : PROJECTS,
    [activeFilter]
  );

  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <TopBar navItems={NAV_ITEMS} onNavClick={handleNavClick} />

      <div className="flex flex-1 mx-auto w-full max-w-[1440px]">
        <Sidebar navItems={NAV_ITEMS} activeId={activeNav} onNavClick={handleNavClick} />

        <main className="flex-1 overflow-x-hidden px-5 pb-16" style={{ minWidth: 0 }}>

          {/* ============================================================
              Hero
              ============================================================ */}
          <section
            id="hero"
            ref={heroRef}
            className="flex flex-col justify-center py-16 md:py-20 animate-fade-in"
          >
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

            <h1
              className="text-4xl font-extrabold leading-tight tracking-tight md:text-[3.5rem]"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}
            >
              Building with
              <br />
              {/* gradient-text クラス: @supports フォールバック済み */}
              <span className="gradient-text">AI Agents</span>
            </h1>

            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Claude Code SubAgent・Manus・NotebookLM など最先端の AI 開発ツールを
              活用して制作した成果物のポートフォリオです。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* btn-primary クラスで CSS hover / active を共通化 */}
              {/* background は .btn-primary CSS クラスで管理 — インライン background 削除で !important 不要に */}
              <button
                onClick={() => handleNavClick("#work", "work")}
                className="btn-primary rounded-lg px-5 py-3 text-sm font-bold"
                style={{
                  color: "var(--color-text-inverse)",
                  boxShadow: "0 4px 14px rgba(255, 107, 43, 0.35)",
                }}
              >
                制作実績を見る
              </button>

              <a
                href="https://github.com/hirari123"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold"
                style={{
                  borderColor: "var(--color-bg-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <GitBranch size={16} aria-hidden="true" />
                GitHub
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap gap-8">
              {([
                { label: "制作実績", value: `${PROJECTS.length}件` },
                { label: "使用AIツール", value: "3+" },
                { label: "技術スタック", value: "5+" },
              ] as const).map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  {/* text-[11px] → text-xs (12px) に引き上げ */}
                  <dt
                    className="text-xs font-medium uppercase tracking-widest"
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
              {/* aria-live: フィルター変更時に件数をスクリーンリーダーに通知 */}
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-secondary)" }}
                aria-live="polite"
                aria-atomic="true"
              >
                {filteredProjects.length} 件
              </span>
            </div>

            <div className="mb-6">
              <FilterChips
                options={FILTER_OPTIONS}
                active={activeFilter}
                onChange={setActiveFilter}
              />
            </div>

            {/* ErrorBoundary: カードリストの例外でページ全体を守る */}
            <ErrorBoundary fallback={
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                実績の読み込みに失敗しました
              </p>
            }>
              {filteredProjects.length > 0 ? (
                /* key={activeFilter}: フィルター変更で再マウント → stagger アニメーション再生 */
                <ul
                  key={activeFilter}
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
                      <ProjectCard project={project} index={i} />
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
                  {activeFilter
                    ? "このカテゴリの実績はまだありません"
                    : "制作実績を準備中です"}
                </div>
              )}
            </ErrorBoundary>
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
                        className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em]"
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
                className="btn-primary mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
                style={{
                  color: "var(--color-text-inverse)",
                  boxShadow: "0 4px 14px rgba(255, 107, 43, 0.35)",
                }}
              >
                <GitBranch size={16} aria-hidden="true" />
                GitHub を開く
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
