<template>
  <div :class="darkMode ? 'dark' : ''" class="dashboard" id="app">
    <!-- <side-bar /> -->
    <div  class="main-view">
      <div class="bg-white dark:bg-gray-900 border-b border-white dark:border-gray-500 w-full px-8 py-8">
        <h3 @click.prevent="darkMode =! darkMode" class="page-title text-gray-800 dark:text-white"> Dashboard </h3>
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
    padding: 28px 32px;
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
export default {
  data() {
    return {
      darkMode: false
    }
  }
}
</script>