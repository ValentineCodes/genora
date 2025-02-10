import moment from "moment";

/**
 * Converts a blockchain timestamp (BigInt) to a human-readable relative time format.
 *
 * @param timestamp - The UNIX timestamp in seconds (BigInt or number).
 * @returns A human-readable time string (e.g., "5 minutes ago").
 */
export function parseTimestamp(timestamp: bigint | number): string {
  const timestampInMs = Number(timestamp) * 1000;
  return moment(timestampInMs).fromNow();
}
