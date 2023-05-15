import { Chain } from "@/types/chain"

export const libreMainnet = new Chain({
  name: "Libre",
  netType: "Mainnet",
  logo: "/logos/fio.png",
  symbol: "LIBRE",
  endpoints: ["https://libre.greymass.com"],
  slug: "libre",
  bindPath: ["libre"],
})
