import { Chain } from "@/types/chain"

export const fibosMainnet = new Chain({
  name: "FIBOS",
  netType: "Mainnet",
  logo: "/logos/fibos.png",
  symbol: "FO",
  endpoints: ["https://rpc-mainnet.fibos123.com"],
  slug: "fo",
  bindPath: ["fo"],
})
