var express = require('express');
var router = express.Router();
var func = require("../model/func");
var request = require("request");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
router.get('/getData', function(req, res, next) {
  var sql =
    "select DISTINCT yl, date_format(yl,'%Y-%m-%d')as yl,nl,gzn,gzy,gzr,gzns,gzys,gzrs,xq,kp,sp,kpspc,zdf,zd,zg,cjl from shangzheng ORDER BY yl";
  func.query(sql, function(data) {
    res.send(data);
  });
});
router.get('/getQiHuoData/:id', function(req, res, next) {
 //  RB0 螺纹钢
 // AG0 白银
 // AU0 黄金
 // CU0 沪铜
 // AL0 沪铝
 // ZN0 沪锌
 // PB0 沪铅
 // RU0 橡胶
 // FU0 燃油
 // WR0 线材
 // A0 大豆
 // M0 豆粕
 // Y0 豆油
 // J0 焦炭
 // C0 玉米
 // L0 乙烯
 // P0 棕油
 // V0 PVC
 // RS0 菜籽
 // RM0 菜粕
 // FG0 玻璃
 // CF0 棉花
 // WS0 强麦
 // ER0 籼稻
 // ME0 甲醇
 // RO0 菜油
 // TA0 甲酸
 var id=req.params["id"];
  request(
    'http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol='+id,
    function(err2, res2,
      body2) {
      res.json(body2);
    })
});
router.get('/qihuo', function(req, res, next) {
  res.redirect("/users/qihuo/RB0");
})
router.get("/qihuo/:id",function(req,res,next){
  var id=req.params["id"];
  console.log(id);
  res.render('qihuo',{id:id});
})
module.exports = router;
