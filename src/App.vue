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
}
  .msg-enter {
            /* 元素起点状态 */
      transform: translateY(100%)
  }

  .msg-enter-to {
      /* 元素终点状态 */
      transform: translateX(0)
  }


  /* 从有到无 */

  .msg-leave {
      /* 元素终点状态 */
      transform: translateY(0)
  }

  .msg-leave-to {
      /* 元素起点状态 */
      transform: translateY(-100%)
  }

  .msg-leave-active,
  .msg-enter-active {
      /* 过程 */
      transition: all .5s ease-out
  }

</style>
