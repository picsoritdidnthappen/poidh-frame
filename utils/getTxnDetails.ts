import { AbiCoder, JsonRpcProvider } from "ethers";

export async function getTransactionReceipt(rpcUrl: string, transactionHash: string): Promise<{
    bountyId: string;
    title: string;
    description: string;
    amount: string;
}> {
    const provider = new JsonRpcProvider(rpcUrl);

    const transactionReceipt = await provider.getTransactionReceipt(
        transactionHash
    );

    const receipt = transactionReceipt?.toJSON()

    const logs = receipt.logs;
    const data = logs?.[0]?.data as any

    const decodedInput = new AbiCoder().decode(
        ["uint256", "address", "string", "string", "uint256", "uint256"],
        data
    );
    const [poidhId, , poidhName, poidhDescription, , poidhAmount] = decodedInput;

    return {
        bountyId: poidhId.toString(),
        title: poidhName,
        description: poidhDescription,
        amount: poidhAmount.toString()
    };
}

getTransactionReceipt(
    'https://arbitrum.rpc.subquery.network/public',
    "0xebdf3fd513e3c2fedd28c36a5d98d09769bae94edf630422906f9778bcc13bda"
);