import { EndPointStatus } from "../enums"
import {
  IEosIoChainGetGlobal,
  IEosIoChainGetProducerJson,
  IEosIoChainGetProducers,
  IPoints,
  IProducer,
} from "../types"

export const getStaked = (totalVotes: number): number => {
  if (totalVotes === 0) return 0
  const e: number = Date.now() / 1000 - 946684800
  const s: number = Math.floor(e / 604800) / 52
  const r: number = totalVotes / 2 ** s / 10000
  return Math.round(r)
}

export const getClaimRewards = (
  producer: IEosIoChainGetProducers,
  global: IEosIoChainGetGlobal,
  rank: number
) => {
  if (!global.perblock_bucket) {
    return {
      claimRewardsTotal: 0,
      claimRewardsUnreceived: 0,
    }
  }
  const block_pay =
    (global.perblock_bucket * producer.unpaid_blocks) /
    global.total_unpaid_blocks /
    10000
  const vote_pay =
    (global.pervote_bucket * parseInt(producer.total_votes)) /
    parseInt(global.total_producer_vote_weight) /
    10000
  const multiple = 1
  const block_pay_fix = rank <= 21 ? 320 * multiple : block_pay
  const total =
    block_pay_fix + vote_pay >= 100 * multiple ? block_pay_fix + vote_pay : 0
  const next_claim_time =
    (1 * producer.last_claim_time) / 1000 + 24 * 60 * 60 * 1000
  const unreceived = next_claim_time > Date.now() ? 0 : total
  return {
    claimRewardsTotal: Math.round(total),
    claimRewardsUnreceived: Math.round(unreceived),
  }
}

export const getProducers = (
  producers: IEosIoChainGetProducers[],
  producerJson: IEosIoChainGetProducerJson[] | undefined,
  global: IEosIoChainGetGlobal
): IProducer[] => {
  const bpList: IProducer[] = producers.map((producer, index) => {
    const owner = producer.owner
    const staked = getStaked(parseInt(producer.total_votes))
    const { claimRewardsTotal, claimRewardsUnreceived } = getClaimRewards(
      producer,
      global,
      index + 1
    )
    const weight_percent =
      (parseInt(producer.total_votes) /
        parseInt(global.total_producer_vote_weight)) *
      100
    let urlFull = ""
    let urlSimple = ""
    let candidate_name = ""
    let logo = ""
    let json

    try {
      const url = new URL(producer.url).origin
      if (url) {
        urlFull = producer.url
        urlSimple = url
      }
    } catch (error) {}

    if (producerJson && producerJson.length) {
      const jsonFile = producerJson.find((x) => x.owner === owner)
      if (jsonFile) {
        try {
          json = JSON.parse(jsonFile.json)
          candidate_name = json.org?.candidate_name
          logo = json.org?.branding?.logo_256 || ""
          if (logo && logo.substring(0, 8) === "https://") {
            logo = logo
          }
        } catch (error) {}
      }
    }

    const item: IProducer = {
      owner,
      candidate_name,
      logo,
      staked,
      claimRewardsTotal,
      claimRewardsUnreceived,
      weight_percent,
      urlFull,
      urlSimple,
      json,
      producer,
    }

    return item
  })
  return bpList
}

export class PointersStatus {
  private point = "/v1/chain/get_info"
  public points: IPoints[] = []

  async run(producerJson: IEosIoChainGetProducerJson[]) {
    this.points = producerJson.map((item) => {
      const owner = item.owner
      let api_endpoint = ""
      let ssl_endpoint = ""
      let p2p_endpoint = ""
      let json = []
      let status = EndPointStatus.waiting

      try {
        json = JSON.parse(item.json)
      } catch (error) {}

      const nodes = json.nodes || []
      const full = nodes.find((x: { ssl_endpoint: any }) => x.ssl_endpoint)
      const seed = nodes.find((x: { p2p_endpoint: any }) => x.p2p_endpoint)

      if (full && full.ssl_endpoint.substring(0, 8) === "https://") {
        api_endpoint = full.api_endpoint ? full.api_endpoint : ""
        ssl_endpoint = full.ssl_endpoint
      } else {
        status = EndPointStatus.notSet
      }

      if (seed) {
        p2p_endpoint = seed.p2p_endpoint
      }

      const bp: IPoints = {
        owner,
        api_endpoint,
        ssl_endpoint,
        p2p_endpoint,
        number: 0,
        version: "",
        status,
      }

      return bp
    })

    this.points
      .filter((item) => item.status === EndPointStatus.waiting)
      .forEach(async (item) => {
        try {
          const url = item.ssl_endpoint + this.point
          const response = await fetch(url)
          const data = await response.json()

          item.number = data.head_block_num || 0
          item.version = data.server_version_string || ""
          if (item.number) {
            item.status = EndPointStatus.success
          } else {
            item.status = EndPointStatus.fail
          }
        } catch (error) {
          item.status = EndPointStatus.fail
        }
        this.points = this.points.sort((x, y) => x.owner.localeCompare(y.owner))
        this.points = this.points.sort((x, y) => y.status - x.status)
        this.points = this.points.sort((x, y) =>
          x.version.localeCompare(y.version)
        )
        this.points = this.points.sort((x, y) => y.number - x.number)
      })
  }
}
