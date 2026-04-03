"use client";

import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type OptionGroupProps = {
  label: string;
  name: string;
  options: readonly Option[];
  selectedValue?: string;
  error?: string;
  onValueChange?: (value: string) => void;
};

export function OptionGroup({
  label,
  name,
  options,
  selectedValue,
  error,
  onValueChange,
}: OptionGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold leading-6 text-foreground">
        {label}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-11 cursor-pointer items-center rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                isSelected
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background text-foreground hover:bg-surface-muted",
              )}
            >
              <input
                checked={isSelected}
                className="sr-only"
                onChange={() => onValueChange?.(option.value)}
                name={name}
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? <p className="text-sm leading-6 text-destructive">{error}</p> : null}
    </fieldset>
  );
}
