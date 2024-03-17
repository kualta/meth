export async function getSolToUSDPrice(): Promise<number> {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        if (!response.ok) {
            throw new Error('Failed to fetch Solana to USD price');
        }
        const data = await response.json();
        const solToUSD = data.solana.usd;
        return solToUSD;
    } catch (error) {
        console.error('Error fetching Solana to USD price:', error);
        throw error;
    }
}

export async function convertSolToUSD(solAmount: number): Promise<number> {
    const solToUSD = await getSolToUSDPrice();
    return solAmount * solToUSD;
}