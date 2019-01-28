<template>
    <div class="showModal">
        <div class="showBox">
            <div class="cont-title">
                <p class="title">{{Store_showModal.title}}</p>
                <p class="content">{{Store_showModal.content}}</p>
            </div>
            <div class="btn">
                <span class="cancel" 
                v-if="Store_showModal.cancelFlag === false ? false : true"
                @click="cancel">
                {{Store_showModal.cancelBtn ? Store_showModal.cancelBtn : '取消'}}</span>
                <span class="confirm"
                @click="confirm"
                >{{Store_showModal.successBtn ? Store_showModal.successBtn : '确定'}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['Store_showModal'],
    created() {
        console.log(this.Store_showModal)
    },
    methods: {
        confirm() {
            this.Store_showModal.successCB()
            this.$emit('closeModal')
        },
        cancel() {
            this.Store_showModal.cancelCB()
            this.$emit('closeModal')
        }
    }
}
</script>
<style lang="less" scoped>
.showModal {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    .showBox {
        background: #fbf7eb;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .cont-title {
            min-height: 0.55rem;
            padding: 0.14rem 0.24rem;
            width: 1.92rem;
            text-align: center;
            border-bottom:1px solid #ffedd0;
            .title {
                font-size: 0.14rem;
                line-height: 0.18rem;
                color: #bea172;
            }
            .content {
                font-size: 0.14rem;
                margin-top: 0.1rem;
                color: #bea172;
                line-height: 0.20rem;
            }
        }
        .btn {
            display: flex;
            height: 0.42rem;
            .cancel,.confirm {
                flex: 1;
                line-height: 0.42rem;
                font-size: 0.14rem;
                text-align: center;
                color: #bea172;
            }
            .cancel {
                border-right: 1px solid #ffedd0;
            }
        }

    }
}
</style>


