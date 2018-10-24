$(function(){
    function initIndex(){
        $.ajax({
            type : "get",
            url : "/books",
            dataType : "json",
            success : function(data){
                var tpl = template("indexTpl",{list:data});
                $("#dataList").html(tpl);
                var arr = $("#dataList").find('tr');
                var num = $(arr).length + 1;
                // console.log(arr);
                $("#dataList").find('tr').each(function(index,element){
                   
                    var td = $(element).find('td:eq(5)');
                    var id =$(element).find('td:eq(0)').text();

                    //修改图书
                    td.find('a:eq(0)').click(function(){
                        editBook(id);
                    })

                    //删除图书
                    td.find('a:eq(1)').click(function(){
                        deleteBook(id);
                    })

                     //避免click事件冲突
                     addBook(num);
                    //重置表单
                    var form = $("#useForm");
                    form.get(0).reset();
                    form.find('input[type=hidden]').val('');

                })
            }
        })
    }

    initIndex();


    function editBook(id){
        $.ajax({
            type: 'get',
            url: 'books/book/'+id,
            dataType: 'json',
            success: function(data){
            var form = $("#useForm");
            form.show();
            form.find('input[name=id]').val(data.id);
            form.find('input[name=name]').val(data.name);
            form.find('input[name=author]').val(data.author);
            form.find('input[name=category]').val(data.category);
            form.find('input[name=description]').val(data.description);
            $("#btn").unbind('click').click(function(){
                $.ajax({
                    type:"put",
                    url:"books/book",
                    data:form.serialize(),
                    dataType:"json",
                    success:function(data){
                        if(data.flag=='1'){
                            form.hide();
                            initIndex();
                            // console.log(data);
                        }
                    }
                })
            })
            $("#cancel").click(function(){
                form.hide();
            })
            }
        })
    }


    function deleteBook(id){
            $.ajax({
                type:"delete",
                url:"books/book/"+id,
                dataType:"json",
                success:function(data){
                    if(data.flag=="1"){
                        initIndex();
                    }
                }
            })
    }

    //封装添加图书操作
    function addBook(num){
        $("#addBook").click(function(){
            // $("#useForm").css("display","block");
            // console.log(num);
            var form = $("#useForm");
            form.show();
            form.find('input:eq(0)').val(num);            
            $("#btn").unbind("click").click(function(){
                $.ajax({
                    type : "post",
                    url : "/books/book",
                    data : form.serialize(),
                    dataType : "json",
                    success : function(result){
                        if(result.flag=='1'){
                            // form.css("display","none");
                            form.hide();
                            initIndex();
                        }
    
                    }
                })
            })
            $("#cancel").click(function(){
                form.hide();
            })
        })
    }
    

    
})