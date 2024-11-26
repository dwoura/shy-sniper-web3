import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, bsc, sepolia } from 'wagmi/chains';
import { w3mConnectors, w3mProvider } from '@web3modal/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import App from './App';
import './index.css';

// 配置 WalletConnect
const projectId = 'YOUR_WALLET_CONNECT_PROJECT_ID'; // 请替换为你的 WalletConnect ProjectId

const { chains, publicClient } = configureChains(
  [mainnet, bsc, sepolia],
  [w3mProvider({ projectId })]
);

const metadata = {
  name: 'Shy-Sniper',
  description: 'Web3 狙击工具',
  url: 'https://your-website.com', // 替换为你的网站
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'system-ui, sans-serif',
    '--w3m-accent-color': '#3b82f6',
  },
  metadata,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </StrictMode>,
);