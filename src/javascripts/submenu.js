
;(function(factory){
    if(typeof define === "function" && define.amd){
        define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
})(function($){
    // 吸顶效果
    var abs_top = $(".next-search").offset().top;
    $(window).scroll(function(){
        var scroll_top =  $("body,html").scrollTop()
        if(scroll_top >= abs_top){
            $(".search-father").css({
                position : "fixed",
                left : 0,
                top : 0,
                width:"100%",
                height:50,
                background : "#fff",
                "z-index" : 10000
            });
            $(".next-search").css({
                position : "fixed",
                left :"calc(50% - 384px)",
                top : 0,
                "z-index" : 10000
            });
        }
        else{
            $(".next-search").css({
                position : "static"
            })
            $(".search-father").css({
                position : "static",
                width : 0,
                height: 0,
            })
        }
    })

    // 二级菜单
    $(".input-msg").on("click",function(evt){
        $(this).children().eq(2).css({
            display : "block"

        })
        evt.stopPropagation();
    })
    // 滚动新闻
    $(".next-medium").on("click",function(evt){
        // console.log($(this).children().eq(1))
        $(this).children().eq(1).css({
            display : "block"
        })
        evt.stopPropagation();
    })
    // $("document").on("click",function(){
    //     $(".sub-menu").css({
    //         display : "none"
    //     })
    // })
    document.onclick = function(){
        $(".input-msg .sub-menu").css({
            display : "none"
        })
        $(".next-medium .sub-menu").css({
            display : "none"
        })
    }

    // index.html吸顶效果
    
    // console.log(abs_top);
    


})