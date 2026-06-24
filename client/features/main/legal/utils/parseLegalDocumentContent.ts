import type { LegalDocumentSection } from "../types/legal-document.types";

const NUMBERED_HEADING_PATTERN = /^\d+\.\s/;

function slugifyTitle(title: string, index: number): string {
  const cleaned = title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned ? `custom-${cleaned}` : `custom-section-${index + 1}`;
}

function isListLine(line: string): boolean {
  return (
    /^[-•*–]\s+/.test(line) ||
    /^[""«]/.test(line) ||
    /^"\w/.test(line) ||
    /^[^:]+:\s+.+/.test(line)
  );
}

function stripListMarker(line: string): string {
  return line.replace(/^[-•*–]\s+/, "").trim();
}

function parseSectionBody(body: string): Pick<
  LegalDocumentSection,
  "intro" | "listItems" | "body"
> {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return {};
  if (lines.length === 1) return { body: lines[0] };

  if (lines[0].endsWith(":") && lines.length >= 2) {
    const intro = lines[0];
    const remainder = lines.slice(1);

    if (remainder.length === 1) {
      return { intro, body: remainder[0] };
    }

    const closingPattern =
      /^(We |To |For |Subject |Silver Glow|You authorize|قد |نحتفظ|لممارسة|للأسئلة|أنت تفوض)/i;
    const lastLine = remainder[remainder.length - 1];

    if (remainder.length >= 2 && closingPattern.test(lastLine)) {
      return {
        intro,
        listItems: remainder.slice(0, -1).map(stripListMarker),
        body: lastLine,
      };
    }

    return {
      intro,
      listItems: remainder.map(stripListMarker),
    };
  }

  const firstListIndex = lines.findIndex(isListLine);

  if (firstListIndex === -1) {
    return { body: lines.join("\n") };
  }

  const intro =
    firstListIndex > 0
      ? lines.slice(0, firstListIndex).join("\n")
      : undefined;

  const listItems: string[] = [];
  let bodyStart = lines.length;

  for (let i = firstListIndex; i < lines.length; i++) {
    const line = lines[i];

    if (isListLine(line)) {
      listItems.push(stripListMarker(line));
      continue;
    }

    if (listItems.length > 0) {
      bodyStart = i;
      break;
    }
  }

  const trailingBody =
    bodyStart < lines.length ? lines.slice(bodyStart).join("\n") : undefined;

  return {
    intro,
    listItems: listItems.length > 0 ? listItems : undefined,
    body: trailingBody,
  };
}

export function isValidParsedLegalDocumentContent(
  sections: LegalDocumentSection[]
): boolean {
  if (sections.length < 1) return false;

  return sections.every((section) =>
    NUMBERED_HEADING_PATTERN.test(section.title)
  );
}

export function parseLegalDocumentContent(
  content: string
): LegalDocumentSection[] {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const chunks = normalized
    .split(/\n(?=\d+\.\s)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return chunks
    .map((chunk, index) => {
      const lines = chunk.split("\n");
      const title = lines[0]?.trim() ?? "";
      const bodyText = lines.slice(1).join("\n").trim();

      if (!title || !NUMBERED_HEADING_PATTERN.test(title)) {
        return null;
      }

      const parsedBody = parseSectionBody(bodyText);

      return {
        id: slugifyTitle(title, index),
        title,
        ...parsedBody,
      };
    })
    .filter((section): section is LegalDocumentSection => section !== null);
}
