<!-- <template>
  <div>
    <Nuxt />
  </div>
</template> -->
<!-- <template>
  <div class="container mx-auto grid grid-cols-9 mt-5 gap-5">
    <aside class="col-span-2"> -->
      <!-- sidebar -->
      <!-- <div class="shadow-md shadow-black mt-5 border p-5 rounded">
        
      </div>
    </aside>
    <main class="col-span-7"> -->
      <!-- main content -->
      <!-- <Nuxt />
    </main>
  </div>
</template> -->
<!-- ...
... -->


<template>
  <div class="container mx-auto grid grid-cols-9 mt-5 gap-5">
    <aside>...</aside>
    <main class="col-span-7">
      <!-- main content -->
      <h1 class="text-3xl font-bold mt-5">{{ airport.name }}</h1>
      <Nuxt />
    </main>
  <div>
</template>
<!-- ...
... -->
<script>
import airports from '~/data/airports.js'

export default {
  name: 'AirportDetailPage',
  asyncData ({ route }) {
    const airport = airports.filter(airport => airport.abbreviation === route.params.code.toUpperCase())[0]

    return {
      airport
    }
  },
//   layout: 'AirportDetail'
}
</script>
<!-- 
<script>
// import airports from '~/data/airports.js'

// export default {
//   computed: {
//     airport() {
//       return airports.filter(airport => airport.abbreviation === this.$route.params.code.toUpperCase())[0]
//     }
//   }
// }
</script> -->