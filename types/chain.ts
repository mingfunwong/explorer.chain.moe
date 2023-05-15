export class Chain {
  name: string = ""
  netType: "Mainnet" | "Testnet" | "" = ""
  logo: string = ""
  symbol: string = ""
  endpoints: string[] = []
  slug: string = ""
  bindPath: string[] = []

  contract = "eosio"

  apiBpStatus = ""

  constructor(args: Partial<Chain>) {
    Object.assign(this, args)
  }

  rpcGetTableRows = () => this.endpoints[0] + "/v1/chain/get_table_rows"
  rpcGetInfo = () => this.endpoints[0] + "/v1/chain/get_info"
  rpcGetBlock = () => this.endpoints[0] + "/v1/chain/get_block"
  rpcGetAccount = () => this.endpoints[0] + "/v1/chain/get_account"
  rpcGetActions = () => this.endpoints[0] + "/v1/history/get_actions"
  rpcGetTransaction = () => this.endpoints[0] + "/v1/history/get_transaction"
}
