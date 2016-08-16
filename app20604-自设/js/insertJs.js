if (!localStorage.isMenu2) {  
  localStorage.isMenu2 = true;
  localStorage.startTime = "10:07:59";
  localStorage.endTime = "10:15:59";
  localStorage.quanzhidongSHUA="0";//自动刷新的判断
  localStorage.quanTimes="1000";
}
$(document).ready(function(e) {	
	var href=document.location.href;
	console.log(href);
	var tips="<div id='nextTips'><div id='zhuaquNUM'></div></div>";	
	var img = "<img src=" + chrome.extension.getURL('images/mouse.png') + " id='myMouse' style='position: absolute;z-index: 999999999999;right:-32px'>";
	//刷单页面
	if(href.indexOf("shoppingbag")>0 ){
		console.log("shoppingbag");	
		//$("body").append(tips);
		//$("#nextTips").prepend("点我开始");
		$("body").append("<div id='deleteSoldOut'>清除Sold Out</div><div id='qingKongGouwc'>清空全部</div>");
		$("#qingKongGouwc").click(function(){
			qingkongGouwcs();
		})
		$("#deleteSoldOut").click(function(){
			deleteSoldOuts();
		})
		//$("#nextTips").click(function(){
			//startQiang();
			//localStorage.quanzhidongSHUA="1";			
		//})
		$("body").append("<div id='inputs'><label>电脑时间：</label><input type='text' id='nowTime' placeholder='电脑时间' readOnly><label>开始时间：</label><input type='text' title='00:00:00' id='startTime' placeholder='开始时间'><label>结束时间：</lable><input type='text' title='00:00:00' id='endTime' placeholder='结束时间'><label>时间状态：</lable><input type='text' title='00:00:00' id='timeStatus' placeholder='时间状态'><label>选择时间：</lable><input type='text' title='选择件数时间设置' id='quanTimes' placeholder='件数时间设置'></div><style>.jianShow{color: #fff!important; background-color: #f00!important; border: 0!important;}</style>");
		//抢购
		localStorage.ttTips="1";
		//开始时间
		$("#startTime").blur(function(){
			localStorage.ttTips="1";
			sdStart();
			sdEnd();
			localStorage.startTime=$(this).val();
		})
		if(localStorage.startTime!="" || localStorage.startTime!=null){
			$("#startTime").val(localStorage.startTime);
			$("#quanTimes").val(localStorage.quanTimes);
		}
		//结束时间
		$("#endTime").blur(function(){
			localStorage.ttTips="1";
			sdStart();
			sdEnd();
			localStorage.endTime=$(this).val();
		})
		//选择件数时间
		$("#quanTimes").blur(function(){
			localStorage.quanTimes=$(this).val();			
		})
		if(localStorage.endTime!="" || localStorage.endTime!=null){
			$("#endTime").val(localStorage.endTime);
		}
	
			sdStart();
			sdEnd();
			
			
			
		var tt = setInterval(function() {
			var times=Number(getTimes().replace(/[:]/g,"")) >= Number(localStorage.startTime.replace(/[:]/g,"")) && Number(getTimes().replace(/[:]/g,"")) <= Number(localStorage.endTime.replace(/[:]/g,""));
			$("#nowTime").val(getTimes());
			
		console.log(getTimes()+(Number(getTimes().replace(/[:]/g,"")) >= Number(localStorage.startTime.replace(/[:]/g,""))))
        if (times) {
			$("#timeStatus").val("时间到了");			
			$("#inputs input").css("color","#00D713");
			localStorage.sjd="1";
			//action(href);
			startQiang();
			//localStorage.quanzhidongSHUA="1";
            //clearInterval(tt);
        }else{
			clearInterval(quanTime);
			localStorage.sjd="0";
			$("#timeStatus").val("未到或过时")
			 $("#inputs input").css("color","#f00");
		}
        },2000);
	    
	    
	}
	//全自动刷单
	if(localStorage.quanzhidongSHUA=="1"){
		//console.log("shoppingbag?@loading");
		//$("body").append(tips);
		//$("#nextTips").click(function(){
			//action(href);
			//localStorage.quanzhidongSHUA="0";
			//document.location.reload();			
		//})
		//startQiang()();
	    
	}
	
	//全选加购物车
	if(href.indexOf("clearance/?")>0){
		var htmlBtn="</div><div id='clearanceBtn'>开始选单</div><div id='shouDongSize'><input type='text' value='"+(localStorage.shouDongSize!=null ? localStorage.shouDongSize : "" )+"' placeholder='手动输入特色尺码'>";
		$("#formleft div").eq(1).append(htmlBtn);
		$("#clearanceBtn").click(function(){
		   selectSize();
	    })
		$("#shouDongSize input").blur(function(){
		   selectSize();
	    })
	}
	
});
var quanIndex=-1;
quanTime=setInterval(function(){
         quanIndex++;
		 if(quanIndex>=$("table#items tbody tr").length+1){
			 quanIndex=-1;
			 $("table#items tbody tr").each(function(index, element) {
               $(this).find("a.dk_toggle").eq(1).removeClass("jianShow");
             })
		 }
		 var order=$("table#items tbody tr").eq(quanIndex).find(".dk_options_inner").eq(1).find("li").eq(0).find("a");
		 $("table#items tbody tr").eq(quanIndex).find("a.dk_toggle").eq(1).addClass("jianShow"); 
		 console.log(order[0]);
		 var evt1=document.createEvent("MouseEvents");  
         evt1.initEvent("click",true,true);
		 order[0].dispatchEvent(evt1);
},localStorage.quanTimes)
function startQiang(){
	console.log("start");
	
    $("table#items tbody tr").each(function(index, element) {
	   //$(this).find("a.dk_toggle").eq(1).addClass("jianShow"); 	   
       //var order=$(this).find(".dk_options_inner").eq(1).find("a");	   
	   //console.log(order[1]);
       //order[1].dispatchEvent(evt1);
	   //order[1].click();
   });
	     //order[1].click();

    setTimeout(function(){},500);    
   //var order=$(".dk_options_inner").eq(1).find("li").eq(0).find("a");
   //order[0].dispatchEvent(evt1);
   //$(".dk_options_inner").eq(1).find("li").eq(0).find("a").click();
}
setTimeout(function(){
	if(localStorage.sjd=="1"){
	   document.location.reload();
	}
},1000*60*5)
function action(){
	$.ajax({
		  url:"http://www.next.co.uk/bag/updatequantity",
		  type:"POST",
		  cache:false,
		  data:{id:"1",quantity:Math.round(Math.random()*7)+1},
		  async:true,
		 error:function(jqXHR,textStatus,errorThrown){console.log('失败');action();},
		  success:function(data,textStatus,jqXHR){
			if(data.Status=="200"){
				newJs();
				console.log("有货");
			}
			}
		});	
}
function sdStart(){
		var ttsdStart = setInterval(function() {
			var times=Number(getTimes().replace(/[:]/g,"")) >= Number(localStorage.startTime.replace(/[:]/g,"")) && Number(getTimes().replace(/[:]/g,"")) <= Number(localStorage.endTime.replace(/[:]/g,""));
			 if (times) {
				 localStorage.ttTips="0";
				$("body").append('<iframe id=yuyin src="'+chrome.extension.getURL("images/start.mp3")+'" width="0" height="0" frameborder="0"></iframe>'); 
				clearInterval(ttsdStart);
				 
			 }
			},2000);
}
function sdEnd(){
	var ttsdEnd = setInterval(function() {
			var times=Number(getTimes().replace(/[:]/g,"")) >= Number(localStorage.startTime.replace(/[:]/g,"")) && Number(getTimes().replace(/[:]/g,"")) <= Number(localStorage.endTime.replace(/[:]/g,""));
			 if (times!=true) {
				localStorage.ttTips="0";
			    
			   $("body").append('<iframe id=yuyin src="'+chrome.extension.getURL("images/end.mp3")+'" width="0" height="0" frameborder="0"></iframe>'); 
				clearInterval(ttsdEnd);
			 }
			},2000);
}
function getTimes() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hours = now.getHours();
	if(now.getMinutes()<10){
		var minutes="0"+now.getMinutes();
	}else{
		 var minutes = now.getMinutes();
	}
	var seconds = now.getSeconds();
	if(now.getSeconds()<10){
		seconds="0"+now.getSeconds();
	}
	return hours+":" + minutes+":"+seconds;
    //return year + "" + month + "" + date + "" + hours + "" + minutes
}
console.log(getTimes());
function newJs(){
  var js=document.createElement("script");
  js.src=chrome.extension.getURL('js/newJs.js'); 
  js.type='text/javascript'; 
  document.body.appendChild(js);
}

