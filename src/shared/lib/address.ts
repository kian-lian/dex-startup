/**
 * Truncate an Ethereum address for display: 0x1234...abcd
 */
export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
