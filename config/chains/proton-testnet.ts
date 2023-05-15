import { Chain } from "@/types/chain"

export const protonTestnet = new Chain({
  name: "Proton",
  netType: "Testnet",
  logo: "/logos/proton.png",
  symbol: "XPR",
  endpoints: ["https://testnet-rpc.api.protondex.com"],
  slug: "proton-test",
  bindPath: ["proton-test"],
})
