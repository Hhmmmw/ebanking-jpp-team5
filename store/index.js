export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
// actions: {
//     nuxtServerInit ({ commit }, { req }) {
//       if (req.session.user) {
//         commit('user', req.session.user)
//       }
//     }
//   }

// export const state = () => ({
//   counter: 0
// })

// export const mutations = {
//   increment (state) {
//     state.counter++
//   }
// }
