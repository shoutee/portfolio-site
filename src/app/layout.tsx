import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hirari123.dev — AI開発ポートフォリオ",
  description:
    "Claude Code SubAgent・Manus・NotebookLM など最先端AI開発ツールを活用した制作実績集",
  keywords: ["AI開発", "ポートフォリオ", "Claude Code", "Next.js", "SubAgent"],
  openGraph: {
    title: "hirari123.dev — AI開発ポートフォリオ",
    description: "AI開発ツールを活用した制作実績集",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full" style={{ background: "var(--color-bg-base)" }}>
        {children}
      </body>
    </html>
  );
}
