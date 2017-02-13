// pages/index/index.js
var app = getApp()
Page({
    data: {
        imgUrls: [
            {
                link: '/pages/search/imgtwo', url: 'http://ytgrading.com/coin/index/pubimage/AD/e11afcd9-8b5d-43f4-85bf-fb744efb8ddb.jpg'
            },
            {
                link: '/pages/search/imgone',
                url: 'http://ytgrading.com/coin/index/pubimage/AD/a8ff2517-8b7c-4320-bbe7-93da7731aa82.jpg'
            },
            //{
            //link:'',//url:'http://www.ytgrading.com/coin/index/pubimage/A//D/a62c14b3-7204-4f89-8ba1-9915d665b628.jpg'
            //},
            {
                link: '/pages/more/more_s/pingji/center', url: 'http://www.ytgrading.com/coin/index/pubimage/AD/6790db9d-4e3e-4c95-be52-8092b6f0e186.jpg'
            }
        ],
        slideDots: [],
        indicatorDots: true,
        autoplay: true,
        interval: 4000,
        duration: 500,
        userInfo: {}
    },
   
    clicka: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=27621003'
        })
    },
    clickb: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=24361001'
        })
    },
    clickc: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=23800007'
        })
    },
    clickd: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=31707001'
        })
    },
    clicke: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=17613001'
        })
    },
    clickf: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=16715003'
        })
    },
    clickg: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=17819001'
        })
    },
    clickh: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=17812003'
        })
    },
    clicki: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=12421003'
        })
    },
    clickj: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=17015001'
        })
    },
    clickk: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=19003011'
        })
    },
    clickl: function (e) {
        wx.navigateTo({
            url: '/pages/search/search_result?id=12303001'
        })
    },
    onShareAppMessage: function () {
        return {
            title: '源泰评级',
            desc: '微信小程序',
            path: '/pages/index/index'
        }
    }
})