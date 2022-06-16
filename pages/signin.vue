<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>

      </div>
      <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address" v-model="user.email">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password" v-model="user.password">
          </div>
        </div>

        <div class="flex items-center justify-between">

        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
          <p class="mt-2 text-right text-sm text-gray-600">
            Do not Have An Account<br>
            <a href="/register" class="font-large text-xl text-indigo-600 hover:text-indigo-500"> Register Here </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

function l (a) {
  console.log(...a)
}
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    //  async check () {
    // if(this.$store.state.s/ession.userId){
    // this.$router.push('/welcomeUser')
    // }

    //  },

    async handleSubmit () {
      console.log(this.user)
      await this.$axios.post('/login', {
        email: this.user.email,
        password: this.user.password
      }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4001/login'
        }
      }
      )
        .then((response) => {
          console.log(response);
          // console.log(this.$store.state)
          this.$store.commit('session/save', response.data)
          this.$router.push('/welcomeUser')

        })
        .catch(async (error) => {
          console.log(error);
          // this.$store.commit('session/clear');
          // await this.$axios.post('/login', {
          // email: this.user.email,
          // password: this.user.password
          // },{headers:{
          // 'Access-Control-Allow-Origin': 'http://localhost:4001/login'
          // }
        }
        )
      // .then( (response)=> {
      //     console.log(response);
      //     this.$store.commit('session/save',response.data)
      //           this.$router.push('/welcomeUser')

      // })
      // .catch( (error) =>{
      //       console.log(error);
      // })
      // }
      // );


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

      await this.$axios.post('/authed', {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4001/login',
          'Authorization': `Bearer ${this.$store.state.session.token}`
        }
      }).then((response) => {
        if (response.statusText === 'OK') {
          l(['/signin: mounted: ',response])

          l(['/signin: mounted: authed'])
            this.$router.push('/welcomeUser')
            if (response.data._id) {
          this.$store.commit('session/save', { userId: response.data._id, token: response.data.token })

        }
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
