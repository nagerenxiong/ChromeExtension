var t = /\{(.*?)\}/g,
a = {
    render2: function(a, e) {
        return a.replace(t,
        function(t, a) {
            var i;
            return a in e ? "undefined" == typeof e[a] ? "": e[a] : (i = a.charAt(0).toLowerCase() + a.substring(1), i in e ? e[i] : "")
        })
    },
    render: function(a, e) {
        return this[a].replace(t,
        function(t, a) {
            var i;
            return a in e ? e[a] : (i = a.charAt(0).toLowerCase() + a.substring(1), i in e ? e[i] : "")
        })
    },
    batch: function(t, e) {
        return e.map(function(e) {
            return a.render(t, e)
        }).join("")
    }
};
a.miniBox = '<p class="mini-box"><span class="info">佣金：{commissionRatePercent}%</span><span class="info">最高佣金：{topCommissionRatePercent}%</span></p>',
a.boxGeneral = '<div class="general"><div class="row"><span class="info">佣金：{commissionRatePercent}%</span> <span class="info">最高佣金：{topCommissionRatePercent}%</span></div><div class="row"><a href="javascript:;" action="tg-s">单品推广</a> <a href="javascript:;" action="lj">链接转换</a> <a target="_blank" class="go-detail" href="">进入商品</a></div></div>',
a.boxPlans = '<div class="plans"><div class="plans-wrapper"><table><thead><tr><th>计划名</th><th>审核</th><th>平均佣金</th><th>佣金</th><th>操作</th></tr></thead><tbody>{data}</tbody></table></div></div>',
a.boxEvents = '<div class="events"><div class="events-wrapper"><table><thead><tr><th>鹊桥ID</th><th>佣金</th><th>开始</th><th>结束</th><th>分成</th><th>终分</th><th>剩余</th><th>推广</th><th>生成</th></tr></thead><tbody>{data}</tbody></table></div></div>',
a.defaultQMBox = '<div class="qm-box"></div>',
a.qqrow = '<tr class="{color}"><td>{eventId}</td><td>{commissionrate}%</td><td>{stime}</td><td>{etime}</td><td>{sharerate}%</td><td>{zhongfen}%</td><td>{ltime}</td><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/act/activity_detail?eventId={eventId}">推广</a></td><td><a action="lj-qq" href="javascript:;">生成</a></td></tr>',
a.planrow = '<tr><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={CampaignID}&shopkeeperId={ShopKeeperID}&userNumberId={userNumberId}">{CampaignName}</a></td><td>{Properties}</td><td>{AvgCommission}</td><td><a href="javascript:;" action="yj">佣金</a></td><td><a href="javascript:;" action="get">申请</a></td></tr>',
a.pidwindow = '<div class="qm-window"> <div class="qm-window-header"> <button type="button" class="qm-window-close" ><span>&times;</span></button> <h4 class="qm-window-title">请输入您的 PID</h4> </div> <div class="qm-window-body"> <div class="form-group"><input type="text" class="form-control" placeholder="请输入三段式PID"></div> </div> <div class="qm-window-footer"> <button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button> <button type="button" class="btn btn-primary avgrund-close" action="save">确定</button> </div></div>',
a.qqpidwindow = '<div class="qm-window"> <div class="qm-window-header"> <button type="button" class="qm-window-close" ><span>&times;</span></button> <h4 class="qm-window-title">请输入您的鹊桥 PID</h4> </div> <div class="qm-window-body"> <div class="form-group"><input type="text" class="form-control" placeholder="请输入三段式PID"></div> </div> <div class="qm-window-footer"> <button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button> <button type="button" class="btn btn-primary avgrund-close" action="save">确定</button> </div></div>',
a.linkModal = '<div class="qm-window"><div class="qm-window-header"><button type="button" class="qm-window-close"><span>&times;</span></button><h4 class="qm-window-title">选择并复制您的链接吧</h4></div><div class="qm-window-body"><ul class="nav nav-tabs"><li class="active"><a href="javascript:;" data-cp="#home">淘客链接</a></li><li><a href="javascript:;" data-cp="#profile">短链接</a></li><li><a href="javascript:;" data-cp="#messages">长链接</a></li><li><a href="javascript:;" data-cp="#baidu">百度链接</a></li><li><a href="javascript:;" data-cp="#sina">新浪链接</a></li><li><a href="javascript:;" data-cp="#qrcode">二维码</a></li></ul><div class="tab-content"><div class="tab-pane active" id="home"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="clickUrl"></textarea></div></div><div class="tab-pane" id="profile"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="shortLinkUrl"></textarea></div></div><div class="tab-pane" id="messages"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="eliteUrl"></textarea></div></div><div class="tab-pane" id="baidu"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="du_url"></textarea></div></div><div class="tab-pane" id="sina"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="sina_url"></textarea></div></div><div class="tab-pane" id="qrcode"><img data-key="qrCodeUrl"></div></div></div><div class="qm-window-footer"><button type="button" class="btn btn-default avgrund-close">关闭</button></div></div>',
a.ssModal = '<div class="qm-window"><div class="qm-window-header"><button type="button" class="qm-window-close"><span>&times;</span></button><h4 class="qm-window-title">请选择你要使用的推广位</h4></div><div class="qm-window-body"><div class="form-group"><select class="form-control"></select></div></div><div class="qm-window-footer"><button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button> <button type="button" class="btn btn-default avgrund-close" action="save">确定</button></div></div>',
a.applyPlan = '<div class="qm-window"><div class="qm-window-header"><button type="button" class="qm-window-close" ><span>&times;</span></button><h4 class="qm-window-title">请输入申请理由</h4></div><div class="qm-window-body"><div class="form-group"><textarea class="form-control" placeholder="要推广此商品，请求通过！"></textarea></div></div><div class="qm-window-footer"><button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button><button type="button" class="btn btn-primary avgrund-close" action="save">确定</button></div></div>',
window.taokezhushou = window.taokezhushou || {},
window.itemData,
function($) {
    var t = {
        modal: function(t, a, e) {
            var i, n, o;
            i = $('<div class="qm-overlay"></div>'),
            n = $(t),
            i.appendTo(document.body),
            n.appendTo(document.body),
            n.css({
                marginLeft: n.width() / -2,
                marginTop: n.height() / -2
            }),
            o = function() {
                n.hide(),
                e && e(n),
                n.unbind("click"),
                i.remove(),
                n.remove()
            },
            n.delegate(".qm-window-close", "click", o),
            n.delegate(".btn", "click",
            function() {
                setTimeout(o, 100)
            }),
            a && a(n)
        },
        spread: function(t) {
            var a = this;
            chrome.runtime.sendMessage({
                cmd: "tuiguang",
                url: t
            },
            function(t) {
                t.error ? a.handleError(t.error) : t.nextcmd && a.selectSpreadUnit(t.data)
            })
        },
        getLink: function(t, a) {
            var e = this;
            chrome.runtime.sendMessage({
                cmd: "link",
                pid: a,
                url: t
            },
            function(t) {
                t.error ? e.handleError(t.error) : e.showLink(t)
            })
        },
        getQQLink: function(t, a, e) {
            var i = this;
            chrome.runtime.sendMessage({
                cmd: "qq-link",
                id: t,
                pid: a,
                itemId: e
            },
            function(t) {
                t.error ? i.handleError(t.error) : i.showLink(t, "qq")
            })
        },
        handleError: function(t) {
            "string" == typeof t ? alert(t) : alert(t.message)
        },
        showLink: function(t, e) {
            this.modal(a.linkModal,
            function(a) {
                var e, i, n;
                for (e in t.data) if (t.data[e] && (i = a.find('[data-key="' + e + '"]'), i.length)) switch (n = i[0].tagName.toLowerCase()) {
                case "input":
                case "textarea":
                    i.val(t.data[e]),
                    i.removeAttr("data-key");
                    break;
                case "img":
                    i.removeAttr("data-key"),
                    i.attr("src", t.data[e])
                }
                a.find("[data-key]").each(function() {
                    var t, e = $(this).closest(".tab-pane");
                    t = a.find('[data-cp="#' + e.attr("id") + '"]'),
                    t.closest("li").hide()
                }),
                a.find(".nav-tabs").delegate("li", "click",
                function(t) {
                    var a, e = $(this);
                    e.hasClass("active") || (a = e.parent().next(".tab-content"), e.siblings(".active").removeClass("active"), a.children(".active").removeClass("active"), e.addClass("active"), $(e.children("a").attr("data-cp")).addClass("active"))
                })
            },
            function(t) {
                t.find(".nav-tabs").unbind("click")
            })
        },
        getPid: function(t) {
            var a = this;
            chrome.runtime.sendMessage({
                cmd: "adzone",
                tag: 29
            },
            function(e) {
                var i = {
                    zones: []
                };
                return e.error ? (a.handleError(e.error), t()) : (["otherList", "webList", "appList"].forEach(function(t) {
                    var a = e.data[t];
                    return a.length ? (i.memberid = a[0].memberid, !1) : void 0
                }), ["otherAdzones", "webAdzones", "appAdzones"].forEach(function(t) {
                    var a = e.data[t];
                    a && a.forEach(function(t) {
                        t.sub.length && i.zones.push(t)
                    })
                }), i.zones.length ? a.selectSpreadUnit(i, t) : (t(), void alert("没有检测到您的推广位，请登录阿里妈妈查看。")))
            })
        },
        getQQPid: function(t) {
            var a = this;
            chrome.runtime.sendMessage({
                cmd: "adzone",
                tag: 59
            },
            function(e) {
                var i = {
                    zones: []
                };
                return e.data && (["otherList", "webList", "appList"].forEach(function(t) {
                    var a = e.data[t];
                    return a.length ? (i.memberid = a[0].memberid, !1) : void 0
                }), ["otherAdzones", "webAdzones", "appAdzones"].forEach(function(t) {
                    var a = e.data[t];
                    a && a.forEach(function(t) {
                        t.sub.length && i.zones.push(t)
                    })
                }), i.zones.length) ? a.selectSpreadUnit(i, t) : void a.showInputPIDWindow(!0, t)
            })
        },
        showInputPIDWindow: function(t, e) {
            "function" == typeof t && (e = t, t = !1),
            this.modal(t ? a.qqpidwindow: a.pidwindow,
            function(a) {
                a.find(".btn[action]").click(function(i) {
                    var n, o = $(this);
                    "save" === o.attr("action") ? (n = a.find("input").val(), 0 !== n.indexOf("mm_") && (n = "mm_" + n), t ? chrome.storage.local.set({
                        "qq-pid": n
                    }) : chrome.storage.local.set({
                        pid: n
                    }), e(n)) : "cancel" === o.attr("action") && e(!1)
                }),
                chrome.storage.local.get("qq-pid",
                function(t) {
                    t["qq-pid"] && a.find("input").val(t["qq-pid"])
                })
            },
            function(t) {
                t.find(".btn[action]").unbind("click")
            })
        },
        selectSpreadUnit: function(t, e) {
            this.modal(a.ssModal,
            function(a) {
                a.find("select").html(t.zones.map(function(a) {
                    return a.sub.map(function(e) {
                        var i = ["mm", t.memberid, a.id, e.id].join("_");
                        return '<option value="' + i + '">' + a.name + " - " + e.name + "</option>"
                    }).join("")
                }).join("")),
                a.find(".btn[action]").click(function(t) {
                    var i, n = $(this);
                    "save" === n.attr("action") ? (i = a.find("select").val(), e(i ? i: !1)) : "cancel" === n.attr("action") && e(!1)
                })
            },
            function(t) {
                t.find(".btn[action]").unbind("click")
            })
        },
        applyPlan: function(e, i) {
            var n = {},
            o = e.split("?").pop().split("&").map(function(t) {
                return t.split("=")
            });
            o.forEach(function(t) {
                n[t[0]] = t[1]
            }),
            n = {
                campId: n.campaignId,
                keeperid: n.shopkeeperId,
                applyreason: "要推广此商品，请求通过！！ "
            },
            this.modal(a.applyPlan,
            function(a) {
                a.delegate(".btn", "click",
                function(e) {
                    var o = $(this).attr("action");
                    "save" === o && (n.applyreason = a.find("textarea").val() || n.applyreason, chrome.runtime.sendMessage({
                        cmd: "applyPlan",
                        data: n
                    },
                    function(a) {
                        a.error ? (t.handleError(a.error), i(!1)) : i(!0)
                    }))
                })
            },
            function(t) {
                t.unbind("click")
            })
        },
        getPlanCommission: function(t, a) {
            chrome.runtime.sendMessage({
                cmd: "planyj",
                data: t
            },
            a)
        }
    },
    l = {
        init: function() {
            var t = this;
            t.append(),
            t.initEvent(),
            window.Plugin.suggest.init()
        },
        initEvent: function() {
            var a = this,
            e = $("#taokezhushou-plus .info-tm"),
            i = !1;
            $(".keyword").focus(function() {
                a.open()
            }),
            $("#taokezhushou-plus-tm,#taokezhushou-plus-tb").focusout(function() {
                a.close()
            }),
            $(".searchbtn").click(function() {
                return $("#searchform").submit(),
                !1
            }),
            e.empty().append('<div class="loading"><img src="https://img.alicdn.com/imgextra/i2/1093713845/TB23dMdhFXXXXXaXFXXXXXXXXXX_!!1093713845.gif" class="loadimg"/><div class="loadmsg">正在获取数据，请稍候...<br/><br/>请从右上角登陆。。。<br/><br/>请登陆阿里妈妈。。。<br/><br/>请验证阿里妈妈验证码。。。</div></div>'),
            $("#taokezhushou-plus .tongyong,#taokezhushou-plus .queqiao,#taokezhushou-plus .info-tm").hover(function() {
                i === !1 && (a.getDetailData(), i = !0, chrome.runtime.sendMessage({
                    cmd: "sendDetail",
                    url: window.location.href
                })),
                e.stop().show(),
                e.css("opacity", 1)
            },
            function() {
                e.fadeOut(500)
            }),
            $("#close-plus").click(function() {
                $("#taokezhushou-plus").css("display", "none")
            }),
            $("#taokezhushou-plus").delegate("a", "click",
            function(a) {
                var e, i, n, o = a.target,
                s = o.getAttribute("action");
                location.href;
                if (s) switch (s) {
                case "tg-s":
                    t.getPid(function(a) {
                        a && t.getLink(itemData.url, a)
                    });
                    break;
                case "lj":
                    t.getPid(function(a) {
                        a && t.getLink(itemData.url, a)
                    });
                    break;
                case "lj-qq":
                    e = $(o).closest("tr").children("td:first").text(),
                    t.getQQPid(function(a) {
                        a && t.getQQLink(e, a, itemData.item.iid || itemData.item.auctionId)
                    });
                    break;
                case "get":
                    i = $(o).closest("tr").children("td:first").children("a").attr("href"),
                    t.applyPlan(i,
                    function(t) {
                        t ? ($(o).closest("td").text("申请成功"), alert("申请成功")) : alert("申请失败")
                    });
                    break;
                case "yj":
                    e = $(o).closest("tbody").children("tr").index($(o).closest("tr")),
                    n = itemData.plans[e],
                    t.getPlanCommission(n,
                    function(a) {
                        a.error ? t.handleError(a.error) : $(o).closest("td").text(a.data)
                    });
                    break;
                default:
                    console.log("unsupported action:", s)
                }
            })
        },
        html_tm: '<div id="taokezhushou-plus" style="margin-bottom:5px"><div id="close-plus" style="position: absolute;right: 15px;top: -10px;cursor:pointer;"><img src="https://img.alicdn.com/imgextra/i3/1093713845/TB2hhy6hFXXXXbeXpXXXXXXXXXX_!!1093713845.gif"></div><table id="taokezhushou-plus-tm"><tr><td class="logo"><a href="http://www.tbaokuan.com" target="_blank"><img src="https://img.alicdn.com/imgextra/i3/1093713845/TB24c7zhFXXXXcNXXXXXXXXXXXX_!!1093713845.png"/></a></td><td class="tongyong"><img src="https://img.alicdn.com/imgextra/i2/1586519881/TB2OFq2hFXXXXX9XXXXXXXXXXXX-1586519881.png" class="tongyongico"/><span class="tyyj">划过显示通用佣金</span></td><td class="queqiao"><img src="https://img.alicdn.com/imgextra/i4/1586519881/TB2HViYhFXXXXaHXXXXXXXXXXXX-1586519881.png" class="queqiaoico"/><span class="qqzg">划过显示鹊桥</span></td><td class="search-kw"><form id="searchform" action="http://www.qumai.org/cm/s.php" method="get" target="_blank" accept-charset="utf-8"><input type="hidden" name="s" value="1"/><input placeholder="查鹊桥商品" type="text" name="kw" class="keyword"/></form></td><td class="search"><button class="searchbtn" data="1">搜 索</button></td></tr></table><div class="info-tm" style="display:none"></div></div><div id="suggest-panel"></div><div class="taokezhushou-plus-cl"></div>',
        html_tb: '<div id="taokezhushou-plus" style="margin-top:10px"><div id="close-plus" style="position: absolute;right: 0px;top: -10px;cursor:pointer;"><img src="https://img.alicdn.com/imgextra/i3/1093713845/TB2hhy6hFXXXXbeXpXXXXXXXXXX_!!1093713845.gif"></div><table id="taokezhushou-plus-tb"><tr><td class="logo"><a href="http://www.tbaokuan.com" target="_blank"><img src="http://www.qumai.org/chajian/img/logo1.png"/></a></td><td class="tongyong"><img src="https://img.alicdn.com/imgextra/i2/1586519881/TB2OFq2hFXXXXX9XXXXXXXXXXXX-1586519881.png" class="tongyongico"/><span class="tyyj">划过显示通用佣金</span></td><td class="queqiao"><img src="https://img.alicdn.com/imgextra/i4/1586519881/TB2HViYhFXXXXaHXXXXXXXXXXXX-1586519881.png" class="queqiaoico"/><span class="qqzg">划过显示鹊桥</span></td><td class="search-kw"><form id="searchform" action="http://www.qumai.org/cm/s.php" method="get" target="_blank" accept-charset="utf-8"><input type="hidden" name="s" value="1"/><input placeholder="查鹊桥商品" type="text" name="kw" class="keyword"/></form></td><td class="search"><button class="searchbtn" data="1">搜 索</button></td></tr></table><div class="info-tm" style="display:none"></div></div><div id="suggest-panel"></div><div class="taokezhushou-plus-cl"></div>',
        open: function() {
            $(".tongyong,.queqiao").hide()
        },
        close: function() {
            $(".tongyong,.queqiao").show()
        },
        append: function() {
            var t = this; (window.location.href.indexOf("tmall.com") > 0 || window.location.href.indexOf("95095.com") > 0 || window.location.href.indexOf("tmall.hk") > 0) && $(".tb-detail-hd").after(t.html_tm),
            window.location.href.indexOf("taobao.com") > 0 && $(".tb-title").after(t.html_tb)
        },
        getTyData: function() {
            $(".tyyj").empty().append("")
        },
        getQqData: function() {
            $(".qqzg").empty().append("")
        },
        getDetailData: function() {
            var t = this;
            chrome.runtime.sendMessage({
                cmd: "getItemInfo",
                url: window.location.href,
                qumai: !0
            },
            function(a) {
                "login" === a.data || "user" === a.data || t.loadData(a)
            })
        },
        loadData: function(t) {
            var l, h, p, m = [];
            m.push(a.render2(e, t.item)),
            h = (t.item.commissionRatePercent || t.item.commissionRate) + " %",
            $(".tyyj").text("通用佣金：" + h),
            t.plans && t.plans.length && (l = t.plans.map(function(t) {
                return a.render2(n, t)
            }).join("")),
            m.push(i.replace("{data}", l || o)),
            l = null,
            t.queqiao && t.queqiao.length ? (p = t.queqiao[0].commissionrate + "%", l = t.queqiao.map(function(t) {
                return a.render2(d, t)
            }).join("")) : p = h,
            $(".qqzg").text("鹊桥最高：" + p),
            m.push(s.replace("{data}", l || r)),
            m.push(c),
            $(".info-tm").html(m.join("")),
            itemData = t,
            this.addcat(t),
            this.getYincang(t),
            this.addTongJiScript()
        },
        addTongJiScript: function() {
            var t = document.createElement("script"),
            a = location.href;
            t.type = "text/javascript",
            0 === a.indexOf("https://") ? t.src = "https://s11.cnzz.com/stat.php?id=1256782915&web_id=1256782915": t.src = "http://s11.cnzz.com/stat.php?id=1256782915&web_id=1256782915",
            document.body.appendChild(t)
        },
        addcat: function(t) {
            t.item.rootcat || (t.item.rootcat = t.item.rootCat),
            chrome.runtime.sendMessage({
                cmd: "getCat",
                rootcat: t.item.rootcat
            },
            function(t) {
                $("#catcount").html(t.name)
            })
        },
        getYincang: function(t) {
            chrome.runtime.sendMessage({
                cmd: "getYincang",
                nick: t.item.nick
            },
            function(a) {
                chrome.runtime.sendMessage({
                    cmd: "addgyj",
                    url: window.location.href
                },
                function(e) {
                    function i(t, a) {
                        if (! (t.length < 1)) for (var e in t) if (t[e].CampaignID == a) return ! 0
                    }
                    if ("" === e.quan || void 0 === e.quan) var n = "<a target='_blank' href='http://www.qumai.org/cm/gyj.php'>我来添加</a>";
                    else var n = '<a target="_blank" href=' + e.quan + ">领取</a>";
                    if (a.ok === !0) if (a.data.pagelist.length > 0) {
                        var o = a.data.pagelist[0].campaignId,
                        s = t.plans,
                        d = i(s, o);
                        if (void 0 == d) {
                            var r = a.data.pagelist[0].status;
                            if (1 === r) var c = '<span style="color:#f60">待审核</span>';
                            else if (2 === r) var c = '<span style="color:#5aa62e">审核通过</span>';
                            else if (3 === r) var c = '<span style="color:red">审核拒绝</span>';
                            $("#gaoyongjin-table").after('<table style="margin: 10px 0;"  class="m-table gaoyongjin-table"><thead><tr><th>隐藏计划</th><th width="55">状态</th><th width="50">券</th><th width="80">添加日期</th></tr></thead</table><tr><td ><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId=' + a.data.pagelist[0].campaignId + "&shopkeeperId=" + a.data.pagelist[0].shopKeeperId + "&userNumberId=" + a.data.pagelist[0].oriMemberId + '">' + a.data.pagelist[0].campaignName + "</a></td><td>" + c + "</td><td>" + n + "</td><td>" + a.data.pagelist[0].createTime + '</td></tr><tr><td colspan="4"><a target="_blank" href="http://www.qumai.org/cm/gyj.php">我要发布此商品的隐藏计划</a></td></tr>'),
                            chrome.runtime.sendMessage({
                                cmd: "postyingcang",
                                data: a.data.pagelist[0],
                                url: window.location.href
                            },
                            function(t) {})
                        } else $("#gaoyongjin-table").after('<table style="margin: 10px 0;"  class="m-table gaoyongjin-table"><thead><tr><th>隐藏计划</th><th width="55">状态</th><th width="50">券</th><th width="80">添加日期</th></tr></thead</table><tr><td colspan="4"><a target="_blank" href="http://www.qumai.org/cm/gyj.php">我要发布此商品隐藏计划</a></td></tr>')
                    } else "null" === e.data ? $("#gaoyongjin-table").after('<table style="margin: 10px 0;"  class="m-table gaoyongjin-table"><thead><tr><th>隐藏计划</th><th width="55">状态</th><th width="50">券</th><th width="80">添加日期</th></tr></thead</table><tr><td colspan="4"><a target="_blank" href="http://www.qumai.org/cm/gyj.php">我要发布此商品隐藏计划</a></td></tr>') : $("#gaoyongjin-table").after('<table style="margin: 10px 0;"  class="m-table gaoyongjin-table"><thead><tr><th>隐藏计划</th><th width="55">状态</th><th width="50">券</th><th width="80">添加日期</th></tr></thead</table><tr><td ><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId=' + e.campaignId + "&shopkeeperId=" + e.shopKeeperId + "&userNumberId=" + e.oriMemberId + '">' + e.campaignName + '</a></td><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId=' + e.campaignId + "&shopkeeperId=" + e.shopKeeperId + "&userNumberId=" + e.oriMemberId + '">申请</a></td><td>' + n + "</td><td>" + e.createTime + '</td></tr><tr><td colspan="4"><a target="_blank" href="http://www.qumai.org/cm/gyj.php">我要发布此商品隐藏计划</a></td></tr>');
                    else $("#gaoyongjin-table").after('<table style="margin: 10px 0;"  class="m-table gaoyongjin-table"><thead><tr><th>隐藏计划</th><th width="55">状态</th><th width="50">券</th><th width="80">添加日期</th></tr></thead</table><tr><td colspan="4"><a target="_blank" href="http://www.alimama.com">请登陆阿里妈妈以查隐藏计划</a></td></tr>')
                })
            })
        }
    };
    window.taokezhushou.plugin = l,
    window.taokezhushou.plugin.init()
} (jQuery);
var e = '<div class="detail"><div class="f-fl commission"><ul class="f-cl"><li class="label f-fl">佣金：</li><li class="commission_rate f-fl">{commissionRatePercent}% <span class="true-rmb">（¥{calCommission}）</span></li></ul><ul class="f-cl"><li class="label f-fl">推广链接：</li><li class="tlink f-fl"><a href="javascript:;" action="lj" target="_blank">链接转换</a> <a href="javascript:;" action="tg-s" target="_blank">单品推广</a></li></ul></div><div class="f-fr tuiguang_info"><ul class="yongjin"><li class="count f-tac">{totalFee}元</li><li class="danwei f-tac">30天佣金</li></ul><ul class="jiaoyi"><li class="count f-tac">{totalNum}件</li><li class="danwei f-tac">30天推广</li></ul><ul class="catjiaoyi"><li class="catcount f-tac" id="catcount"></li><li class="danwei f-tac">类目</li></ul></div></div>',
i = '<table style="margin: 10px 0;" id="gaoyongjin-table" class="m-table gaoyongjin-table"><thead><tr><th>计划名</th><th width="30">审核</th><th width="60">状态</th><th width="70">平均佣金</th><th width="40">佣金</th><th width="40">操作</th></tr></thead><tbody>{data}</tbody></table>',
n = '<tr><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={CampaignID}&shopkeeperId={ShopKeeperID}&userNumberId={userNumberId}">{CampaignName}</a></td><td width="40">{Properties}</td><td width="60">{Exists}</td><td width="30">{AvgCommission}</td><td width="40"><a href="javascript:;" action="yj">查询</a></td><td><a href="javascript:;" action="get">申请</a></td></tr>',
o = '<tr><td colspan="6">该商品没有高佣金计划</td></tr>',
s = '<table class="m-table" id="mytable"><thead><tr><th>鹊桥ID</th><th>佣金</th><th>开始</th><th>结束</th><th>分成</th><th>实得</th><th>剩余</th><th>详情</th><th>推广</th><th>生成</th></tr></thead><tbody>{data}</tbody></table>',
d = '<tr class="{color}"><td>{eventId}</td><td>{commissionrate}%</td><td>{stime}</td><td>{etime}</td><td>{sharerate}%</td><td>{zhongfen}%</td><td>{ltime}</td><td><a target="_blank" href="http://temai.taobao.com/preview.htm?id={eventId}">详情</a></td><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/act/activity_detail?eventId={eventId}">推广</a></td><td><a href="javascript:;" action="lj-qq">生成</a></td></tr>',
r = '<tr><td colspan="10">该商品没有鹊桥活动</td></tr>',
c = '<div class="footer"><ul class="f-fl"><li class="appinfo">Powered By: <a href="http://www.tbaokuan.com" target="_blank" style="color:#666666">淘爆款淘客助手</a> | <a href="http://www.qumai.org/cm/top.php" target="_blank" style="color:#666666">热销TOP排行</a></li><li class="contact">淘客群：<a target="_blank" class="jiaqun" href="http://shang.qq.com/wpa/qunwpa?idkey=4621e93b2cc1e078189ae73a44d165473135e7baa9ccec973e5903900f80d6b5"><img border="0" src="http://pub.idqqimg.com/wpa/images/group.png" alt="淘爆款淘客精英群2" title="淘爆款淘客精英群2"></a> </li></ul></div>';