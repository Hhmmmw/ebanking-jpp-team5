export const state = () => ({
  tasks: [
    {
      content: 'join matlab club 1',
      done: false
    },
    {
      content: 'join matlab club 2',
      done: false
    },
    {
      content: 'join matlab club 3',
      done: false
    },
    {
      content: 'join matlab club 4',
      done: false
    },
    {
      content: 'join matlab club 5',
      done: false
    }
  ],
  todos: {
    namespaced: true,
    state: () => ({
      list: [
        {
          text: 'join matlab club',
          done: false
        },
        {
          text: 'join matlab club',
          done: false
        },
        {
          text: 'join matlab club',
          done: false
        },
        {
          text: 'join matlab club',
          done: false
        },
        {
          text: 'join matlab club',
          done: false
        }
      ]
    }),
    mutations: {
      add (state, { text }) {
        state.list.push({
          text,
          done: false
        })
      },
      remove (state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
      },
      toggle (state, { todo }) {
        todo.done = !todo.done
      }
    }
  }
})

export const mutations = {
  ADD_TASK (state, task) {
    state.tasks = [{ content: task, done: false }, ...state.tasks]
  },

  REMOVE_TASK (state, task) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },

  TOGGLE_TASK (state, task) {
    task.done = !task.done
  }
}
