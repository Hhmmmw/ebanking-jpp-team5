<template>
  <div>
    <Tutorial />
    <h1>{{ post.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData: async ({ $axios, params }) => {
    const post = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
    return { post }
  }
}
</script>
