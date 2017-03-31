// pages/index/index.js
var app = getApp()
var httpclient = require('../../utils/httpclient.js')
Page({
  data: {
    imgUrls: [
      {
        link: '/pages/search/imgfive',
         url: 'http://www.ytgrading.com/coin/index/pubimage/AD/46f2dd2d-1b50-4b35-b8b1-2577d8af7ae1.jpg'
       },
      {
        link: '/pages/search/imgfour',
        url: 'http://ytgrading.com/coin/index/pubimage/AD/9af7cc39-9949-456f-aa23-d41aa6c80aaa.jpg'
      },
      {
        link: '/pages/more/more_s/pingji/center', url: 'http://www.ytgrading.com/coin/index/pubimage/AD/6790db9d-4e3e-4c95-be52-8092b6f0e186.jpg'
      },
      
      //{
      // link: '/pages/search/imgone',
      // url: 'http://ytgrading.com/coin/index/pubimage/AD/a8ff2517-8b7c-4320-bbe7-93da7731aa82.jpg'
      // },


    ],
    scoreCoin: [],  //评级新品展现
    stamp: [],      //邮票精品展现
    coin: [],       //钱币精品展现
    slideDots: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    userInfo: {},
    btnType: 'primary',
    btnSize: 'default',
    btnPlain: false,
    nickname: '',
    city: '',
    loginCode: '',
    encryptedData: '',
    iv: '',
    userInfo: {},
    sessionId: '',
    openId: '',
    unionId: '',
    nickname1: ''
  },

  //可分享此页面
  onShareAppMessage: function () {
    return {
      title: '源泰评级',
      desc: '微信小程序',
      path: '/pages/index/index'
    }
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (event) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //获取本地缓存图片数据
   wx.getStorage({
      key: 'imagesdata',
      success: function (res) {
        var arr = res.data.data.data
        var Urls = []
        var scoreCoin = []
        var stamp = []
        var coin = []
        for (var i = 0; i < arr.length; i++) {
          var num = arr[i].imagestype
        //  if (num == 1) {
         //   var imgUrl = arr[i]
       //    Urls.push(imgUrl)
         // }
          if (num == 36) {
            var scorecoin = arr[i]
            var scorecoinUrl = arr[i].url.substr(18, 8)
            scoreCoin.push(scorecoin)
            arr[i].url = '/pages/search/search_result?id=' + scorecoinUrl
          }
          if (num == 34) {
            var showstamp = arr[i]
            var stampUrl = arr[i].url.substr(18, 8)
            stamp.push(showstamp)
            arr[i].url = '/pages/search/search_result?id=' + stampUrl
          }
          if (num == 31) {
            var showcoin = arr[i]
            var coinUrl = arr[i].url.substr(18, 8)
            coin.push(showcoin)
            arr[i].url = '/pages/search/search_result?id=' + coinUrl
          }
        }
      //  Urls[0].link = that.data.bannerlink1;
      //  Urls[1].link = that.data.bannerlink2;
      //  Urls[2].link = that.data.bannerlink3;
      //  Urls[3].link = that.data.bannerlink4;
        that.setData({
         // imgUrls: Urls,
          scoreCoin: scoreCoin,
          stamp: stamp,
          coin: coin
        })
      }
    })
  },
  //登录
  wxlogin: function (e) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        nickname: userInfo.nickName,
        city: userInfo.city,
        loginCode: app.globalData.loginCode,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv
      })
    })
  },
  // 从服务端获取sessionId
  get3rdSessionId: function (e) {
    var that = this;
    //根据code获取sessionsession_key和openid
    wx.showToast({
      title: '正在请求',
      icon: 'loading',
      duration: 10000
    });

    httpclient.req(
      '/wx/getSession',
      {
        apiName: 'WX_CODE',
        code: this.data.loginCode
      },
      'GET',
      function (result) {
        wx.hideToast()
        var sessionId = result.data.data.sessionId;
        that.setData({ sessionId: sessionId })
        wx.setStorageSync('sessionId', sessionId)
      },
      function (result) {
        console.log(result)
      }
    );
  },
  //解密用户敏感数据
  getUserAllData: function (e) {
    var that = this;
    wx.showToast({
      title: '正在请求',
      icon: 'loading',
      duration: 10000
    })
    httpclient.req(
      '/wx/decodeUserInfo',
      {
        apiName: 'WX_DECODE_USERINFO',
        encryptedData: this.data.encryptedData,
        iv: this.data.iv,
        sessionId: wx.getStorageSync('sessionId')
      },
      'GET',
      function (result) {
        wx.hideToast()
        var data = JSON.parse(result.data.data);
        that.setData({
          openId: data.openId,
          unionId: data.unionId,
          nickname1: data.nickName
        })
      },
      function (result) {
        console.log(result)
      }
    );
  }
})
