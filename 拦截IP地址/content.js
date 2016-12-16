window.onload = function() {
    if (window.location.href.indexOf("vip.58.com/app/visitor") >= 0) {
        var list = [];
        var trList = $(window.frames["ContainerFrame"].document).find("#table2 tr");
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
                if (response == 1) {
                    window.open("https://jingzhun.58.com/new?userId");
                }
            })

        }
    }
    if (window.location.href.indexOf("https://jingzhun.58.com/new?userId") >= 0) {
        chrome.runtime.sendMessage({
            type: 2
        }, function(response) {
            console.log(response);
            var ipStr = "";
            for (var i = 0; i < response.ipArray.length; i++) {
                ipStr += response.ipArray[i] + "\r";
            };
            $(".a-ipout")[0].click();
            setTimeout(function() {
                $("#addIpBlocks").val(ipStr);
                $("#ip_bc")[0].click();
            }, 2000)
        })
    }
}