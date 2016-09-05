var optionJson = "";
setTimeout(function() {
	$(".shop-hesper-bd dl").each(function(i, el) {
		for (var i in optionJson) {
			if ($(el).attr('data-id') == i) {
				$(el).css('position', 'relative').append('<div style="position: absolute; left: 0; top: 0; color: red; font-size: 36px; text-align: center; width: 100%;  word-break: break-word;font-weight: bold;">' + optionJson[i] + '</div>')
			}
		}
	})
	var id = $("#J_FrmBid input[name='item_id']").val();
	if (id) {
		chrome.runtime.sendMessage({
			type: 5,
			key:id
		}, function(response) {
			console.log(response);
			$(".tb-booth.tb-pic.tb-main-pic").css('position', 'relative').append('<div style="position: absolute; left: 0; top: 0; color: red; font-size: 36px; text-align: center; width: 100%;  word-break: break-word;font-weight: bold;">' + response + '</div>')
		})
	}
}, 1500)
chrome.runtime.sendMessage({
	type: 4
}, function(response) {
	optionJson = response;
	console.log(optionJson)
});