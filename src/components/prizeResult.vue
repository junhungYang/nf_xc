<template>
    <div class="prizeResult">
        <div class="moneyPrize" v-if="res > 0.5">
            <img src="../assets/img/moneyRes.png" alt="" srcset="">
        </div>
        <div class="goodPrize" v-if="res < 0.5 && res > 0">
            <div class="cont-wrap">
                <p>这里放物品内容</p>
                <i></i>
            </div>
            <footer></footer>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        res:{
            type: Number,
            default:-1
        }
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
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 2.03rem;
        }
    }
    .goodPrize {
        height: 100%;
        background: url('../assets/img/slider_bg.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        .cont-wrap {
            position: absolute;
            width: 3.06rem;
            top: 0.3rem;
            bottom: 1.04rem;
            background:#fbf7eb;
            left: 50.5%;
            transform: translateX(-50%);
            border-top-left-radius: 0.1rem;
            border-top-right-radius: 0.1rem;
            p {
                position: absolute;
                left: 50%;
                top: 50%;
                font-size: 0.20rem;
                transform: translate(-50%,-50%);
            }
            i {
                position: absolute;
                left: 0.15rem;
                top: 0.15rem;
                width: 0.15rem;
                height: 0.15rem;
                background: url('../assets/img/close.png');
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
        footer {
            position: absolute;
            left: 50%;
            bottom: 0;
            background: url('../assets/img/hongbao_bottom.png');
            width: 3.4rem;
            height: 1.05rem;
            background-size: cover;
            background-repeat: no-repeat;
            transform: translateX(-50%);
        }
    }
}
</style>


