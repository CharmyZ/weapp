Page({
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },
  data: {
    markers: [{
      iconPath: "/image/landmark.png",
      id: 0,
      latitude: 31.1654056504,
      longitude: 121.3874834776,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 121.3874834776,
        latitude: 31.1654056504
      }, {
        longitude: 121.3874834776,
        latitude: 31.1654056504
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/image/landmark.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }

})