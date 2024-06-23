/** @jsxImportSource frog/jsx */

// import { fonts } from '@/app/fonts/fonts'
import { JsonRpcProvider, ethers, parseUnits } from 'ethers'
import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { createSystem } from 'frog/ui'
import { abi } from "../../abi"
import { AbiCoder, BrowserProvider } from "ethers";
import { getTransactionReceipt } from '@/utils/getTxnDetails'
import chains from '@/utils/config'


type State = {
  title: string
  description: string
  reward: number
  bountyType: string
  chain: string
}

const app = new Frog<{ State: State }>({
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    title: "",
    description: "",
    reward: 0,
    bountyType: "",
    cahin: ""
  },

  imageOptions: {
    /* Other default options */
    fonts: [
      {
        name: 'Inter',
        weight: 400,
        source: 'google',
      },
    ],
  },
  // Supply a Hub to enable frame verification.
  // hub: pinata()
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
const { Heading } = createSystem({
  fonts: {

    Inter: [
      {
        name: 'Inter',
        weight: 400,
        source: 'google',
      },
    ],
    default: [
      {
        name: 'Inter',
        weight: 400,
        source: 'google',
      },
    ],
  },
})

const simpleMessage = <div
  style={{
    alignItems: 'center',
    backgroundImage: `url("https://frame-degen.poidh.xyz/bg-poidh.png")`,
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    position: "absolute",
    top: 0,
    left: 0
  }}
>
  <div style={{
    alignItems: 'center',
    // background: 'white',
    height: 150,
    width: 480,
    transform: "scale(.3)",
    display: 'flex',
    backgroundRepeat: 'no-repeat',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    textAlign: 'center',
    objectFit: "contain",
    backgroundSize: "contain",
    position: "absolute",
    top: 0,
    backgroundImage: `url("https://frame-degen.poidh.xyz/logo-poidh.png")`,
  }}
  >
  </div>
</div >

app.frame('/', (c) => {
  return c.res({
    action: '/bountytitle',
    image: "https://frame-degen.poidh.xyz/screen-1.png",
    intents: [
      <Button value="start">Create a Bounty</Button>,
    ],
  })
})

app.frame('/bountytitle', (c) => {

  return c.res({
    action: '/bountydescription',
    image: (
      <div style={{
        display: "flex", flexDirection: 'column',
        fontFamily: "Inter",
        justifyContent: "center", alignItems: "center", height: "100%"
      }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          bounty title
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center'
          }}
        >
          give your bounty a clear and concise title that accurately reflects what you want to be done
        </div>
      </div>
    ),
    imageOptions: {
      fonts: [
        {
          name: 'Inter',
          source: 'google',
          style: 'normal',
        },
      ],
    },
    intents: [
      <TextInput placeholder="Enter your Title..." />,
      <Button value="submit">Submit</Button>,
    ],
  })
})

app.frame('/bountydescription', (c) => {
  const { buttonValue, inputText, deriveState } = c;

  if (!inputText?.length) {
    return c.error({ message: "Please enter a valid title", statusCode: 403 })
  }

  if (buttonValue === 'submit') {
    deriveState((previousState: State) => {
      previousState.title = inputText;
    });
  }

  return c.res({
    action: '/chain',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          bounty description
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center'
          }}
        >
          provide a detailed description of the bounty, including any specific requirements, guidelines, or expectations - be as clear as possible to attract the right participants to ensure successful completion
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your Description..." />,
      <Button value="submit">Submit</Button>,
    ],
  })
})

app.frame('/chain', (c) => {
  const { buttonValue, inputText, deriveState } = c;

  if (!inputText?.length) {
    return c.error({ message: "Please enter a valid description", statusCode: 403 })
  }

  if (buttonValue === 'submit') {
    deriveState((previousState: State) => {
      previousState.description = inputText;
    });
  }

  return c.res({
    action: '/bountyreward',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          chain
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center'
          }}
        >
          poidh supports 3 chains, you can select the chain you want to create the bounty on
        </div>
      </div>
    ),
    intents: [
      <Button value="base">Base</Button>,
      <Button value="arbitrium">Arbitrium</Button>,
      <Button value="degen">Degen</Button>,
    ],
  })
})

app.frame('/bountyreward', (c) => {
  const { buttonValue, deriveState } = c;

  if (buttonValue) {
    deriveState((previousState: State) => {
      previousState.chain = buttonValue;
    });
  }

  let amt = ""

  if (buttonValue == "degen") {
    amt = "DEGEN"
  }

  if (buttonValue && ['base', 'arbitrium'].includes(buttonValue)) {
    amt = "ETH"
  }

  return c.res({
    action: '/bountytype',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          reward amount
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center'
          }}
        >
          specify the reward amount you are offering in {amt} (please note, the poidh smart contract will deduct a 2.5% fee for all completed bounties)
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder={`Enter your ${amt}...`} />,
      <Button value="submit">Submit</Button>,
    ],
  })
})

app.frame('/bountytype', (c) => {
  const { buttonValue, inputText, deriveState } = c;

  if (!inputText) {
    return c.error({ message: "Please enter a valid reward", statusCode: 403 })
  }

  if (buttonValue === 'submit') {
    deriveState(previousState => {
      previousState.reward = parseFloat(inputText);
    });
  }

  return c.res({
    action: '/wallet',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          solo or open bounty
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center'
          }}
        >
          solo bounty: you are the sole creator and have full control over the bounty funds
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center'
          }}
        >
          open bounty: harness the power of the community by allowing anyone to contribute additional funds to the bounty, increasing the reward pool and attracting more talented contributors
        </div>
      </div>
    ),
    intents: [
      <Button value="solo">Solo Bounty</Button>,
      <Button value="open">Open Bounty</Button>,
    ],
  })
})

