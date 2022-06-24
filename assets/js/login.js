;
(function() {
    // 设置事件委托，切换登录与注册盒子
    $('.panel_login').on('click', 'a', function() {
            $(this).parent().parent().parent().hide().siblings().show()
        })
        // 从layui中获取对象
    let form = layui.form
    let layer = layui.layer

    // 表单验证


    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repassword: function(value) {
            if (value !== $('.psw').val()) {
                return '两次密码不一致';
            }
        }
    });
    // 设置注册提交事件
    $('#regform').submit(function(e) {
            // 阻止默认提交功能
            e.preventDefault()
                // 采用ajax提交数据
            let data = $('#regform').serialize()
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录')
                    // 模拟点击跳转至登录面板
                $('#link_login').click()
                    // 清除表单内容reset()方法为原生方法，所以将JS对象还原成DOM对象，empty()方法是清空JS对象中html（）的方法。
                $('#regform')[0].reset()
            })
        })
        // 设置登录提交事件
    $('#loginform').submit(function(e) {
        // 阻止默认提交功能
        e.preventDefault()
            // 采用ajax提交数据
        let data = $('#loginform').serialize()
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            location.href = './index.html'
            localStorage.setItem('token', res.token)
        })

    })




})()