console.log("首页cookie----------");;
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else {
        factory(jQuery);
    }
})(function ($) {


    // var logined_cookie = document.cookie;
    var logined_cookie = cookie("usrmsg");
    console.log(logined_cookie);
    // var nav = $(".nav")[0];
    // console.log(logined_cookie);
    try {
        logined_cookie = JSON.parse(logined_cookie);
        console.log(logined_cookie.username,logined_cookie.password);
        if (logined_cookie) {
            // 发送内部的username和password让login进行验证;
            // var url = "/lg" + "username=" + logined_cookie
                // .username + "&password=" + logined_cookie.password + "&type=cookie";
            // ajax(url, function (res) {
            //     // console.log(res);
            //     res = JSON.parse(res);
            //     if (res.code == 1) {
            //         nav.innerHTML = `<li><a>${logined_cookie.username}</a></li><li><a id="out">退出登录</a></li>`;
            //     }
            // });
            var url = "/lg"
            $.ajax({
                url : url,
                data : {
                    username : logined_cookie.username,
                    password : logined_cookie.password,
                    type : "cookie"
                },
                success : function(res){
                    console.log("登陆成功")
                },
                error : function(error){
                    console.log(error);
                }
            })
            .then(function(res){
                res = JSON.parse(res);
                console.log(res);
                if(res.code === 1){
                    alert("cookie登陆成功")
                    var html_usrname = `<a class = "set-login-color">${logined_cookie.username}</a>`
                    var html_msg = `<a>消息</a>`;
                    var html_signout = `<a class = "signout-btn">退出</a>`;
                    $(".set-login-color").css({
                        color : "orange"
                    });
                    $(".account-welcome").children().children().html(html_usrname)
                    $(".account-signin").html(html_msg);
                    $(".account-signup").html(html_signout)
                }
            })
        }
    } catch (e) {

    }
    function cookie(key , value , options){
        if(arguments.length === 1){
              var arr = document.cookie.split("; ");
              var res = "";
              arr.some( function(item){
                    item = item.split("=");
                    return res = item[0] === key ? item[1] : "";
              })
              return decodeURIComponent(res);
        }
        typeof options !== "object" ? options = {} : "";
        if(options.expires) var d = new Date();
        // console.log((d.setDate(d.getDate() + options.expires) && d))
  
  
        return document.cookie = [
              key+"="+value+";",
              options.domain ? "domain="+options.domain + ";" : "",
              options.path ? "path=" + options.path + ";" : "",
              options.expires ? "expires=" + (d.setDate(d.getDate() + options.expires) && d) + ";" :"",
        ].join("");
  }
})