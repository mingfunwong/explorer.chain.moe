export interface IProducerStatus {
  rows: any[];
  rows2: IBpStatusRows2[];
  head_block_num: number;
  head_block_time: string;
  head_block_producer: string;
  bp_status_refresh_time: string;
  start_time: string;
}

export interface IBpStatusRows2 {
  bpname: string;
  number: number;
  date: any;
}
