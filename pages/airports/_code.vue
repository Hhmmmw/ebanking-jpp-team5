<template>
  <div class="container mx-auto my-5">
    <h1 class="text-2xl leading-7 font-semibold">This is the Airport Detail Page</h1>
    <p>This page contains the specific information about the <strong>{{ airport.abbreviation }}</strong> airport.</p>
  </div>
</template>

<script>
import airports from '~/data/airports.js'

export default {
  name: 'AirportDetailPage',
  asyncData ({ route }) {
    const airport = airports.filter(airport => airport.abbreviation === route.params.code.toUpperCase())[0]

    return {
      airport
    }
  }
}
</script>