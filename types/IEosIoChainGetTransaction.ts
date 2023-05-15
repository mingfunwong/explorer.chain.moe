export interface IEosIoChainGetTransaction {
  block_num: number
  block_time: string
  head_block_num: number
  id: string
  irreversible: boolean
  last_irreversible_block: number
  traces: IEosIoChainGetTransactionTrace[]
  transaction_num: number
  trx: IEosIoChainGetTransactionTrx
}

export interface IEosIoChainGetTransactionTrace {
  account_ram_deltas: any[]
  act: IEosIoChainGetTransactionAct
  action_ordinal: number
  block_num: number
  block_time: string
  closest_unnotified_ancestor_action_ordinal: number
  context_free: boolean
  creator_action_ordinal: number
  elapsed: number
  producer_block_id: string
  receipt: IEosIoChainGetTransactionReceipt
  receiver: string
  trx_id: string
}

export interface IEosIoChainGetTransactionAct {
  account: string
  authorization: IEosIoChainGetTransactionAuthorization[]
  data: IEosIoChainGetTransactionData
  hex_data: string
  name: string
}

export interface IEosIoChainGetTransactionAuthorization {
  actor: string
  permission: string
}

export interface IEosIoChainGetTransactionData {
  owner?: string
  memo?: string
  quantity?: string
  to?: string
  from?: string
}

export interface IEosIoChainGetTransactionReceipt {
  abi_sequence: number
  act_digest: string
  auth_sequence: [string, number][]
  code_sequence: number
  global_sequence: number
  receiver: string
  recv_sequence: number
}

export interface IEosIoChainGetTransactionTrx {
  receipt: IEosIoChainGetTransactionReceipt2
  trx: IEosIoChainGetTransactionTrx3
}

export interface IEosIoChainGetTransactionReceipt2 {
  cpu_usage_us: number
  net_usage_words: number
  status: string
  trx: [number, IEosIoChainGetTransactionTrx2]
}

export interface IEosIoChainGetTransactionTrx2 {
  compression: string
  packed_context_free_data: string
  packed_trx: string
  signatures: string[]
}

export interface IEosIoChainGetTransactionTrx3 {
  actions: IEosIoChainGetTransactionAction[]
  context_free_actions: any[]
  context_free_data: any[]
  delay_sec: number
  expiration: string
  max_cpu_usage_ms: number
  max_net_usage_words: number
  ref_block_num: number
  ref_block_prefix: number
  signatures: string[]
}

export interface IEosIoChainGetTransactionAction {
  account: string
  authorization: IEosIoChainGetTransactionAuthorization2[]
  data: IEosIoChainGetTransactionData2
  hex_data: string
  name: string
}

export interface IEosIoChainGetTransactionAuthorization2 {
  actor: string
  permission: string
}

export interface IEosIoChainGetTransactionData2 {
  owner: string
}
