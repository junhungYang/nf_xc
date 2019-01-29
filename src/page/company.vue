<template>
  <div class="company">
    <div class="content">
      <img class="comBanner" src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/company_header.png" alt>
      <div class="comList">
        <button @click="getActive('ShiDai')"></button>
        <button @click="getActive('LianBang')"></button>
        <button @click="getActive('YuanHang')"></button>
        <button @click="getActive('WanKe')"></button>
        <button @click="getActive('ShiShan')"></button>
        <button @click="getActive('HongYu')"></button>
        <button @click="getActive('LingNan')"></button>
        <button @click="getActive('GongJia')"></button>
        <button @click="getActive('NanZhuang')"></button>
      </div>
    </div>
    <header></header>
    <footer></footer>
    <div class="back" @click="navBack"></div>
    <div v-show="detailStatus" class="comDetail">
      <img v-for="item in activeList" :src="item" alt="">
    </div>
  </div>
</template>
<script>
import imgData from '@/util/companyUtil'
export default {
  data() {
    return {
      activeList: [],
      detailStatus: false,
      imgData:imgData
    }
  },
  created() {
     window.JSSDK()
  },
  methods: {
    navBack() {
      if(this.detailStatus) {
        this.detailStatus = false
      }else {
         this.$router.go(-1)
      }
    },
    getActive(type) {
      this.detailStatus = true
      this.activeList = this.imgData[type].list
    }
  }
}
</script>
<style lang="less" scoped>
.company {
  height: 100vh;
  position: relative;
  background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/company_bg.jpg");
  background-size: cover;
  background-position: 50% 50%;
  header {
    position: fixed;
    left: 0;
    top: -0.78rem;
    width: 100%;
    background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_top.png");
    height: 0.78rem;
    background-size: 100%;
    background-repeat: no-repeat;
    animation: headerAni 0.3s linear forwards;
    @keyframes headerAni {
      100% {
        top: 0;
      }
    }
  }
  footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: -0.74rem;
    background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_bottom.png");
    background-size: cover;
    height: 1.05rem;
    animation: footerAni 0.3s linear forwards;
    @keyframes footerAni {
      100% {
        bottom: 0;
      }
    }
  }
  .back {
    width: 0.29rem;
    height: 0.38rem;
    background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/backToCollect.png");
    background-size: cover;
    position: absolute;
    right: 0.20rem;
    bottom: 0.56rem;
    z-index: 5;
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow-y: scroll;
    animation: opa .4s linear forwards;
    @keyframes opa {
        100% {
            opacity: 1;
        }
    }
    .comBanner {
      position: absolute;
      top: 0.75rem;
      width: 100%;
      left: 0;
    }
    .comList {
      width: 100%;
      height: 4.22rem;
      background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/company_list.png");
      background-size: cover;
      position: absolute;
      left: 0;
      top: 1.5rem;
      margin-bottom: 0.5rem;
      button {
        height: 0.41rem;
        width: 100%;
      }
      button:first-of-type {
        height: 0.46rem;
      }
      button:nth-of-type(2) {
        height: 0.41rem;
      }
      button:nth-of-type(3) {
        height: 0.44rem;
      }
      button:nth-of-type(4) {
        height: 0.44rem;
      }
      button:nth-of-type(5) {
        height: 0.44rem;
      }
      button:nth-of-type(6) {
        height: 0.45rem;
      }
      button:nth-of-type(7) {
        height: 0.45rem;
      }
      button:nth-of-type(8) {
        height: 0.44rem;
      }
      button:nth-of-type(9) {
        height: 0.44rem;
      }
    }
  }
  .comDetail {
    background: #fff;
    height: 100vh;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    overflow-y: scroll;
    font-size: 0;
    img {
      width: 100%;
    }
  }
}
</style>

