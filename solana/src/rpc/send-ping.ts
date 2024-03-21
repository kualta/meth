import { PublicKey } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import {
	airdropIfRequired,
	getKeypairFromFile,
} from "@solana-developers/helpers";

export const PING_PROGRAM_ADDRESS = new web3.PublicKey(
	"ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
export const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
	"Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);

type Endpoint = "mainnet-beta" | "devnet" | "testnet";

const payer = await getKeypairFromFile("./keypair.json");
if (!payer || !PublicKey.isOnCurve(payer.publicKey)) {
	console.error("Invalid public key");
	process.exit(1);
}

const endpointArg = process.argv[2];
if (
	!endpointArg ||
	!["mainnet-beta", "devnet", "testnet", "localnet"].includes(endpointArg)
) {
	console.error("Invalid endpoint");
	process.exit(1);
}

const endpoint: web3.Cluster = endpointArg as Endpoint;
const connection = new web3.Connection(web3.clusterApiUrl(endpoint));
console.log(`Connected to ${endpoint}`);

const newBalance = await airdropIfRequired(
	connection,
	new PublicKey(payer.publicKey),
	1 * web3.LAMPORTS_PER_SOL,
	0.5 * web3.LAMPORTS_PER_SOL,
);

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
	keys: [
		{
			pubkey: pingProgramDataId,
			isSigner: false,
			isWritable: true,
		},
	],
	
	programId,
});

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
	connection,
	transaction,
	[payer],
);

console.log(`Transaction completed! Signature is ${signature}`);
console.log(
	`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);
