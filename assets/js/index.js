// 调用获取用户信息的函数
getUserinfo()

// 绑定点击退出事件
let layer = layui.layer
$('#logout').click(function() {
    layer.confirm('您要退出登录吗?', { icon: 3, title: '提示' }, function(index) {
        // 清除本地存储token
        localStorage.removeItem('token')
            // 关闭弹出框
        layer.close(index);
        // 跳转至登录页面
        location.href = '/login.html'


    });

})


// 封装获取用户信息的函数
function getUserinfo() {
    $.get('/my/userinfo', function(res) {
        if (res.status !== 0) {
            return layer.msg('获取用户信息失败！')
        }
        renderAvatar(res.data)
    })
}
// 封装渲染用户头像函数
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
        // 无图片头像是采用文字头像
    if (user.user_pic === null) {
        let first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    } else {
        // 有图片头像时使用图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    }
}