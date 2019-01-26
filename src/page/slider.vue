<template>
   <div class="slider">
       <div class="bg">
           <img src="../assets/img/slider_bg.jpg" alt="" srcset="">
       </div>
       <header>
           <div class="wrap">
                   <img class="stick" src="../assets/img/stick.png" alt="">
                    <img class="banner" src="../assets/img/banner.png" alt="">
           </div>
       </header>
       <div class="slider-wrap">
           <slider :callback="getScroll">
                <div class="slider-item" v-for="item in list">
                    <p>{{item}}</p>
                    <!-- <img class="slider-pic" :src="item.imageUrl" alt=""> -->
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
            list: [1,2,3,4,5],
            scrollIndex: 0,
            btnStatus: 0,
            rainStatus: false
        }
    },
    created() {
        this.scrollIndex = this.list.length
    },
    methods: {
        goToRain() {
            this.rainStatus = true
        },
        getScroll(scroll) {
            this.scrollIndex = this.list.length - scroll.currentPage.pageX + 1
            if((this.list.length === scroll.currentPage.pageX) && this.btnStatus === 0) {
                this.btnStatus = 1
            }
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
        background: url('../assets/img/slider_top.png');
        height: 0.78rem;
        background-size: cover;
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
        width: 3rem;
        height: 4rem;
        position: absolute;
        top: 0.95rem;
        left: 50%;
        transform: translateX(-50%);
        border:1px solid #fff;
    }
    .lottery-btn {
        position: absolute;
        width: 1.3rem;
        left: 50%;
        bottom: 0.44rem;
        transform: translateX(-50%);
        background: url('../assets/img/lotteryWait_btn.png');
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
        background: url('../assets/img/slider_bottom.png');
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

