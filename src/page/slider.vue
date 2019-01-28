<template>
   <div class="slider">
       <div class="bg">
           <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_bg.jpg" alt="" srcset="">
       </div>
       <header>
           <div class="wrap">
                   <img class="stick" src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/stick.png" alt="">
                    <img class="banner" src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/banner.png" alt="">
           </div>
       </header>
       <div class="slider-wrap">
           <slider :callback="getScroll">
                <div class="slider-item" v-for="item in list">
                    <img class="slider-pic" :src="item" alt="">
                </div>
           </slider>
       </div>
       <footer></footer>
        <div v-if="btnStatus === 1" class="lottery-btn" @click="goToRain">
            <p class="can">开始抽奖</p>
       </div>
       <div v-if="btnStatus === 0" class="lottery-btn">
           <p class="cant">开始抽奖({{scrollIndex}})</p>
       </div>
       <rain v-if="rainStatus"></rain>
    </div> 
</template>
<script>
import slider from '@/components/slider/slider.vue'
import rain from '@/components/rain.vue'
export default {
    data() {
        return {
            list: ['https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/poster1.jpg','https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/poster1.jpg','https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/poster1.jpg'],
            scrollIndex: 0,
            btnStatus: 0,
            rainStatus: false
        }
    },
    created() {
        this.scrollIndex = this.list.length
        this.timer = setInterval(() => {
            if(this.scrollIndex > 0) {
                this.scrollIndex --
                if(this.scrollIndex === 0) {
                    clearInterval(this.timer)
                    this.btnStatus = 1
                }
            }
        },1550)
    },
    methods: {
        goToRain() {
            this.rainStatus = true
        },
        getScroll(scroll) {
            // this.scrollIndex = this.list.length - scroll.currentPage.pageX + 1
            // if((this.list.length === scroll.currentPage.pageX) && this.btnStatus === 0) {
            //     this.btnStatus = 1
            // }
        }
    },
    components: {
        slider,
        rain
    }
}
</script>

<style lang="less" scoped>
.slider {
    // overflow: hidden;
    height: 100%;
    position: relative;
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
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_top.png');
        height: 0.78rem;
        background-size: 100%;
        background-repeat: no-repeat;
        animation: headerAni .3s linear forwards;
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
                animation: toRight .8s ease-out .3s forwards;
            }
            @keyframes toRight {
                100% {
                    left: 0;
                }
            }
        }
    }
    .slider-wrap {
        width: 300px;
        height: 400px;
        position: absolute;
        top: 0.95rem;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 0 0.2rem rgba(0,0,0,0.8);
        // border:1px solid #fff;
        overflow: hidden;
    }
    @media screen and (min-width: 700px){
        .slider-wrap {
            width: 400px;
            height: 533px;
        }
    }
    @media screen and (max-width: 321px){
        .slider-wrap {
            width: 280px;
            height: 373px;
        }
    }
    .lottery-btn {
        position: absolute;
        width: 1.3rem;
        left: 50%;
        bottom: 0.44rem;
        transform: translateX(-50%);
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/lotteryWait_btn.png');
        height: 0.38rem;
        background-size: cover;
        p {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.14rem;
            top: 0.10rem;
            white-space: nowrap;
        }
        .cant {
            color: #ffa086
        }
        .can {
            color: #ffea97;
        }
    }
    footer {
        position: absolute;
        width:100%;
        left: 0;
        bottom: -0.74rem;
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_bottom.png');
        background-size: cover;
        height: 1.05rem;
        animation: footerAni .3s linear forwards;
        @keyframes footerAni {
            100% {
                bottom: 0;
            }
        }
    }
}
</style>