app.frame('/wallet', (c) => {
  const { buttonValue, deriveState } = c;

  const state = deriveState((previousState: State) => {
    if (buttonValue === 'solo' || buttonValue === 'open') {
      previousState.bountyType = buttonValue;
    }
  });


  return c.res({
    action: '/share',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          connect wallet to confirm the bounty
        </div>
        {/* <div style={{ fontSize: '32', width: '60%', textAlign: 'center' }}>
          Solo Bounty: You are the sole creator and have full control over the bounty funds.
        </div>
        <div style={{ fontSize: '32', width: '60%', textAlign: 'center' }}>
          Open Bounty: Harness the power of the community by allowing anyone to contribute additional funds to the bounty, increasing the reward pool and attracting more talented contributors.
        </div> */}
      </div>
    ),
    intents: [
      <Button.Transaction target="/mint">Connect Wallet</Button.Transaction>,
    ],
  })
})

app.frame('/share', (c) => {
  console.log("🚀 ~ app.frame ~ c:", c)
  const { deriveState } = c;

  const state = deriveState();

  let link = ""

  if (state.chain == "degen") {
    link = 'https://explorer.degen.tips/'
  }

  if (state.chain == "base") {
    link = 'https://basescan.org/'
  }

  if (state.chain == "arbitrium") {
    link = 'https://arbiscan.io/'
  }

  return c.res({
    action: '/',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          {state.title}
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center',
            justifyContent: "center",
          }}
        >
          {state.description}
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            textAlign: 'center',
            justifyContent: "center",
          }}
        >
          {`Reward: ${state.reward} `}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://warpcast.com/~/compose?text=Hey%2C+I+just+created+a+bounty+on+poidh%21+Check+it+out&embeds[]=https://frame-degen.poidh.xyz/api/b/${state.chain}/${c.transactionId}`}>Share</Button.Link>,
      <Button.Link href={`${link}tx/${c.transactionId}`}> Check TxN </Button.Link>,
    ],
  })
})

app.transaction('/mint', (c) => {
  const state = c.previousState;
  console.log("🚀 ~ app.transaction ~ state:", state)

  let chain = 8453
  let contract = ""
  let reward

  if (state.chain == "degen") {
    chain = 666666666
    contract = '0x2445BfFc6aB9EEc6C562f8D7EE325CddF1780814'
    reward = parseEther(state.reward + "")
  }

  if (state.chain == "base") {
    chain = 8453
    contract = '0xb502c5856F7244DccDd0264A541Cc25675353D39'
    reward = parseUnits(String(state.reward), "ether")
  }

  if (state.chain == "arbitrium") {
    chain = 42161
    contract = '0x0Aa50ce0d724cc28f8F7aF4630c32377B4d5c27d'
    reward = parseUnits(String(state.reward), "ether")
  }

  const payload = {
    abi,
    chainId: `eip155:${chain}` as any,
    functionName: state.bountyType == 'solo' ? "createSoloBounty" : "createOpenBounty",
    args: [
      state.title, state.description
    ],
    to: `${contract}` as any,
    value: `${reward}` as any
  }
  console.log("🚀 ~ app.transaction ~ payload:", payload)

  return c.contract(payload as any)
})

const convert = (rawValue: string) => {
  try {
    const result = (parseInt(rawValue) / 1000000000000000000).toString()
    console.log("🚀 ~ convert ~ result:", result)
    return result
  } catch (error) {
    console.error(error)
  }
}

app.frame('/b/:chain/:txHash', async (c) => {
  const { deriveState, req } = c;

  // get the txn hash
  const txHash = c.req.param('txHash')
  const chain = c.req.param('chain') as "sepolia" | "degen" | 'arbitrum' | "base";

  console.log("tx:", txHash)
  console.log("chain:", chain)

  let data;
  if (chain === 'degen') {
    data = await getTxnDataFromDegen(txHash)
  } else {
    data = await getTxnDataFromChain(chain)(txHash)
  }

  const { amount, title, description, bountyId } = data

  const valueResult = convert(amount || "")

  return c.res({
    action: '',
    image: (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%", textAlign: 'center' }}>
        {simpleMessage}
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            justifyContent: "center",
            width: 780,
            textAlign: 'center',
          }}
        >
          {description}
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Inter',
            display: 'flex',
            fontWeight: 400,
            fontSize: 30,
            width: 780,
            justifyContent: "center",
            textAlign: 'center'
          }}
        >
          {`Reward: ${valueResult} ${chain === 'degen' ? "$DEGEN" : "ETH"}`}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://poidh.xyz/${chain}/bounty/${bountyId}`}>Check out the bounty </Button.Link>,
    ]
  })


})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)


const getTxnDataFromDegen = async (txHash: string): Promise<{ amount: string | undefined; title: string | undefined; description: string | undefined; bountyId: string | undefined }> => {
  const dataBounty = await fetch(`https://explorer.degen.tips/api/v2/transactions/${txHash}/logs`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())

  const parameters = dataBounty.items[0].decoded.parameters

  const bountyId: string | undefined = parameters.find((key: any) => key.name === 'id')?.value
  const title: string | undefined = parameters.find((key: any) => key.name === 'name')?.value
  const description: string | undefined = parameters.find((key: any) => key.name === 'description')?.value
  const amount: string | undefined = parameters.find((key: any) => key.name === 'amount')?.value
  return { amount, title, description, bountyId }
}

const getTxnDataFromChain = (chain: "sepolia" | "degen" | 'arbitrum' | "base") => async (txHash: string) => {

  const currChainConfig = chains[chain]

  const data = await getTransactionReceipt(
    currChainConfig.jsonProviderUrl,
    txHash
  );

  const { amount, title, description, bountyId } = data
  return { amount, title, description, bountyId, config: currChainConfig }
};