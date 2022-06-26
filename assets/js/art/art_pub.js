;
(function() {
    // 初始化富文本编辑器
    initEditor()

    // 初始化分类列表
    initCateList()

    // 调用layui模块
    let layer = layui.layer
    let form = layui.form



    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 封装初始化分类列表的函数
    function initCateList() {
        $.get('/my/article/cates', function(res) {
            if (res.status !== 0) {
                return layer.msg('获取分类列表失败')
            }
            let htmlStr = template('tpl-select', res)
            $('[name="cate_id"]').html(htmlStr)
            form.render()
        })
    }

    // 监听存为草稿按钮点击事件，点击则存入数据‘草稿’
    let state = '已发布'
    $('.btn-draft').click(function() {
        state = '草稿'
    })



    // 监听选择封面点击事件，点击后发生点击选择文件表单效果
    $('#btn-selectpic').click(function(e) {
            e.preventDefault()
            $('#coverFile').click()

        })
        // 监听文件改变事件
    $('#coverFile').on('change', function(e) {
        // 拿到用户选择的文件
        let file = e.target.files
            // 根据选择的文件，创建一个对应的 URL 地址：
        if (file.length === 0) {
            return
        }



        let newImgURL = URL.createObjectURL(file[0])
            // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')
            // 销毁旧的裁剪区域
            .attr('src', newImgURL)
            // 重新设置图片路径
            .cropper(options)
            // 重新初始化裁剪区域
    })


    // 监听表单提交事件
    $('#pub-form').on('submit', function(e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', state)

        fd.forEach(function(v, k) {
            console.log(k, v)
        })

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })



    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章上传失败！')
                }
                layer.msg('文章上传成功！')
                    // location.href = '..../art/art_list.html'
                location.href = '/art/art_list.html'

            }



        })

    }










})()