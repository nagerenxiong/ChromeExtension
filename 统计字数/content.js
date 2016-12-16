var flag = false;
window.onload = function() {
    var port = chrome.extension.connect({
        name: "tjzs"
    });
    port.onMessage.addListener(function(msg) {
        console.log(msg);
        flag=msg.flag;
    });


    $("body").append('<input type="text" id="biao1" style="opacity: 0;position: absolute;right:0;bottom: 50%;">');
    $("body").append('<div id="dddddd"  style="padding:10px 20px;;display:none;position: fixed;top:20%;left:45%;background:red;color:#fff"></div>');
    document.onmouseup = function() {
        if (flag) return;
        var txt;
        if (document.selection) {
            txt = document.selection.createRange().text
        } else {
            txt = window.getSelection() + '';
        }
        if (txt) {
            var len = txt.length;
            document.getElementById("biao1").value = len;
            $("#dddddd").text("字数：" + len + ",复制！").show();
            document.getElementById("biao1").select();
            document.execCommand("Copy"); // 执行浏览器复制命令
        }
        window.getSelection().removeAllRanges();
    }
    // document.onkeydown = function(event) {
    //     var e = event || window.event || arguments.callee.caller.arguments[0];
    //     if (e && e.keyCode == 18) {
    //         //要做的事情
           
    //     }
    // };
    $(document).on('click', '#dddddd', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).hide();
    });

}