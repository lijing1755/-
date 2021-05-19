
const channel = {
  state: {
    channel_summary: {},
    trade_config_form: {},
    rank_config_form: {}
  },

  mutations: {
    CHANNEL_SUMMARY: (state, channel_summary) => {
      state.channel_summary = channel_summary
    },
    TRADE_CONFIG_FORM: (state, trade_config_form) => {
      state.trade_config_form = trade_config_form
    },
    RANK_CONFIG_FORM: (state, rank_config_form) => {
      state.rank_config_form = rank_config_form
    }
  },

  actions: {

  }
}

export default channel
