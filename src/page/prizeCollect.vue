<template>
    <div class="prize-collect">
        <header></header>
        <div class="collect">
        </div>
        <footer>
        </footer>
        <div class="btn-group">
            <button @click="getPrize">收下祝福</button>
            <button @click="navToCompany">企业简介</button>
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
           background-repeat: no-repeat;
    background-position: 50% 50%;
    header {
        height: 1.68rem;
        background: url('../assets/img/collect_topCloud.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
    .collect {
        height: 4.02rem;
        width: 3.47rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        // bordeR: 1px solid #fff;
        background: url('../assets/img/collect.png');
        background-size: contain;
        background-repeat: no-repeat;
    }
    footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.99rem;
        background: url('../assets/img/collect_bottomCloud.png');
         background-size: contain;
                background-repeat: no-repeat;
        background-position: 50% 50%;
    }
    .btn-group {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.4rem;
        left: 0;
        bottom: 0.6rem;
        display: flex;
        height: 0.3rem;
        button {
            border: 1px solid #fff;
            color: #fff;
            margin: 0 0.20rem;
            width: 0.60rem;
            flex: 1;
            justify-content: space-between;
        }
    }
}
</style>
