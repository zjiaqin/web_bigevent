;
(function() {
    // 调用layui中的模块
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage



    let SendData = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    // 调用初始化分类列表的函数
    initCateList()
    initArticleList()


    // 监听筛选按钮点击事件
    $('#screen-form').on('submit', function(e) {
        e.preventDefault()
        SendData.cate_id = $('[name="cate_id"]').val()
        SendData.state = $('[name="state"]').val()
        initArticleList()
    })



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

    // 封装初始化文章表格的函数
    function initArticleList() {
        $.get('/my/article/list', SendData, function(res) {
            if (res.status !== 0) {
                return layer.msg('获取文章列表失败！')
            }
            let htmlStr = template('tpl-table', res)
            $('#tb').html(htmlStr)
            renderpage(res.total)
        })
    }
    // 封装补零函数
    function zeroize(num) {
        return num = num < 9 ? '0' + num : num
    }

    // 定义时间美化过滤器
    template.defaults.imports.dataFormat = function(date) {
        let dt = new Date(date)
        let yy = dt.getFullYear()
        let mm = zeroize(dt.getMonth() + 1)
        let dd = zeroize(dt.getDate())
        let h = zeroize(dt.getHours())
        let m = zeroize(dt.getMinutes())
        let s = zeroize(dt.getSeconds())
        return `${yy}-${mm}-${dd} ${h}:${m}:${s}`

    }



    // 渲染分页区
    function renderpage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'datapager',
            count: total, //数据总数，从服务端得到
            limit: SendData.pagesize,
            curr: SendData.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 8],
            jump: function(obj, first) {
                SendData.pagenum = obj.curr
                SendData.pagesize = obj.limit

                //首次不执行
                if (!first) {
                    initArticleList()
                }

            }
        })
    }

    // 通过事件委托来监听删除按钮点击事件

    $('#tb').on('click', '.btn-del', function() {
        let len = $('.btn-del').length
        let id = $(this).attr('data-Id')
        layer.confirm('确认删除文章?', { icon: 3, title: '提示' }, function(index) {
            $.get(`/my/article/delete/${id}`, function(res) {
                if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                }
                layer.msg('删除文章成功！')
                if (len === 1) {
                    SendData.pagenum = SendData.pagenum === 1 ? 1 : SendData.pagenum - 1
                }


                initArticleList()
            })


            layer.close(index);
        })
    })

})()