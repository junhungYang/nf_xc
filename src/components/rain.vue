<template>
    <div class="rain">
        <div class="rain-wrap" v-show="startStatus" ref="rainWrap">
            <!-- <img class="rainDrop" src="/static/little_hongbao.png"> -->
            <img ref="behind" class="behind" src="../assets/img/hongbao_bottom.png" alt="">
            <img ref="front" class="front" src="../assets/img/hongbao_front.png" alt="">
        </div>
        <div class="rain-end" v-if="endStatus">
            <button @click="getOpendId"></button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            endStatus: false,
            startStatus: true
        }
    },
    mounted() {
        this.$refs.behind.style.width = window.innerWidth + 'px'
        this.$refs.front.style.width = window.innerWidth + 'px'
        this.timer1 = setInterval(() => {
            this.rainDropInit()
        }, 400)
        setTimeout(() => {
            clearInterval(this.timer1)
            setTimeout(() => {
                    this.endStatus = true
            },2000)
            setTimeout(() => {
                this.startStatus = false   
            },3500)
        },10000)
    },
    methods: {
        getOpendId() {
            this.$router.push('/prizeCollect')
            // location.href = 'http://www.qq.com'
        },
        rainDropInit() {
            let rainDrop = new Image()
            rainDrop.className = 'rainDrop'
            rainDrop.onclick = () => {
                 if(rainDrop.offsetTop < 350) {
                        rainDrop.style.zIndex = '2'
                     rainDrop.style.top = rainDrop.offsetTop * 0.01 + 'rem'
                     rainDrop.style.animation = 'get .5s linear forwards'
                 }
            }
            rainDrop.onload = () => {
                this.$refs.rainWrap.appendChild(rainDrop)            
            }
            rainDrop.src = '../static/little_hongbao.png'
            rainDrop.style.left =  parseInt(Math.random() * 100) + '%'
            rainDrop.style.transform = `translateX(-50%)`
        }
    }
}
</script>
<style lang="less" scoped>
.rain {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: rgba(26,26,26,.7);
    opacity: 0;
    animation:  opa .4s linear forwards ;
    @keyframes opa {
        100% {
            opacity: 1;
        }
    }
    .rain-wrap {
        position: absolute;
        width: 70%;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        height: 100%;
        opacity: 1;
        animation: rainWrapleave 2s linear 12s forwards;
        @keyframes rainWrapleave {
            30% {
                opacity: 0.3;
            }
            100% {
                opacity: 0;
                top: 100%;
            }
        }
        // border: 1px solid #fff;
        .behind,.front {
            position: absolute;
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        .front {
            z-index: 9;
        }
    }
    .rain-end {
        position: absolute;
        left: 50%;
        top: -1.5rem;
        transform: translate(-50%,-50%);
        width: 2.04rem;
        height: 2.27rem;
        opacity: 0.7;
        background: url('../assets/img/rain_end.png');
        background-size: cover;
        animation: rainEnd .7s linear forwards;
        @keyframes rainEnd {
           50% {
               top: 55%;
           }
           75% {
               top: 45%;
           }
           100% {
               opacity: 1;
               top: 50%;
           }
        }
        button {
            position: absolute;
            width: 0.7rem;
            height: 0.7rem;
            left: 50%;
            top: 0.25rem;
            transform: translateX(-50%)
        }
    }
}
</style>
<style lang="less">
        .rainDrop {
            position: absolute;
            width: 0.55rem;
            z-index: -1;
            top: -0.8rem;
            opacity: 1;
            animation: rainDown 4.5s linear forwards;
             @keyframes rainDown {
                 70% {
                     width: 0.6rem;
                     opacity: 1;
                 }
                 100% {
                     width: 0.3rem;
                    top: 100vh ;
                    opacity: 0;
                }
            }
        }
        @keyframes get {
            100% {
                top: 100vh;
                left: 47%;
            }
        }
   
</style>

