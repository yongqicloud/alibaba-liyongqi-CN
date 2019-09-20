requirejs.config({
    paths:{
          "jquery" : "https://cdn.bootcss.com/jquery/3.4.1/jquery",
          //   "swiper" : "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper",
          // 路径的起点 : 谁加载了config文件,那么就由作为路径的起点,以这个 起点开始编写相对路径;
          "common"      :  "./javascripts/common",
          "swiperbanner":  "./javascripts/swiperBanner",
          "banner"      :  "./javascripts/banner",
          "magnifier"   :  "./javascripts/magnifier",
          "lazyloading" :  "./javascripts/lazyloading",
          "goback"      :  "./javascripts/goback",
          "tabcard"     :  "./javascripts/tabcard",
          "submenu"     :  "./javascripts/submenu",
          "pagination"  :  "./javascripts/pagination",
          "validated"   :  "./javascripts/validated",
          "rendercart"   :  "./javascripts/rendercart",
          "denglu"   :  "./javascripts/denglu",
          "setcookie"   :  "./javascripts/setcookie",
          "settime"   :  "./javascripts/settime",
    }
})