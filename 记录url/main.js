var urlList = chrome.extension.getBackgroundPage().urlList;
$("#url_ul").empty();
for (var i = 0; i < urlList.length; i++) {
	$("#url_ul").append('<li><label>' + urlList[i] + '</label><input type="text" name="" value="" placeholder="请输入标题"><input type="button" name="" value="确认" class="queren_btn" ></li>');
}


$(".queren_btn").click(function(){
	var url = $(this).prev().prev().text();
	var title = $.trim($(this).prev().val());
	if (title == "") {
		alert("请输入标题");
	} else {
		$.ajax({
			url: 'http://1.nageren.sinaapp.com/update.php',
			type: 'post',
			data: {
				url: url,
				title:title
			},
			success: function(data) {
				alert("添加成功");
			}
		})
	}
})