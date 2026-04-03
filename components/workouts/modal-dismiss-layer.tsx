"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type ModalDismissLayerProps = {
  children: ReactNode;
};

export function ModalDismissLayer({ children }: ModalDismissLayerProps) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-[2px]"
      data-testid="modal-overlay"
      onClick={() => router.back()}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
}
