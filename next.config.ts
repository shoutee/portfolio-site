import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// GitHub リポジトリ名に合わせて変更してください（例: /portfolio-site）
const repoName = "/portfolio-site";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoName : "",
  assetPrefix: isProd ? repoName : "",
  // next/image を static export で使うために必要
  // NOTE: unoptimized: true により srcset 生成・WebP変換は行われない。
  //       Vercel 等に移行する場合はこの行を削除すること。
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
