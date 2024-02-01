import { useWallets } from "@privy-io/react-auth"
import { customChain } from "lib/customChain"
import { useCallback } from "react"

export function Testing() {
    const getSigner = useGetEmbeddedSigner(customChain.id)

  const onClick = async () => {
    const signer = await getSigner()
    if (!signer) {
        return
    }
    console.log('signer', signer)
    signer.getGasPrice()
}
    return (
        <button onClick={onClick}>click me</button>

    )
}
function useGetEmbeddedSigner(chainId: number) {
    const embeddedWallet = useEmbeddedWallet()
  
    // always get the embedded signer on the correct chain
    const getSigner = useCallback(async () => {
        if (!embeddedWallet) {
            return
        }
        await embeddedWallet?.switchChain(chainId)
        const provider = await embeddedWallet.getEthersProvider()
        console.log(provider.connection, await provider.getNetwork())
        return provider.getSigner()
    }, [chainId, embeddedWallet])
  
    return getSigner
  }
  
  
  export function useEmbeddedWallet() {
    const { wallets } = useWallets()
    return wallets.find((wallet) => wallet.walletClientType === 'privy')
  }
  
  