chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.type==1)
	{
		var cateGoryList="";
		$.ajax({
		url: 'http://www.weixinbm.com/do.php?ac=getcategory',
			type: 'get',
			async:false,
			dataType: 'json'
		})
		.done(function(data) {
			cateGoryList=data;
		})
		.fail(function() {
			cateGoryList="error";
		})
		.always(function() {
			sendResponse({
				cateGoryList:cateGoryList
			});
		});
	}
	else if(request.type==2){
		post(request.catid,request.curUrl);
	}
})

function post(catId,curUrl)
{
	debugger;
	$.ajax({
		url: 'http://www.weixinbm.com/do.php?ac=getcollecturl',
		type: 'post',
		data: {catid: catId,Url:curUrl}
	})
	.done(function(msg) {
		console.log("success");
		console.log(msg);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}