function selectSize(){
	log("开始选单");
	var shouDongSize=$("#shouDongSize input").val().replace(/[ ]/g,"").toLowerCase();
	var selectSize=$("#size").val().replace("to","-").replace(/[ ]/g,"").toLowerCase();
	if(shouDongSize!=""){
		searchSize=shouDongSize;
		localStorage.shouDongSize = shouDongSize;
	}else{
		searchSize=selectSize;
	}
	
	log(shouDongSize+searchSize);
	$("form[name='bagform'] input[type='checkbox']").each(function(index, element) {
		$(this).removeAttr("disabled");
		$(this).show();
        //$(this).attr("checked","checked");
		//$("form[name='bagform'] input[name='r']").val("1");
    });
	
	$("form[name='bagform'] select.sizes option").each(function(index, element) {
		var txt=$(this).text().replace(/[ ]/g,"").toLowerCase();
		log(searchSize+txt);
        if(txt.indexOf(searchSize)>-1){
			$(this).attr("selected","selected");
			//$("form[name='bagform'] input[name='i']").click()
			
		}
    });
	$("form[name='bagform'] select.quantity").each(function(index, element) {
		$(this).find("option").eq(1).attr("selected","selected");
    });
	
	var evt1=document.createEvent("MouseEvents");  
    evt1.initEvent("click",true,true);   
	setTimeout(function(){
		$("form[name='bagform'] input[name='i']").each(function(index, element) {
		$(this).click();
    });
		log("添加购物车");
		var order=$("p.addtobag div.AddToBag a");
		order[0].dispatchEvent(evt1);
		//$("#NxtNext a").click()
	},1000);

}

