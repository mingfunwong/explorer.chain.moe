import { Chain } from "@/types/chain"

export const eosMainnet = new Chain({
  name: "EOS",
  netType: "Mainnet",
  logo: "/logos/eos.png",
  symbol: "EOS",
  endpoints: ["https://eos.greymass.com"],
  slug: "eos",
  bindPath: ["eos"],
})
