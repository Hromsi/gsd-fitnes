"use client";

import { useRouter } from "next/navigation";

type ModalCloseButtonProps = {
  closeHref: string;
};

export function ModalCloseButton({ closeHref }: ModalCloseButtonProps) {
  const router = useRouter();
  void closeHref;

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
      onClick={() => router.back()}
    >
      Close
    </button>
  );
}
