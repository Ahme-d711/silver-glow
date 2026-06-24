import type { TermsResolvedSection } from "../types/terms-template.types";
import {
  isValidParsedLegalDocumentContent,
  parseLegalDocumentContent,
} from "../../legal/utils/parseLegalDocumentContent";

export function isValidParsedTermsContent(
  sections: TermsResolvedSection[]
): boolean {
  return isValidParsedLegalDocumentContent(sections);
}

export function parseTermsContent(content: string): TermsResolvedSection[] {
  return parseLegalDocumentContent(content);
}
