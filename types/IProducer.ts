import { IEosIoChainGetProducers } from "./IEosIoChainGetProducers";

export interface IProducer {
  owner: string;
  candidate_name: string;
  logo: string;
  staked: number;
  claimRewardsTotal: number;
  claimRewardsUnreceived: number;
  weight_percent: number;
  urlFull: string;
  urlSimple: string;
  producer: IEosIoChainGetProducers;
  json: IProducerJson | undefined;
}

export interface IProducerJson {
  producer_account_name: string;
  org: any[];
  nodes: IProducerJsonNode[];
}

export interface IProducerJsonOrg {
  candidate_name: string;
  website: string;
  email: string;
  branding: IProducerJsonBranding;
  location: IProducerJsonLocation;
}

export interface IProducerJsonBranding {
  logo_256: string;
}

export interface IProducerJsonLocation {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface IProducerJsonNode {
  location: IProducerJsonLocation2;
  node_type: string;
  p2p_endpoint?: string;
  api_endpoint?: string;
  ssl_endpoint?: string;
  bnet_endpoint?: string;
}

export interface IProducerJsonLocation2 {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
