// House style for sentences shown on the site: no semicolons, colons or dashes used as punctuation.
// Applied to deal text when it loads, so imported and hand-written records read the same way.
// Hyphens inside words (wind-solar, 25-year) are kept; they are spelling, not punctuation.

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function plainText(input: string): string;
export function plainText(input: string | undefined): string | undefined;
export function plainText(input: string | undefined): string | undefined {
  if (!input) return input;
  let s = input;
  // Number and year ranges: 2027–2028, 10–30% -> 2027 to 2028, 10 to 30%.
  s = s.replace(/(\d)\s?[–—]\s?(\d)/g, "$1 to $2");
  // Dashes used as punctuation become commas.
  s = s.replace(/\s+[–—-]\s+/g, ", ").replace(/(\w)—(\w)/g, "$1, $2");
  // Semicolons end a sentence.
  s = s.replace(/\s*;\s+(\S)/g, (_, c: string) => `. ${cap(c)}`).replace(/;$/, ".");
  // Colons introducing a list or detail become commas (times like 10:30 and ratios like 1:2 are kept).
  s = s.replace(/(\D|\d(?=:\s)):\s+/g, (_, c: string) => `${c}, `);
  // Tidy doubled punctuation the replacements can leave behind.
  return s.replace(/,\s*,/g, ",").replace(/\.\s*,/g, ".").replace(/,\s*\./g, ".");
}

/** Headlines read better joined than split, so "; " becomes " and " before the usual rules. */
export function plainTitle(input: string): string {
  return plainText(input.replace(/\s*;\s+/g, " and "));
}
