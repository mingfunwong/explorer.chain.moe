import { Chain } from "@/types/chain"

export const fioMainnet = new Chain({
  name: "FIO",
  netType: "Mainnet",
  logo: "/logos/fio.png",
  symbol: "FIO",
  endpoints: ["https://fio.greymass.com"],
  slug: "fio",
  bindPath: ["fio"],
})
