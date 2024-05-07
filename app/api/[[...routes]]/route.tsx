/** @jsxImportSource frog/jsx */

// import { fonts } from '@/app/fonts/fonts'
import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { createSystem } from 'frog/ui'
import { abi } from "../../abi"

type State = {
  title: string
  description: string
  type: string
  reward: number
  bountyType: string
}

const app = new Frog<{ State: State }>({
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    title: "",
    description: "",
    type: "",
    reward: 0,
    bountyType: ""
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
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
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
    backgroundImage: `url("https://phoidh-frame.vercel.app//bg-poidh.png")`,
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
    backgroundImage: `url("https://phoidh-frame.vercel.app//logo-poidh.png")`,
  }}
  >
  </div>
</div >

app.frame('/', (c) => {
  return c.res({
    action: '/bountytitle',
    image: "https://phoidh-frame.vercel.app//screen-1.png",
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

app.frame('/bountyreward', (c) => {
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
          specify the reward amount you are offering in DEGEN (please note, the poidh smart contract will deduct a 2.5% fee for all completed bounties)
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your $DEGEN..." />,
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
      previousState.reward = parseInt(inputText);
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
  const { deriveState } = c;

  const state = deriveState();

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
            textAlign: 'center'
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
            textAlign: 'center'
          }}
        >
          {`Reward: ${state.reward} `}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://warpcast.com/~/compose?text=Hey%2C%20I%20just%20created%20a%20bounty%20on%20poidh%21
      !&embeds[]=https://phoidh-frame.vercel.app//api//bounty/${c.transactionId}`}>Share</Button.Link>,
      <Button.Link href={`https://explorer.degen.tips/tx/${c.transactionId}`}> Check TxN </Button.Link>,
    ],
  })
})

app.transaction('/mint', (c) => {
  const state = c.previousState;

  return c.contract({
    abi,
    chainId: 'eip155:666666666',
    functionName: state.type == 'solo' ? "createSoloBounty" : "createOpenBounty",
    args: [
      state.title, state.description
    ],
    to: '0x2445BfFc6aB9EEc6C562f8D7EE325CddF1780814',
    value: parseEther(state.reward + "")
  })
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

app.frame('/bounty/:txHash', async (c) => {
  const { deriveState, req } = c;

  // get the txn hash
  const txHash = c.req.param('txHash')
  console.log("🚀 ~ app.frame ~ txHash:", txHash)

  // get data from txn hash

  const data = await fetch(`https://explorer.degen.tips/api/v2/transactions/${txHash}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())

  console.log({ data: data.decoded_input.parameters })
  const title = data.decoded_input.parameters.find((gayatri: any) => gayatri.name === 'name').value
  const description = data.decoded_input.parameters.find((gayatri: any) => gayatri.name === 'description').value

  const valueResult = convert(data.value)

  // const title = data: data.decoded_input.parameters

  return c.res({
    action: '',
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
          {title}
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
            textAlign: 'center'
          }}
        >
          {`Reward: $DEGEN ${valueResult}`}
        </div>
      </div>
    )
  })
})

// commit

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
