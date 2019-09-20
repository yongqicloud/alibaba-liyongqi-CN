console.log("倒计时")
;(function(factory){
    if(typeof define === "function" && define.amd){
        define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
})(function($){
    var start_time = new Date();
    // console.log(start_time);
    // console.log(start_time.setFullYear(2019/10/1));
    function countDown(time, accuracy) {
        // 参数判断 是[]还是string
        var timeString = typeof time === "string" ? time : time.join("/");
        var res = new Date(timeString).getTime() - Date.now();
        //毫秒转化为秒
        res /= 1000;
        var day = parseInt(parseInt(res / 3600) / 24);
        var hour = parseInt(res / 3600);
        var minutes = parseInt(res / 60 % 60);
        var seconds = parseInt(res % 60);
        //新建数组存放时间
        var resArray = [hour, minutes, seconds];
        //特殊日期处理
        if (accuracy === "date") {
            var date = parseInt(hour / 24);
            // hour = hour % 24;
            accuracy["hour"] = hour % 24;
            resArray.unshift(date);
        }
        return resArray;
    }
    // console.log(countDown("2019/08/07"));
    setInterval(function () {
        var str = countDown("2019/09/30","date");
        
        // console.log(str);
        $("li" , ".logo").eq(0).html(
            str[0]
        )
        if(str[1] < 10){
            $("li" , ".logo").eq(1).html(
                // (str[1] % 24).toString().substr(0,1)
                0
            )
            $("li" , ".logo").eq(2).html(
                (str[1] % 24).toString().substr(0,1)
            )

        }else{
            $("li" , ".logo").eq(1).html(
                (str[1] % 24).toString().substr(0,1)
            )
            $("li" , ".logo").eq(2).html(
                (str[1] % 24).toString().substr(1,1)
            )
        }
        if(str[2] < 10){
            $("li" , ".logo").eq(3).html(
                // str[2].toString().substr(0,1)
                0
            )
            $("li" , ".logo").eq(4).html(
                str[2].toString().substr(0,1)
            )
        }else{
            $("li" , ".logo").eq(3).html(
                str[2].toString().substr(0,1)
            )
            $("li" , ".logo").eq(4).html(
                str[2].toString().substr(1,1)
            )
        }
        if(str[3] < 10){
            $("li" , ".logo").eq(5).html(
                // str[3].toString().substr(0,1)
                0
            )
            $("li" , ".logo").eq(6).html(
                str[3].toString().substr(0,1)
            )

        }else{
            $("li" , ".logo").eq(5).html(
                str[3].toString().substr(0,1)
            )
            $("li" , ".logo").eq(6).html(
                str[3].toString().substr(1,1)
            )
        }
        
        // hours.innerHTML = (str[str.length - 3] - 2) < 10 ? "0"+ (str[str.length - 3] - 2 ): (str[str.length - 3] - 2 ) ;  //小时
        // minutes.innerHTML = (str[str.length - 2]) < 10 ? "0"+str[str.length - 2] : str[str.length - 2];  //分钟
        // seconds.innerHTML = (str[str.length - 1]) < 10 ? "0"+(str[str.length - 1]) :(str[str.length - 1]) ;  //秒

    }, 1000)
})