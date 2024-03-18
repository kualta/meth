import {
	Connection,
	Transaction,
	SystemProgram,
	sendAndConfirmTransaction,
	PublicKey,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { convertSolToUSD } from "./misc";

const startTime = Date.now();
const senderKeypair = await getKeypairFromFile("./keypair.json");
const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey || !PublicKey.isOnCurve(suppliedToPubkey)) {
	console.log("Please provide a valid public key to send to");
	process.exit(1);
}

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
	"Loaded own keypair, the destination public key, and connected to Solana",
);

const lamportsAmount = process.argv[3] || null;

if (!lamportsAmount || Number.isNaN(lamportsAmount)) {
	console.log("Please provide a valid number of lamports to send");
	process.exit(1);
}
const LAMPORTS_TO_SEND = Number(lamportsAmount);

console.log(`Sending ${LAMPORTS_TO_SEND} lamports to ${toPubkey}`);

const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
	fromPubkey: senderKeypair.publicKey,
	toPubkey,
	lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
	senderKeypair,
]);

const endTime = Date.now();
const duration = (endTime - startTime) / 1000;
const solAmount = LAMPORTS_TO_SEND / LAMPORTS_PER_SOL;
const usdAmount = await convertSolToUSD(solAmount);

console.log(
	`Finished! Sent ${solAmount} SOL ($${usdAmount} USD) from ${senderKeypair.publicKey} to the address ${toPubkey}. `,
);
console.log(`Transaction took ${duration} seconds to complete`);

console.log(`Transaction signature is ${signature}`);
