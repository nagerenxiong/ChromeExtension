var gobalCompanyName = "";
var goFlag=false;
function start(paramJson, callback) {
	getCompanyName(function(name) {
		paramJson.name = name;
		if (name == "error") {
			callback("error");
			return;
		}
		$.ajax({
				url: 'http://120.24.6.114:8369/',
				type: 'post',
				async: false,
				data: paramJson
			})
			.done(function(data) {
				callback(data);
			})
			.fail(function(msg) {
				console.log(msg);
				callback("fail");
			})
	})
}

function getCompanyName(callback) {
	$.ajax({
			url: 'http://jingzhun.58.com/new',
			type: 'get',
			async: false
		})
		.done(function(data) {
			var i = data.indexOf('\"user\"');
			var j = data.indexOf('<b>', i);
			var k = data.indexOf('</b>', j);
			var companyName = data.substring(j + 3, k);
			gobalCompanyName = companyName;
			callback(companyName);

		})
		.fail(function() {
			callback("error");
		})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == 1) {
		ipList = request.list;
		var paramJson = {};
		paramJson["ipList"] = ipList;
		getCompanyName(function(gobalCompanyName) {
			paramJson["gobalCompanyName"] = gobalCompanyName;
			$.ajax({
					url: 'http://120.24.6.114:8369/index/postip',
					type: 'post',
					async: false,
					data: {
						"ipList": JSON.stringify(ipList),
						"gobalCompanyName": gobalCompanyName
					}
				})
				.done(function(data) {
					if (data == "success") {
						sendResponse({
							"status": "success"
						});
					}
				})
				.fail(function(msg) {
					sendResponse({
						"status": "fail"
					});
				})
		})

	} else if (request.type == 2) {
		getCompanyName(function(name) {
			// sendResponse(name);
			$.ajax({
					url: 'http://120.24.6.114:8369/index/getip',
					type: 'post',
					async: false,
					data: {
						"companyName": name
					}
				})
				.done(function(data) {
					sendResponse(data);
				})
				.fail(function() {
					sendResponse("error");
				})
		})

	} else if (request.type == 3) {
		sendResponse({"gobalCompanyName":gobalCompanyName,"goFlag":goFlag});

	} else if (request.type == 5) {
		console.log(request.ids);
		console.log(request.userId);
		var ids=request.ids.join(",");
		$.ajax({
				url: 'https://jingzhun.58.com//ipblock/manage',
				type: 'post',
				async: false,
				data: {
					"ids":ids,
					"userId":request.userId
				}
			})
			.done(function(data) {
				sendResponse("success");
			})
			.fail(function() {
				sendResponse("error");
			})

	}
	 else if (request.type == 6) {
		console.log(request.ips);
		console.log(request.userId);
		$.ajax({
				url: 'https://jingzhun.58.com//ipblock/add',
				type: 'post',
				async: false,
				data: {
					"ips":request.ips,
					"userId":request.userId,
					"ipType":0
				}
			})
			.done(function(data) {
				goFlag=false;
				sendResponse("success");
			})
			.fail(function() {
				goFlag=false;
				sendResponse("error");
			})

	}


})

setInterval(function() {
	if (gobalCompanyName != "") {
		chrome.tabs.query({
			url: 'https://vip.58.com/app/visitor/*',
			status: 'complete'
		}, function(tabs) {
			console.log(tabs);
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.remove(tabs[i]["id"])
			}
			goFlag=true;
			window.open("https://vip.58.com/app/visitor");
		})
	}
}, 3600000)
