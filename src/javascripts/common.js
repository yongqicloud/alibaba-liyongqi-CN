/**
 * 通用封装仓库
 * 
 * 作者 : GP14
 * 
 * v : 0.0.1  
 * 
 * time : 2019/08/06
 * 
 *  */ 


/**
 * countDown : 倒计时方法;
 * @param {string : "2019/08/10" | array : [2019,8,10] } time * 必填参数; 
 * @param {string : "date"} [,accuracy]  表示返回的日期经度为天;
 */

function countDown(time , accuracy){
      var timer_string =  typeof time === "string" ? time : time.join("/");
      var reduce = (new Date(timer_string).getTime() - Date.now()) / 1000;
      var hour   = parseInt(reduce / 3600);
      var minute = parseInt(reduce / 60 % 60 );
      var second = parseInt(reduce % 60);
      var res_array = [ minute , second];
      if(accuracy  === "date"){
             var date = parseInt(hour / 24);
             hour = hour % 24;
             res_array = [date,hour].concat(res_array);
      }else{
            res_array.unshift(hour);
      }
      return res_array;
 }

/**
 * 
 * @param {number 月份} month 
 * @param {number 非必填 年份} year 
 */
 
function createMonthArray(month , year){
      var d = new Date();
      year ? d.setFullYear(year) : ""; 
      d.setMonth(month - 1);
      d.setDate(1);
      var day = d.getDay();
      var firstDay =  (day === 0 ? 7 : day);
      d.setMonth(d.getMonth() + 1);
      d.setDate(0);
      var allDays = d.getDate();
      d.setDate(0);
      var prevMonthLastDate = d.getDate();
      var monthArray = [];
      var nextMonth = false;
      for(var week = 0 , date_count = 0; week < 6 ; week ++){
            var week_array = [];
            for(var day = 0 ; day < 7 ; day ++){
                  if(week === 0){
                        if(day >= firstDay - 1){
                              date_count ++;
                              week_array[day] = date_count
                        }else{
                              week_array.push([prevMonthLastDate - (firstDay - 2 - day)]);
                        }
                  }else{
                        date_count++
                        nextMonth ? week_array.push([date_count]) : week_array.push(date_count);
                        if(allDays === date_count){
                              date_count = 0;
                              nextMonth  = true;
                        }
                  }
            }
            monthArray.push(week_array)
      }

      return monthArray;
  }

  /**
   * 选择器
   * @param {*} selector 
   */
 function $( selector ){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
/**
 * 事件监听
 * @param {元素 } ele 
 * @param {事件类型} event_type 
 * @param {事件处理函数} callback 
 */

function on(ele,event_type,callback){
      if(ele.addEventListener){
            ele.addEventListener(event_type,callback)
      }else if(ele.attachEvent){
            ele.attachEvent("on" + event_type,callback)
      }else{
            ele[event_type] = callback;
      }
}
/**
 * 事件监听移除
 * @param {元素 } ele 
 * @param {事件类型} event_type 
 * @param {事件处理函数} callback 
 */


function off(ele,event_type,callback){
      if(ele.removeEventListener){
            ele.removeEventListener(event_type,callback)
      }else if(ele.detachEvent){
            ele.detachEvent("on" + event_type,callback)
      }else{
            ele[event_type] = null;
      }
}


function move( dom , attr_list , callback ){
      attr_list = cloneObject(attr_list);
      clearInterval(dom.timer)
      dom.timer = setInterval(function(){
            for(var attr in attr_list){
                if(typeof attr_list[attr] !== "object"){
                  attr_list[attr] = {
                        target : attr_list[attr],
                        now    : attr === "opacity" ?parseInt(getComputedStyle(dom)[attr] * 100) :parseInt(getComputedStyle(dom)[attr])
                  }
                }
                var speed = (attr_list[attr].target - attr_list[attr].now) / 10;
                speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
                attr_list[attr].now += speed;
                dom.style[attr] = attr === "opacity"? attr_list[attr].now / 100 : attr_list[attr].now + "px";
                if(speed === 0){
                  delete attr_list[attr];
                  //判定是否为空 ;
                  var count = 0;
                  for(var key in attr_list){
                        count ++;
                  }
                  if(count === 0){
                        clearInterval(dom.timer);
                        typeof callback === "function" ? callback() : "";
                  }
                }
            }
      },50)
}
function cloneObject(obj){
      var clone = {};
      for(var attr in obj){
            clone[attr] = obj[attr]
      }                  
      return clone;
}
/**
 * 
 * @param {*string} key 
 * @param {string} path 
 */

function removeCookie( key , path){
      cookie(key , "123" , {
            expires : -1,
            path : path ? path : ""
      })
}     
/**
 * 
 * @param {*string} key 
 * @param {*string} value 
 * @param {object} options 
 */


function cookie(key , value , options){
      if(arguments.length === 1){
            var arr = document.cookie.split("; ");
            var res = "";
            arr.some( function(item){
                  item = item.split("=");
                  return res = item[0] === key ? item[1] : "";
            })
            return decodeURIComponent(res);
      }
      typeof options !== "object" ? options = {} : "";
      if(options.expires) var d = new Date();
      // console.log((d.setDate(d.getDate() + options.expires) && d))


      return document.cookie = [
            key+"="+value+";",
            options.domain ? "domain="+options.domain + ";" : "",
            options.path ? "path=" + options.path + ";" : "",
            options.expires ? "expires=" + (d.setDate(d.getDate() + options.expires) && d) + ";" :"",
      ].join("");
}
/**
 * 
 * @param {string} url 
 * @param {object} options 
 * {
 *    data : {},
 *    type : "GET" | "POST",
 *    callback: function(){}
 * } 
 */

function ajax( url , options ){
      options = options ? options : {};
      options.type ? "" : options.type = "GET";
      return new Promise(function( resolve , reject ){
            // 拼接options.data;
            var temp_data = "";
            if(typeof options.data === "object"){
                  // console.log(options.data);
                  for(var attr in options.data){
                        temp_data += (temp_data ?  "&" : "") +  attr + "=" + options.data[attr] 
                  }
            }
            options.type == "GET" ? url += (/\?/.test(url) ? "&" : "?") + temp_data : "";
            var xhr = new XMLHttpRequest();
            xhr.open(options.type ? options.type : "GET",url);
            options.type  === "POST" ? xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;") : "";
            xhr.send(options.type  === "POST" ? temp_data : null);
            xhr.onreadystatechange = function(){
                  if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(xhr.responseText);
                        typeof options.callback === "function" ? options.callback(xhr.responseText):"";
                  }
            }
      })
    
}     

