import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import {Req_jssdk} from './request/request'
Vue.config.productionTip = false

// var media = new Audio()
// media.src = 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/newMsg.mp3'
// media.load()

window.JSSDK = function() {
  Req_jssdk({
    url: window.location.href.split('#')[0]
  }).then(res => {
    wx.config({
      appId: res.data.data.appId,
      timestamp: res.data.data.timestamp,
      nonceStr: res.data.data.nonceStr,
      signature: res.data.data.signature,
      jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"]
    })
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: '恭贺新春，佛山知名企业向全国人民拜年！',
        desc: '一大波现金红包、精美礼物等你来拿。',
        link: 'http://nfxc.ydcycloud.com/dist/index.html',
        imgUrl: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/shareLogo.jpg'
      })
      wx.onMenuShareTimeline({
        title: '恭贺新春，佛山知名企业向全国人民拜年！一大波现金红包、精美礼物等你来拿。',
        link: 'http://nfxc.ydcycloud.com/dist/index.html',
        imgUrl: 'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/nfxc/img/shareLogo.jpg'
      })
    })
  })
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
