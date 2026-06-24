import type { TermsResolvedSection } from "../types/terms-template.types";

function slugifyTitle(title: string, index: number): string {
  const cleaned = title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned ? `custom-${cleaned}` : `custom-section-${index + 1}`;
}

export function parseTermsContent(content: string): TermsResolvedSection[] {
  return content
    .split("\n\n")
    .map((block, index) => {
      const lines = block.split("\n");
      const title = lines[0]?.trim() ?? "";
      const body = lines.slice(1).join("\n").trim();

      if (!title) return null;

      const isNumberedHeading = /^\d+\.\s/.test(title);

      if (isNumberedHeading && body) {
        return {
          id: slugifyTitle(title, index),
          title,
          body,
        };
      }

      return {
        id: slugifyTitle(title, index),
        title,
        body: body || undefined,
      };
    })
    .filter((section): section is TermsResolvedSection => section !== null);
}
