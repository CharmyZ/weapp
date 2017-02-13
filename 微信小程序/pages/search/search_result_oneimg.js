// pages/search/search_result_oneimg.js
var olddistance = 0;  //上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离  
var oldscale = 1;     //上一次动作留下的比例  
var diffdistance;     //新的比例
Page({
  data: {
    item: "",
    hidden: true,
    scaleWidth: "",
    scaleHeight: "",
  },
  onLoad: function (options) {
    olddistance = 0;
    oldscale = 1;
    var imgUrl = options.id    //参数中的id为图片的src
    var res = wx.getSystemInfoSync()
    var windowWidth = res.windowWidth
    var windowHeight = res.windowHeight
    this.setData({
      item: imgUrl,
      scaleHeight: windowHeight,
      scaleWidth: windowWidth
    })

  },
  //触摸开始
  touchstart: function (event) {
    var e = event
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //触摸移动
  touchmove: function (event) {
    var e = event;
    var res = wx.getSystemInfoSync()
    var windowWidth = res.windowWidth
    var windowHeight = res.windowHeight

    if (e.touches.length == 2) {
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离   
      if (olddistance == 0) {
        olddistance = distance; //第一次则赋值 
        console.log(olddistance);
      }
      else {
        newdistance = distance; //第二次计算差值了  
        diffdistance = newdistance - olddistance;
        olddistance = newdistance; //计算之后更新  
        console.log(diffdistance);
        var newScale = oldscale + 0.005 * diffdistance;  //比例  
        console.log(newScale);
        //刷新.wxml  
        if (newScale >= 0.8) {
          this.setData({
            scaleHeight: newScale * windowHeight,
            scaleWidth: newScale * windowWidth,
            autoplay: false,


          })
        }
        oldscale = newScale;
        //更新比例  

      }
    }
  },
  //触摸结束
  touchend: function (event) {
    var e = event
    console.log(event);   //抬起手指，保存下数据  
    if (event.touches.length == 0) {
      olddistance = 0;
    }
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })

  },
  clickImg: function (event) {
    let that = this;
    var touchTime = that.data.touch_end - that.data.touch_start;         //触摸时间
    if (touchTime < 120) {
      wx.navigateBack({
        delta: 1
      })
    }
  },

})