
Page({
  data: {
    rateNumber: "",
    slideUrls: "",
    scaleWidth: "",
    scaleHeight: "",
    title:"",
    hidden: true,
    currentPage: 0
  },
   
  onLoad: function (options) {
    var that = this
    var rateNumber = options.id
    var phone = wx.getSystemInfoSync()
    var windowWidth = phone.windowWidth
    var windowHeight = phone.windowHeight

    wx.request({
      url: 'https://qc.ytgrading.com/de/searchImagesData.shtml',
      data: { rateNumber },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var obj = res.data.data
        var img1 = obj.path1
        var img2 = obj.path2
        var title = obj.title
        console.log(res.data.data)
        that.setData({
          imgUrls: [img1, img2],
          rateNumber: options.id,
          slideDots: [],
          title : title,
          indicatorDots: true,
          autoplay: true,
          interval: 7000,
          duration: 500,
          userInfo: {},
          scaleHeight: windowHeight,
          scaleWidth: windowWidth
        })

        /* if (img1 = null) {
          that.setData({
            hidden: false,
          });
        } else {
          that.setData({
            hidden: true,
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }*/
       var imgUrls = that.data.imgUrls
     var currentUrl = imgUrls[imgUrls.length - 1]
    
     if (currentUrl == "") {
       that.setData({
         hidden: false,
       });
     } else {
       that.setData({
         hidden: true,
       })
 
      }
      }
    })
    
   
    
  },
   imgerror: function (e) {
    
   },

   /*imageLoad: function (e) {
     var imgUrls = this.data.imgUrls
     var currentUrl = imgUrls[imgUrls.length - 1]
     var keyChar = currentUrl.charAt(currentUrl.length - 5)
     var nextChar = String.fromCharCode(keyChar.charCodeAt() + 1)
     var nextUrl = currentUrl.substring(0, currentUrl.length - 5) + nextChar + currentUrl.substr(currentUrl.length - 4)
     imgUrls.push(nextUrl);
     this.setData({
       imgUrls: imgUrls
     })
 
   },*/
  swiperChange: function (event) {
    var tem = event.detail.current  //此时切换到第几张
    this.setData({
      currentPage: tem
    });
  },

  clickImg: function (e) {
    var current = this.data.currentPage
    var imgUrls = this.data.imgUrls
    var clickUrl = imgUrls[current] //获取点击图片的url
    wx.navigateTo({
      url: '/pages/search/search_result_oneimg?id=' + clickUrl
    })
  },


})

