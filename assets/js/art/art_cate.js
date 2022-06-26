;
(function() {
    // 调用layui模块
    let layer = layui.layer
    let form = layui.form
    getArtCateList()

    // 封装获取文章分类列表的函数
    function getArtCateList() {
        $.get('/my/article/cates', function(res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类列表失败')
            }
            let htmlstr = template('tpl_tr', res)
            $('#tb').html(htmlstr)
        })
    }

    // 监听添加类别按钮点击事件
    let indexAdd = null
    $('#btn-addArtCate').on("click", function() {
            // 弹窗
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                // 将表单内容添加到弹窗中
                content: $('#popup-add').html()
            });
        })
        // 添加事件委托，添加表单提交
    $('body').on('submit', '#add-form', function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.post('/my/article/addcates', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('文章类别添加失败！')
            }
            // 成功弹出提示，并重新获取列表
            layer.msg('文章类别添加成功')
            layer.close(indexAdd)
            getArtCateList()
        })

    })

    // 添加事件监听，点击编辑弹出对话框
    let indexEdit = null
    $('#tb').on('click', '.btn-edit', function() {



        // 弹窗
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            // 将表单内容添加到弹窗中
            content: $('#popup-edit').html()
        });
        let url = $(this).attr('data-Id')
        $.get(`/my/article/cates/${url}`, function(res) {
            if (res.status !== 0) {
                return layer.msg('获取该文章分类失败')
            }
            form.val('edit-form', res.data)
        })




    })

    // 添加事件委托，编辑表单提交
    $('body').on('submit', '#edit-form', function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.post('/my/article/updatecate', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('文章类别更新失败！')
            }
            // 成功弹出提示，并重新获取列表
            layer.msg('文章类别更新成功')
            layer.close(indexEdit)
            getArtCateList()
        })

    })

    // 添加事件委托，删除类别
    $('#tb').on('click', '.btn-del', function() {
        let id = $(this).attr('data-Id')
        layer.confirm('确认删除该类别?', { icon: 3, title: '提示' }, function(index) {

            $.get(`/my/article/deletecate/${id}`, function(res) {
                if (res.status !== 0) {
                    return layer.msg('删除失败！')
                }
                layer.msg('删除成功！')
                getArtCateList()
            })
            layer.close(index);
        });
    })


})()