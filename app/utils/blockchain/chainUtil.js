const chainUtil = {
  votesToStaked: totalVotes => {
    if (totalVotes === 0) return 0;
    const e = Date.now() / 1000 - 946684800;
    const s = Math.floor(e / 604800) / 52;
    return (totalVotes / 2 ** s / 10000).toFixed(0);
  },

  getClaimRewards: (producer, global, rank) => {
    if (!global.perblock_bucket) {
      return {
        total: 0,
      };
    }
    const block_pay =
      (global.perblock_bucket * producer.unpaid_blocks) /
      global.total_unpaid_blocks /
      10000;
    const vote_pay =
      (global.pervote_bucket * producer.total_votes) /
      global.total_producer_vote_weight /
      10000;
    // const multiple = chain.name.substr(0, 5) === 'FIBOS' ? 10 : 1
    const multiple = 1;
    const block_pay_fix = rank <= 21 ? 320 * multiple : block_pay;
    const total =
      block_pay_fix + vote_pay >= 100 * multiple ? block_pay_fix + vote_pay : 0;
    return {
      total: total.toFixed(0),
    };
  },
};

export default chainUtil;
