import { Chain } from "@/types/chain"

import { enumivoMainnet } from "./enumivo-mainnet"
import { eosMainnet } from "./eos-mainnet"
import { eosTestJungle4 } from "./eos-testnet-jungle4"
import { fibosMainnet } from "./fibos-mainnet"
import { fioMainnet } from "./fio-mainnet"
import { fioTestnet } from "./fio-testnet"
import { forceMainnet } from "./force-mainnet"
import { libreMainnet } from "./libre-mainnet"
import { privateOwnnet } from "./private-ownnet"
import { protonMainnet } from "./proton-mainnet"
import { protonTestnet } from "./proton-testnet"
import { telosMainnet } from "./telos-mainnet"
import { telosTestnet } from "./telos-testnet"
import { waxMainnet } from "./wax-mainnet"
import { waxTestnet } from "./wax-testnnet"

export const publicChians: Chain[] = [
  eosMainnet,
  eosTestJungle4,
  fibosMainnet,
  fioMainnet,
  fioTestnet,
  protonMainnet,
  protonTestnet,
  forceMainnet,
  libreMainnet,
  telosMainnet,
  telosTestnet,
  waxMainnet,
  waxTestnet,
  enumivoMainnet,
]
export const privateChians: Chain[] = [privateOwnnet]
export const chians: Chain[] = [...publicChians, ...privateChians]

export const defultChain = eosMainnet
