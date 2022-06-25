;
(function() {

    // 调取laui中的功能模块
    let form = layui.form
    let layer = layui.layer

    // 自定义表单验证信息
    form.verify({
        nickname: function(value, item) {
            if (value.length > 6) {
                return "昵称长度必须在1~6个字符之间"
            }
        }
    })

    // 调用初始化用户信息函数
    initUserinfo()

    // 绑定点击重置事件
    $('#btnReset').click(function(e) {
            e.preventDefault()
            initUserinfo()
        })
        //绑定表单提交事件
    $('.layui-form').submit(function(e) {
        // 阻止init默然提交事件
        e.preventDefault()

        // JQUery使用post方法提交数据
        let data = $(this).serialize()
        $.post('/my/userinfo', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('用户信息修改失败！')
            }
            layer.msg('成功修改用户信息')
            window.parent.getUserinfo()
        })

    })

    // 封装初始化用户信息函数
    function initUserinfo() {
        // jquery调用get请求获取服务器上的用户信息
        $.get('/my/userinfo', function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // 信息获取成功，将信息填入表单
            form.val('infoform', res.data)
        })
    }
})()