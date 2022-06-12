// import { Store } from 'vuex'
// import mapp from '~/api/hello'

// const a = new Store({
//   state: () => ({
//     counter: 0
//   }),
//   mutations: {
//     increment (state) {
//       state.counter++
//     }
//   },
//   modules: {
//     todos: {
//       namespaced: true,
//       state: () => ({
//         list: []
//       }),
//       mutations: {
//         add (state, { text }) {
//           state.list.push({
//             text,
//             done: false
//           })
//         },
//         remove (state, { todo }) {
//           state.list.splice(state.list.indexOf(todo), 1)
//         },
//         toggle (state, { todo }) {
//           todo.done = !todo.done
//         }
//       }
//     }
//   }
// })

// console.log('example ', a)
// // app.$log.info(a)

// export default {
//   increment (state) {
//     state.counter++
//   }
// }

// export const state = () => ({
//   list: []
// })

// export const mutations = {
//   add (state, text) {
//     state.list.push({
//       text,
//       done: false
//     })
//   },
//   remove (state, { todo }) {
//     state.list.splice(state.list.indexOf(todo), 1)
//   },
//   toggle (state, todo) {
//     todo.done = !todo.done
//   }
// }

// export default () => ({
//   counter: 0,
//   todos: {
//     list: [
//       {
//         text: 'join matlab club',
//         done: false
//       }
//     ]
//   },
//   mutations: {
//     add (state, { text }) {
//       state.list.push({
//         text,
//         done: false
//       })
//     },
//     remove (state, { todo }) {
//       state.list.splice(state.list.indexOf(todo), 1)
//     },
//     toggle (state, { todo }) {
//       todo.done = !todo.done
//     }
//   }
// })

// import { Store } from 'vuex'

// export default () => ({
//   state: () => ({
//     counter: 0,
//     todos: {
//       list: [
//         {
//           text: 'join matlab club',
//           done: false
//         },
//         {
//           text: 'join matlab club',
//           done: false
//         },
//         {
//           text: 'join matlab club',
//           done: false
//         },
//         {
//           text: 'join matlab club',
//           done: false
//         },
//         {
//           text: 'join matlab club',
//           done: false
//         }
//       ]
//     }
//   }),
//   mutations: {
//     increment (state) {
//       state.counter++
//     },
//     add (state, { text }) {
//       state.list.push({
//         text,
//         done: false
//       })
//     },
//     remove (state, { todo }) {
//       state.list.splice(state.list.indexOf(todo), 1)
//     },
//     toggle (state, { todo }) {
//       todo.done = !todo.done
//     }
//   },
//   modules: {
//     todos: {
//       namespaced: true,
//       state: () => ({
//         list: [
//           {
//             text: 'join matlab club',
//             done: false
//           },
//           {
//             text: 'join matlab club',
//             done: false
//           },
//           {
//             text: 'join matlab club',
//             done: false
//           },
//           {
//             text: 'join matlab club',
//             done: false
//           },
//           {
//             text: 'join matlab club',
//             done: false
//           }
//         ]
//       }),
//       mutations: {
//         add (state, { text }) {
//           state.list.push({
//             text,
//             done: false
//           })
//         },
//         remove (state, { todo }) {
//           state.list.splice(state.list.indexOf(todo), 1)
//         },
//         toggle (state, { todo }) {
//           todo.done = !todo.done
//         }
//       }
//     }
//   }
// })
