import { Chain } from "@/types/chain"

export const forceMainnet = new Chain({
  name: "Force",
  netType: "Mainnet",
  symbol: "EOSC",
  logo: "/logos/force.png",
  endpoints: ["https://explorer.eosforce.io"],
  slug: "force",
  bindPath: ["force"],
})
