import { Chain } from "@/types/chain"

export const waxMainnet = new Chain({
  name: "WAX",
  netType: "Mainnet",
  logo: "/logos/wax.svg",
  symbol: "WAX",
  endpoints: ["https://wax.greymass.com"],
  slug: "wax",
  bindPath: ["wax"],
})
