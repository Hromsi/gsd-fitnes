import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main
      className={cn(
        "flex flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:px-12",
        className,
      )}
    >
      {children}
    </main>
  );
}
