import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";

const keypair = await getKeypairFromFile("./keypair.json");

async function getDevnetBalance(address: PublicKey) {
	const connection = new Connection(
		"https://api.devnet.solana.com",
		"confirmed",
	);
	console.log("Connected to Devnet");

	if (!PublicKey.isOnCurve(address)) {
		throw new Error("Invalid public key");
	}
	const balance = await connection.getBalance(address);
	const balanceInSol = balance / LAMPORTS_PER_SOL;

	console.log(
		`The balance of the account at ${address} (Devnet) is ${balance} lamports (${balanceInSol} SOL)`,
	);
}

async function getMainnetBalance(address: PublicKey) {
	const connection = new Connection(
		"https://api.mainnet-beta.solana.com",
		"confirmed",
	);
	console.log("Connected to Mainnet");

	if (!PublicKey.isOnCurve(address)) {
		throw new Error("Invalid public key");
	}
	const balance = await connection.getBalance(address);
	const balanceInSol = balance / LAMPORTS_PER_SOL;

	console.log(
		`The balance of the account at ${address} (Mainnet-beta) is ${balance} lamports (${balanceInSol} SOL)`,
	);
}

getDevnetBalance(keypair.publicKey);
getMainnetBalance(keypair.publicKey);
