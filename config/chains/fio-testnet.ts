import { Chain } from "@/types/chain"

export const fioTestnet = new Chain({
  name: "FIO",
  netType: "Testnet",
  logo: "/logos/fio.png",
  symbol: "FIO",
  endpoints: ["https://fiotestnet.greymass.com"],
  slug: "fio-test",
  bindPath: ["fio-test"],
})
