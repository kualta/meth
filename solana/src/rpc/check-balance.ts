import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";

const publicKey = new PublicKey(process.argv[2]);

if (!publicKey || !PublicKey.isOnCurve(publicKey)) {
	console.error("Invalid public key");
	process.exit(1);
}

enum Endpoint {
	MainnetBeta = "https://api.mainnet-beta.solana.com",
	Testnet = "https://api.testnet.solana.com",
	Devnet = "https://api.devnet.solana.com",
}

async function getBalance(
	address: PublicKey,
	endpoint: Endpoint = Endpoint.MainnetBeta,
) {
	const connection = new Connection(endpoint, "confirmed");
	console.log("Connected to Mainnet");

	if (!PublicKey.isOnCurve(address)) {
		console.error("Invalid public key");
		process.exit(1);
	}
	const balance = await connection.getBalance(address);
	const balanceInSol = balance / LAMPORTS_PER_SOL;

	console.log(
		`The balance of the account at ${address} ${
			endpoint.split("//")[1].split(".")[1]
		} is ${balanceInSol} SOL`,
	);
}

getBalance(publicKey, Endpoint.MainnetBeta);
getBalance(publicKey, Endpoint.Devnet);
getBalance(publicKey, Endpoint.Testnet);
