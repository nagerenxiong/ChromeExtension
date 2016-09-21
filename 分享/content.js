if (window.location.href.indexOf("http://service.weibo.com/share/share.php") >=
	0) {
	setTimeout(function() {
		document.getElementsByClassName("weibo_img_link")[0].click();
		$("li[action-type='pics']").each(function(i, e) {
			if ($(e).find("img").attr("src").indexOf("http://ubq.") >= 0 && !$(e).hasClass(
					"select_img_added"))
				$(e).children("a")[0].click();
		})
		setTimeout(function() {
			$("#shareIt")[0].click();
		}, 2000)
	}, 1000)
} else {
	setTimeout(function() {
		$(".bds_tsina")[0].click();
		setTimeout(function() {
			window.close();
		}, 2000)
	}, 1000)
}
