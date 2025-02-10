import Showdown from "showdown";

/**
 * Truncates a string to the first specified number of words.
 *
 * @param str - The input string to truncate.
 * @param wordLimit - The maximum number of words allowed (default: 7).
 * @returns The truncated string or the original string if it's within the limit.
 */
export function truncateWords(str: string, wordLimit: number = 7): string {
  const words = str.trim().split(/\s+/); // Trim and split by whitespace
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") : str;
}

/**
 * Converts a Markdown string to HTML using Showdown.
 *
 * @param markdown - The Markdown string to convert.
 * @returns The converted HTML string.
 */
export function convertMarkdown(markdown: string): string {
  return new Showdown.Converter().makeHtml(markdown);
}
