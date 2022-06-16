<template>
  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Signning you out</h2>
</template>
<script>
function l (a) {
  console.log(...a)
}
export default {
  name: 'LogoutPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },


  //    mounted(){
  //         this.$nextTick(
  //     this.check())
  //  },

  async mounted () {
    l(['/signin: mounted:'])
    if (this.$store.state.session.token) {
      l(['/signin: mounted: TOKEN existed'])

      await this.$axios.post('/logout', {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4001/login',
          'Authorization': `Bearer ${this.$store.state.session.token}`
        }
      }).then((response) => {
        if (response.statusText === 'OK') {
          l(['/signin: mounted: ',response])

          l(['/signin: mounted: authed'])

            if (response.data._id) {
          this.$store.commit('session/clear')

        }
                    this.$router.push('/signin')
        }
        // else if(response.status==401){
        // }


        // else{
        // this.$store.commit('session/clear')

        //   this.$router.push('/signin')
        //   this.$store.commit('session/clear')
        // }
      }).catch((error) => {
          l(['/signin: mounted: catch',error])


        // this.$store.commit('session/clear')
      })
    } else {
      l(['/signin: mounted: token is not existed'])
    }
  }
}
</script>
