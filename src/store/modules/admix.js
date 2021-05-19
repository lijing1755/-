const admix = {
  state: {
    signupTime: null
  },

  mutations: {
    SET_START_TIME: (state, time) => {
      console.log(123)
      console.log(time)
      state.signupTime = time
    }
  },

  actions: {
    
  }
}

export default admix
