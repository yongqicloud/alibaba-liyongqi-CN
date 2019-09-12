;(function(factory){
    if(typeof define === "function" && define.amd){
          define(["jquery"] ,factory)
    }else{
          factory(jQuery);
    }
})(function($){
//     console.log($(".img-list-cont").children());
     
            // 主盒
            function Magnifier(){};
            Magnifier.prototype.init = function(){
                this.magnifier = $(".goods-box")
            //     console.log(this.magnifier);
                
                this.box_small = $(".img-box",".goods-box").eq(0);
                this.box_big =  $(".img-big-box");
                this.cubes = $(".cubes");
                this.choice_btn =$(".img-list-cont");
                this.img = this.box_big.children();
            //     console.log(this.img);
                this.offset_pos = {
                    top : this.magnifier.offset().top,
                    left : this.magnifier.offset().left
                }
                console.log(this.offset_pos);
                this.left = 0;
                this.top = 0;
                console.log(this.magnifier,this.box_small,this.box_small);
                this.bindEvent();
            }
            Magnifier.prototype.bindEvent = function(){
                  this.box_small.on("mouseover", this.toggle.bind(this,"show"));
                  this.box_small.on("mouseout",  this.toggle.bind(this,"hide"));
                  this.box_small.on("mousemove", this.cubeMove.bind(this));
                  this.box_small.on("mousemove", this.bigImgMove.bind(this));
            }
            Magnifier.prototype.toggle = function(value){
                  if(value === "show"){
                        this.cubes.css({
                              display : "block"
                        })
                        this.box_big.css({
                              display : "block"
                        })
                        return false;
                  }
                  this.cubes.css({
                        display : "none"
                  })
                  this.box_big.css({
                        display : "none"
                  })

            }
            Magnifier.prototype.cubeMove = function(evt){
                  var e = evt || event;
                  // console.log(e);
                  var clientX = e.clientX;
                  var clientY = e.clientY;
                  var _left = clientX - this.offset_pos.left - 100 ;
                  var _top  = clientY - this.offset_pos.top - 100;
                  _left = _left < 0 ? 0 : _left;
                  _left = _left > 180 ? 180 : _left;
                  _top  = _top < 0 ? 0 : _top;
                  _top  = _top > 180 ? 180 : _top;
                  this.left = _left;
                  this.top  = _top;
                  
                  this.cubes.css({
                        left:_left ,
                        top : _top
                  })
                  // console.log(_left , _top);
                  
            }
            Magnifier.prototype.bigImgMove = function(){
                  this.img.css({
                        left : - this.left,
                        top : - this.top
                  })
            }
            var magnifier = new Magnifier()
            magnifier.init();
            // this.box_small.on("mouseover",this.toggle.bind(this,"show"))
            // this.box_small.on("mouseout",this.toggle.bind(this,"hide"))
            // this.box_small.on("mousemove",this.this.cubesMove.bind(this))
            // this.box_small.on("mousemove",this.enlargeMove.bind(this))

       
})