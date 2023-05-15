import { Chain } from "@/types/chain"

export const eosTestJungle4 = new Chain({
  name: "EOS",
  netType: "Testnet",
  logo: "/logos/eos.png",
  symbol: "EOS",
  endpoints: ["https://jungle4.greymass.com"],
  slug: "eos-jungle4",
  bindPath: ["eos-jungle4"],
})
