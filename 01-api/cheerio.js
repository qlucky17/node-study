const cheerio = require("cheerio");

const $ = cheerio.load(
  '<div class="wrap"><div class="title">标题</div><div class="content">内容</div></div>'
);
$(".wrap .title").text("标题2");
$(".wrap .content").html("内容2");
console.log($.html());
