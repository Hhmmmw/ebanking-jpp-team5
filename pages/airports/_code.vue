<template>
  <div class="container mx-auto my-5">
    <h1 class="text-2xl leading-7 font-semibold">This is the Airport Detail Page</h1>
    <p>This page contains the specific information about the <strong>{{ airport.abbreviation }}</strong> airport.</p>
  </div>
</template>

<script>
import airports from '~/data/airports.js'
export default {
    asyncData (context) {
      const airport = airports.filter(airport => airport.abbreviation === context.route.params.code.toUpperCase())[0]

      return {
        airport
      }
    },
    // layout: 'AirportDetail',
    head() {
      return {
      title: `${this.airport.name} Information | Aiport App`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Detailed information about the ${this.airport.name} (${this.airport.abbreviation}) airport.`
          }
        ]
      }
    }
  }
</script>