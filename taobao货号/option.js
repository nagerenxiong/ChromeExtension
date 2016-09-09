$("#confirmBtn").click(function() {
	console.log(localStorage);
	var txt1=$.trim($("#text1").val())
	var txt2=$.trim($("#text2").val())
	$("#tb1 tbody").append('<tr><td>'+txt1+'</td><td>'+txt2+'</td><td><input type="button" value="删除" class="delBtn" /></td></tr>')
	localStorage[txt1]=txt2;
})
for(var i in localStorage)
{
	$("#tb1 tbody").append('<tr><td>'+i+'</td><td>'+localStorage[i]+'</td><td><input type="button" value="删除" class="delBtn" /></td></tr>')
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.type==0)
	{
		sendResponse(localStorage);
	}
})
$(document).on('click','.delBtn',function(){
	var key=$(this).parent().prev().prev().text();
	$(this).parent().parent().remove();
	localStorage.removeItem(key);
})