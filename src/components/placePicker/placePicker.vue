<template>
    <transition  name="place">
        <div class="placePicker">
            <div class="bg" @click="close"></div>
            <div class="picker">
                <div class="header">
                    <p>{{activePro}} {{activeCity}} {{activeCountry}}</p>
                    <button @click="placeConfirm">确定</button>
                </div>
                <div class="scroll-list">
                    <div class="scrollWrap" ref="proScroll">
                       <ul>
                           <li v-for="item,index in areaList"
                            :style="activePro === item.name ? 'color:#d02e27' : ''"
                            @click="getCity(item.name,index)">{{item.name}}</li>
                       </ul>
                    </div>
                    <div class="scrollWrap" ref="cityScroll">
                        <ul>
                            <li v-for="item,index in cityList"
                             :style="activeCity === item.name ? 'color:#d02e27' : ''"
                             @click="getCountry(item.name,index)">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="scrollWrap" ref="countryScroll">
                        <ul>
                            <li v-for="item in countryList" 
                             :style="activeCountry === item.name ? 'color:#d02e27' : ''"
                            @click="setCountry(item.name)">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <transition  name="warn">
                   <div class="warn" v-show="warnStatus">{{warnText}}</div>
            </transition>
        </div>
    </transition>
</template>
<script>
import areaList from './areaList.json'
import BScroll  from 'better-scroll'
import vue from 'vue'
export default {
    props: ['placeShowList'],
    data() {
        return {
            areaList,
            cityList: [],
            countryList: [],
            activePro: '',
            activeCity: '',
            activeCountry: '',
            warnText:'',
            warnStatus: false
        }
    },
    created() {
      
    },
    mounted() {
        this.scrollInit('proScroll',this.$refs.proScroll)
        this.scrollInit('cityScroll', this.$refs.cityScroll)
        this.scrollInit('countryScroll',this.$refs.countryScroll)
    },
    watch: {
        cityList() {
            vue.nextTick(() => this.cityScroll.refresh())
        },
        countryScroll() {
            vue.nextTick(() => this.countryScroll.refresh())
        },
        proScroll() {
            vue.nextTick(() => this.proScroll.refresh())
        },
        placeShowList() {
            vue.nextTick(() => {
                this.cityScroll.refresh()
                 this.countryScroll.refresh()
                 this.proScroll.refresh()
            })
        }
    },
    methods: {
         scrollInit(target,dom) {
            this[target] = new BScroll(dom, {
                click: true,
                probeType: 3,
                pullDownRefresh: {
                    threshold: 20,
                    stop: 0
                },
                pullUpLoad:true
            })
        },
        getCity(name,index) {
            this.activeCity = ''
            this.activeCountry = ''
            this.cityList = []
            this.countryList = []
            this.activePro = name 
            this.cityList = this.areaList[index].sub

        },
        getCountry(name,index) {
            this.activeCountry = ''
            this.countryList = []
            this.activeCity = name
            if(this.cityList[index].sub) {
                this.countryList = this.cityList[index].sub
            }else {
                this.activeCountry = ' '
            }
        },
        setCountry(name) {
            this.activeCountry = name
        },
        placeConfirm() {
            this.timer = setTimeout(() => {
                clearTimeout(this.timer)
                if(!this.activePro) {
                    this.warnText = '请选择省份'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false,1250)
                    return
                }
                if(!this.activeCity) {
                    this.warnText = '请选择所在市'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false,1250)
                    return
                }
                if(!this.activeCountry) {
                    this.warnText = '请选择所在区'
                    this.warnStatus = true
                    setTimeout(() => this.warnStatus = false,1250)
                    return
                }
                this.$emit('getPlace',`${this.activePro}${this.activeCity}${this.activeCountry}`)
            },200)
        },
        close() {
            this.$emit('closePlaceScroll')
        }
    }

}
</script>

<style lang="less" scoped>
.placePicker {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .bg {
        background: rgba(0,0,0,0.7);
        width: 100%;
        height: 100%;
    }
    .picker {
        position: absolute;
        width: 100%;
        left: 0;
        height: 30%;
        bottom: 0;
        background: #fbf7eb;
        display: flex;
        flex-direction: column;
        .header {
            height: 0.4rem;
            border-bottom: 1px solid #fce6a8;
            display: flex;
            p {
                padding-left: 0.1rem;
                flex: 1;
                line-height: 0.4rem;
                color: #d02e27;
            }
            button {

                height: 100%;
                padding: 0 0.2rem;
                color: #d02e27;
            }
        }
        .scroll-list {
            flex: 1;
            display: flex;
            .scrollWrap {
                flex: 1;
                border-right: 1px solid #fce6a8;
                overflow: hidden;
                ul {
                    li {
                        padding-left: 0.1rem;
                        line-height: 0.35rem;
                        height: 0.3rem;
                        color: #d3ac68;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .scrollWrap:last-of-type {
                border: 0;
            }
        }
    }
     .warn {
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
        animation: warnOpa 1.2s linear forwards;
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
.place-enter,.place-leave-to {
    transform: translateY(100%) !important;
}
.place-enter-to, .place-leave {
    transform: translateY(0) !important;
}
.place-enter-active,
.place-leave-active {
    transition: all .3s ease-in !important;
}
</style>
