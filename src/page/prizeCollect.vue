<template>
    <div class="prize-collect">
        <header></header>
        <div class="collect"></div>
        <footer>
        </footer>
        <div class="btn-group">
            <button @click="getPrize"></button>
            <button @click="navToCompany"></button>
        </div>
        <prize-result @close="closeRes" v-if="resultShowFlag" :res="res"></prize-result>
        <div  class="getted" v-if="gettedPrize">您已领取过奖品了</div>
    </div>
</template>
<script>
import prizeResult from '@/components/prizeResult.vue'
import {Req_receiveGift} from '@/request/request'
export default {
    data() {
        return {
            getPrizeFlag: true,
            resultShowFlag: false,
            res: null,
            gettedPrize: false
        }
    },
    beforeRouteEnter (to, from, next) {
        if(document.cookie.includes(';')) {
  
            let arr = document.cookie.split('; ')
            let flag = false
            arr.forEach(item => {
                if(item.split('=')[0] === 'openId' && item.split('=')[1]) {
                    window.USER_OPENID = item.split('=')[1]
                    flag = true
                }
            })
            flag ? next() : next(false)
        }else {
            let arr = document.cookie.split('=')
            if(arr[0] !== 'openId'|| !arr[1]) {
                next(false)
            }else {
                window.USER_OPENID = arr[1]
                next()
            }
        }
    },
    methods: {
        getPrize() {
            Req_receiveGift({
                openId: window.USER_OPENID
            }).then(res => {
                if(res.data.code === 0) {
                    this.resultShowFlag = true
                    this.res = res.data.data
                }else if(res.data.code === -1) {
                    this.gettedPrize = true
                    setTimeout(() => this.gettedPrize = false,1250)
                }
            })
        },
        navToCompany() {
            this.$router.push('/company')
        },
        closeRes() {
            this.resultShowFlag = false
        }
    },
    components: {
        'prize-result': prizeResult
    }
}
</script>

<style lang="less" scoped>
.prize-collect {
    height: 100vh;
    background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/collect_bg.jpg');
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
    header {
        position: absolute;
        top: -1.5rem;
        width: 100%;
        height: 1.68rem;
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/collect_topCloud.png');
        background-size: cover;
        animation: topCloud .4s linear forwards;
        @keyframes topCloud {
            100% {
                top: 0
            }
        }
    }
    .collect {
        height: 383px;
        width: 283px;
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%,-50%);
        opacity: 0;
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/collect.png');
        background-size: cover;
             animation: opa .4s linear forwards;
    }
    @media screen and (min-width: 700px) {
        .collect {
                    height: 540px;
         width: 400px;
        }
    }
    footer {
        position: absolute;
        left: 0;
        bottom: -1.09rem;
        width: 100%;
        height: 0.99rem;
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/collect_bottomCloud.png');
         background-size: cover;
        animation: bottomCloud .4s linear forwards;
        @keyframes bottomCloud {
            100% {
                bottom: 0;
            }
        } 
        
    }
    .btn-group {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        // padding: 0 0.4rem;
        left: 0;
        bottom: 0.6rem;
        display: flex;
        height: 0.38rem;
        opacity: 0;
        animation: opa .4s linear forwards;
        justify-content: space-around;
        button {
            margin: 0 0.20rem;
            width: 1.30rem;
            height: 0.38rem;
        }
        button:first-of-type {
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/getRes.png');
            background-size: cover;
        }
        button:last-of-type {
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/companyIntroduct.png');
            background-size: cover;
        }
    }
    .getted {
        position: absolute;
        padding: 10px 15px;
        border-radius: 5px;
        background: rgba(0,0,0,0.8);
        font-size: 13px;
        color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        opacity: 0;
        animation: gettedOpa 1.2s linear forwards;
        @keyframes gettedOpa {
            25% {
                opacity: 1;
            }
            75% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    }

    @keyframes opa {
        100% {
            opacity: 1;
        }
    }
}
</style>
