;
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else {
        factory(jQuery);
    }
})(function ($) {
    var data = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    function renderCart(data) {
        // console.log(data);
        var html = "";
        data.forEach((item, index) => {
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
                          <img src="${item.smallImage}" alt="">
                      </a>
                  </div>
                  <div class="goods-cart-main">
                      <div class="goods-tag">
                          <!-- <span></span> -->
                          <img src="https://img.alicdn.com/tfs/TB1ULpce1H2gK0jSZFEXXcqMpXa-144-28.jpg" alt="">
                      </div>
                      <div class="text-medium">${item.productName}</div>
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
                                  <a href="" class = "reduce-btn" >-</a>
                                  <input type="text" value = "${item.count}" class = "calc-piece">
                                  <a href="" class = "add-btn" >+</a>
                              </span>
                          </div>
                          <div class="set-unitprice">
                          ${item.promotionPrice ?item.promotionPrice : item.vipshopPrice}.00
                          </div>
                          <div class="set-rebate">--</div>
                          <div class="set-amont">${item.promotionPrice ?item.promotionPrice * item.count : item.vipshopPrice * item.count}.00</div>
                      </div>
                  </div>
                    <div class="panel-remove">
                    <a href="" class="iconfont icon-shoucang"></a>
                    <a href="" class="iconfont icon-delete delete-btn"></a>
                    </div>
              </div>
          </div>
              `
        });
        $(".active-cart-cont").html(function () {
            return $(".active-cart-cont").html() + html;
        });
        console.log("添加成功")
    }

    function bindEvent(data) {
        $(".delete-btn").on("click", function (evt) {
            deleteGoods.call(this,evt)
        })
        $(".reduce-btn").on("click",function(evt){
            var e = evt || event;
            e.preventDefault();
            reduceGoods.call(this);
        })
        $(".add-btn").on("click",function(evt){
            var e = evt || event;
            e.preventDefault();
            addGoods.call(this);
        })
    }

    function calc() {
        // 计算价格
        var price_count = 0;
        for(var i = 0 ; i < $(".set-amont").length ; i ++){
            // console.log($($(".set-amont")[i]).text());
            price_count += parseFloat($($(".set-amont")[i]).text()) ;
        }
        $(".calc-result").html(price_count + ".00")
        // 计算件数
        var num_count = 0;
        for(var i = 0 ; i < $(".calc-piece").length ; i ++){
            // console.log($($(".calc-piece")[i]).val());
            num_count += parseFloat($($(".calc-piece")[i]).val()) ;
        }

        $(".num-count").html(num_count);
    }
    function deleteGoods(evt){
            var index = $(this).parent().parent().parent().index();
            var e = evt || event;
            e.preventDefault()
            // alert("您确定要删除该商品吗？");
            var str = "您确定要删除该商品吗？"
            if(!confirm(str)){
                console.log(str);
                return false;
            }


            $(this).parent().parent().parent().remove();
            data.splice(index, 1);
            // console.log(data);
            localStorage.setItem("cart", JSON.stringify(data))
            calc();
    }
    
    function reduceGoods(){
        // console.log($(this).next().val());
        let num = $(this).next().val();
        num -- ;
        if(num <= 0){
            return false;
        }
        $(this).next().val(num)
        // console.log(
        //     $(  $(this).parent().parent().parent().children()[6] ).html()
        // )
        var price = Number($(  $(this).parent().parent().parent().children()[4] ).html());
        // console.log(price);
        // console.log(price * num);
        $(  $(this).parent().parent().parent().children()[6] ).html(price * num + ".00")
        calc();
    }
    function addGoods(){
        console.log($(this).prev().val());
        let num = $(this).prev().val();
        num ++ ;
        if(num <= 0){
            alert("请至少选择一个商品")
            return false;
        }
        $(this).prev().val(num);
        var price = Number($($(this).parent().parent().parent().children()[4]).html());
        $(  $(this).parent().parent().parent().children()[6] ).html(price * num + ".00")
        calc();
    }
    renderCart(data);
    bindEvent(data);
    calc()
    // $(".set-amont").forEach((item , index) => {
    //     console.log(item);
    // })
})