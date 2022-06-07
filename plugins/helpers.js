import Vue from 'vue'
Vue.mixin({
  methods: {
    testMethod (val) {
      console.log(val)
      // app.$log.info(val)
    }
  }
})
