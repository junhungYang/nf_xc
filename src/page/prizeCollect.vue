<template>
    <div class="prize-collect">
        <header></header>
        <div class="collect">
            <ul>
                <img :src="item.src" v-for="item in HB_btn_F_List" @click="getCompanyActive(item.value)"></img>
            </ul>
            <ul>
                <img :src="item.src" v-for="item in HB_btn_S_List"  @click="getCompanyActive(item.value)"></img>
            </ul>
            <ul>
                <img :src="item.src" v-for="item in HB_btn_T_List"  @click="getCompanyActive(item.value)"></img>
            </ul>
        </div>
        <footer>
        </footer>
        <div class="btn-group">
            <button @click="getPrize"></button>
            <button @click="navToCompany"></button>
        </div>
        <prize-result @close="closeRes" v-if="resultShowFlag" :res="res"></prize-result>
        <div  class="getted" v-if="gettedPrize">您已领取过奖品了</div>
        <div v-show="companyDetailStatus" class="comDetail">
            <img v-for="item in activecCompanyList" :src="item" alt="">
            <div class="closeCompany" @click="closeCompany"></div>
        </div>
    </div>
</template>
<script>
import prizeResult from '@/components/prizeResult.vue'
import {Req_receiveGift} from '@/request/request'
import companyImgData from '@/util/companyUtil'
export default {
    data() {
        return {
            getPrizeFlag: true,
            resultShowFlag: false,
            res: null,
            gettedPrize: false,
            HB_btn_F_List: [
                {
                    value: 'ShiDai',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_ShiDai_btn.png'
                },
                {
                    value: 'LianBang',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_LianBang_btn.png',
                },
                {
                    value: 'YuanHang',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_YuanHang_btn.png',
                },
            ],
            HB_btn_S_List: [
                {
                    value: 'WanKe',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_WanKe_btn.png',

                },
                {
                    value: 'ShiShan',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_ShiShan_btn.png',
                },
                {
                    value: 'HongYu',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_HongYu_btn.png',
                },
            ],
            HB_btn_T_List: [
                {
                    value: 'LingNan',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_LingNan_btn.png',
                },  
                {
                    value: 'GongJia',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_GongJia_btn.png',
                },
                {
                    value: 'NanZhuang',
                    src: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/HB_NanZhuang_btn.png',
                }
            ],
            companyImgData: companyImgData,
            companyDetailStatus: false,
            activecCompanyList: []
        }
    },
    created() {
         window.JSSDK()
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
        closeCompany() {
            this.companyDetailStatus = false
        },
        getCompanyActive(type) {
            this.companyDetailStatus = true
            this.activecCompanyList = this.companyImgData[type].list
        },
        getPrize() {
            Req_receiveGift({
                openId: window.USER_OPENIDS
            }).then(res => {
                // this.resultShowFlag = true
                // this.res =  {
                //         "giftType":3,
                //         "money":12.1,
                //         "coverUrl":"",
                //         "sponsor":"碧桂园",
                //         "giftName":"电饭煲"
                //     }
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
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        opacity: 0;
        animation: opa .4s linear forwards;
        ul {
            text-align: center;
            font-size: 0;
            img {
                width: 0.88rem;
                height: 1.16rem;
            }
        }
    }
    @media screen and (min-width: 700px) {
        .collect {
            height: 540px;
            width: 400px;
            ul {
                text-align: center;
                font-size: 0;
                white-space: nowrap;
                img {
                    width: 130px;
                    height: 171px;
                }
            }
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
        .closeCompany {
            width: 0.29rem;
            height: 0.38rem;
            background: url("https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/backToCollect.png");
            background-size: cover;
            position: fixed;
            right: 0.20rem;
            bottom: 0.56rem;
            z-index: 5;
        }
    }
    @keyframes opa {
        100% {
            opacity: 1;
        }
    }
}
</style>
