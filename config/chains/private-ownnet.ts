import { Chain } from "@/types/chain"

export const privateOwnnet = new Chain({
  name: "localhost:8888",
  netType: "",
  symbol: "EOS",
  logo: "/logos/eos.png",
  endpoints: ["http://localhost:8888"],
  slug: "localhost",
  bindPath: ["localhost"],
})
