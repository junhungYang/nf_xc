<template>
    <div class="home">
           <!-- <audio id="Audio" style="position:absolute;z-index:99" src="../static/newMsg.mp3" controls autoplay></audio> -->
        <div class="bg">
            <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/bg.jpg" class="behind">
            <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/top_cloud.png" class="top-cloud">
            <img class="bottom-cloud" src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/bottom_cloud.png">
        </div>
        <div class="content">
            <img class="bigText" :src="coverUrl" alt="" srcset="">
            <img class="whiteText" src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/home_whiteText.png" alt="">
        </div>
        <div class="btn">
            <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/home_btn.png" alt="">
        </div>
        <div class="mask" @click="navToSlider"></div>
        <!-- <div class="ruleBtn" @click="ruleStatusManage(true)">
            <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/ruleBtn.png" alt="">
        </div>
        <transition name="rule">
            <div class="ruleIntroduce" v-show="ruleStatus">
                <div class="rule-bg">
                    <div class="close" @click="ruleStatusManage(false)"></div>
                </div>
            </div>
        </transition> -->
    </div>
</template>
<script>
import {Req_getIndexCover} from '@/request/request'
export default {
    data() {
        return {
            coverUrl: '',
            ruleStatus: false
        }
    },
    created() {
        window.JSSDK()
        Req_getIndexCover().then(res => {
            if(res.data.code === 0) {
                this.coverUrl = res.data.data
            } 
        })
    },
    mounted() {

    },
    methods: {
        navToSlider() {
            this.$router.push('/slider')
        },
        ruleStatusManage(type) {
            this.ruleStatus = type
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    position: relative;
    .bg {
        height: 100%;
        position: relative;
        .bottom-cloud {
            position: absolute;
            left: 0;
            width: 100%;
            bottom: -1.08rem;
            animation: bottomCloud 0.5s ease-out forwards;
        }
        @keyframes bottomCloud {
            100% {
                bottom: 0;
            }
        }
        .top-cloud {
            position: absolute;
            left: 0;
            top: -2.17rem;
            width: 100%;
            animation: topCloud 0.6s ease-out forwards;
        }
        @keyframes topCloud {
            100% {
                top: 0;
            }
        }
        .behind {
            width: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .content {
        position: absolute;
        width: 350px;
        height: 422px;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        opacity: 0;
        animation: content .5s linear .4s forwards;
        .bigText {
            width: 100%;
        }
        .whiteText {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 5px;
            transform: translateX(-100%);
            animation: whiteTextAni .8s ease-in .5s forwards;
            @keyframes whiteTextAni {
                50% {
                    transform: translateX(5%)
                }
                 75% {
                    transform: translateX(-5%)
                }
                100% {
                    transform: translateX(0)
                }
            }
        }
    }
    @media screen and (max-width: 321px) {
        .content {
            width: 320px;
        }
    }
    @media screen and (min-height: 811px) and (max-width: 415px) {
        // iphone X
        .content {
            position: absolute;
             width: 3.5rem;
            height: 4.22rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-65%);
            opacity: 0;
            animation: content .5s linear .4s forwards;
            .bigText {
                width: 100%;
            }
        }
    }
    @media screen and (max-height: 745px) {
        // 普通
        .content {
            position: absolute;
            width: 3.5rem;
            height: 4.22rem;
            left: 50%;
            top: 42%;
            transform: translate(-50%,-50%);
            opacity: 0;
            animation: content .5s linear .4s forwards;
            .bigText {
                width: 100%;
            }
        }
    }
    @media screen and (min-height: 870px) and (min-width: 700px) {
        // ipad类
        .content {
            position: absolute;
            width: 440px;
            height: 530px;
            left: 50%;
            top: 37%;
            transform: translate(-50%,-50%);
            opacity: 0;
            animation: content .5s linear .4s forwards;
            .bigText {
                width: 100%;
            }

        }
    }
    @keyframes content {
        100% {
            opacity: 1;
        }
    }
    .btn {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0.7rem;
        animation: btnAnimate 0.8s linear forwards infinite;
        @keyframes btnAnimate {
            25% {
                bottom: 0.67rem;
                left: 50.5%
            }
            50% {
                bottom: 0.65rem;
                left: 50%
            }
            75% {
                bottom: 0.67rem;
                left: 49.5%;
            }
            100% {
                bottom: 0.7rem;
                left: 50%;
            }
        }
        img {
            width: 2.28rem;
            height: 0.30rem;
        }
    }
    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .ruleBtn {
        width: 1rem;
        height: 0.7rem;
        // border: 1px solid red;
        position: absolute;
        right: 0;
        top: 0;
        img {
            margin: 0 0.15rem;
            margin-top: 0.1rem;
            width: 0.7rem;
            height: 0.39rem;
        }
    }
    .ruleIntroduce {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        .rule-bg {
            width: 287px;
            height: 441px;
            position: absolute;
            left: 51%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/rule_bg.png');
            background-size: cover;
            background-repeat: no-repeat;
            .close {
                width: 30px;
                height: 30px;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
    .rule-enter,.rule-leave-to {
        opacity: 0;
    }
    .rule-enter-to,.rule-leave {
        opacity: 1;
    }
    .rule-enter-active,.rule-leave-active {
        transition: all .4s linear;
    }
}

</style>
