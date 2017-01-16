// rome.tabs.executeScript(integer tabId, tabs.InjectDetails details, function callback)
var isIp=1,isIpD=1;
$("#save").click(function(){
	if($("#isIp").prop("checked")) isIp=1;
	if($("#isIpD").prop("checked")) isIpD=1;
	var ip_day=$("#ip_day").val();
	var ip_time=$("#ip_time").val();
	var ipD_day=$("#ipD_day").val();
	var ipD_time=$("#ipD_time").val();
	var bmdList=[];
	$(".bmd_ul li").each(function(index,el){
		var liFag=false;
		$(el).children('input[type=number]').each(function(index,el){
			if($(el).val()!="")
			{
				liFag=true;
			}
		})
		if(liFag)
		{
			bmdList.push($(el).children('.bmd1').val()+"."+$(el).children('.bmd2').val()+"."+$(el).children('.bmd3').val()+"."+$(el).children('.bmd4').val());
		}
	})
	console.log(bmdList);
	var json={"isIp":isIp,"isIpD":isIpD,"ip_day":ip_day,"ip_time":ip_time,"ipD_day":ipD_day,"ipD_time":ipD_time,"bmdList":bmdList}
	chrome.extension.getBackgroundPage().start(json, function(res) {
		if (res == "success") {
			chrome.extension.getBackgroundPage().goFlag=true;
			window.open("https://vip.58.com/app/visitor");
		} else if (res == "error") {
			alert("请登陆58账号");
		}
		else if(res=="error_hy"){
			alert("请联系QQ1274123708购买会员");
		}
		else if(res=="fail"){
			alert("未知错误，请联系管理员");
		}
	});
})
$("#addBmd").click(function(){
	$(".bmd_ul").append('<li><input type="number" class="bmd1" style="width:38px">-<input type="number" class="bmd2" style="width:38px;margin-left:0">-<input type="number"class="bmd3" style="width:38px;margin-left:0">-<input type="number" class="bmd4" style="width:38px;margin-left:0"><input type="button" value="删除" class="del_btn"></li>');
})
$(document).on('click','.del_btn',function(){
	$(this).parent().remove();
})