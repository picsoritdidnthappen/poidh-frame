
const chains = {
    sepolia: {
        name: 'Sepolia Base Testnet',
        chainId: 84532,
        jsonProviderUrl: 'https://sepolia.base.org',
        contracts: {
            mainContract: '0x6981e82d270BD01D026D0E3E10Ba486337c91923',
            nftContract: '0xd29F55255C784d777Aa7A09063E7D18377446fe2',
        },
    },
    degen: {
        name: 'Degen Mainnet',
        chainId: 666666666,
        jsonProviderUrl: 'https://rpc.degen.tips',
        rpc: 'https://rpc.degen.tips/E5xa24BftzZHkonuWxbngPdajGNxTyRPc',
        contracts: {
            mainContract: '0x2445BfFc6aB9EEc6C562f8D7EE325CddF1780814',
            nftContract: '0xDdfb1A53E7b73Dba09f79FCA24765C593D447a80',
        },
    },
    art: {
        name: 'Arbitrum One',
        chainId: 42161,
        jsonProviderUrl:
            'https://arbitrum.llamarpc.com',
        contracts: {
            mainContract: '0x0Aa50ce0d724cc28f8F7aF4630c32377B4d5c27d',
            nftContract: '0xDdfb1A53E7b73Dba09f79FCA24765C593D447a80',
        },
    },
    base: {
        name: 'Base Network',
        chainId: 42161,
        jsonProviderUrl:
            'https://api.developer.coinbase.com/rpc/v1/base/q_7UksVVI6bvOgx0y6-hR123IsVxVk3-',
        contracts: {
            mainContract: '0xb502c5856F7244DccDd0264A541Cc25675353D39',
            nftContract: '0xDdfb1A53E7b73Dba09f79FCA24765C593D447a80',
        },
    },
};

export const networks = [
    {
        name: 'sepolia',
        chainId: 84532,
    },
    {
        name: 'degen',
        chainId: 666666666,
    },
    {
        name: 'art',
        chainId: 42161,
    },
    {
        name: 'base',
        chainId: 8453,
    },
];

export default chains;

console.log(JSON.stringify(chains))