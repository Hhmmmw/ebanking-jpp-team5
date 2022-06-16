// export const state = () => ({
//   todos: [
//     {
//       todo: 'join matlab club 1',
//       done: false
//     },
//     {
//       todo: 'join matlab club 2',
//       done: false
//     },
//     {
//       todo: 'join matlab club 3',
//       done: false
//     },
//     {
//       todo: 'join matlab club 4',
//       done: false
//     },
//     {
//       todo: 'join matlab club 5',
//       done: false
//     }
//   ],
//   mutations: {
//     add: (state, { text }) =>{
//       state.todos.push({
//         text,
//         done: false
//       })
//     },
//     remove: (state, { todo }) => {
//       state.todos.splice(state.todos.indexOf(todo), 1)
//     },
//     toggle: (state, { todo }) => {
//       todo.done = !todo.done
//     }
//   }
//   // todos: {
//   //   namespaced: true,
//   //   state: () => ({
//   //     list: [
//   //       {
//   //         text: 'join matlab club',
//   //         done: false
//   //       },
//   //       {
//   //         text: 'join matlab club',
//   //         done: false
//   //       },
//   //       {
//   //         text: 'join matlab club',
//   //         done: false
//   //       },
//   //       {
//   //         text: 'join matlab club',
//   //         done: false
//   //       },
//   //       {
//   //         text: 'join matlab club',
//   //         done: false
//   //       }
//   //     ]
//   //   }),
//   //   mutations: {
//   //     add (state, { text }) {
//   //       state.list.push({
//   //         text,
//   //         done: false
//   //       })
//   //     },
//   //     remove (state, { todo }) {
//   //       state.list.splice(state.list.indexOf(todo), 1)
//   //     },
//   //     toggle (state, { todo }) {
//   //       todo.done = !todo.done
//   //     }
//   //   }
//   // }
// })

// // export const mutations = {
// //   ADD_TASK (state, task) {
// //     state.tasks = [{ content: task, done: false }, ...state.tasks]
// //   },

// //   REMOVE_TASK (state, task) {
// //     state.tasks.splice(state.tasks.indexOf(task), 1)
// //   },

// //   TOGGLE_TASK (state, task) {
// //     task.done = !task.done
// //   }
// // }

export const state = () => ({
  counter: 0
})

export const getter = {
  getCounter(state) {
    return state.counter
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  async fetchCounter(state) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}
// import VuexPersistence from 'vuex-persist'

// export const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

// export const plugins =[vuexLocal.plugin]




// new Vuex.Store({
//   state: () => ({
//     counter: 0
//   }),
//   mutations: {
//     increment(state) {
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
//         add(state, { text }) {
//           state.list.push({
//             text,
//             done: false
//           })
//         },
//         remove(state, { todo }) {
//           state.list.splice(state.list.indexOf(todo), 1)
//         },
//         toggle(state, { todo }) {
//           todo.done = !todo.done
//         }
//       }
//     }
//   }
// })
