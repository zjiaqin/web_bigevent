;
(function() {
    // 设置事件委托，切换登录与注册盒子
    $('.panel_login').on('click', 'a', function() {
        $(this).parent().parent().parent().hide().siblings().show()
    })

})()