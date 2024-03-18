"use client";
import { NextPage } from "next";
import { FC, ReactNode, useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

const Page = () => {
	const endpoint = web3.clusterApiUrl("devnet");
	const wallets = useMemo(() => [], []);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets}>
				<p>Put the rest of your app here</p>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default Page;
