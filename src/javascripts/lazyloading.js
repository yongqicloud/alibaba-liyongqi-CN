;
(function (factory) {
      if (typeof define === "function" && define.amd) {
            define(["jquery", "common"], factory)
      } else {
            factory(jQuery, common);
      }
})(function ($, common) {
      // var url = "https://dcms.1688.com/open/query.jsonp?app=DCMS&dataId=564&resourceId=850343&type=PC&scene_id=4&debug=y&zoom_window=0&rtnMode=1&to=5000&n=100&pageNo=4&useCookieMemberId=true&tagSceneId=1&fields=offerResourceDsForLike.offerId,offerResourceDsForLike.resultType,offerResourceDsForLike.impression_eurl,offerResourceDsForLike.volume30day,currentPromotionOfferTag.pcImg,sceneTagServiceForLike.content,od.subject,od.offerPicUrl,od.price,od.url,offerResourceDsForLike.offerPrice,offerResourceDsForLike.title,offerResourceDsForLike.pictUrl,offerResourceDsForLike.url"
      // 唯品会数据
      var url = "https://mapi.vip.com/vips-mobile/rest/shopping/product/info/list/category/pc/v1?productIds=6917917372928623621%2C6918331649396744349%2C6918061992261837891%2C6918375075092202066%2C6917917381145666565%2C6917923680695026718%2C6918331649413619869%2C6918018610089238859%2C6918067520436601605%2C6918382425209816070%2C6918344265777000905%2C6918398032372437577%2C6918119678466093599%2C6918189399451333124%2C6918331649413574813%2C6918363222839809309%2C6918362078807684042%2C6918362103303611359%2C6918072069432406418%2C6918161613330408517%2C6918023029306913157%2C6918050371450573214%2C6918365060897990804%2C6918356239991923679%2C6918323956566426702%2C6918337249535502416%2C6918354626807691216%2C6918143026158404552%2C6918382431257064198%2C6918387754311897750%2C6918331649396756637%2C6918171882303693266%2C6918392461433619460%2C6917922629504451595%2C6918193914950484502%2C6918371910023201551%2C6918414329011106754%2C6918343165704376528%2C6918366325132566874%2C6918388075554353926%2C6918161724999767751%2C6918367771045848647%2C6918151795684439064%2C6918375008434365960%2C6918347119053518546%2C6918412779345036359%2C6918161613364081733%2C6918124308764533522%2C6918318191812253391&functions=brandShowName%2CsurprisePrice%2CpcExtra%2CpromotionPrice%2CbusinessCode%2CpromotionTips%2CprepayInfo%2CbanInfo%2Cstock&warehouse=VIP_BJ&mobile_platform=1&app_name=shop_pc&app_version=4.0&mars_cid=1568688631830_8594d2620f0c24ddd1abb7a65387131c&fdc_area_id=101101101&api_key=70f71280d5d547b2a7bb370a529aeea1&_=1568688664633"
      var url2 = "https://list.vip.com/api-ajax.php?callback=getMerchandiseDroplets1&getPart=getMerchandiseInfoList&productIds=6918290918242189463%2C6917926079434892183%2C6918185139131831127%2C6918072065735283656%2C6918041962308670481%2C6917960914342941393%2C6917911398544319633%2C6917911443265229969%2C6918204057708994769%2C6918069223692591441%2C6918254677819806033%2C6918204056866332881%2C6917911362984858513%2C6918101444491477457%2C6917911246577648337%2C6918069223709413713%2C6918424169113870529%2C6917911299536065297%2C6918010088259421841%2C6918204056343875793%2C6918210135945458184%2C6918101444676833745%2C6917911283762163985%2C6917981141205669137%2C6917911381206078161%2C6918101444727357905%2C6917960914376573649%2C6918101444558926289%2C6918373367638771665%2C6918171145450062801%2C6918424170574446785%2C6917916791349417033%2C6917960914511241937%2C6917911634926968977%2C6917916791735911177%2C6918424168572240065%2C6918101444542067153%2C6917911399735620241%2C6918204056664064209%2C6918101444542013905%2C6917911634878362513%2C6918072065735304136%2C6917981141542339857%2C6918168880885989591%2C6918160617847780296%2C6918424161270272193%2C6917911355332354193%2C6918121827267438545%2C6918121826458302417%2C6918395535586734280&r=100367905&preview=0&sell_time_from=&time_from=&token=&functions=banInfo&_=1568895659104";
      var url3 = "https://stock.vip.com/merchandise/?&mids=6917969323610019088%2C6918361686876500117%2C6917919853494219481%2C6918133025414455949%2C6918180730212353817%2C6918382353038448276%2C6917923865804759699%2C6917951530100323220%2C6918345662719144602%2C6917921555908662156%2C6917920720600941468%2C6917925675356132501%2C6918141729350661271%2C6918414264685699914%2C6918175631765534612%2C6918305394121979284%2C6917925648585298624%2C6917925340076589772%2C6917926839250014868%2C6917917520271975572%2C6917920287778690050%2C6917919753739523074%2C6918415307191451717%2C6918175823363995540%2C6917926398954488471%2C6918175631361451924%2C6918408444611409674%2C6917923602961805972%2C6917919629388170251%2C6918189425713717785%2C6918175631479392148%2C6918224410488473300%2C6917922927084368916%2C6917920276220626050%2C6918083751378203162%2C6917918127526380234%2C6917919753851016322%2C6917923299255891090%2C6917923870023942804%2C6918263166817108571%2C6917924256231064212%2C6917920587301303314%2C6917935177365812252%2C6917923604640805524%2C6918238462881933008%2C6918392582971357274%2C6917917717857194123%2C6917920102872097500%2C6917923604120224404%2C6917917946482648202&area_id=101101101&mars_cid=1568724930705_0950ed7cd5f4c7fceca3f6a9cfd08788&realSale=false&stockType=0&is_mobile=0&is_old=0&fields=min%2Cmax%2Cstock%2Ctype&_=1568896497681";
      var load_src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567146377555&di=f269a1b9f464ca3a39e7b7f58beef964&imgtype=0&src=http%3A%2F%2Fs1.sinaimg.cn%2Fmw690%2F006IXq7Gzy7aCjWCS1Dcd";
      $.ajax(url, {
                  dataType: "jsonp",
                  type: "get",
                  success: function () {
                        console.log("成功接收懒加载数据!");
                  },
                  error: function () {
                        console.log("error");
                  }
            })
            .then(function (res) {
                  // console.log(res);
                  console.log(res.data);
                  // 获取列表信息
                  var $data = res.data.products;
                  // console.log($data);
                  var html = "";
                  for (var i = 0; i < $data.length; i++) {
                        var num = parseInt(Math.random() * 500);
                        html += `
                              <div class="box-item clearfix">
                                    <a href="" class="box-link">
                                          <div class="img-box">
                                                 <img src="${load_src}" data-src ="${$data[i].smallImage}" alt="" class="lazy-load">
                                          </div>
                                          <div class="goods-box">
                                                <header>
                                                      <h3><i></i>${$data[i].productName}</h3>
                                                </header>

                                                <h4>
                                                      <span>每200减20|跨店</span>
                                                      <span>满268元包邮</span>
                                                </h4>
                                                <h5>
                                                      <span>
                                                            <em>￥</em>
                                                            <em>${$data[i].promotionPrice ? $data[i].promotionPrice : $data[i].vipshopPrice}</em>
                                                      </span>
                                                      <span>已售${num}件</span>
                                                </h5>
                                          </div>
                                    </a>
                              </div>
                        `
                  }
                  // 渲染页面
                  $(".rec-offer-list-cont").html(function(){
                        return $(".rec-offer-list-cont").html() + html;
                  });
                  // lazyload(".box-item");
                  lazyload(".lazy-load");
                  $(".box-item").on("click",function(evt){
                        var e = evt || event;
                        e.preventDefault();
                        location.href = "http://localhost:8888/details.html";
                        alert();
                  })
            })
      // function lazyLoad(selector){
      //       var ele_list = $(selector);
      //       var top_Array = [];
      //       for(var i = 0 ; i < ele_list.length ; i ++){
      //             top_Array.push(ele_list[i].offsetTop);
      //       }
      //       var client_height =  document.documentElement.clientHeight;
            
      //       window.onscroll = ifLoading;
      //       function ifLoading(){
      //             var scroll_top = document.body.scrollTop || document.documentElement.scrollTop;
      //             // console.log(client_height,scroll_top);
      //             var lt = 0;
      //             for(var i = ele_list.length - 1 ; i >= 0 ; i --){
      //                   if(scroll_top + client_height > top_Array[i]){
      //                         lt = i;
      //                         break;
      //                   }
      //             }
      //             for(var i = lt ; i > 0 ; i --){
      //                   var ele = $(ele_list[i])[0];
      //                   // console.log($(".lazy-load" , ele).attr("src"))
      //                   loadImg( $(".lazy-load" , ele)[0] , $(".lazy-load" , ele).attr("src"));
      //             }
      //       }
      // }
      function lazyload( selector ){
            var imgs = document.querySelectorAll(selector);
            // console.log(imgs);
            var topArray = [];
            for(var i = 0 ; i < imgs.length ; i ++){
                  topArray.push(imgs[i].offsetTop);
            }
            var ch = document.documentElement.clientHeight;
            // 屏幕显示的高度是多少 ?  scrollTop  + clientHeight;
            window.onscroll = ifload;
            function ifload(){
                  if(!lazyload.hasImg) return false;
                  var st = document.body.scrollTop || document.documentElement.scrollTop;
                  // 判定显示图片的下标;
                  var lt = 0;
                  for(var i = topArray.length - 1 ; i >= 0; i -- ){
                        if(ch + st > topArray[i]){
                              lt = i;
                              break;
                        }
                  }
                  for(var i = lt ; i >= 0 ; i--){
                        if(imgs[i].loaded) break;
                        imgs[i].loaded = true;
                        // console.log(imgs[i]);
                        loadImg( imgs[i] , $(imgs[i]).attr("data-src"));
                        // loadImg( imgs[i] , imgs[i].getAttribute("data-src") );
                  }
                  if(lt === imgs.length - 1){
                        lazyload.hasImg = false;
                  }
            }
            lazyload.hasImg = true;
            ifload();
      }     
      function loadImg(img,src){
            var temp = new Image();
            temp.src = src;
            temp.onload = function(){
                  img.src = src;
            }
      }


      $(".huopin-offer-box,.card-venue,.icon-item,.grid,.slide").on("click",function(evt){
            var e = evt;
            e.preventDefault();
            location.href = "http://localhost:8888/productlist.html";
      })
      // $(".huopin-offer-box").on("click",function(evt){
      //       var e = evt;
      //       e.preventDefault();
      //       location.href = "http://localhost:8888/productlist.html";
      // })
})