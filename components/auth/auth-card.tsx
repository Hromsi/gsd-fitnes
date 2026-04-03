import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/page-shell";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <PageShell>
      <section className="w-full max-w-md rounded-[1.75rem] border border-border bg-surface px-6 py-8 shadow-[0_24px_60px_rgba(33,53,45,0.08)] sm:px-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
            <h1 className="text-[28px] font-semibold leading-tight text-foreground">
              {title}
            </h1>
            <p className="text-base leading-6 text-muted">{description}</p>
          </div>
          {children}
          {footer ? (
            <div className="text-sm leading-6 text-muted">{footer}</div>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
