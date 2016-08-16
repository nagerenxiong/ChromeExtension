var express = require('express');
var router = express.Router();
var func= require("../model/func");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
router.get('/getData', function(req, res, next) {
  var sql="select DISTINCT yl, date_format(yl,'%Y-%m-%d')as yl,nl,gzn,gzy,gzr,gzns,gzys,gzrs,xq,kp,sp,kpspc,zdf,zd,zg,cjl from min_shangzheng ORDER BY yl";
  func.query(sql,function(data){
  	res.send(data);
  });
});
module.exports = router;
