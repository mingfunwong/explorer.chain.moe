import { Chain } from "@/types/chain"

export const telosMainnet = new Chain({
  name: "Telos",
  netType: "Mainnet",
  symbol: "TLOS",
  logo: "/logos/telos.png",
  endpoints: ["https://telos.greymass.com"],
  slug: "telos",
  bindPath: ["telos"],
})
