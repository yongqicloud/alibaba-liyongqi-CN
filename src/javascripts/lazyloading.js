;
(function (factory) {
      if (typeof define === "function" && define.amd) {
            define(["jquery"], factory)
      } else {
            factory(jQuery);
      }
})(function($){
    // console.log($);
    var url = "https://dcms.1688.com/open/query.jsonp?app=DCMS&dataId=564&resourceId=850343&type=PC&scene_id=4&debug=y&zoom_window=0&rtnMode=1&to=5000&n=100&pageNo=4&useCookieMemberId=true&tagSceneId=1&fields=offerResourceDsForLike.offerId,offerResourceDsForLike.resultType,offerResourceDsForLike.impression_eurl,offerResourceDsForLike.volume30day,currentPromotionOfferTag.pcImg,sceneTagServiceForLike.content,od.subject,od.offerPicUrl,od.price,od.url,offerResourceDsForLike.offerPrice,offerResourceDsForLike.title,offerResourceDsForLike.pictUrl,offerResourceDsForLike.url"
    $.ajax(url,{
        dataType : "jsonp",
        type : " get",
        success : function(){ console.log("成功了")},
        // jsonp : "callback"
    })
    .then(function(res){
        console.log(res);
    })
})