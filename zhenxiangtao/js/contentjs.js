(function(){
    var $ = SG;
    var tpl;
    var append_tpl;
    //所有评论的ul的高度；
    var ul_height;
    $(document).ready(function(){
        init();
        getTplFromBackground();
    });
    function init(){
        var location = window.location.href;
        var url_type = getPrefixByURL(location);
        bind(url_type);
        initPreview();
    }
    function initPreview(){
        $("body").append('<div class="pop_preview_large_bg"></div>\
                        <div class="pop_preview_large">\
                            <a class="close"></a>\
                            <img src="">\
                        </div>');
    }
    function getTplFromBackground(){
        sendMessage({
            cmd: 'template',
            dom: 'comments-tpl',
            id:jsonp(function(data) {
                tpl = data["html"];
                append_tpl = data["append_html"];
            })
        });
    }
    function getDataFromBackground() {
        var page = 1;
        return function(auctionNumId, userNumId, type, cb){
            sendMessage({
                cmd: 'comments',
                auctionNumId: auctionNumId,
                userNumId: userNumId,
                type: type,
                page: page++,
                id:jsonp(function(data) {
                    cb&&cb(data);
                })
            });
        }
    }
    sogouExplorer.extension.onRequest.addListener(function(request) {
        var cmd = request.cmd;
        switch(cmd) {
            case 'tpl':
                var id = request.id;
                var data = request.data;
                var cb = window[id];
                if (typeof cb == 'function') {
                cb(data);
                window[id] = null;
                }
                break;
            case 'comment':
                var id = request.id;
                var data = request.data;
                var cb = window[id];
                if (typeof cb == 'function') {
                    cb(data);
                    window[id] = null;
                }
                break;
            default:
                break;
        }
    });
    function bind(url_type){
        //hover淘宝的宝贝
        var timer_in;
        var timer_hide;
        var previewing = 0;
        //是否正在请求或追加数据
        var appending = 0;
        var ping_type;
        ping_type = url_type;
        if(url_type == "taobao"){//淘宝站
            $(document).on("mouseenter",".m-itemlist .item",function(){
                var _this = this;
                timer_in = setTimeout(function(){
                    //天猫or淘宝
                    var type = "";
                    if($(_this).find(".icon-service-tianmao").length > 0){
                        type = "tmall";
                        ping_type = "tmall_in_taobao";
                    }else{
                        type = "taobao";
                        userNumId = "";
                    }
                    var height = $(_this).height();
                    var left = parseInt($(_this).offset().left) + $(_this).width()+3;
                    var pop_left = "";
                    if((left + 340) > $(window).width() + 30) {
                        left = parseInt($(_this).offset().left) -343;
                        pop_left = "float_left";
                    }
                    var top = $(_this).offset().top;
                    if($(_this).hasClass("activity")) {
                        type = "activity";
                        var href = $(_this).find(".activity-link").attr("href");
                        if(href != undefined){
                            var itemid = href.substring(href.indexOf("itemid=") + 7);
                            var auctionNumId = itemid.substring(0,itemid.indexOf("&"));
                            var userNumId = "";
                        }
                    }else{
                        var auctionNumId = $(_this).find(".pic a").attr("data-nid");
                        var userNumId = $(_this).find(".shopname").attr("data-userid");
                    }
                    if(auctionNumId){
                        var getDataFunc = getDataFromBackground();
                        appending = 1;
                        getDataFunc(auctionNumId, userNumId, type, function(data){
                            getDataCallback(auctionNumId, userNumId, type, data);
                        });
                    }
                    function getDataCallback(auctionNumId, userNumId, type, data){
                        $("body .pop").remove();
                        appending = 0;
                        if(data["total"] == 0){
                            sendMessage({
                                cmd: 'ping',
                                type: "hover_show_" + ping_type + "_empty"
                            });
                            return;
                        }
                        var html = Mustache.render(tpl,data);
                        $("body").append(html);
                        popLoad();
                        $(".pop .img_b.init:first-child").addClass("selected");
                        $(".pop .img_b.init").removeClass("init");
                        $(".pop").css({"left": left + "px","top": top + "px","height": height + "px"});
                        if(pop_left != "") {
                            $(".pop").addClass(pop_left);
                        }
                        var pop = document.getElementById("pop");
                        ul_height = $("#pop ul").height();
                        var pop_height = $(".pop").height();
                        //第一个屏的图片直接加载
                        $("#pop .cont .ul .item:eq(0)").find(".lazy").each(function(){
                            $(this).attr("src", $(this).attr("r_src"));
                        });

                        pop.addEventListener("mousewheel",function(e){
                            var scrollTop = $("#pop .cont").scrollTop();
                            //如果滚动到头部或者底部
                            if(scrollTop === 0 && e.wheelDeltaY > 0 || scrollTop >= ul_height - pop_height && e.wheelDeltaY < 0){
                                e.preventDefault();
                            }
                            //离底部50px,请求新数据
                            if(scrollTop >= (ul_height - pop_height - 50) && e.wheelDeltaY < 0){
                                if(appending == 1){
                                    return;
                                }
                                appending = 1;
                                getDataFunc(auctionNumId, userNumId, type, function(data){
                                    appendDataCallback(auctionNumId, userNumId, type, data);
                                });
                            }
                            var view_count = 0;
                            var items = $("#pop .cont .ul .item");
                            for(var index = 0, len = items.length; index < len; index++ ){
                                var _this = items.eq(index);
                                var h = _this.outerHeight();
                                var pos_top = _this.position().top;
                                if(!_this.hasClass("loaded")){
                                    if(pos_top > scrollTop - h && pos_top < scrollTop + pop_height) {
                                        _this.find(".lazy").each(function(){
                                            $(this).attr("src", $(this).attr("r_src"));
                                        });
                                        _this.addClass("loaded");
                                        index++;
                                        view_count++;
                                        items.eq(index).find(".lazy").each(function(){
                                            $(this).attr("src", $(this).attr("r_src"));
                                        });
                                    }
                                }
                                if(view_count >= 1) {
                                    break;
                                }
                            }
                        });
                        sendMessage({
                            cmd: 'ping',
                            type: "hover_show_" + ping_type
                        });
                    }
                    //追加数据callback
                    function appendDataCallback(auctionNumId, userNumId, type, data){
                        appending = 0;
                        if(data["comments"].length == 0){
                            appending = 1;
                            return;
                        }
                        if(data["comments"].length < 20){
                            appending = 1;
                        }
                        appending = 0;
                        var html = Mustache.render(append_tpl,data);
                        $(".pop .cont .ul").append(html);
                        popLoad();
                        $(".pop .img_b.init:first-child").addClass("selected");
                        $(".pop .img_b.init").removeClass("init");
                        ul_height = $("#pop .ul").height();
                        sendMessage({
                            cmd: 'ping',
                            type: "hover_append_" + ping_type
                        });
                    }
                },300);
            });
            $(document).on("mouseenter",".m-itemlist .item,.pop",function(){
                clearTimer();
            });
            $(document).on("mouseleave",".m-itemlist .item,.pop",function(){
                clearTimeout(timer_in);
                //没有在查看大图
                if(previewing != 1){
                    timerPopHide();
                }
            });
            $(document).on("click", ".pop .comment", function(){
                $(this).removeClass("fold").addClass("unfold");
                sendMessage({
                    cmd: 'ping',
                    type: "comment_unfold"
                });
            });
        }else{//天猫站
            $(document).on("mouseenter","#J_ItemList .product",function(){
                var _this = this;
                timer_in = setTimeout(function(){
                    //天猫or淘宝
                    var type = "tmall";
                    var height = $(_this).height();
                    var left = parseInt($(_this).offset().left) + $(_this).width()+3;
                    var pop_left = "";
                    if((left + 340) > $(window).width() + 30) {
                        left = parseInt($(_this).offset().left) -343;
                        pop_left = "float_left";
                    }
                    var top = $(_this).offset().top;
                    var auctionNumId = $(_this).attr("data-id");
                    var href = $(_this).find(".productImg-wrap .productImg").attr("href");
                    if(href != undefined){
                        var href = href.substring(href.indexOf("user_id=") + 8);
                        userNumId = href.substring(0,href.indexOf("&"));
                    }
                    if(auctionNumId && userNumId){
                        var getDataFunc = getDataFromBackground();
                        appending = 1;
                        getDataFunc(auctionNumId, userNumId, type, function(data){
                            getDataCallback_tmall(auctionNumId, userNumId, type, data);
                        });
                    }else{
                        $("body .pop").remove();
                    }
                    function getDataCallback_tmall(auctionNumId, userNumId, type, data){
                        $("body .pop").remove();
                        appending = 0;
                        if(data["total"] == 0){
                            sendMessage({
                                cmd: 'ping',
                                type: "hover_show_" + ping_type + "_empty"
                            });
                            return;
                        }
                        var html = Mustache.render(tpl,data);
                        $("body").append(html);
                        popLoad();
                        $(".pop .img_b.init:first-child").addClass("selected");
                        $(".pop .img_b.init").removeClass("init");
                        $(".pop").css({"left": left + "px","top": top + "px","height": height + "px"});
                        if(pop_left != "") {
                            $(".pop").addClass(pop_left);
                        }
                        //第一个屏的图片直接加载
                        $("#pop .cont .ul .item:eq(0)").find(".lazy").each(function(){
                            $(this).attr("src", $(this).attr("r_src"));
                        });
                        var pop = document.getElementById("pop");
                        ul_height = $("#pop ul").height();
                        var pop_height = $(".pop").height();
                        pop.addEventListener("mousewheel",function(e){
                            var scrollTop = $("#pop .cont").scrollTop();
                            //如果滚动到头部或者底部
                            if(scrollTop === 0 && e.wheelDeltaY > 0 || scrollTop >= ul_height - pop_height && e.wheelDeltaY < 0){
                                e.preventDefault();
                            }
                            //离底部50px,请求新数据
                            if(scrollTop >= (ul_height - pop_height - 50) && e.wheelDeltaY < 0){
                                if(appending == 1){
                                    return;
                                }
                                appending = 1;
                                getDataFunc(auctionNumId, userNumId, type, function(data){
                                    appendDataCallback_tmall(auctionNumId, userNumId, type, data);
                                });
                            }
                            //图片懒加载
                            var view_count = 0;
                            var items = $("#pop .cont .ul .item");
                            for(var index = 0, len = items.length; index < len; index++ ){
                                var _this = items.eq(index);
                                var h = _this.outerHeight();
                                var pos_top = _this.position().top;
                                if(!_this.hasClass("loaded")){
                                    if(pos_top > scrollTop - h && pos_top < scrollTop + pop_height) {
                                        _this.find(".lazy").each(function(){
                                            $(this).attr("src", $(this).attr("r_src"));
                                        });
                                        _this.addClass("loaded");
                                        index++;
                                        view_count++;
                                        items.eq(index).find(".lazy").each(function(){
                                            $(this).attr("src", $(this).attr("r_src"));
                                        });
                                    }
                                }
                                if(view_count >= 1) {
                                    break;
                                }
                            }
                        });
                        sendMessage({
                            cmd: 'ping',
                            type: "hover_show_" + ping_type
                        });
                    }
                    //追加数据callback
                    function appendDataCallback_tmall(auctionNumId, userNumId, type, data){
                        if(data["comments"].length == 0){
                            appending = 1;
                           /* sendMessage({
                                cmd: 'ping',
                                type: "hover_show_" + ping_type + "_empty"
                            });*/
                            return;
                        }
                        if(data["comments"].length < 20){
                            appending = 1;
                        }
                        appending = 0;
                        var html = Mustache.render(append_tpl,data);
                        $(".pop .cont .ul").append(html);
                        popLoad();
                        $(".pop .img_b.init:first-child").addClass("selected");
                        $(".pop .img_b.init").removeClass("init");
                        ul_height = $("#pop .ul").height();
                        sendMessage({
                            cmd: 'ping',
                            type: "hover_append_" + ping_type
                        });
                    }
                },300);
            });
            $(document).on("mouseenter","#J_ItemList .product,.pop",function(){
                clearTimer();
            });
            $(document).on("mouseleave","#J_ItemList .product,.pop",function(){
                clearTimeout(timer_in);
                //没有在查看大图
                if(previewing != 1){
                    timerPopHide();
                }
            });
            $(document).on("click", ".pop .comment", function(){
                $(this).removeClass("fold").addClass("unfold");
                sendMessage({
                    cmd: 'ping',
                    type: "comment_unfold"
                });
            });
        }
        //hover浮层里的小图
        $(document).on("mouseenter",".pop .img_b",function(){
            var album = $(this).parents(".album");
            var preview = album.find(".preview img");
            preview.attr("src",$(this).find("img").attr("big"));
            album.find(".img_b").removeClass("selected");
            $(this).addClass("selected");
            sendMessage({
                cmd: 'ping',
                type: "hover_small"
            });
            //preview.css({"width": preview[0].naturalWidth,"height": preview[0].naturalHeight});
        });
        //点击查看大图
        $(document).on("click",".pop .preview img",function(){
            previewing = 1;
            var win_height = $(window).height();
            var top = win_height/2;
            $(".pop_preview_large img").attr("src",$(this).attr("src"));
            $(".pop_preview_large img").css("max-height", (win_height - 50) + "px");
            $(".pop_preview_large_bg").show();
            $(".pop_preview_large").css("top",top + "px").show();
            sendMessage({
                cmd: 'ping',
                type: "preview_big"
            });
        })
        $(document).on("click",".pop_preview_large_bg,.pop_preview_large",function(){
            $(".pop_preview_large_bg").hide();
            $(".pop_preview_large").hide();
            previewing = 0;
        });
        function clearTimer(){
            clearTimeout(timer_hide);
        }
        //鼠标离开宝贝时，计时消失
        function timerPopHide(){
            timer_hide = setTimeout(function(){
                $("body .pop").remove();
            },100);
        }
    }
    function popLoad(){
        $(".pop .comment .full_comment.init").each(function(){
            if($(this).height() > 36){
                $(this).parent().addClass("fold");
            }
        });
        $(".pop .comment .full_comment.init").removeClass("init");
    }
    function getPrefixByURL(url) {
        if (/^http[s]:\/\/s.taobao.com/.test(url)) {
            return 'taobao';
        }
        if (/^http[s]:\/\/list.tmall.com/.test(url)) {
            return 'tmall';
        }
        return '';
    }

    /*sogouExplorer.tabs.onSelectionChanged.addListener(function(tid, info) {
        sogouExplorer.tabs.get(tid, function(tab) {
          init(tab, false);
        });
    });

    sogouExplorer.tabs.onUpdated.addListener(function(tid, info, tab) {
        if (info && info.status === 'complete') {
          init(tab, true);
        }
    });*/
})();