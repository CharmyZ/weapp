
Page({
  data: {
    rateNumber: "",
    slideUrls: "",
    scaleWidth: "",
    scaleHeight: "",
    hidden: true,
    currentPage: 0
  },
  onLoad: function (options) {
    
    var rateNumber = options.id
    var res = wx.getSystemInfoSync()
    var windowWidth = res.windowWidth
    var windowHeight = res.windowHeight
    var imgUrla = "http://ytgrading.com/coin/request/casechart/pubFile/" + rateNumber.substr(0, 5) + "/" + rateNumber + "/" + "large" + "//" + rateNumber + "a" + ".jpg"
    this.setData({
      imgUrls: [imgUrla],
      rateNumber: options.id,
      slideDots: [],
      indicatorDots: true,
      autoplay: true,
      interval: 7000,
      duration: 500,
      userInfo: {},
      scaleHeight: windowHeight,
      scaleWidth: windowWidth
    })

  },

  imgerror: function (e) {
    var imgUrls = this.data.imgUrls
    var currentUrl = imgUrls[imgUrls.length - 1]
    imgUrls.pop();
    this.setData({
      imgUrls: imgUrls,
    });
    if (imgUrls.length == 0) {
      this.setData({
        hidden: false,
      });
    } else {
      this.setData({
        hidden: true,
      });

    }
  },
  imageLoad: function (e) {
    var imgUrls = this.data.imgUrls
    var currentUrl = imgUrls[imgUrls.length - 1]
    var keyChar = currentUrl.charAt(currentUrl.length - 5)
    var nextChar = String.fromCharCode(keyChar.charCodeAt() + 1)
    var nextUrl = currentUrl.substring(0, currentUrl.length - 5) + nextChar + currentUrl.substr(currentUrl.length - 4)
    imgUrls.push(nextUrl);
    this.setData({
      imgUrls: imgUrls
    })

  },
  swiperChange: function (event) {
    var tem = event.detail.current
    this.setData({
      currentPage: tem
    });
  },

  clickImg: function (e) {
    var current = this.data.currentPage
    var imgUrls = this.data.imgUrls
    var clickUrl = imgUrls[current]
    wx.navigateTo({
      url: '/pages/search/search_result_oneimg?id=' + clickUrl
    })
  },
  

})

