import areaList from './areaList.json'

let mapping = new Map()


function mapInit(list) {
    list.forEach(item => {
        mapping.set(item.value,item.name)
        if(item.sub) {
            mapInit(item.sub)
        }
    })
}
mapInit(areaList)

function getPosUtil(areaCode) {
    let provinceCode = areaCode.slice(0,2) + '0000'
    let cityCode = areaCode.slice(0,4) + '00'
    if(provinceCode === areaCode) {
        return mapping.get(provinceCode)
    }
    if(cityCode === areaCode) {
        return `${mapping.get(provinceCode)}${mapping.get(cityCode)}`
    }
    return `${mapping.get(provinceCode)}${mapping.get(cityCode)}${mapping.get(areaCode)}`
}

export {
    getPosUtil
}