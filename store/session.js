export const state = () => ({

})

export const mutations = {
  // read(state) {
  //   return state
  // },
  save(state, {userId,token}) {
    state.userId = userId
    state.token = token
  },
  saveAuthedUser(state,data){
    state.authedUser = {...data}
  },
  saveAuthedUser(state,data){
    state.authedUser.accounts = []
    state.authedUser.accounts.push(data)

  },

  clearAll(state){
    state=null
    state.session = null
    state.userId = null
    state.authedUser = null
    state.token = null
  },
  clear(state) {
    state.userId = null
    state.token = null
    state.authedUser = {}
  }
}

