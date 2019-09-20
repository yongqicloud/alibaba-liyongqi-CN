// console.log("i am tab");
;(function(factory){
    if(typeof define === "function" && define.amd){
        define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
})(function($){
    // console.log($(".news_top h2 span"));
    // console.log($(".content-list .card-son"));

    // 选项卡
    $(function(){
        $(".news_top h2 span").on("mouseover",function() {
            // console.log($(this).index());
            var _index = $(this).index();
            $(".content-list .card-son").eq(_index).siblings().css({
                display : "none"
            });
            $(".content-list .card-son").eq(_index).css({
                display : "block"
            })
        })
    })
    
    // 滚动新闻
    $(function(){
        var $height = $(".h-scroll p").eq(0).height()
        var $all_height =  $(".h-scroll p").length * $height;
        var count = 0;
        setInterval(function(){
            count ++;
            if(count === $(".h-scroll p").length || count === 0){
                $(".h-scroll p").eq(0).css({
                    marginTop : 0
                });
                count = 0;
            }else{
                $(".h-scroll p").eq(0).animate({
                    marginTop : "-=" + $height
                    
                },1000);
            }
        },2000)
    })

    // details 展开信息
    $(".show-tab").on("click",function(){
        var height = $(".tab-box").outerHeight();

        // console.log(height);
        if(height < 200 && height > 100){
            $(".tab-box").animate({
                height: 300
            },500)
            $(".show-tab").text("收回")
        }else if(height >200){
            $(".tab-box").animate({
                height:150
            },500)
            $(".show-tab").text("展开")
        }
    })
})