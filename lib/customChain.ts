import { baseSepolia } from 'viem/chains';

import { Chain } from "viem"

const customRpcUrls: Chain['rpcUrls'] ={
    default: {
      http: [process.env.NEXT_PUBLIC_CUSTOM_RPC_HTTP_URL as string],
      webSocket: [process.env.NEXT_PUBLIC_CUSTOM_RPC_WS_URL as string]
    },
    public: {
      http: [process.env.NEXT_PUBLIC_CUSTOM_RPC_HTTP_URL as string],
      webSocket: [process.env.NEXT_PUBLIC_CUSTOM_RPC_WS_URL as string]
    }
}

export const customChain = {
...baseSepolia,
rpcUrls: customRpcUrls
}
