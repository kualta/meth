"use client";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import type { Metadata } from "next";
import { useMemo } from "react";
import * as web3 from "@solana/web3.js";

// export const metadata: Metadata = {
// 	title: "solana",
// 	description: "solana elements",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const endpoint = web3.clusterApiUrl("devnet");
	const wallets = useMemo(() => [], []);

	return (
		<html lang="en">
			<body>
				<ConnectionProvider endpoint={endpoint}>
					<WalletProvider wallets={wallets}>{children}</WalletProvider>
				</ConnectionProvider>
			</body>
		</html>
	);
}
