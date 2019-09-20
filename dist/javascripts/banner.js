
;(function(factory){
    if(typeof define === "function" && define.amd){
          define(["jquery"] ,factory)
    }else{
          factory(jQuery,swiper);
    }
})(function($){
    // index 轮播
    // var mySwiper = new swiper(".swiper-container",{
    //     autoplay : true,
    // })
    
    /**
 * 
 * 
 * 
 */
    class Banner {
        constructor(selector, option = {}) {
            this.container = Banner.$(selector);
            this.wrapper = Banner.$(selector + " .wrapper");
            this.slides = this.wrapper.children;
            this.container_width = this.container.offsetWidth;
            this.autoPlay_timer = null;
            this.index = 0;
            this.previousIndex = 0;
            this.effect = option.effect ? option.effect : "slide"
            option.navigation ? this.navigation(option.navigation) : "";
            if(option.autoplay){
                this.autoPlay();
                this.autoPlayEvent();
            }
            this.init();
        }
        init() {
            if(this.effect === "slide"){
                this.wrapper.className += " sliver";
                let clone = this.slides[0].cloneNode(true);
                this.wrapper.appendChild(clone);
                this.slides = this.wrapper.children;
                this.wrapper.style.width = this.slides.length * this.wrapper.offsetWidth + "px";
            }
            if(this.effect === "fade"){
                this.slides[this.index].className += " show"
                this.wrapper.className += " gathering"
            }
        }
        autoPlay() {
            clearInterval(this.autoPlay_timer);
            this.autoPlay_timer = setInterval(this.change.bind(this, "next"), 3000)
        }
        autoPlayEvent() {
            this.container.addEventListener("mouseover", () => {
                clearInterval(this.autoPlay_timer);
            })
            this.container.addEventListener("mouseout", () => {
                this.autoPlay();
            })
        }
        nextIndex() {
            this.previousIndex = this.index;
            if (this.index === this.slides.length - 1){
                this.effect === "slide" ? this.wrapper.style.left = 0 : "";
                this.index = this.effect === "slide" ? 1 : 0;
            }else {
                this.index++;
                // console.log(this.index);
            }
        }
        prevIndex() {
            this.previousIndex = this.index;
            if (this.index === 0) {
                this.effect === "slide" ? this.wrapper.style.left = -(this.slides.length - 1) * this.container_width + "px" : ""; 
                this.index = this.effect === "slide" ? this.slides.length - 2 : this.slides.length - 1;
            } else {
                this.index--;
            }
        }
        navigation(selector){
            this.prevEl = Banner.$(selector.prevEl);
            this.nextEl = Banner.$(selector.nextEl);
            // console.log(this.prevEl,this.nextEl);
            if(this.nextEl.nodeType !== 1 || this.prevEl.nodeType !==1){
                return console.warn("you are wrong");
            }
            this.prevEl.addEventListener("click", this.change.bind(this, "prev"));
            this.nextEl.addEventListener("click", this.change.bind(this, "next"));
        }
        change(turn) {
            if (turn === "prev") {
                this.prevIndex();
                this.animate();
            }
            if (turn === "next") {
                this.nextIndex();
                this.animate();
            }
        }
        animate() {
            if(this.effect === "slide"){
                move(this.wrapper, {
                    left: -this.index * this.container_width
                })
            }
            if(this.effect === "fade"){
                this.removeClassName();
                this.slides[this.index].className += " show"
                this.slides[this.previousIndex].className += " prev-show"
                this.slides[this.index].style.opacity = 0;
                move(this.slides[this.index],{
                    opacity : 100
                })
            }
            
        }
        // 元素选择器
        static $( selector ){
            let ele = null;
            return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
        }
        removeClassName(){
            Array.from(this.slides).forEach( slide => {
                slide.className =  slide.className.replace(/\s?(show|prev-show)/g,"");
            })
        }
    }
    function move(dom, attr_list, callback) {
        attr_list = cloneObject(attr_list);
        clearInterval(dom.timer)
        dom.timer = setInterval(function () {
            for (var attr in attr_list) {
                if (typeof attr_list[attr] !== "object") {
                    attr_list[attr] = {
                        target: attr_list[attr],
                        now: attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr])
                    }
                }
                var speed = (attr_list[attr].target - attr_list[attr].now) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                attr_list[attr].now += speed;
                dom.style[attr] = attr === "opacity" ? attr_list[attr].now / 100 : attr_list[attr].now + "px";
                if (speed === 0) {
                    delete attr_list[attr];
                    //判定是否为空 ;
                    var count = 0;
                    for (var key in attr_list) {
                        count++;
                    }
                    if (count === 0) {
                        clearInterval(dom.timer);
                        typeof callback === "function" ? callback() : "";
                    }
                }
            }
        }, 50)
    }
    function cloneObject(obj) {
        var clone = {};
        for (var attr in obj) {
            clone[attr] = obj[attr]
        }
        return clone;
    }
    new Banner(".details-container",
        {
            autoplay: true, 
            effect: 'slide',
            navigation : {
                prevEl: ".del-prev-btn",
                nextEl: ".del-next-btn",
            }
        }
    );
    // new Banner(".swiper-container",
    //     {
    //         autoplay: true, 
    //         effect: 'slide',
    //         // navigation : {
    //         //     prevEl: ".del-prev-btn",
    //         //     nextEl: ".del-next-btn",
    //         // }
    //     }
    // );
})