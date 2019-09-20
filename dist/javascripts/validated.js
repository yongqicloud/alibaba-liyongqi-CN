console.log("表单验证");
;(function(factory){
    if(typeof define === "function" && define.amd){
        define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
})(function($){

    class Validated{
        constructor(){}
        init(){
            this.bindEvent();
            this.username_tip = "支持中文、英文、数字、“-”、“_”的组合，4-20个字符"
            this.psw_tip  = "建议使用字母、数字和符号两种及以上的组合，6-20个字符"
            this.psw1_tip = "两次输入密码不符"
            this.phone_tip = "请输入正确的电话号码"
        }
        bindEvent(){
            var _ = this;
            $("#username").blur(function(){
                var username_value = $(this).val();
                _.validatedUsername(username_value) ? _.success.call(this) : _.failed.call(this,_.username_tip);
            })
            $("#psw").blur(function(){
                var psw_value = $(this).val();
                _.validatedUsername(psw_value) ? _.success.call(this) : _.failed.call(this,_.psw_tip);
            })
            $("#psw1").blur(function(){
                var psw1_value = $(this).val();
                _.confirmPassword(psw1_value) ? _.success.call(this) : _.failed.call(this,_.psw1_tip);
            })
            $("#phone-num").blur(function(){
                var phone_value = $(this).val();
                _.validatedPhone(phone_value) ? _.success.call(this) : _.failed.call(this,_.phone_tip);
            })

        }
        // 用户名验证
        validatedUsername(value){
            var reg  = /^[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,20}$/;
            return reg.test(value);
        }
        // 密码验证
        validatedPassword(value){
            var passwordLevel = 0;
            var passwordLevelReg = {
                  num_reg : /\d/,
                  letter_reg : /[a-zA-Z]/,
                  symbol_reg : /[!@#\$%&\*_]/
            }
            for(var attr in passwordLevelReg){
                  if(passwordLevelReg[attr].test(value)){
                        passwordLevel++;
                  }     
            }
            return passwordLevel >= 2
        }
        // 二次密码验证
        confirmPassword(value){
            if($("#psw").val() === ""){
                return false;
            }
            return value === $("#psw").val();
        }
        validatedPhone(phone){
           var reg =  /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
           return reg.test(phone);
        }
        success(){
            // $(this).parent().css({
            //     borderColor : "green"
            // })
            var class_name = $(this).parent().attr("class");
            if( /failed/.test(class_name)){
                class_name = class_name.replace("failed","success");
                $(this).parent().attr({"class":class_name})
            }else{
                class_name += /success/.test(class_name) ? "" : " success";
                $(this).parent().attr({"class":class_name})
            }
            $(this).parent().next().html("")
        }
        failed(tip){
            var class_name = $(this).parent().attr("class");
            if( /success/.test(class_name)){
                class_name = class_name.replace("success","failed");
                $(this).parent().attr({"class":class_name})
            }else{
                class_name += /failed/.test(class_name) ? "" : " failed";
                $(this).parent().attr({"class":class_name})
            }
            $(this).parent().next().html(tip)
        }
    }
    new Validated().init();

    // checkout 验证
    $(".click-me").on("click",function(evt){
        var value = $(this).val()
        if(value === "false"){
            $(".agree").css({
                display : "none"
            });
            $(this).val("true")
        }
        if(value === "true"){
            $(".agree").css({
                display : "block"
            });
            $(this).val("false")
        }
    })
    // 注册后台连接
    $(".signin").on("click",function(evt){
        var e = evt || event;
        e.preventDefault();
        if($(".click-me").val() === "false"){
            alert("请勾选用户协议");
            return false;
        }
        var usr_value = $("#username").val();
        var pwd_value = $("#psw").val();
        var phone_value = $("#phone-num").val();
        // console.log(usr_value,pwd_value,phone_value);
        var url = "/rg" ;
        // console.log(url);
        $.ajax({
            url : url,
            type : "GET",
            data : {
                username : usr_value,
                password : pwd_value    
            },
            // dataType : "json",
            success : function(res){
                console.log("接收成功");
            },
            error : function(error){
                console.log("接收失败");
                console.log(error.responseText);
            }
        })
        .then(function(res){
            // res = JSON.parse(res);
            console.log(res);
            var reg= /{(.*?)}/g;
            res = res.match(reg)[0];
            res = JSON.parse(res)
            console.log(res.code);
            switch(res.code){
                // case 1 : alert("注册成功");
                // break;
                case 1 : location.href = "login.html";
                break;
                case 2 : alert("参数不全");
                break;
                case 3 : alert("数据库查询错误");
                break;
                case 4 : alert("用户名和密码不符");
                break;
                case 5 : alert("您注册的账户已存在");
                break;
            }
        })
        
    })
})