<!-- filename: todos.vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" type="checkbox" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TodoItem',
  computed: {
    todos () {
      return this.$store.state?.todos?.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style> -->



<template>
  <ul class="mt-1 relative rounded-md shadow-sm p-3">
     <li class=" inset-x-0 top-0 flex items-center">
       <div class="mt-1 flex rounded-md shadow-sm">
                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> // TODO: </span>
       <input @keyup.enter="addTodo" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="What needs to be done">
       </div>
      <!-- <input @keyup.enter="addTodo" placeholder="What needs to be done?"> -->
      </li>
    <li v-for="todo in todos" :key="todo.id">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <input @click="removeTodo" @change="remove(todo)" type="button" value="x" class="border rounded-md bg-red-600 px-2 hover:bg-orange-600">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>



  </ul>
</template>

<script>
import { mapMutations } from 'vuex'


export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      // e.target.value = ''
    },
    removeTodo (e) {
      this.$store.commit('todos/remove', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
