<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Account</h2>

      </div>
      <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="ammount" class="sr-only">ammount</label>
            <input id="ammout" name="ammount" type="number" autocomplete="off" step="any" min="1" :max="balance"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="ammount" v-model="account.balance">
          </div>

        </div>

        <!-- <div class="flex items-center justify-between">

      </div> -->

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
            Create an Account with initial deposite
          </button>


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
  name: 'CreateAccount',
  data () {
    return {
      account: {
        balance: 1
      }
    }
  },
  computed: {
    balance () {
      return 10000//this.$store.state.todos.list
    },

  },
  methods: {
    async handleSubmit () {
      console.log(this.user)
      await this.$axios.post('/createAccount', {
        email: this.$store.state.session.authedUser.email,
        balance: this.account.balance,
        token: this.$store.state.session.token
      }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4001/login',
          'Authorization': `Bearer ${this.$store.state.session.token}`

        }
      }
      )
        .then((response) => {
          console.log(response);
          this.$store.commit('session/saveAccount', response.data)
          this.$router.push('/welcomeUser')
        })
        .catch(async (error) => {
          console.log(error);
        })

    }
  },
  // async mounted () {
  //   l(['/signin: mounted:'])
  //   if (this.$store.state.session.token) {
  //     l(['/signin: mounted: TOKEN existed'])

  //     await this.$axios.post('/authed', {
  //       headers: {
  //         'Access-Control-Allow-Origin': 'http://localhost:4001/login',
  //         'Authorization': `Bearer ${this.$store.state.session.token}`
  //       }
  //     }).then((response) => {
  //       if (response.statusText === 'OK') {
  //         l(['/signin: mounted: ', response])

  //         l(['/signin: mounted: authed'])
  //         this.$router.push('/welcomeUser')
  //         if (response.data._id) {
  //           this.$store.commit('session/save', { userId: response.data._id, token: response.data.token })

  //         }
  //       }
  //     }).catch((error) => {
  //       l(['/signin: mounted: catch', error])
  //     })
  //   } else {
  //     l(['/signin: mounted: token is not existed'])
  //   }
  // }
   async mounted () {
                // this.$store.commit('session/clearAll')

    l(['/welcomeUser: mounted',this.$store])
    if (this.$store.state.session.token) {
      l(['/welcomeUser: mounted: token is defined'])
      await this.$axios.post('/authed', { token: this.$store.state.session.token }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4001/welcomeUser',
          'Authorization': `Bearer ${this.$store.state.session.token}`
        }
      }).then((response) => {
        if (response.statusText === 'OK') {
          l(['/welcomeUser: mounted: authed', response])
          if (response.data._id) {
            this.$store.commit('session/save', { userId: response.data._id, token: response.data.token })
            this.$store.commit('session/saveAuthedUser',response.data)
          }
        }
        // else{
        //   this.$router.push('/signin')
        //   this.$store.commit('session/clear')
        // }
      }).catch((error) => {
        l(['/welcomeUser: mounted: catch',error])

        this.$router.push('/signin')
        this.$store.commit('session/clear')
        this.$store.commit('loggedUser/clear')
      })
    } else {
      l(['/welcomeUser: mounted: token is not defined'])
      this.$router.push('/signin')

    }
  }
}
</script>


