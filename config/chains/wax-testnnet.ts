import { Chain } from "@/types/chain"

export const waxTestnet = new Chain({
  name: "WAX",
  netType: "Testnet",
  logo: "/logos/wax.svg",
  symbol: "WAX",
  endpoints: ["https://waxtestnet.greymass.com"],
  slug: "wax-testnet",
  bindPath: ["wax-testnet"],
})
