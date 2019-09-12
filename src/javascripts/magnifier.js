;
(function (factory) {
      if (typeof define === "function" && define.amd) {
            define(["jquery"], factory)
      } else {
            factory(jQuery);
      }
})(function ($) {

      // 主盒
      function Magnifier() {};
      Magnifier.prototype.init = function () {
            this.magnifier = $(".goods-box")
            // console.log(this.magnifier);
            this.box_small = $(".img-box", ".goods-box").eq(0);
            this.box_big = $(".img-big-box");
            this.cubes = $(".cubes");
            this.choice_btn = $(".img-list-cont").children();
            this.img_big = this.box_big.children()[0];
            this.img_small = this.box_small.children()[0];
            var _ = this;
            this.offset_pos = {
                  top: this.magnifier[0].offsetTop,
                  left: this.magnifier[0].offsetLeft
            }
            // console.log(this.offset_pos);
            _.index = 0;
            this.img_data =  [
                  {
                        small : "https://cbu01.alicdn.com/img/ibank/2019/719/936/11764639917_1002560973.400x400.jpg", 
                        big   : "https://cbu01.alicdn.com/img/ibank/2019/517/137/11728731715_1002560973.jpg"
                  },
                  {
                        small :  "https://cbu01.alicdn.com/img/ibank/2019/674/546/11764645476_1002560973.400x400.jpg",
                        big   :  "https://cbu01.alicdn.com/img/ibank/2019/674/546/11764645476_1002560973.jpg"
                  },
                  {
                        small : "https://cbu01.alicdn.com/img/ibank/2019/866/437/11728734668_1002560973.400x400.jpg",
                        big   : "https://cbu01.alicdn.com/img/ibank/2019/866/437/11728734668_1002560973.jpg"
                  }
            ]
            // console.log(this.offset_pos);
            this.left = 0;
            this.top = 0;
            // console.log(this.magnifier, this.box_small, this.box_small);
            this.bindEvent();
      }
      Magnifier.prototype.bindEvent = function () {
            this.box_small.on("mouseover", this.toggle.bind(this, "show"));
            this.box_small.on("mouseout", this.toggle.bind(this, "hide"));
            this.box_small.on("mousemove", this.cubeMove.bind(this));
            this.box_small.on("mousemove", this.bigImgMove.bind(this));
            var _ = this;
            // 切换图片
            this.choice_btn.on("click",function(){
                  _.index = $(this).index();
                  _.img_small.src = _.img_data[_.index].small;
                  _.img_big.src   = _.img_data[_.index].big;

                  // this.img_small.attr("src",)
                  // this.img_big.attr("src",)
                  
            })
      }
      Magnifier.prototype.toggle = function (value) {
            if (value === "show") {
                  this.cubes.css({
                        display: "block"
                  })
                  this.box_big.css({
                        display: "block"
                  })
                  return false;
            }
            this.cubes.css({
                  display: "none"
            })
            this.box_big.css({
                  display: "none"
            })

      }
      Magnifier.prototype.cubeMove = function (evt) {
            var e = evt || event;
            // console.log(e);
            var clientX = e.clientX;
            var clientY = e.clientY;
            var _left = clientX - this.offset_pos.left - 100;
            var _top = clientY - this.offset_pos.top - 100;
            _left = _left < 0 ? 0 : _left;
            _left = _left > 180 ? 180 : _left;
            _top = _top < 0 ? 0 : _top;
            _top = _top > 180 ? 180 : _top;
            this.left = _left;
            this.top = _top;

            this.cubes.css({
                  left: _left,
                  top: _top
            })
            // console.log(_left , _top);
      }
      Magnifier.prototype.bigImgMove = function () {
            this.img_big.style.left = - this.left + "px";
            this.img_big.style.top = - this.top + "px";

            // css({
            //       left: - this.left,
            //       top: - this.top
            // })
      }


      var magnifier = new Magnifier()
      magnifier.init()

})