console.log("cookie111");;
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else {
        factory(jQuery);
    }
})(function ($) {


    var logined_cookie = document.cookie;
    console.log(logined_cookie);
    var nav = $(".nav")[0];
    // console.log(logined_cookie);
    try {
        logined_cookie = JSON.parse(logined_cookie);

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
            $.ajax({
                url : url,
                data : {
                    username : logined_cookie.username,
                    password : logined_cookie.password,
                    type : "cookie"
                }

            })
            .then(function(res){
                console.log(res);
            })
        }
    } catch (e) {

    }
})