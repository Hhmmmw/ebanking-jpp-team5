export const state = () => ({
  userId: null,
  token: null,
  authedUser:{
    _id:null,
    email:null,
    firstName:null,
    lastName:null,
    activated:null,
    loggedOut:null,
    isAdmin:null,
    token:null,
    accounts:[
      {
        _id: null,
        email:null,
        balance: null

      }
    ]
  },
  accounts:[]
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
    state.authedUser = {accounts:[],...data}
  },
  saveAccounts(state,data){
    // if(state.authedUser.accounts?.length===0){state.authedUser.accounts=[]}
    state.accounts=[...data]

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

