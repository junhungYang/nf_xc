<template>
    <div class="home">
        <div class="bg">
            <img src="../assets/img/bg.jpg" class="behind">
                <img src="../assets/img/top_cloud.png" class="top-cloud">
            <img class="bottom-cloud" src="../assets/img/bottom_cloud.png">
        </div>
        <div class="content">
            <img src="../assets/img/yuan.png" alt="" srcset="">
        </div>
        <div class="btn" @click="navToSlider">
            <img src="../assets/img/home_btn.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        navToSlider() {
            this.$router.push('/slider')
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
        top: 50%;
        transform: translate(-50%,-50%);
        opacity: 0;
        animation: content 1s linear forwards;
        img {
            width: 100%;
        }
    }
    @media screen and (max-width: 321px) {
        .content {
            width: 320px;
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
        img {
            width: 2.28rem;
            height: 0.30rem;
        }
    }
}

</style>
