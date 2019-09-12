// define(["jquery"],function($){
//       console.log($);
// })
;(function(factory){
    if(typeof define === "function" && define.amd){
          define(["jquery"] ,factory)
    }else{
          factory(jQuery);
    }
})(function($){
    // banner图; 局部方法;
    // 因为调用者是jquery实例(jQueryDOM) , 我们要操作的this其实就是这个实例;
    
    // $.fn.banner = function(options){
    //     // new Banner.init(this,options);

    // }
    // function Banner(){}
    // $.extend(Banner.prototype,{
    //     init : function(container,options){
    //         //目标元素（this）
    //         this.$container = container;
    //         this.$next_btn = $(options.btns.next,container)
    //         this.$prev_btn = $(options.btns.prev,container)
    //         this.$slide = $(options.slide,container)
    //         this.index = 0;
    //         this.prev_index = 0;
    //         this.bindEvent();
    //     },
    //     bindEvent : function(){
    //         this.$prev_btn.on("click",this.changeIndex.bind(this,"prev"));
    //         this.$next_btn.on("click",this.changeIndex.bind(this,"next"));
    //     },
    //     changeIndex : function(turn){
    //         if(turn === "prev"){
    //             this.index --;

    //         }else if(turn === "next"){
    //             this.index ++;
    //         }


    //     }
    // })
})