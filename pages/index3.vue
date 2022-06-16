<!-- <!-- <template>
  <button @click="asyncData">
    Show message from backend
  </button>
</template>

<script>
// import {axios} from '@nuxt/axios'
// import app from './././app.js'
import $axios from '@nuxtjs/axios'

// export default {

// }
export default {
   name: 'IndexPage',

  methods: {
    async showMessageFromBackend () {
      try {
        console.log(this)
        // const response = await this.$axios.get('/api/test')
        // console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    },

  async asyncData({ $axios, $config }) {
    console.log($axios)
//     const mountains = await $axios.$get(`/welcome`)
//     return { mountains }
  }
  }
}

</script> -->


<template>
  <div>
    <h1>Mountaiins</h1>
    <ul v-for="mountain in mountains" :key="mountain.slug">
      <li>{{ mountain.title }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, $config }) {
    console.log($axios,$config)
    const mountains = await $axios.$get(`/api/mountains`,{headers: {"Access-Control-Allow-Origin": "*"}})
    return { mountains }
  }
}
</script> -->
