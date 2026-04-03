"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/layout/sign-out-button";

type NavItem = {
  href: string;
  label: string;
};

type TopNavProps = {
  items?: NavItem[];
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav({ items = [] }: TopNavProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface-muted">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold text-foreground">
            Personalized Workout Planner
          </Link>
          {items.length > 0 ? (
            <nav className="hidden items-center gap-2 sm:flex">
              {items.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
        <SignOutButton />
      </div>
    </header>
  );
}
