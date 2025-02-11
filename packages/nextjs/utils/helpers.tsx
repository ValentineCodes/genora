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

/**
 * Truncates an Ethereum address to a shorter format.
 *
 * @param address - The full Ethereum address as a string.
 * @returns The truncated address in the format: `0x123...abcd`
 *
 * @example
 * ```ts
 * truncateAddress("0x1234567890abcdef1234567890abcdef12345678");
 * // Returns: "0x123456...5678"
 * ```
 */
export const truncateAddress = (address: string): string => `${address.slice(0, 6)}...${address.slice(-4)}`;
