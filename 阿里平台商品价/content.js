var url = window.location.href;
var className = "";

$(".tb-booth").append("<div style='width:100%;height:100%;position:absolute;left:0;top:0;text-align:center;padding-top:150px;'>\
		<span class='save_url_btn'  style='background-color:black;display:inline-block;color:#fff;padding:5px 10px;cursor:pointer'>点击收藏网址</span><span class='class_btn' style='background-color:red;display:inline-block;color:#fff;padding:5px 10px;cursor:pointer'>输入文件名</span>\
	</div><div class='classDiv' style='display:none;background:#fff;z-index:2;width:50%;height:50%;position:absolute;left: 50%;top: 50%;margin-left: -25%;margin-top: -25%;text-align:center;'><input type='text' class='class_input'  style='margin-top:60px;'/><br><input type='button' value='确认' class='queren' style='margin-top:20px'><div>")



if (url.indexOf("s.taobao.com") > 0) {
	setTimeout(function() {
		$("#mainsrp-itemlist .item .pic-box.J_MouseEneterLeave.J_PicBox").append("<div style='width:100%;height:20%;position:absolute;left:0;top:0;text-align:center;'>\
		<span class='save_url_btn'  style='background-color:black;display:inline-block;color:#fff;padding:5px 10px;cursor:pointer'>点击收藏网址</span><span class='class_btn' style='background-color:red;display:inline-block;color:#fff;padding:5px 10px;cursor:pointer'>输入文件名</span>\
		</div><div class='classDiv' style='overflow:hidden;display:none;background:#fff;z-index:2;width:50%;height:30%;position:absolute;left: 50%;top: 50%;margin-left: -25%;margin-top: -25%;text-align:center;'><input type='text' class='class_input'  style='margin-top:10px;width:80%'/><br><input type='button' value='确认' class='queren' style='margin-top:5px'><div>")
		$(".save_url_btn").click(function() {
		var currentUrl=$(this).parent().prev().children('.pic').children('a').attr('href');
		chrome.runtime.sendMessage({
			fag: 1
		}, function(response) {
			className = response.className;
			if (className == "") {
				alert("请输入文件名")
			}
			$.ajax({
				type: "post",
				timeout: 6000,
				async: true,
				url: "http://localhost/getUrl.php",
				data: {
					"url":"https:"+currentUrl,
					"className": className
				},
				success: function() {}
			});
		});


	})
	$(".queren").click(function() {
		var pattern = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/;
		var value = $.trim($(this).prev().prev().val());
		if (pattern.test(value) || value == "") {
			alert("请输入正确的分类名称！");
		} else {
			className = value;
			chrome.runtime.sendMessage({
				'className': className,
				'fag': 0
			});
			$(this).parent().hide();
		}
	})
	$(".class_btn").click(function() {
		$(this).parent().next().show();
	})
	}, 3000)


	
} else {
	$(".save_url_btn").click(function() {
		chrome.runtime.sendMessage({
			fag: 1
		}, function(response) {
			console.log(response.className);
			className = response.className;
			if (className == "") {
				alert("请输入文件名")
			}
			$.ajax({
				type: "post",
				timeout: 6000,
				async: true,
				url: "http://localhost/getUrl.php",
				data: {
					"url": url,
					"className": className
				},
				success: function() {}
			});
		});


	})
	$(".queren").click(function() {
		var pattern = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/;
		var value = $.trim($(".class_input").val());
		if (pattern.test(value) || value == "") {
			alert("请输入正确的分类名称！");
		} else {
			className = value;
			chrome.runtime.sendMessage({
				'className': className,
				'fag': 0
			});
			$(".classDiv").hide();
		}
	})
	$(".class_btn").click(function() {
		$(".classDiv").show();
	})
}