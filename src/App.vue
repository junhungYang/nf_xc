<template>
  <div id="app">
      <router-view/>
      <audio src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/mp3/music.mp3" loop autoplay ></audio>
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
