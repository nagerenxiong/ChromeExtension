function t() {
    var t = document.cookie.split("; ");
    return t = t.filter(function(t) {
        return t.indexOf("token") > 0
    }),
    t[0].split("=").pop()
}
function n() {
    var t, n = 100; (t = function() {
        var o = a();
        o ? (n -= 10, s === !1 && (i(), s = !0)) : (n += 10, e()),
        setTimeout(t, n)
    })()
}
function e() {
    var t, n, e;
    n = $("#onekey-filter"),
    t = $(".batch-group"),
    n.length && (e = t.offset(), n.css("top", e.top), n.css("left", e.left + t.width() + 10))
}
function i() {
    var t = '<a id="onekey-filter" style="position:absolute;z-index: 100;" href="javascript:;" class="btn btn-size25"> 一键拒绝低佣金 </a>';
    $(document.body).append(t),
    $("#onekey-filter").click(function(t) {
        var n, e = 0;
        $("td .title a").each(function() {
            var t, n, i, a = $(this);
            t = a.closest("tr"),
            n = t.children("td").eq(4),
            "down" === n.data("rate") && (i = t.children("td:first").children("input"), i.attr("checked", !1), o(i[0]), e++)
        }),
        $(".toolbar").find(".btn").each(function() {
            var t = this.innerText;
            return t.indexOf("批量审核拒绝") > -1 ? (n = this, !1) : void 0
        }),
        e > 0 && n && setTimeout(function() {
            o(n),
            i()
        },
        100)
    }),
    e()
}
function o(t) {
    var n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0),
    t.dispatchEvent(n)
}
function a() {
    var t = $("td .title a"),
    n = !1;
    return t.each(function() {
        var t, e, i = $(this);
        i.data("handled") || (r(i.attr("href"),
        function(n) {
            var i, o = t.children("span");
            console.log(n),
            0 == n ? o.text("没有数据") : "false" === n ? o.text("没有数据").css("color", "red") : (i = n[0].commissionrate, e = e.substring(0, e.length - 1), e - i >= 0 ? (o.css("color", "green"), t.data("rate", "up")) : (o.css("color", "red"), t.data("rate", "down")), o.text(i + "%"))
        }), t = i.closest("tr").children("td").eq(4), e = t.text(), t.html("<span>loading ...</span><br/>" + e), i.data("handled", !0), n = !0)
    }),
    n
}
function r(t, n) {
    var e, i = t.indexOf("?");
    return i > -1 && (parts = t.substring(i + 1).split("&").filter(function(t) {
        return 0 === t.indexOf("id=")
    }), parts.length) ? (e = parts[0].split("=").pop(), chrome.runtime.sendMessage({
        cmd: "queqiao",
        id: e
    },
    n)) : void n(!1)
}
var c = location.hash,
s = !1,
d = "0",
u = "1",
l = "2",
f = "3";
0 === c.indexOf("#!/manage/act/activity_item") && (n(), $(function() {
    $(window).scroll(e)
})),
chrome.runtime.onMessage.addListener(function(n, e, i) {
    var o, a;
    return "event" === n.cmd ? (o = $.post("http://pub.alimama.com/event/publish.json", {
        _tb_token_: t(),
        siteid: n.siteid,
        adzoneid: n.adzoneid,
        eventId: n.id
    }), o.done(function(t) {
        i(t && t.data ? t: {
            error: u
        })
    }), o.fail(function() {
        i({
            error: d
        })
    }), !0) : "sq" === n.cmd ? (a = n.params, a._tb_token_ = t(), $.post("http://pub.alimama.com/pubauc/applyForCommonCampaign.json", a,
    function(t) {
        i({
            data: !0
        })
    }), !0) : void 0
});