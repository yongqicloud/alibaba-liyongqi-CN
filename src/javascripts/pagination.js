;
(function (factory) {
      if (typeof define === "function" && define.amd) {
            define(["jquery"], factory)
      } else {
            factory(jQuery);
      }
})(function ($){
      var url = "https://mapi.vip.com/vips-mobile/rest/shopping/product/info/list/category/pc/v1?productIds=6917917372928623621%2C6918331649396744349%2C6918061992261837891%2C6918375075092202066%2C6917917381145666565%2C6917923680695026718%2C6918331649413619869%2C6918018610089238859%2C6918067520436601605%2C6918382425209816070%2C6918344265777000905%2C6918398032372437577%2C6918119678466093599%2C6918189399451333124%2C6918331649413574813%2C6918363222839809309%2C6918362078807684042%2C6918362103303611359%2C6918072069432406418%2C6918161613330408517%2C6918023029306913157%2C6918050371450573214%2C6918365060897990804%2C6918356239991923679%2C6918323956566426702%2C6918337249535502416%2C6918354626807691216%2C6918143026158404552%2C6918382431257064198%2C6918387754311897750%2C6918331649396756637%2C6918171882303693266%2C6918392461433619460%2C6917922629504451595%2C6918193914950484502%2C6918371910023201551%2C6918414329011106754%2C6918343165704376528%2C6918366325132566874%2C6918388075554353926%2C6918161724999767751%2C6918367771045848647%2C6918151795684439064%2C6918375008434365960%2C6918347119053518546%2C6918412779345036359%2C6918161613364081733%2C6918124308764533522%2C6918318191812253391&functions=brandShowName%2CsurprisePrice%2CpcExtra%2CpromotionPrice%2CbusinessCode%2CpromotionTips%2CprepayInfo%2CbanInfo%2Cstock&warehouse=VIP_BJ&mobile_platform=1&app_name=shop_pc&app_version=4.0&mars_cid=1568688631830_8594d2620f0c24ddd1abb7a65387131c&fdc_area_id=101101101&api_key=70f71280d5d547b2a7bb370a529aeea1&_=1568688664633"                  
      var url2 = "https://mapi.vip.com/vips-mobile/rest/shopping/product/info/list/category/pc/v1?productIds=6918353202641908500%2C6918162015087420568%2C6918386663117279691%2C6917917365837959813%2C6918033053852866202%2C6918415696714801929%2C6918325776003163284%2C6918351592066082059%2C6918373546432299614%2C6917925019085014170%2C6917925823550780570%2C6918392070759183378%2C6918414194758232007%2C6918317149312386242%2C6918397872500548767%2C6917921116385387725%2C6917926096542999188%2C6917924306402161807%2C6917919529420370690%2C6918070623477162776%2C6918412497403641927%2C6918376132271773724%2C6918337145931387932%2C6918061609577177479%2C6918171885926752722%2C6918412418892824647%2C6918354451113526932%2C6918171883466985938%2C6917919323366155278%2C6918376579376345223%2C6918357692323186188%2C6918376604883239709%2C6918345752292323988%2C6918351976594015255%2C6918357692272510476%2C6918385378294175684%2C6918372296469279559%2C6918357692272481804%2C6918357692272489996%2C6918414319515337565%2C6918372360334635670%2C6918374767714296920%2C6918351610261390339%2C6918384082634309783%2C6918363653101347268%2C6918363222722331933%2C6918421391000462555%2C6918385377435072452%2C6918395358259258116&functions=brandShowName%2CsurprisePrice%2CpcExtra%2CpromotionPrice%2CbusinessCode%2CpromotionTips%2CprepayInfo%2CbanInfo%2Cstock&warehouse=VIP_BJ&mobile_platform=1&app_name=shop_pc&app_version=4.0&mars_cid=1568724930705_0950ed7cd5f4c7fceca3f6a9cfd08788&fdc_area_id=101101101&api_key=70f71280d5d547b2a7bb370a529aeea1&_=1568725235646";
      
      $.ajax(url2, {
            dataType: "jsonp",
            type: "get",
            success: function () {
                  console.log("成功接收数据!");
            },
            error: function () {
                  console.log("error");
            }
      })
      .then(function(res){
            res = res.data.products;
            new Pagination().init(res)
      })

      class Pagination{
            constructor(){}
            init(data){
                  // console.log(data)
                  var _ = this;
                  this.data = data;
                  this.cart_data = [];
                  // console.log(this.data);
                  this.pageNo = 1;
                  this.showNo = 10;
                  // console.log($(".active-cart-cont"));
                  this.btn_count = Math.ceil(this.data.length / this.showNo);
                  this.render();
                  this.createBtn(this.btn_count);
                  this.bindEvent();
            }
            bindEvent(){
                  var _ = this
                  $(".btn-index").on("click",function(){
                        var index = $(this).text();
                        $(this).siblings().css({
                              color : "#000"
                        })
                        $(this).css({
                              color : "#ff3700"
                        })
                        _.pageNo = index;
                        _.render();
                  })
                  $(".btn-prev").on("click",function(){
                        if(_.pageNo <=1){
                              _.pageNo = 1;
                        }else{
                              _.pageNo --;
                        }
                        $(this).siblings().css({
                              color : "#000"
                        })
                        $(this).css({
                              color : "#ff3700"
                        })
                        _.render();
                  })
                  $(".btn-next").on("click",function(){
                        if(_.pageNo >= _.btn_count){
                              _.pageNo = _.btn_count;
                        }else{
                              _.pageNo ++;
                        }
                        $(this).siblings().css({
                              color : "#000"
                        })
                        $(this).css({
                              color : "#ff3700"
                        })
                        _.render();
                  })
                  $(".buy-me").on("click",function(evt){
                        var e = evt || event;
                        e.preventDefault();
                        _.addCart.call(this,_);
                  })
            }
            render(){
                  var html = "";
                  for(var i = this.showNo * (this.pageNo - 1); i < this.showNo * this.pageNo ; i ++){
                        if(!this.data[i]) break;
                        var num1 = parseInt(Math.random() * 50);
                        var num2 = parseInt(Math.random() * 10) * 10 +10;
                        html += `
                              <div class="main-item">
                                    <a href="" class="img-link">
                                          <div class="img-box">
                                                <img src="${this.data[i].smallImage}" alt="">
                                                <div class="buyed clearfix">
                                                      <img src="https://img.alicdn.com/tfs/TB1.LideHj1gK0jSZFuXXcrHpXa-14-18.png" alt="">
                                                      已售${num1}件
                                                </div>
                                                <div class="addr clearfix">
                                                      <img src="https://img.alicdn.com/tfs/TB1t0z6dHj1gK0jSZFuXXcrHpXa-21-26.png" alt="">
                                                      河北石家庄
                                                </div>
                                          </div>
                                    </a>
                                    <div class="info-box">
                                          <h2>
                                                <img src="https://img.alicdn.com/tfs/TB1Js0gtPTpK1RjSZKPXXa3UpXa-64-64.png" alt="">
                                                ${this.data[i].productName}
                                          </h2>
                                          
                                          <h3><div class="h-div">每200减20|跨店</div></h3>

                                          <h4 class="price-box">
                                                <span>￥</span>
                                                <b>${this.data[i].promotionPrice ? this.data[i].promotionPrice : this.data[i].vipshopPrice}</b>
                                                <strong>${this.data[i].marketPrice}</strong>
                                                <em>${num2}件起批</em>
                                          </h4>

                                          <button class = "buy-me" data-id = ${this.data[i].productId}-${i} >立即抢购</button>
                                    </div>
                              </div>
                        `
                  }
                  $(".coat-main").html(function(){
                        return  html;
                  });
                  this.bindEvent();
            }
            addCart(_){
                  var goods_index = $(this).attr("data-id").split("-")[1];
                  var goods_id = $(this).attr("data-id").split("-")[0];
                  var goods = _.data[goods_index];  
                  
                  let hasSame = _.cart_data.some((item ,index) => {
                        if(item.productId === goods_id){
                              goods.count ++;
                              return true;
                        }
                        return false;
                  });
                  if(!hasSame){
                        goods.count = 1;
                        _.cart_data.push(goods);
                        console.log(_.cart_data);
                  }
                  localStorage.setItem("cart",JSON.stringify(_.cart_data))
                  console.log($(this));
                  $(this).animate({
                        // background : "green"
                        width:"195",
                        height: "31",
                  },50,function(){
                        $(this).animate({
                              width:"194",
                              height: "30"  
                        })
                  })
                  // alert("添加购物车成功");
                  // _.renderCart();
                  // location.href = "http://localhost:8888/shoppingcart.html";
                  
            }
            renderCart(){
                  var data = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
                  console.log(data);
                  var html = "";
                  data.forEach((item,index) => {
                        html += `
                        <div class="content-card">
                        <h2>
                            <div class="company-title clearfix">
                                <span class="check-btn">
                                    <input type="checkbox">
                                </span>
                                <a href="" class="cmp-name">广州市露拉贸易有限公司</a>
                            </div>
                        </h2>
                        <div class="card-goods-body">
                            <div class="opt">
                                <span>
                                    <input type="checkbox">
                                </span>
                            </div>
                            <div class="goods-image">
                                <a href="">
                                    <img src="https://cbu01.alicdn.com/img/ibank/2018/899/384/9255483998_1782961829.80x80.jpg" alt="">
                                </a>
                            </div>
                            <div class="goods-cart-main">
                                <div class="goods-tag">
                                    <!-- <span></span> -->
                                    <img src="https://img.alicdn.com/tfs/TB1ULpce1H2gK0jSZFEXXcqMpXa-144-28.jpg" alt="">
                                </div>
                                <div class="text-medium">2019秋季新款日系女装工厂 收腰金属圈原宿机车风衣外套女3843</div>
                                <div class="write-tab">
                                    <div class="set-color">
                                        <dl>
                                            <dt>颜色:</dt>
                                            <dd>黑色</dd>
                                        </dl>
                                    </div>
                                    <div class="set-input">
                                        <span>
                                            <input type="checkbox">
                                        </span>
                                    </div>
                                    <div class="set-size">
                                        <dl>
                                            <dt>尺码:</dt>
                                            <dd>均码</dd>
                                        </dl>
                                    </div>
                                    <div class="set-count">
                                        <span>
                                            <a href="">-</a>
                                            <input type="text">
                                            <a href="">+</a>
                                        </span>
                                    </div>
                                    <div class="set-unitprice">
                                        89.00
                                    </div>
                                    <div class="set-rebate">--</div>
                                    <div class="set-amont">1691.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                        `
                  });
                  // $(".active-cart-cont").html(function(){
                  //       return $(".active-cart-cont").html() + html;
                  // })
                  // _.ele.html(html);
                  console.log($(".active-cart-cont"));
                  console.log("添加成功")
            }
            createBtn(length){
                  let   html = `    
                                    <a href="javascript:void(0)" aria-label="Previous" class = "btn-prev">
                                          <span aria-hidden="true">&laquo;</span>
                                    </a>
                              `
                        
                        for(var i = 1 ; i <= length; i ++ ){
                              html += `<a href="javascript:void(0)" class = "btn btn-index">${i}</a>`
                        }
                        
                        html  += `
                                    <a href="javascript:void(0)" aria-label="Next" class = "btn-next">
                                          <span aria-hidden="true">&raquo;</span>
                                    </a>
                              `
                        $(".page-btn-box").html(html)
            }
      }

})