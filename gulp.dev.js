// console.log("dev 模式");

// 1. 转存 : gulp.src pipe gulp.dest 
// 2. 服务器gulp-connect ;  1.测试服务器;
//                          2.代理服务器
//                          3. 自动刷新; 

const gulp = require("gulp");
const connect = require("gulp-connect");
const proxy  = require("http-proxy-middleware");
const { proxyList } = require("./config/gulp.config");
const sass = require("gulp-sass");
sass.compiler = require('node-sass');


const {paths} = require("./config/gulp.config");

const distPaths = {};

for(let attr in paths){
      distPaths[attr] = paths[attr].replace(/src/g,"dist");
}


// 钩子函数 hook ;
async function hanlderConnect(){
      await connect.server({
            root : "./dist",
            port : 8888,
            livereload : true,
            middleware: function() {
                  let list = [];
                  for(let attr in proxyList){
                        let url = "/"+attr; 
                        let key = "^/"+attr;
                        list.push(
                              proxy(url ,{
                                    target : proxyList[attr],
                                    changeOrigin : true,
                                    pathRewrite : {
                                          [key]: ""
                                    }
                              })
                       )
                  }
                  return list;
            }

      })
}

/* JavaScript 转存*/
function javascript(done){
      gulp.src([paths.javascript + "*.js"])
      .pipe(gulp.dest(distPaths.javascript))
      .pipe(connect.reload())

      done();
}
function html(done){
      gulp.src([paths.html + "*.html"])
      .pipe(gulp.dest(distPaths.html))
      .pipe(connect.reload())
      done();
}
function css(done){
      gulp.src([paths.css + "*.css"])
      .pipe(gulp.dest(distPaths.css))
      .pipe(connect.reload())
      done();
}

async function scss(){
      await gulp.src([paths.scss + "*.scss"])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(distPaths.scss))
      .pipe(connect.reload())

}

async function watch(){
     await gulp.watch(["./src/javascripts/*.js"],gulp.series("javascript"));
     await gulp.watch(["./src/*.html"],gulp.series("html"));
     await gulp.watch(["./src/style/*.css"],gulp.series("css"));
     await gulp.watch(["./src/scss/*.scss"],gulp.series("scss"));
}

gulp.task(watch)
gulp.task(scss)
gulp.task(css);
gulp.task(html);
gulp.task(javascript);
gulp.task(hanlderConnect);
gulp.task("dev" , gulp.parallel("watch","hanlderConnect"));