let arg = process.argv;

// 判定是dev 还是 build;
let mode = arg.filter((item , index) => index > 1)[0];

if(mode === "dev"){
      const dev = require("./gulp.dev");

}else if(mode === "build"){
      const build = require("./gulp.build");
}