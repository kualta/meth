"use client";
import { FC, ReactNode, useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import {
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const Page = () => {
	const { publicKey, sendTransaction } = useWallet();

	const { connection } = useConnection();

	const sendSol = (event) => {
		event.preventDefault();

		const transaction = new web3.Transaction();

		const recipientPubKey = new web3.PublicKey(event.target.recipient.value);

		const sendSolInstruction = web3.SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey: recipientPubKey,
			lamports: web3.LAMPORTS_PER_SOL * 0.1,
		});

		transaction.add(sendSolInstruction);

		sendTransaction(transaction, connection).then((sig) => {
			console.log(sig);
		});
	};
	return (
		<WalletModalProvider>
			<WalletMultiButton />
			<form onSubmit={sendSol}>
				<input type="text" name="recipient" placeholder="Recipient" />

				<button>Send 0.1 SOL</button>
			</form>
		</WalletModalProvider>
	);
};

export default Page;
