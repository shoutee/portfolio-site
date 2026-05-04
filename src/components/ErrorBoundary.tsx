"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * React Error Boundary。
 * 子ツリーで例外が発生した場合にページ全体の白画面を防ぎ、
 * fallback UI を表示する。
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }): void {
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex items-center justify-center rounded-xl border p-8 text-sm"
            style={{
              borderColor: "var(--color-bg-border)",
              color: "var(--color-text-muted)",
            }}
            role="alert"
          >
            表示中にエラーが発生しました
          </div>
        )
      );
    }
    return this.props.children;
  }
}
