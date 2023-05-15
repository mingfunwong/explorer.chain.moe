export interface IEosIoChainGetAccount {
  account_name: string;
  head_block_num: number;
  head_block_time: string;
  privileged: boolean;
  last_code_update: string;
  created: string;
  ram_quota: number;
  net_weight: number;
  cpu_weight: number;
  net_limit: IAccountNetLimit;
  cpu_limit: IAccountCpuLimit;
  ram_usage: number;
  permissions: Permission[];
  total_resources: IAccountTotalResources;
  self_delegated_bandwidth: IAccountSelfDelegatedBandwidth;
  refund_request: any;
  voter_info: IAccountVoterInfo;
}

export interface IAccountNetLimit {
  used: number;
  available: number;
  max: number;
}

export interface IAccountCpuLimit {
  used: number;
  available: number;
  max: number;
}

export interface Permission {
  perm_name: string;
  parent: string;
  required_auth: IAccountRequiredAuth;
}

export interface IAccountRequiredAuth {
  threshold: number;
  keys: IAccountKey[];
  accounts: any[];
  waits: any[];
}

export interface IAccountKey {
  key: string;
  weight: number;
}

export interface IAccountTotalResources {
  owner: string;
  net_weight: string;
  cpu_weight: string;
  ram_bytes: number;
}

export interface IAccountSelfDelegatedBandwidth {
  from: string;
  to: string;
  net_weight: string;
  cpu_weight: string;
}

export interface IAccountVoterInfo {
  owner: string;
  proxy: string;
  producers: any[];
  staked: number;
  last_vote_weight: string;
  proxied_vote_weight: string;
  is_proxy: number;
}
