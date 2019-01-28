<template>
    <transition name="opa">
        <div class="prizeResult">
            <div class="moneyPrize" v-if="res.giftType === 1">
                <div class="img-wrap">
                    <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/moneyRes.png" @click="close">
                    <p>获得{{res.money}}元现金红包</p>
                </div>
 
            </div>
            <div class="goodPrize" v-if="res.giftType === 2">
                <div class="topCloud"></div>
                <transition name="cont">
                    <div class="cont-wrap" v-show="contShowStatus">
                        <div class="cont">
                            <img :src="res.coverUrl" alt="">
                            <div class="congratulate">
                                <p>恭喜您!</p>
                                <p>获得由{{res.sponsor}}送出的</p>
                                <p>{{res.giftName}}一个</p>
                            </div>
                            <div class="memoire">
                                <p>礼品已存入个人账户，</p>
                                <p>请填写个人、地址信息领取实物奖品</p>
                            </div>
                        </div>
                        <i @click="close('good')"></i>
                    </div>
                </transition>
                <transition name="cont">
                    <div class="input-info" v-show="inputShowStatus">
                        <div class="input-wrap">
                            <dl class="row">
                                <dt>领奖人姓名</dt>
                                <dd>
                                    <input v-if="!infoUploadStatus" v-model="name"  placeholder="请输入领奖人的真实姓名" type="text">
                                    <input v-else type="text" readonly v-model="name">
                                </dd>
                            </dl>
                            <dl class="row">
                                <dt>联系方式</dt>
                                <dd>
                                    <input v-if="!infoUploadStatus" v-model="phone" placeholder="请输入领奖人的联系方式" type="text">
                                    <input v-else type="text" readonly v-model="phone">
                                </dd>
                            </dl>
                            <dl class="row">
                                <dt>常活动区域</dt>
                                <dd @click="showPlaceList">
                                    {{place}}
                                </dd>
                            </dl>
                            <dl class="row">
                                <dt>详细地址</dt>
                                <dd>
                                    <input  v-if="!infoUploadStatus" v-model="placeDetail" placeholder="请输入领奖人的详细地址" type="text">
                                    <input v-else type="text" readonly v-model="placeDetail">
                                </dd>
                            </dl>
                            <div class="warn" v-if="!infoUploadStatus">
                                <p>请认真填写和再次确定领奖人信息</p>
                                <p>提交信息后无法更改</p>
                            </div>
                        </div>
                        <i @click="closeInfoInput"></i>
                    </div>
                </transition>
                <footer>
                    <p v-if="contShowStatus" @click="navToInputInfo">{{infoUploadStatus ? '查看领取信息' : '点击填写领取信息'}}</p>
                    <div v-if="inputShowStatus&&!infoUploadStatus" class="inputBtn">
                        <button class="confirm" @click="sendInfo"></button>
                        <button class="cancel" @click="closeInfoInput"></button>
                    </div>
                </footer>
            </div>
            <show-modal v-if="modalShowStatus" :Store_showModal="modalInfo"></show-modal>
            <place-picker :placeShowList="placeShowList"  v-if="placeShowList" @closePlaceScroll="closePlaceScroll" @getPlace="getPlace"></place-picker>
            <div class="warnModal" v-show="warnStatus">{{warnText}}</div>
        </div>
    </transition>
