<template>
    <transition>
        <div class="placePicker">
            <div class="bg"></div>
            <div class="picker">

            </div>
        </div>
    </transition>
</template>
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
        height: 50%;
        bottom: 0;
        background: #fbf7eb;
    }
}
</style>
