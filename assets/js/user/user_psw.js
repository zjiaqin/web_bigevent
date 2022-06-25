;
(function() {
    // 调取laui中的功能模块
    let form = layui.form
    let layer = layui.layer

    //自定义表单验证信息
    form.verify({
        // 验证密码格式
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 验证新旧密码是否重复，重复弹出提示
        oldcheck: function(vule) {
            if (vule === $('[name="oldPwd"]').val()) {
                return '新密码不得与原密码相同'
            }
        },
        // 验证新密码两次输入是否一致，不一致弹出提示
        newcheck: function(vule) {
            if (vule !== $('[name="newPwd"]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 绑定表单提交事件
    $('.layui-form').submit(function(e) {
        // 阻止原事件
        e.preventDefault()
            // jQuery方法提交表单数据
        let data = $(this).serialize()
        $.post('/my/updatepwd', data, function(res) {
            // 密码修改失败
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 密码修改成功
            layer.msg('密码修改成功！')
                // 清除表单内容
            $('.layui-form')[0].reset()
        })

    })


})()