"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { http } from "viem";
import { PRIVY_APP_ID, RPC_URL, tiltyardChain } from "./consts";
import { TestComponent } from "./component";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [tiltyardChain],
  transports: {
    [tiltyardChain.id]: http(RPC_URL),
  },
});

const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: "#450B38",
    logo: "/tiltyard-logo-320x80.png",
    showWalletLoginFirst: false,
    walletList: [
      "detected_wallets",
      "metamask",
      "phantom",
      "rainbow",
      "wallet_connect",
      "coinbase_wallet",
    ],
  },
  supportedChains: [tiltyardChain],
  embeddedWallets: { noPromptOnSignature: true },
  loginMethods: ["email"],
};

export default function Home() {
  return (
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <TestComponent />
          </main>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