function delegation( parent_ele , event_type , selector , callback ){
      parent_ele.addEventListener(event_type,function(evt){
            var e = evt || event;
            // 事件源;
            var target = e.target || e.srcElement;
            // 事件触发列表：
            var event_family = [];
            for(var temp = target; temp != parent_ele ; ){
                  event_family.push(temp);
                  temp = temp.parentNode;
            }
            // 缓存;
            parent_ele.cacheChildren  = Array.from(parent_ele.querySelectorAll(selector));
            // console.log(parent_ele.cacheChildren);
            // 判定[事件触发列表] 里面的元素是否在[白名单]之中;
            for(var i = 0 ; i < parent_ele.cacheChildren.length ; i ++){
                  // 白名单的个体;
                  var ele = parent_ele.cacheChildren[i]
                  var _temp = null;
                  if((_temp = event_family.indexOf(ele)) !== -1){
                        e.target = event_family[_temp]
                        callback(e);
                        break;
                  }
            }
      })
}
/**
 * 
 * 观察者模式
 * 
 */
class Obs{
      constructor(){
            this.list = {};
      }
      add( type  , fn ){
            if( !this.list[type] ){
                  this.list[type] = [];
            }
            this.list[type].push(fn);
      }
      publish( type , msg ){
           this.list[type] instanceof Array ?this.list[type].forEach( fn => {
                  fn(msg);
            }) : "";
      }
}

function addClass( dom , className ){
      var reg = new RegExp("\s?"+className,"g");
      dom.className =  dom.className.replace(reg , "") + " " + className;
}

function removeClass( dom , className ){
      var reg = new RegExp("\s?"+className,"g");
      dom.className =  dom.className.replace(reg , "");
}

class Component{
      constructor(){}
      async init( url , selector , options ){
            // 默认参数;
            let defualt = {
                  type : "GET"
            }
            this.options = options ? Object.assign(defualt,options) : defualt;

            this.ele = $(selector);
            this.url = url;
            this.data = await this.load();
            this.ele.innerHTML = this.render(this.data);
      }     
      async load(){
            let res = await ajax(this.url , this.options);
            return JSON.parse(res);
      }
}      
