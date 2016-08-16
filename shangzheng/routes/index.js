var express = require('express');
var router = express.Router();
var func= require("../model/func");
/* GET home page. */
router.post('/', function(req, res, next) {
  var yl=req.body.yl;
  var gzn=req.body.gzn;
  var gzy=req.body.gzy;
  var gzr=req.body.gzr;
  var gzns=req.body.gzns;
  var gzys=req.body.gzys;
  var gzrs=req.body.gzrs;
  var xq=req.body.xq;
  var nl=req.body.nl;
  var kp=req.body.kp;
  var sp=req.body.sp;
  var kpspc=req.body.kpspc;
  var zdf=req.body.zdf;
  var zd=req.body.zd;
  var zg=req.body.zg;
  var cjl=req.body.cjl;
  console.log('insert into shangzheng(yl,gzn,gzy,gzr,gzns,gzys,gzrs,xq,nl,kp,sp,kpspc,zdf,zd,zg,cjl) value ("'+yl+'","'+gzn+'","'+gzy+'","'+gzr+'","'+gzns+'","'+gzys+'","'+gzrs+'","'+xq+'","'+nl+'","'+kp+'","'+sp+'","'+kpspc+'","'+zdf+'","'+zd+'","'+zg+'","'+cjl+'")')
   func.insert('insert into shangzheng(yl,gzn,gzy,gzr,gzns,gzys,gzrs,xq,nl,kp,sp,kpspc,zdf,zd,zg,cjl) value ("'+yl+'","'+gzn+'","'+gzy+'","'+gzr+'","'+gzns+'","'+gzys+'","'+gzrs+'","'+xq+'","'+nl+'","'+kp+'","'+sp+'","'+kpspc+'","'+zdf+'","'+zd+'","'+zg+'","'+cjl+'")');
   res.send('sd');
});

module.exports = router;
