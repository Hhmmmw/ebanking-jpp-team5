<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->

  <div class="min-h-full">

    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="welcomeUser" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page">Dashboard</a>
                <a href="createAccount" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page">Create Account</a>
                <!-- <a href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>

                <a href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>

                <a href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>

                <a href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a> -->
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button"
                class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: outline/bell -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="ml-3 relative">
                <div>
                  <button type="button"
                    class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="getAvatar" alt="">
                  </button>
                </div>

                <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
                <div
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <!-- Active: "bg-gray-100", Not Active: "" -->
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                    id="user-menu-item-0">Your Profile</a>

                  <!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                    id="user-menu-item-1">Settings</a> -->

                  <a href="/signout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                    id="user-menu-item-2">Sign out</a>
                </div>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button type="button"
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="md:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a href="welcomeUser" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page">Dashboard</a>
          <a href="createAccount" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page">Create Account</a>

          <!-- <a href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

          <a href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

          <a href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>

          <a href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reports</a> -->
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="getAvatar" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ getUser.firstName }} {{ getUser.lastName }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ getUser.email }}</div>
            </div>
            <button type="button"
              class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <a href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your
              Profile</a>

            <!-- <a href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Settings</a> -->

            <a href="/signout"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign
              out</a>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <!-- <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">




          </div>
        </div> -->
        <!-- <div
          class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"> -->

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Account Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Balance
                </th>
                <!-- <th scope="col" class="px-6 py-3">
                  Price
                </th> -->
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                  Sliver
                </td>
                <td class="px-6 py-4">
                  Laptop
                </td>
                <!-- <td class="px-6 py-4">
                  $2999
                </td> -->
                <td class="px-6 py-4 text-right">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                  White
                </td>
                <td class="px-6 py-4">
                  Laptop PC
                </td>
                <!-- <td class="px-6 py-4">
                  $1999
                </td> -->
                <td class="px-6 py-4 text-right">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                  Black
                </td>
                <td class="px-6 py-4">
                  Accessories
                </td>
                <!-- <td class="px-6 py-4">
                  $99
                </td> -->
                <td class="px-6 py-4 text-right">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- </div> -->

        <!-- /End replace -->
      </div>
    </main>
    <footer
      class="fixed bottom-0 h-10 bg-gray-800  min-w-full mx-auto px-4 lg:px-8 flex items-center text-white text-sm font-medium">
      <div class="rounded-xl bg-gray-900 p-1 px-4 absolute right-10 ">welcome {{ getUser._id }}</div>
    </footer>
  </div>
</template>

<script>
function l (a) {
  console.log(...a)
}
export default {
  computed: {
    getUser () {
      if (!!this.$store.state.session.authedUser) {
        return this.$store.state.session.authedUser
      }

    },
    getAvatar () {
      return `https://ui-avatars.com/api/?rounded=true&bold=true&name=${this.$store.state.session.authedUser.firstName}+${this.$store.state.session.authedUser.lastName}&background=random&color=random&size=128&formate=svg&uppercase=false`
    }
  },
  // methods: {

  //   async getAvatar () {
  //     return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  //   }
  // }

  // ,
  async mounted () {
    // this.$store.commit('session/clearAll')

    l(['/welcomeUser: mounted', this.$store])
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
            this.$store.commit('session/saveAuthedUser', response.data)
          }
        }
        // else{
        //   this.$router.push('/signin')
        //   this.$store.commit('session/clear')
        // }
      }).catch((error) => {
        l(['/welcomeUser: mounted: catch', error])

        this.$router.push('/signin')
        this.$store.commit('session/clear')
        this.$store.commit('loggedUser/clear')
      })
    } else {
      l(['/welcomeUser: mounted: token is not defined'])
      this.$router.push('/signin')

    }
    l(['/getUserAccounts: mounted', this.$store])
    if (this.$store.state.session.token) {
      l(['/welcomeUser: mounted: token is defined'])
      await this.$axios.post('/authed', { token: this.$store.state.session.token }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4001/welcomeUser',
          'Authorization': `Bearer ${this.$store.state.session.token}`
        }
      }).then((response) => {
        if (response.statusText === 'OK') {
          l(['/getUserAccounts: mounted: authed', response])
          if (response.data._id) {
            // this.$store.commit('session/save', { userId: response.data._id, token: response.data.token })
            this.$store.commit('session/saveAcounts', response.data)
          }
        }
        // else{
        //   this.$router.push('/signin')
        //   this.$store.commit('session/clear')
        // }
      }).catch((error) => {
        l(['/getUserAccounts: mounted: catch', error])

        // this.$router.push('/signin')
        // this.$store.commit('session/clear')
        // this.$store.commit('loggedUser/clear')
      })
    } else {
      l(['/welcomeUser: mounted: token is not defined'])
      this.$router.push('/signin')

    }
  }
}
</script>
