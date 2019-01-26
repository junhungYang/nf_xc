<template>
  <div id="app">
    <!-- <transition mode="in-out" name="msg"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
    height: 100vh;
    overflow: hidden;
}
</style>
