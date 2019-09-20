// define(["jquery"],function($){

// })
;(function(factory){
    if(typeof define === "function" && define.amd){
        define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.goback = function(ele){
        // new Goback().init(this);
        this.on("click",function(){
            // console.log(111);
            // 面向过程方法
            
            // document.body.scrollTop = 0 ;
            // document.documentElement.scrollTop = 0;
            $("body,html").animate({
                scrollTop : 0
            },1000)
        })
    }
})