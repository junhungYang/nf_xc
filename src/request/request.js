
import axios from 'axios'
import qs from 'qs'
// 'http://nfxc.ydcycloud.com'
const GlobalUrl = (process.env.NODE_ENV === 'development' ? '/api' : 'http://nfxc.ydcycloud.com')

const Req_getIndexCover = function() {
    return axios.get(`${GlobalUrl}/nfxc/getIndexCover`)   
}

const Req_jssdk = function (data) {
    return axios.post(`${GlobalUrl}/nfxc/jssdk`,qs.stringify(data))
}

const Req_receiveGift = function(data) {
    return axios.post(`${GlobalUrl}/nfxc/receiveGift`,qs.stringify(data))
}

const Req_fillInfo = function(data) {
    return axios.post(`${GlobalUrl}/nfxc/fillInfo`,qs.stringify(data))
}

export {
    Req_getIndexCover,
    Req_jssdk,
    Req_receiveGift,
    Req_fillInfo
}