function qingkongGouwcs2(){
	log("清空购物车"+$("#items td").length);
	var evt1=document.createEvent("MouseEvents");  
    evt1.initEvent("click",true,true); 
	for(var i=0;i<$("#items tr").length;i++){
		var order=$("a.DeleteButton");
		order[i].dispatchEvent(evt1);
	}
	
}
function qingkongGouwcs(){
	 
	$("#items tr").each(function(index, element) {
		var txt=$(this).find(".availabilityColumn div").text();
		log(txt);
		if(txt=="In Stock" || txt=="Delivered within 3 Weeks"  || txt=="Sold Out"){
			var evt1=document.createEvent("MouseEvents");  
            evt1.initEvent("click",true,true);
            var order=$(this).find("a.DeleteButton");
	        order[0].dispatchEvent(evt1);
		}
    });
	setTimeout(function(){
		document.location.href=document.location.href;
	},1000)
	
}

function deleteSoldOuts(){
	 
	$("#items tr").each(function(index, element) {
		var txt=$(this).find(".availabilityColumn div").text();
		if(txt=="Sold Out"){
			var evt1=document.createEvent("MouseEvents");  
            evt1.initEvent("click",true,true);
            var order=$(this).find("a.DeleteButton");
	        order[0].dispatchEvent(evt1);
		}
    });
	setTimeout(function(){
		document.location.href=document.location.href;
	},1000)
	
}

function log(tt){
	console.log(tt);
}


function mouseMove() {
			console.log("开始移动");
			var evt1=document.createEvent("MouseEvents");  
       evt1.initEvent("click",true,true); 
	   var order=$("ul.dk_options_inner").eq(1).find("li").eq(Math.round(Math.random()*3)).find("a");	  
      log(Math.round(Math.random()*3))
			console.log(order.attr("href"));
			$("#myMouse").animate({
				left:$('.dk_toggle.dk_label').eq(1).offset().left + 30,
				top:$('.dk_toggle.dk_label').eq(1).offset().top + 20
			},
			1000,
			function() {
				 order[0].dispatchEvent(evt1);
				 $('.dk_toggle.dk_label').eq(1).addClass("click");
				 $('.price').eq(0).addClass("click");
				 log("点击了"+order.text()+"件数");
			});

}
