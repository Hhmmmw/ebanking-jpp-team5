<template>
  <h1>logger is being tested...</h1>
</template>
<script>
export default {
  name: 'LoggingTest',
  asyncData ({ $log }) {
    $log.info('accessing the test.vue page')
  },
  mounted () {
    this.$log.warn('mounted warning')
  }
}
