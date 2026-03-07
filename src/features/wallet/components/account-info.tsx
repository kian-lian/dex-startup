"use client";

import { formatEther } from "viem";
import { useAccount, useBalance, useChainId } from "wagmi";
import { truncateAddress } from "@/shared/lib/address";

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  if (!isConnected || !address) {
    return null;
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-4 font-semibold text-lg text-zinc-900 dark:text-zinc-50">
        Wallet Info
      </h2>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-500 dark:text-zinc-400">Address</dt>
          <dd className="font-mono text-zinc-900 dark:text-zinc-50">
            {truncateAddress(address)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500 dark:text-zinc-400">Chain ID</dt>
          <dd className="text-zinc-900 dark:text-zinc-50">{chainId}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500 dark:text-zinc-400">Balance</dt>
          <dd className="text-zinc-900 dark:text-zinc-50">
            {balance
              ? `${Number(formatEther(balance.value)).toFixed(4)} ${balance.symbol}`
              : "Loading..."}
          </dd>
        </div>
      </dl>
    </div>
  );
}
