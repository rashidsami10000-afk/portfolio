/** Split a headline into words so each can be animated independently. */
export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}
