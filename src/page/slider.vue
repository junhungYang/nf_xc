<template>
  <div class="slider">
    <!-- <div class="bg">
           <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_bg.jpg" alt="" srcset="">
    </div>-->
    <header>
      <div class="wrap"></div>
    </header>
    <footer></footer>
    <div class="margin-wrap">
      <div class="slider-wrap">
        <slider :callback="getScroll">
          <div class="slider-item" v-for="item in list">
            <img class="slider-pic" :src="item" alt>
          </div>
        </slider>
      </div>
      <div class="mask"></div>
    </div>
    <div v-if="btnStatus === 1" class="lottery-btn can-btn" @click="goToRain">
      <p class="can">开始抽奖</p>
    </div>
    <div v-else class="lottery-btn cant-btn">
      <p class="cant">开始抽奖({{scrollIndex}})</p>
    </div>
    <rain v-if="rainStatus"></rain>
  </div>
</template>
<script>
import slider from "@/components/slider/slider.vue";
import rain from "@/components/rain.vue";
export default {
  data() {
    return {
      list: [
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/ShiDai_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/LianBang_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/YuanHang_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/WanKe_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/ShiShan_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HongYu_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/LingNan_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/GongJia_Slider_1.jpg",
        "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/NanZhuang_Slider_1.jpg"
      ],
      scrollIndex: 9,
      btnStatus: 0,
      rainStatus: false
    };
  },
  created() {
    window.JSSDK();
    this.timer = setInterval(() => {
        if (this.scrollIndex === 1) {
            this.btnStatus = 1;
        }
        this.scrollIndex--;
    }, 2200);

  },
  methods: {
    goToRain() {
      this.rainStatus = true;
    },
    getScroll(scroll) {}
  },
  components: {
    slider,
    rain
  }
};
</script>

<style lang="less" scoped>
.slider {
  overflow: hidden;
  height: 100%;
  position: relative;
  background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_bg.jpg");
  background-size: cover;
  background-position: 50% 50%;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      height: 100%;
    }
  }
  header {
    position: absolute;
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
    .wrap {
      position: absolute;
      left: 50%;
      top: 0.18rem;
      width: 3.42rem;
      transform: translateX(-50%);
      height: 0.65rem;
      overflow: hidden;
      position: relative;
      .stick {
        width: 0.16rem;
        position: absolute;
        left: -0.01rem;
        top: 0;
        z-index: 1;
      }
      .banner {
        position: absolute;
        width: 3.42rem;
        top: 0;
        left: -3.42rem;
        animation: toRight 0.8s ease-out 0.3s forwards;
      }
      @keyframes toRight {
        100% {
          left: 0;
        }
      }
    }
  }
  .margin-wrap {
    padding-top: 0.4rem;
    position: relative;

    .slider-wrap {
      width: 3.5rem;
      height: 4.66rem;
      margin: 0 auto;
      box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.8);
      // border:1px solid #fff;
      overflow: hidden;
      .slider-item {
        width: 100%;
        height: 100%;
        .slider-pic {
          width: 100%;
          height: 100%;
        }
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  @media screen and (min-height: 870px) and (min-width: 700px) {
    .margin-wrap {
      .slider-wrap {
        width: 2.4rem;
        height: 3.2rem;
      }
    }
  }
  footer {
    position: absolute;
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
  .lottery-btn {
    position: absolute;
    width: 1.3rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 0.38rem;
    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.14rem;
      top: 0.1rem;
      white-space: nowrap;
    }
    .cant {
      color: #ffa086;
    }
    .can {
      color: #ffea97;
    }
  }
    @media screen and (min-height: 811px) and (max-width: 415px) {
        .lottery-btn {
            bottom: 0.20rem;
        }
 
        // iphone X
    }
  @media screen and(min-height: 870px) and (min-width: 700px) {
    .lottery-btn {
      width: 1.09rem;
      height: 0.32rem;
      p {
        top: 0.08rem;
      }
    }
  }
  .can-btn {
    background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/lottery_btn.png");
    background-size: cover;
  }
  .cant-btn {
    background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/lotteryWait_btn.png");
    background-size: cover;
  }
}
</style>

