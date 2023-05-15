export interface IEosIoChainGetRamMarket {
  rows: IEosIoChainGetRamMarketRow[]
  more: boolean
}

export interface IEosIoChainGetRamMarketRow {
  supply: string
  base: IEosIoChainGetRamMarketBase
  quote: IEosIoChainGetRamMarketQuote
}

export interface IEosIoChainGetRamMarketBase {
  balance: string
  weight: string
}

export interface IEosIoChainGetRamMarketQuote {
  balance: string
  weight: string
}
