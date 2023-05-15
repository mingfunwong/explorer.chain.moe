import { Chain } from "@/types/chain"

export const telosTestnet = new Chain({
  name: "Telos",
  netType: "Testnet",
  symbol: "TLOS",
  logo: "/logos/telos.png",
  endpoints: ["https://telostestnet.greymass.com"],
  slug: "telos-testnet",
  bindPath: ["telos-testnet"],
})
