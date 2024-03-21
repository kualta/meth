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

export const PING_PROGRAM_ADDRESS = new web3.PublicKey(
	"ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
export const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
	"Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);

export const ssr = false;

const Page = () => {
	const { publicKey, sendTransaction } = useWallet();
	const { connection } = useConnection();

	const onClick = () => {
		if (!connection || !publicKey) {
			return;
		}

		const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
		const programDataAccount = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);
		const transaction = new web3.Transaction();

		const instruction = new web3.TransactionInstruction({
			keys: [
				{
					pubkey: programDataAccount,
					isSigner: false,
					isWritable: true,
				},
			],
			programId,
		});

		transaction.add(instruction);
		sendTransaction(transaction, connection).then((sig) => {
			console.log(sig);
		});
	};

	return (
		<WalletModalProvider>
			<WalletMultiButton />
			<form>
				<input type="text" name="recipient" placeholder="Recipient" />

				<button type="button" onClick={onClick}>
					Send 0.1 SOL
				</button>
			</form>
		</WalletModalProvider>
	);
};

export default Page;
