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
        <prize-result v-show="resultShowFlag" :res="res"></prize-result>
    </div>
</template>
<script>
import prizeResult from '@/components/prizeResult.vue'
export default {
    data() {
        return {
            getPrizeFlag: true,
            resultShowFlag: false,
            res: -1
        }
    },
    methods: {
        getPrize() {
            // 到时用户是否可以抽奖由后台返回的结果进行判断，每个用户只可抽一次
            if(this.getPrizeFlag) {
                this.getPrizeFlag = false;
                this.resultShowFlag = true;
                // 发送请求获取结果
                this.res = Math.random()
            }else {
                console('你已经抽过奖')
            }
        },
        navToCompany() {
            this.$router.push('/company')
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
    background: url('../assets/img/collect_bg.jpg');
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
    header {
        position: absolute;
        top: -1.5rem;
        width: 100%;
        height: 1.68rem;
        background: url('../assets/img/collect_topCloud.png');
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
        background: url('../assets/img/collect.png');
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
        background: url('../assets/img/collect_bottomCloud.png');
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
            background: url('../assets/img/getRes.png');
            background-size: cover;
        }
        button:last-of-type {
            background: url('../assets/img/companyIntroduct.png');
            background-size: cover;
        }
    }
    @keyframes opa {
        100% {
            opacity: 1;
        }
    }
}
</style>
