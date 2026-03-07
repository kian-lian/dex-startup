import { describe, expect, it } from "vitest";
import { truncateAddress } from "@/shared/lib/address";

describe("truncateAddress", () => {
  it("should truncate address with default chars", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(truncateAddress(address)).toBe("0x1234...5678");
  });

  it("should truncate address with custom chars", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(truncateAddress(address, 6)).toBe("0x123456...345678");
  });
});
