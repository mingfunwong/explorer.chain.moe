import { Chain } from "@/types/chain"

export const enumivoMainnet = new Chain({
  name: "Enumivo",
  netType: "Mainnet",
  logo: "/logos/enu.png",
  symbol: "ENU",
  endpoints: ["https://idc.blockeden.cn:444"],
  slug: "enu",
  bindPath: ["enu"],
  contract: "enumivo",
})
