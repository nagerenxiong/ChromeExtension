window.onload = function() {
	chrome.runtime.sendMessage({
		type: 3
	}, function(response) {
		if (response.gobalCompanyName != "") {
			if (!response.goFlag) return;
			if (window.location.href.indexOf("vip.58.com") >= 0) {
				setTimeout(function() {
					var list = [];
					var trList = $(window.frames["ContainerFrame"].document).find("#table2 tr");
					if (trList.length == 0)
						trList = $(document.getElementById('ContainerFrame').contentWindow.document).find("#table2 tr");
					trList.each(function(index, el) {
						var json = {};
						json["time"] = $.trim($(el).children('td').eq(1).text());
						json["address"] = $.trim($(el).children('td').eq(3).text());
						list.push(json);
					})
					if (list.length != 0) {
						chrome.runtime.sendMessage({
							list: list,
							type: 1
						}, function(response) {
							if (response.status == "success") {
								window.location.href = "https://jingzhun.58.com/new?userId";
							}
						})

					}

				}, 1000)

			}
			if (window.location.href.indexOf("https://jingzhun.58.com/new?userId") >= 0) {
				chrome.runtime.sendMessage({
					type: 2
				}, function(response) {
					console.log(response);
					var ipStr = "";
					for (var i = 0; i < response.ipArray.length; i++) {
						ipStr += response.ipArray[i] + ",";
					};
					$(".a-ipout")[0].click();

					setTimeout(function() {
						var kkg = $(".page-oldip:eq(0) a").length - 3;
						var pages = $(".page-oldip:eq(0) a").eq(kkg).html();
						var ids = [];
						clearAll(pages, ipStr, ids);
					}, 1000)
				})
			}
		}
	})
	var kkk = 1;

	function clearAll(times, ipStr, ids) {

		setTimeout(function() {
			$("input[name='ipCheckBox']").each(function(index, el) {
				console.log($(el).attr("id"));
				ids.push($(el).attr("id"));
			})
			if (kkk < times) {
				$(".page-oldip:eq(0) a").eq($(".page-oldip:eq(0) a").length - 2)[0].click();
				clearAll(times, ipStr, ids);
				kkk++;
			} else {
				kkk = 1;
				console.log(ids);
				var userId = $("#userId").val();
				chrome.runtime.sendMessage({
					type: 5,
					userId: userId,
					ids: ids
				}, function(response) {
					if (response == "success") {
						console.log(ipStr);
						chrome.runtime.sendMessage({
							type: 6,
							userId: userId,
							ips: ipStr,
							ipType: 0
						}, function(response1) {
							if (response1 == "success") {
								window.close();
							}
						})
					}
				})
			}

		}, 500)


	}
}