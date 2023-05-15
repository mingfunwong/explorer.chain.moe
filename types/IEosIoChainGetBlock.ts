export interface IEosIoChainGetBlock {
  timestamp: string
  producer: string
  confirmed: number
  previous: string
  transaction_mroot: string
  action_mroot: string
  schedule_version: number
  new_producers: any
  producer_signature: string
  transactions: IEosIoChainGetBlockTransaction[]
  id: string
  block_num: number
  ref_block_prefix: number
}

export interface IEosIoChainGetBlockTransaction {
  status: string
  cpu_usage_us: number
  net_usage_words: number
  trx: IEosIoChainGetBlockTrx
}

export interface IEosIoChainGetBlockTrx {
  id: string
  signatures: string[]
  compression: string
  packed_context_free_data: string
  context_free_data: any[]
  packed_trx: string
  transaction: IEosIoChainGetTableTransaction2
}

export interface IEosIoChainGetTableTransaction2 {
  expiration: string
  ref_block_num: number
  ref_block_prefix: number
  max_net_usage_words: number
  max_cpu_usage_ms: number
  delay_sec: number
  context_free_actions: any[]
  actions: IEosIoChainGetBlockAction[]
}

export interface IEosIoChainGetBlockAction {
  account: string
  name: string
  authorization: IEosIoChainGetBlockAuthorization[]
  data: IEosIoChainGetBlockData
  hex_data: string
}

export interface IEosIoChainGetBlockAuthorization {
  actor: string
  permission: string
}

export interface IEosIoChainGetBlockData {
  executor?: string
  nonce?: number
  miner?: string
  entry?: number
  user_name?: string
  a54?: string
  p55?: string[]
}