</template>
<script>
import placePicker from './placePicker/placePicker.vue'
import showModal from './showModal.vue'
import {Req_fillInfo} from '@/request/request'
export default {
    props: {
        res:{
            type: Object,
            default:{},
        }
    },
    data() {
        return {
            contShowStatus: false,
            inputShowStatus: false,
            name: '',
            phone: '',
            place: '点击选择活动区域',
            placeDetail: '',
            placeShowList: false,
            modalShowStatus: false,
            modalInfo: {},
                     warnText: '',
            warnStatus: false,
            infoUploadStatus: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.contShowStatus = true
        },300)
    },
    methods: {
        close(type) {
            if(type === 'good' && !this.infoUploadStatus) {
                this.modalInfo = {
                    title: '温馨提示',
                    content: '您还没提交奖品领取信息，退出奖无法领取礼品',
                    successBtn: '退出',
                    cancelCB: () => this.modalShowStatus = false,
                    successCB: () => this.$emit('close')
                }
                this.modalShowStatus = true;
            }else {
                this.$emit('close')
            }
        },
        navToInputInfo() {
            this.contShowStatus = false
            setTimeout(() => {
                this.inputShowStatus = true
            },350)
        },
        showPlaceList() {
            if(!this.infoUploadStatus) {
                this.placeShowList = true
            }
        },
        getPlace(place) {
            this.place = place
            this.placeShowList = false
        },
        closePlaceScroll() {
            this.placeShowList = false
        },
        closeInfoInput() {
            this.inputShowStatus= false
            setTimeout(() => this.contShowStatus = true,400)
        },
        sendInfo() {
            setTimeout(() => {
                if(!this.name) {
                    this.warnText = '请输入领奖人姓名'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false , 1300)
                    return
                }
                if(!this.phone) {
                    this.warnText = '请输入领奖人手机号码'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false , 1300)
                    return
                }
                if(this.place === '点击选择活动区域' || !this.place) {
                    this.warnText = '请选择常活动区域'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false , 1300)
                    return
                }
                if(!this.placeDetail) {
                    this.warnText = '请输入详细地址'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false , 1300)
                    return
                }
                Req_fillInfo({
                    trueName: this.name,
                    mobile: this.phone,
                    address: this.place + this.placeDetail
                }).then(res => {
                    if(res.data.code === 0) {
                        this.warnText = '提交成功'
                        this.warnStatus = true
                        this.infoUploadStatus = true
                        this.inputShowStatus = false
                        setTimeout(() => this.contShowStatus = true,400)
                        setTimeout(() => this.warnStatus = false, 1300)
                    }else if(res.data.code === -1) {
                        this.warnStatus = true
                        this.warnText = res.data.msg
                        setTimeout(() => this.warnStatus = false, 1300)
                    }
                })
            },250)
        }
    },
    components: {
        'place-picker': placePicker,
        'show-modal': showModal
    }
}
</script>
<style lang="less" scoped>
.prizeResult {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    .moneyPrize {
        height: 100%;
        background: rgba(255,255,255,0.8);
        position: relative;
        .img-wrap {
            position: absolute;
            left: 50%;
            top: 0%;
            transform: translate(-50%,-50%);
            animation: moneyRes .6s ease-out  .3s forwards;
            @keyframes moneyRes {
                50% {
                    top: 55%
                }
                75% {
                    top: 45%
                }
                100% {
                    top: 50%
                }
            }
            img {
                width: 2.03rem;
            }
            p {
                position: absolute;
                left: 50%;
                top: 0.68rem;
                transform: translateX(-50%);
                font-size: 0.13rem;
                color: #fff;
                white-space: nowrap;
            }
        }
    }
    .goodPrize {
        height: 100%;
        background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_bg.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        .topCloud {
            width: 100%;
            height: 0.68rem;
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/slider_top.png');
            background-size: cover;
        }
        .cont-wrap {
            position: absolute;
            left: 50%;
            top: 0.25rem;
            bottom: 110px;
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/prize_bg.png');
            width: 375px;
            background-size: 375px;
            background-repeat: no-repeat;
            transform: translateX(-50%) translateY(0);
            i {
                display: block;
                width: 15px;
                height: 15px;
                background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/close.png');
                background-size: cover;
                position: absolute;
                left: 45px;
                top: 10px;
            }
            .cont {
                width: 280px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                opacity: 0;
                animation: contOpa .4s linear .5s forwards;
                @keyframes contOpa {
                    100% {
                        opacity: 1;
                    }
                }
                img {
                    display: block;
                    width: 200px;
                    height: 200px;
                    border: 1px solid red;
                }
                .congratulate {
                    margin-top: 20px;
                    p {
                        font-size: 16px;
                        line-height: 30px;
                         color: #cdb793;
                         text-align: center;
                    }
                }
                .memoire {
                    margin-top: 20px;
                    width: 200px;
                    padding: 15px  30px;
                    text-align: center;
                    background: #fce6a8;
                    border-radius: 8px;
                    p {
                        font-size: 12px;
                        color: #bea172;
                        line-height: 30px;
                    }
                }
                @media screen and (max-width: 374px) {
                    img {
                        width: 180px;
                        height: 180px;
                    }
                    .congratulate {
                        margin-top: 15px;
                    }
                    .memoire {
                        margin-top: 15px;
                        width: 200px;
                        padding: 12px 20px;
                    }
                }
            }
        }
        .input-info {
             position: absolute;
            left: 50%;
            top: 0.25rem;
            bottom: 110px;
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/prize_bg.png');
            width: 375px;
            background-size: 375px;
            background-repeat: no-repeat;
            transform: translateX(-50%) translateY(0);
            overflow-y: scroll;
            i {
                display: block;
                width: 15px;
                height: 15px;
                background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/close.png');
                background-size: cover;
                position: absolute;
                left: 45px;
                top: 10px;
            }
            .input-wrap {
                width: 272px;
                margin: 0 auto;
                margin-top: 100px;
                .row {
                    width: 272px;
                    height: 30px;
                    margin-top: 15px;
                    border-bottom: 1px solid #fce6a8;
                    display: flex;
                    align-items: center;
                    &:first-of-type {
                        margin-top: 0;
                    }
                    dt {
                        width: 80px;
                        font-size: 13px;
                        color: #bea172;
                        border-right: 1px solid #fce6a8;
                        height: 20px;
                        line-height: 20px;
                        margin-left: 8px;
                    }
                    dd {
                        margin-left: 10px;
                        color: #bea172;
                        font-size: 13px;
                        input {
                            background: transparent;
                            font-size: 13px;
                            color: #bea172;
                        }
                        input::-webkit-input-placeholder{
                            color:#bea172;
                        }
                        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                            color:#bea172;
                        }
                        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                            color:#bea172;
                        }
                        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                            color:#bea172;
                        }
                    }
                }
                .warn {
                    margin-top: 80px;
                    width: 272px;
                    padding: 30px 0 30px 0;
                    background: #fceec6;
                    border-radius: 8px;
                    p {
                        line-height: 20px;
                        font-size: 12px;
                        color: #d94d43;
                        text-align: center;
                    }
                }
            }
        }
        footer {
            position: absolute;
            left: 50%;
            bottom: 0;
            background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/prize_bottom.png');
            width: 375px;
            height: 130px;
            background-size: cover;
            background-repeat: no-repeat;
            transform: translateX(-50%);
            p {
                font-size: 12px;
                color: #d94d43;
                text-align: center;
                position: absolute;
                text-decoration: underline;
                left: 50%;
                transform: translateX(-50%);
                bottom: 80px;
            }
            .inputBtn {
                width: 272px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                button {
                    width: 113px;
                    height: 30px;
                }
                button:first-of-type {
                    background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/confirm_btn.png');
                    background-size: cover;
                }
                button:last-of-type {
                    background: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/cancel_btn.png');
                     background-size: cover;
                }
            }
        }
    }
     .warnModal {
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
        white-space:nowrap ;
        animation: warnOpa .8s linear forwards;
        @keyframes warnOpa {
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
}
.opa-enter,.opa-leave-to {
    opacity: 0;
}
.opa-enter-to,.opa-leave {
    opacity: 1;
}

.opa-enter-active,
.opa-leave-active {
    transition: opacity .3s linear;
}
.cont-enter,.cont-leave-to {
    transform: translateX(-50%) translateY(100%)  !important;
}
.cont-enter-to,.cont-leave {
    transform: translateX(-50%) translateY(0) !important;
}

.cont-enter-active,
.cont-leave-active {
    transition: all .4s ease-in !important;
}
</style>


