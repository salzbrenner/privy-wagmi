import '../styles/globals.css';

import type {AppProps} from 'next/app';
import { configureChains} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

import {PrivyProvider} from '@privy-io/react-auth';
import {PrivyWagmiConnector} from '@privy-io/wagmi-connector';
import { Testing } from 'components/Testing';
import { customChain } from 'lib/customChain';


const configureChainsConfig = configureChains([ customChain], [publicProvider()]);

export default function App({Component, pageProps}: AppProps) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        embeddedWallets: {
          createOnLogin: 'all-users',
          requireUserPasswordOnCreate: false,
        },
        defaultChain: customChain,
        supportedChains: [customChain],
        loginMethods: ['sms', 'google', 'twitter', 'apple'],
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <Testing />
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
