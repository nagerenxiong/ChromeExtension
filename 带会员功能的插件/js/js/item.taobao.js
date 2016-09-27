var load=0;
var show=0;
var auto;
var showKey;
var l = false;

//*://item.taobao.com/*","*://detail.tmall.com/*","*://ai.taobao.com/auction/edetail.htm", "*://detail.yao.95095.com/*", "*://chaoshi.detail.tmall.com/*", "*://world.tmall.com/*", "*://tw.taobao.com/item/*", "*://detail.tmall.hk/*
$(function(){
	if (location.href.indexOf("item.taobao.com") > -1 
		|| location.href.indexOf("detail.tmall.com/item.htm") > -1
		|| location.href.indexOf("ai.taobao.com/auction/edetail.htm") > -1
		|| location.href.indexOf("detail.yao.95095.com/item.htm") > -1
		|| location.href.indexOf("world.tmall.com/item") > -1
		|| location.href.indexOf("tw.taobao.com/item") > -1
		|| location.href.indexOf("detail.tmall.hk/hk/item.htm") > -1) {
		var u = "https://www.87k6.com:8444/weitao/checkLogin";
		r(u,"",c);
		if (l) {
			if(auto=="true"){
				loaddata();
			}
		} else {
			s("插件未登录,请重新登录");

		}
		var keyCodes = {};
		keyCodes['A']=65;
		keyCodes['B']=66;
		keyCodes['C']=67;
		keyCodes['D']=68;
		keyCodes['E']=67;
		keyCodes['F']=70;
		keyCodes['G']=71;
		keyCodes['H']=72;
		keyCodes['I']=73;
		keyCodes['J']=74;
		keyCodes['K']=75;
		keyCodes['L']=76;
		keyCodes['M']=77;
		keyCodes['N']=78;
		keyCodes['O']=79;
		keyCodes['P']=80;
		keyCodes['Q']=81;
		keyCodes['R']=82;
		keyCodes['S']=83;
		keyCodes['T']=84;
		keyCodes['U']=85;
		keyCodes['V']=86;
		keyCodes['W']=87;
		keyCodes['X']=88;
		keyCodes['Y']=89;
		keyCodes['Z']=90;

		document.onkeydown = function(e){
			var which = e.which ;;
			if(which==keyCodes[showKey.toUpperCase()]){
				if(show==1){
					document.getElementById("haohuojuncontent").style.display="none";
					show =0;
				}else{
					if(load==1){
						document.getElementById("haohuojuncontent").style.display="";
					}else{
						loaddata();
					}
					show =1;
				}
			}
		}
	}
});
function c(j){
	if (j.status == "1") {
		l = true;
		auto = j.user.auto;
		showKey = j.user.showKey;
	}
}
function f(j){
	if (j.status == "1") {
		var l = j.list;
		var html = "<table width='100%'>";
		var headerStyle="font-size: 12px;font-weight: bold;text-align: left;background-color: pink;height: 25px;line-height: 25px;color:white"
		html += "<tr style='"+headerStyle+"'>";
			html += "<td>";
			html += "站点名";
			html += "</td>";
			html += "<td>";
			html += "V";
			html += "</td>";
			html += "<td>";
			html += "B";
			html += "</td>";
			html += "<td>";
			html += "发布时间";
			html += "</td>";
			html += "<td>";
			html += "详情";
			html += "</td>";
			html += "</tr>";
		for(var i = 0;i<l.length;i++){
			var o = l[i];
			if(i%2==1){
				html += "<tr style='background-color: white;height: 20px;line-height: 20px;'>";
			}else{
				html += "<tr style='background-color: #b9e2f8;height: 20px;line-height: 20px;'>";
			}
			
			html += "<td>";
			html += o.accountNick;
			html += "</td>";
			if(o.isV=="true"){
				html += "<td>";
				html += "是";
				html += "</td>";
			}else{
				html += "<td>";
				html += "否";
				html += "</td>";
			}
			if(o.isB=="1"){
				html += "<td>";
				html += "是";
				html += "</td>";
			}else{
				html += "<td>";
				html += "否";
				html += "</td>";
			}
			html += "<td>";
			html += o.publishDate;
			html += "</td>";
			html += "<td>";
			html += "<a target='_blank' href='http://uz.taobao.com/detail/"+o.id+"'>查看</a>";
			html += "</td>";
			html += "</tr>";
		}
		 html += "</table>";
		 html += "</br>";
		 s(html,500);
	}
}
function getParam(n) {
    var reg = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function s(html,height) {
	show =1;
   /*
	var html = "<div id='haohuojuncontent' style='width:280px;background:white;float:left; position:fixed !important; top:260px; position:absolute; z-index:999999999; top:expression(offsetParent.scrollTop+200);llft:20px;'>";
	html+="<div style='width:270px;height:30px;background-color:#cccccc;color:white;font-weight:bold;line-height:30px;padding-left:10px;'>";
	html+="好货君插件版";
	html+="</div>";
    html+="<div style='width:280px;overflow:auto;max-height:500px;'>";
	html+=html;
	html+="</div>";
	html+="</div>";
    //div.style = "position:fixed; left:20px; top:250px;z-index:999999999;width:280px;border:1px solid pink;background-color:white;";
	*/
	 var content = document.createElement("div");
    //content.style = "width:280px;overflow:auto;";
	content.style.width="280px";
	content.style.overflow="auto";
	content.style.maxHeight = "500px";


    content.innerHTML = html;
	
	var title = document.createElement("div");
    title.style = "width:270px;height:30px;background-color:#ccc;color:white;font-weight:bold;line-height:30px;padding-left:10px;";
	title.style.width="270px";
	title.style.background="#ccc";
	title.style.color="white";
	title.style.fontWeight="bold";
	title.style.lineHeight="30px";
	title.style.paddingLeft="10px";

    title.innerHTML = "好货君插件版  交流群:<a target='_blank' href='http://shang.qq.com/wpa/qunwpa?idkey=9cc37fcb19399daec56b7b9bd69fe682e963d866ef62430dcdab901d27d4eeba'><img border='0' src='http://pub.idqqimg.com/wpa/images/group.png' alt='好货君交流群' title='好货君交流群'></a>";

	var div = document.createElement("div");
	div.style.width="280px";
	div.style.background="white";
	div.style.float="left";
	div.style.position="fixed";
	div.style.zIndex="999999999";
	div.style.top="260px";
	div.style.left="20px";
	div.style.border="solid pink 1px";
	div.id="haohuojuncontent";
    div.appendChild(title);
 
    div.appendChild(content);
    document.body.appendChild(div);
}
function r(url,data,func){
	$.ajax({
        type: "post",
        url: url,
        dataType: 'json',
        async: false,
        data: data,
        success: func
    });
}
function loaddata(){
	var u = "https://www.87k6.com:8444/weitao/filter?itemId="+getParam("id");
	r(u,"",f);
	load=1;
}