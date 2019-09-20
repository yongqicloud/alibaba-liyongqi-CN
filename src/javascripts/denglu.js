
console.log("登陆验证");
;(function(factory){
    if(typeof define === "function" && define.amd){
        define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
})(function($){

    $(".btn").on("click",function(evt){
        var e = evt || event;
        e.preventDefault();
        var usr_value = $("#userN").val();
        var pwd_value = $("#psw").val();
        var url = "/lg";
        $.ajax({
            url : url,
            type : "GET",
            data : {
                username : usr_value,
                password : pwd_value 
            }
        })
        .then(function(res){
            res = JSON.parse(res);
            console.log(res);
            switch(res.code){ 
                case 1 : location.href = "index.html";break;
                case 1 : console.log(1);break;
                case 2 : alert("参数不全");break;
                case 3 : alert("数据库查询错误");break;
                case 4 : alert("用户名和密码不符");break;
              }
        })
    })
})