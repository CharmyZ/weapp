function login(that) {

    // 页面初始化
    wx.login({
        success: function (res) {
            // success
            that.globalData.loginCode = res.code
            wx.getUserInfo({
                success: function (res) {
                    // success
                    that.globalData.userInfo = res.userInfo
                    that.globalData.iv = res.iv
                    that.globalData.encryptedData = res.encryptedData
                    typeof cb == "function" && cb(that.globalData.userInfo)
                    return res
                }
            })
        },
        globalData: {
            userInfo: null,
            loginCode: null,
            encryptedData: null,
            iv: null,
            server: 'https://localhost:8443/api/v1/wx/decodeUserInfo',
            appId: 'wxdfca874bafb5a8f6',
            apiNames: ['WX_CODE', 'WX_CHECK_USER', 'WX_DECODE_USERINFO']
        }
    })
}

function get3rdSession() {
    let that = this
    wx.request({
        url: 'https://localhost:8443/api/v1/wx/decodeUserInfo',
        data: {
            code: this.data.code
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // success
            var sessionId = res.data.session;
            that.setData({ sessionId: sessionId })
            wx.setStorageSync('sessionId', sessionId)
            that.decodeUserInfo()
        }
    })
}

module.exports = {
    login: login,
    get3rdSession: get3rdSession
}


