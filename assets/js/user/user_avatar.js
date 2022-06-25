;
(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 调用layui的layer模块
    let layer = layui.layer


    // 监听上传点击事件
    $('#btn_ChoosePic').click(function() {
        $('#file').click()
    })

    // 监听file改变事件
    $('#file').on('change', function(e) {

            let filelist = e.target.files
            if (filelist.length === 0) {
                return layer.msg('请选择图片！')
            }

            let newImgURL = URL.createObjectURL(filelist[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 监听上传点击事件
    $('#btnUpload').click(function() {
        // 获取可用于上传的图片数据
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // jQuery方法发送POST请求
        $.post('/my/update/avatar', { avatar: dataURL }, function(res) {
            if (res.status !== 0) {
                return layer.msg('头像上传失败！')
            }
            layer.msg('头像上传成功！')
                // 调用index.html中的方法重新渲染头像
            window.parent.getUserinfo()
        })
    })

})()