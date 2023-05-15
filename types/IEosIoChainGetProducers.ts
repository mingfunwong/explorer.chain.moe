export interface IEosIoChainGetProducers {
  owner: string;
  total_votes: string;
  producer_key: string;
  is_active: number;
  url: string;
  unpaid_blocks: number;
  last_claim_time: any;
  location: number;
}
