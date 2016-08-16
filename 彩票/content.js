$("#tabbar-div-s2 a")[8].click();
$(".list").css('width')
var numList=[[0,1,2,3,9],[0,1,7,8,9]];
var bsList=[1,3,9,27,81,243,729,2187,6561];
var ms_txt=3;
var domList=$(".li_m").eq(4).children('span');
var fagNext=1;
var bsFag=0;
	$(".cat_cont").after('<div style="margin-top:30px;padding-left:50px;"><input type="text"id="ms_input" placeholder="请填入模式,默认3" style="outline: none; height: 30px; width: 150px; border: 1px solid blue; text-indent: 10px; margin-right: 13px;"/><a href="javascript:void(0)" id="start" style="background-color:blue;color:#fff;display:inline-block;padding:5px 15px;">启动</a></div>');
$("#start").click(function(){
	var ms_val=$.trim($("#ms_input").val());
	if(ms_val!="")
	{
		ms_txt=ms_val*1;
	}
	changeNum();
})

function checkNum(numArray) {
	for (var i = 0; i < domList.length; i++) {
		 for (var j = 0; j < numArray.length; j++) {
		 	if(numArray[j]*1==domList.eq(i).text()*1){
		 		domList[i].click();
		 	}
		 }
	}
}

function changeNum(){
	$("#ifNewBet").contents().find(".contrl_bot_l .item").remove();
	$("#lt_sel_modes span").removeClass('on').eq(ms_txt-1).addClass('on');
	if(fagNext==1){
	fagNext=0;
	checkNum(numList[fagNext]);
	}
	else
	{
	fagNext=1;
	checkNum(numList[fagNext]);
	}
	setTimeout(function(){
		$("#lt_sel_times").val(bsList[bsFag]);
		$("#lt_fast_buy")[0].click();
		$(".reveal-modal-submit")[0].click();
		bsFag++;
		if(bsFag>bsList.length)
		{
			bsFag=0;
		}
		getStatus();
	},5000)
	setTimeout(function(){
		$(".layui-layer-btn0")[0].click();
	}, 6000)

}
function getStatus(){
	var statusVal=$("#ifNewBet").contents().find(".contrl_bot_l .item").eq(0).children('.td010').text();
	if(statusVal!='未中奖'&&statusVal!='中奖'){
		setTimeout("getStatus();",3000);
	}
	else{
		 if(statusVal=="中奖")
		 {
		 	bsFag=0;
		 }
		 changeNum();
	}
}
