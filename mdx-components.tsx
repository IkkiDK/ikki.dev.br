import type { MDXComponents } from "mdx/types";
import { proseComponents } from "@/components/prose";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...proseComponents, ...components };
}
