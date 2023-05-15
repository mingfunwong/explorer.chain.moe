import { Chain } from "@/types/chain"

export const protonMainnet = new Chain({
  name: "Proton",
  netType: "Mainnet",
  logo: "/logos/proton.png",
  symbol: "XPR",
  endpoints: ["https://mainnet-rpc.api.protondex.com"],
  slug: "proton",
  bindPath: ["proton"],
})
