chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"来自内容脚本：" + sender.tab.url :
			"来自应用");
		if (request.next)
			setTimeout(function() {
				$(".item.J_MouserOnverReq:gt(0)").each(function(index, el) {
					var href = "https:" + $(el).find('.pic-link.J_ClickStat.J_ItemPicA').attr('href');
					$(el).children('.temp_box_del').remove();
					chrome.runtime.sendMessage({
						type: 1,
						url: href
					}, function(response) {
						$(el).children('.temp_box_del').remove();
						$(el).css('position', 'relative').append('<div class="temp_box_del" style="position: absolute; left: 0; top: 0; color: red; font-size: 35px; text-align: center; width: 100%;   word-break: break-word;">货号：' + response + '</div>')
					})
				})
			}, 3000)
	});