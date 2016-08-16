$("#qfBtn").click(function() {
    var bg=chrome.extension.getBackgroundPage();     
	var title = $("#title").val();
	var content = $("#content").val();
	if (title === "" || content === "") {
		alert("标题和内容不能为空");
		return false;
	}
	var baiduQf = new bg.baiduQf(title, content);   
    baiduQf.eachPost();
});