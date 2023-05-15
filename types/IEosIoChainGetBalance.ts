export interface IEosIoChainGetBalance {
  balance: string | { contract: string; quantity: string }
}
