Page({
  data: {
    rateNumber: ''
  },
  formBindsubmit: function (e) {
    if (e.detail.value.rateNumber.length == 0) {
      this.setData({
        rateNumber: '',
      })
    } else {
      this.setData({
        rateNumber: e.detail.value.rateNumber
      })
    }
    var rateNumber = e.detail.value.rateNumber
    wx.navigateTo({
      url: '/pages/search/search_result?id=' + rateNumber
    })
  },
  ScanCode: function (event) {
    wx.scanCode({
      success: (path) => {
        var result = path.result
        var str = result.substr(42, 50);
        wx.navigateTo({
          url: '/pages/search/search_result?id=' + str
        })
      }
    })
  },
})
