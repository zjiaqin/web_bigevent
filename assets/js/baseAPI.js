;
(function() {
    $.ajaxPrefilter(function(options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://www.liulongbin.top:3007' + options.url
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 全局挂载complete回调函数，判断身份是否验证成功，若失败跳转回登录界面并删除本地存储中token数据
        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 清除本地存储token
                localStorage.removeItem('token')
                    // 跳转至登录页面
                location.href = '/login.html'
            }
        }
    })
})()