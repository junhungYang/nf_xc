<template>
  <div id="app">
      <router-view/>
      <audio id="audio" src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/mp3/music.mp3" loop autoplay ></audio>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
       var audio = document.getElementById('audio');  
       audio.play()
    document.addEventListener("WeixinJSBridgeReady", function () {
          audio.play()
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {  
        audio.play();  
    }, false);  
  }
}
</script>

<style>
#app {
    height: 100vh;
    overflow: hidden;
}
</style>
