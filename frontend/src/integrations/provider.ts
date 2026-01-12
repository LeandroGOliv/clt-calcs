import type { ReactNode } from "react";
import z from "zod";
import { customPtBr } from "./error-translations";

export function ZodProvider({ children }: { children: ReactNode }) {
  z.config(customPtBr());
  return children;
}
