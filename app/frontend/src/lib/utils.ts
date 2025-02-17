import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toQueryParams(
  params: Record<string, unknown>
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}

export function clickMarkAsLeft() {
  const btn = document.getElementById("mark-as-left-btn");

  if (!btn) return false;
  btn.click();
  return true;
}
