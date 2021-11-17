<template>
  <div :class="darkMode ? 'dark' : ''" class="dashboard" id="app">
    <!-- <side-bar /> -->
    <div  class="main-view">
      <div style="border-bottom: 3px solid #24B47E" class="dark md:flex items-center justify-between bg-gray-900 w-full md:px-12 px-6 md:py-8 py-6">
        <!-- <h3 class="text-2xl font-semibold text-white"> Dashboard </h3> -->
        <img class="w-64" src="@/assets/logo.png" />
        <toggle class="text-gray-100 md:mt-0 mt-8" @input="darkMode =! darkMode" label="Toggle Dark Mode" />
      </div>
      <div class="route-view bg-gray-100 dark:bg-gray-800">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '@/assets/css/main.scss';
.dashboard {
  overflow: hidden;
  .page-title {
    font-size: 28px;
    font-weight: bold;
  }
  .route-view {
    background-color: #EAEAEA;
    @media (min-width: 425px) {
      padding: 28px 50px 300px 50px;
    }
    padding: 20px;
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import Toggle from '@/components/Toggle.vue'
export default {
  components: {
    Toggle
  },
  data() {
    return {
      darkMode: false
    }
  }
}
</script>