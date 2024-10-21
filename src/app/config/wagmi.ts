import { coinbaseWallet, injected } from 'wagmi/connectors';
import { createConfig, http } from 'wagmi';

import { baseSepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
	chains: [baseSepolia],
	// multiInjectedProviderDiscovery: false,
	connectors: [
		coinbaseWallet({
			appName: 'Template',
			preference: 'all', // set this to `all` to use EOAs as well
			version: '4',
		}),
		injected(),
	],
	ssr: true,
	transports: {
		[baseSepolia.id]: http(),
	},
});
