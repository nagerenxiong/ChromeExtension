var $ = SG;
sogouExplorer.extension.onRequest.addListener(function(request, sender, response) {
    var cmd = request.cmd;
    if (!sender.tab) return;
    var tabid = sender.tab.id;
    var id = request.id;
    switch(cmd) {
        case 'template':
            var domid = "comments-tpl";
            var append = "append-comments-tpl";
            var string = '';

            var node = document.getElementById(domid);
            if (node) {
              string = node.innerHTML;
            }
            var append_node = document.getElementById(append);
            if (append_node) {
              append_string = append_node.innerHTML;
            }
            sendMessage(tabid, {
                cmd: 'tpl',
                id: request.id,
                data: {"html": string, "append_html":append_string}
            });
        break;
        case 'comments':
            var type = request.type;
            var auctionNumId = request.auctionNumId;
            var userNumId = request.userNumId;
            var page = request.page;
            //先去本地取
            var info;
            if(page == 1){
                info = findCommentInLocal(auctionNumId);
            }
            if(info){
                sendMessage(tabid, {
                    cmd: 'comment',
                    id: request.id,
                    data: info
                });
            }else{//去线上取
                if(!userNumId && (type=="tmall" || type=='activity')){
                    getUserNumIdFromTmall(auctionNumId,function(userNumId){
                        getCommentsOnline(type,auctionNumId,request,tabid,userNumId,page);
                    });
                }else {
                    getCommentsOnline(type,auctionNumId,request,tabid,userNumId,page);
                }
            }
        break;
        case 'ping':
            //hover出悬浮窗的时候发pingback
            pingback.sendPingback({"type":request.type});
        break;
    }
});
function getCommentsOnline(type,auctionNumId,request,tabid,userNumId,page){
    //如果类型是活动，先取淘宝
    var url_type = (type == "activity")? "taobao":type;
    var url;
    url = {};
    url["tmall"] = "https://rate.tmall.com/list_detail_rate.htm?itemId=" + auctionNumId+ "&sellerId=" + userNumId + "&currentPage=" + page + "&order=3&picture=1";
    url["taobao"] = "https://rate.taobao.com/feedRateList.htm?auctionNumId=" + auctionNumId + "&userNumId="+ userNumId +"&currentPageNum=" + page + "&rateType=3&orderType=sort_weight";
    $.ajax({
        url: url[url_type],
        dataType:"jsonp",
        success:function(data){
            var info = formatInfo(data, url_type);
            if(type == "activity" && info["comments"].length <= 0){
                getCommentsOnline("tmall",auctionNumId,request,tabid,userNumId,page);
                return;
            }
            if(page == 1){
                saveCommentsToLocal(auctionNumId, info);
            }
            sendMessage(tabid, {
                cmd: 'comment',
                id: request.id,
                data: info
            });
        }
    });
}
function getUserNumIdFromTmall(auctionNumId,callback){
    var url = "https://detail.tmall.com/item.htm?ft=t&id=" + auctionNumId;
    $.ajax({
        url: url,
        dataType:"html",
        success:function(html){
            var root = string2dom(html);
            var rect = getMetaData(root);
            var userNumId = rect["userid"];
            callback(userNumId);
        }
    });
}
function getMetaData(root) {
    var ret = {};
    var reg = /(?:^|;)([^=]*)=([^;]*)/g;
    var meta = root.querySelector('meta[name="microscope-data"]');
    var content = meta.getAttribute('content');
    content.replace(reg, function(match, key, value) {
      ret[key.replace(/\s/g, "")] = value.replace(/\s/g, "");
    });
    return ret;
}
function findCommentInLocal(auctionNumId){
    /*从本地存储中查找auctionNumId
        若找到，把其位置调整到最后，
        若没找到，返回null
    */
    try{
        var local_data = localStorage.getItem("zhenxiangtao_taobao_comments");
        local_data = local_data ? JSON.parse(local_data) : {};
        if(local_data["last_request"] == undefined || (new Date().getTime() - local_data["last_request"]) > 24*60*60*1000){
            localStorage.setItem("zhenxiangtao_taobao_comments","");
            return null;
        }
        var info;
        local_data["last_request"] = new Date().getTime();
        var local_comments = local_data["data"];
        for(index in local_comments) {
            if(local_comments[index][auctionNumId] != undefined) {
                info = local_comments[index];
                local_comments.splice(index,1);
                break;
            }
        }
        if(info) {
            local_comments.push(info);
            local_data["data"] = local_comments;
            local_data = JSON.stringify(local_data);
            localStorage.setItem("zhenxiangtao_taobao_comments",local_data);
            return info[auctionNumId];
        }
        return null;
    }catch(e){
        return null;
    }
}
function saveCommentsToLocal(auctionNumId,comments){
    /*最近使用100个
    若本地存储超过100个，删掉第一个，追加一个，
    若不超过100个，直接追加。
    localstorage format:
    "zhenxiangtao_taobao_comments":[{
        auctionNumId:{"comments":[]}
    }]*/
    try{
        var MAX_LOCAL = 100;
        var local_data = localStorage.getItem("zhenxiangtao_taobao_comments");
        local_data = local_data ? JSON.parse(local_data) : {};
        var local_comments = local_data["data"] ? local_data["data"] : [];
        local_data["last_request"] = new Date().getTime();
        if(local_comments.length >= MAX_LOCAL){
            local_comments.splice(0,1);
        }
        var item = {};
        item[auctionNumId] = comments;
        local_comments.push(item);
        local_data["data"] = local_comments;
        local_data = JSON.stringify(local_data);
        localStorage.setItem("zhenxiangtao_taobao_comments",local_data);
    }catch(e){}
}
function formatInfo(info, type){
    var arr = {};
    arr["comments"] = [];
    if(type == "tmall"){
        arr["total"] = info["rateDetail"]["rateCount"]["picNum"];
        var info = info["rateDetail"];
        var i = 0;
        info["rateList"].forEach(function(item, index){
            /*初次评论里有图片*/
            if(item["pics"] && item["pics"].length > 0){
                arr["comments"][i] = {};
                arr["comments"][i]["photos"] = [];
                for(var x = 0; x < item["pics"].length; x++ ) {
                    arr["comments"][i]["photos"].push({"big": item["pics"][x] + "_400x400.jpg", "small": item["pics"][x] + "_40x40.jpg"});
                }
                //arr["comments"][i]["photos"] = item["pics"];
                arr["comments"][i]["user"] = {};
                if(item["tmallSweetPic"] != ""){
                    arr["comments"][i]["user"]["avatar"] = "//g.alicdn.com/tm/member-club/4.6.0/img/" + item["tmallSweetPic"];
                }
                arr["comments"][i]["user"]["nick"] = item["displayUserNick"];
                arr["comments"][i]["user"]["displayRatePic"] = item["displayRatePic"];
                arr["comments"][i]["date"] = item["rateDate"].replace(/(\d{4})-(\d{1,2})-(\d{1,2}).+/mg,'$1.$2.$3');
                arr["comments"][i]["content"] = item["rateContent"];
                i++;
            }
            /*有追评图片*/
            if(item["appendComment"] && item["appendComment"]["pics"] && item["appendComment"]["pics"].length > 0){
                arr["comments"][i] = {};
                arr["comments"][i]["user"] = {};
                if(item["tmallSweetPic"] != "")
                    arr["comments"][i]["user"]["avatar"] = "https://g.alicdn.com/tm/member-club/4.6.0/img/" + item["tmallSweetPic"];
                arr["comments"][i]["user"]["nick"] = item["displayUserNick"];
                arr["comments"][i]["user"]["displayRatePic"] = item["displayRatePic"];
                arr["comments"][i]["date"] = item["rateDate"].replace(/(\d{4})-(\d{1,2})-(\d{1,2}).+/mg,'$1.$2.$3');
                arr["comments"][i]["content"] = item["appendComment"]["content"];
                arr["comments"][i]["photos"] = [];
                for(var x = 0; x < item["appendComment"]["pics"].length; x++ ) {
                    arr["comments"][i]["photos"].push({"big": item["appendComment"]["pics"][x] + "_400x400.jpg", "small": item["appendComment"]["pics"][x] + "_40x40.jpg"});
                }
                // arr["comments"][i]["photos"] = item["appendComment"]["pics"];
                arr["comments"][i]["ifappend"] = 1;
                i++;
            }
        });
    }else{
        //淘宝
        var i = 0;
        arr["total"] = info["total"];
        info["comments"].forEach(function(item,index){
            if(item["photos"] && item["photos"].length > 0){
                arr["comments"][i] = {};
                arr["comments"][i]["user"] = item["user"];
                arr["comments"][i]["content"] = item["content"];
                arr["comments"][i]["photos"] = [];
                item["photos"].forEach(function(item_in){
                    arr["comments"][i]["photos"].push({"big": item_in.url, "small": item_in.thumbnail});
                });
                arr["comments"][i]["date"] = item["date"].replace(/(\d{4})年(\d{1,2})月(\d{1,2})日.+/mg,'$1.$2.$3');
                i++;
            }
            if(item["append"] && item["append"]["photos"] && item["append"]["photos"].length > 0) {
                arr["comments"][i] = {};
                arr["comments"][i]["user"] = item["user"];
                arr["comments"][i]["content"] = item["append"]["content"];
                arr["comments"][i]["photos"] = [];
                item["append"]["photos"].forEach(function(item_in){
                    arr["comments"][i]["photos"].push({"big": item_in.url, "small": item_in.thumbnail});
                });
                arr["comments"][i]["date"] = item["date"].replace(/(\d{4})年(\d{1,2})月(\d{1,2})日.+/mg,'$1.$2.$3');
                arr["comments"][i]["ifappend"] = 1;
                i++;
            }
        });
    }
    return arr;
}
// 利用 template 标签, 把 html 字符串转成 dom 结构.
// 方便使用 dom 中的方法来分析数据.
function string2dom(string) {
    var id = '_tmpl', tag = 'template';
    var node = document.getElementById(id);
    if (!node) {
        node = document.createElement(tag);
        node.id = id;
        document.body.appendChild(node);
    }
    node.innerHTML = string;
    return node.content;
}
// 向 tab 发送消息.
function sendMessage(tabid, message) {
    sogouExplorer.tabs.sendRequest(tabid, message);
}

function createResponse(sender, id) {
    return function(message) {
        var request = {
            cmd: 'run',
            id: id,
            data: message
        };
        if (sender.tab) {
            sogouExplorer.tabs.sendRequest(sender.tab.id, request);
        } else {
            sogouExplorer.extension.sendRequest(request);
        }
    };
}
var addListener = (function() {
    var commands = {};
    sogouExplorer.extension.onRequest.addListener(function(request, sender) {
        var argus = [].slice.call(arguments);
        var response = createResponse(sender, request.id);
        var cmd = request.cmd;
        var list = commands[cmd];
        if (list) {
            for (var i = 0, l = list.length; i < l; ++i) {
                if (typeof list[i] == 'function') {
                    list[i](request.data, response, argus);
                }
            }
        }
    });
    return function(cmd, handler) {
        var list = commands[cmd] = commands[cmd] || [];
        if (list.indexOf(handler) === -1) {
          list.push(handler);
        }
    }
})();


var pingback = new xPingback({
    "url": "http://config.ie.sogou.com/sext_zhenxiangtao.gif"
});