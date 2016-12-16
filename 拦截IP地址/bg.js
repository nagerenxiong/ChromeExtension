var gobalCompanyName = "";

function start(paramJson, callback) {
    getCompanyName(function(name) {
        paramJson.name = name;
        $.ajax({
                url: 'http://120.24.6.114:8369/',
                type: 'post',
                async: false,
                data: paramJson
            })
            .done(function(data) {
                callback(data);
            })
            .fail(function() {
                callback("error");
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
            console.log(companyName);
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
        paramJson["gobalCompanyName"] = gobalCompanyName;
        $.ajax({
                url: 'http://120.24.6.114:8369/index/postip',
                type: 'post',
                data: { "ipList": JSON.stringify(ipList), "gobalCompanyName": gobalCompanyName },
                async: false
            })
            .done(function(data) {
                console.log(data);
                sendResponse(1);
            })
            .fail(function(msg) {
                console.log(msg);
                sendResponse(2);
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

    }

})