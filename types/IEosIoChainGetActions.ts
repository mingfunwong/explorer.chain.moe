export interface IEosIoChainGetActions {
  actions: IEosIoChainGetActionsAction[]
  head_block_num: number
  last_irreversible_block: number
}

export interface IEosIoChainGetActionsAction {
  account_action_seq: number
  action_trace: IEosIoChainGetActionsActionTrace
  block_num: number
  block_time: string
  global_action_seq: number
  irreversible: boolean
}

export interface IEosIoChainGetActionsActionTrace {
  account_ram_deltas: any[]
  act: IEosIoChainGetActionsAct
  action_ordinal: number
  block_num: number
  block_time: string
  closest_unnotified_ancestor_action_ordinal: number
  context_free: boolean
  creator_action_ordinal: number
  elapsed: number
  producer_block_id: string
  receipt: IEosIoChainGetActionsReceipt
  receiver: string
  trx_id: string
}

export interface IEosIoChainGetActionsAct {
  account: string
  authorization: IEosIoChainGetActionsAuthorization[]
  data: IEosIoChainGetActionsData
  hex_data: string
  name: string
}

export interface IEosIoChainGetActionsAuthorization {
  actor: string
  permission: string
}

export interface IEosIoChainGetActionsData {
  from: string
  memo: string
  quantity: string
  to: string
}

export interface IEosIoChainGetActionsReceipt {
  abi_sequence: number
  act_digest: string
  auth_sequence: [string, number][]
  code_sequence: number
  global_sequence: number
  receiver: string
  recv_sequence: number
}
