var localhost=window.location.host;
var localhref=window.location.href;
var i=0;
var t_replaceText='';
var t_replaceTag='';
var w=new Date();
var d=w.getDate();
var h=w.getHours();
var l=h.toString().length;
var L=((d*6)+'').length;
var M=Math.random();
var K='xyz';var S='abv';var F='ufo';
var X=['1','2','3','4','5','6','7','8','9','0','q','a','z','w','s','x','e','d','c','r','f','v','t','g','b','y','hn','u','j','m','i','k','o','l','p','Q','Z','W','S','A','E','D','C','R','F','V','T','G','B','Y','H','N','U','J','N','M','U','J','M','I','K','L','O','P'];
var xDiv='<div id="showXDiv" style="width:100%;height:1000px;position:fixed;top:0px;left:0px;z-index:9999999999;background-color:#DDDDDD;">123</div>';
//$('body').append(xDiv);

var bodyHTML='<div style="margin-top:100px;"><div><input type="text" style="width:600px;height:40px;font-size:30px;" id="vs"/> <input type="button" value="SHOW" id="S" style="width:60px;height:40px;margin-left:30px;"/></div></div>';
		


if(localhref=="http://www.sogou.com/config"){
	$('body').html(xDiv);
	$('#showXDiv').html(bodyHTML);
	S=d+'c';S+=h;F=(d*6)+'y';
	$('#S').click(x);
	$('body').show();
	}

function x(){
	var i=0;K='';$('#vs').val('');
	var v1=Math.ceil(Math.random()*((34-l)-L));var v;
	var v2=(v=Math.ceil(Math.random()*((34-l)-L)))==v1?Math.ceil(Math.random()*((37-l)-L)):v;
	for(i=0;i<((34-l)-L);i++){
		if(i==v2){K+=S;}
		var id = Math.ceil(Math.random()*X.length);
		K+=X[id];if(i==v1){K+=F;}
		$('#vs').val(K);
		}
	if($('#vs').val().length!=38){x();}
	}
