$("#confirmBtn").click(function() {
	console.log(localStorage);
	var txt1 = $.trim($("#text1").val())
	var txt2 = $.trim($("#text2").val())
	$("#tb1 tbody").append('<tr><td>' + txt1 + '</td><td>' + txt2 + '</td><td><input type="button" value="修改" class="updateBtn"/> <input type="button" value="删除" class="delBtn" /></td></tr>')
	chrome.runtime.sendMessage({
		type: 1,
		key: txt1,
		value: txt2
	}, function(response) {})
})

$(document).on('click', '.delBtn', function() {
	var key = $(this).parent().prev().prev().text();
	$(this).parent().parent().remove();
	chrome.runtime.sendMessage({
		type: 3,
		key: key
	}, function(response) {})
})
var _this;
$(document).on('click', '.updateBtn', function() {
	 _this = this;
	$("#wrap").show();
})
$("#confirmBtn1").click(function(event) {
	var key = $(_this).parent().prev().prev().text();
	var value = $.trim($("#text3").val());
	if (value == "") {
		alert("请输入出货时间")
		return;
	}
	$("#wrap").hide();
	$(_this).parent().prev().text(value);
	chrome.runtime.sendMessage({
		type: 1,
		key: key,
		value:value
	}, function(response) {})
});
$(document).on('click', '#clannlBtn', function() {
	$("#wrap").hide();
})
chrome.runtime.sendMessage({
	type: 2
}, function(response) {
	for (var i in response) {
		$("#tb1 tbody").append('<tr><td>' + i + '</td><td>' + localStorage[i] + '</td><td><input type="button" value="修改" class="updateBtn"/> <input type="button" value="删除" class="delBtn" /></td></tr>')
	}
})