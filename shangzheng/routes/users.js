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
router.get('/getQiHuoData', function(req, res, next) {
  request(
    'http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=RB0',
    function(err2, res2,
      body2) {
      res.json(body2);
    })
});


router.get('/qihuo', function(req, res, next) {
  res.render('qihuo');
})
module.exports = router;
