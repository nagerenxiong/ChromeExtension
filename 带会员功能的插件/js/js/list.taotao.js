var load_list = 0;
var show_list = 0;
var auto_list;
var showKey_list;
var ids_list;
var load_list = false;
var type_list;
var idLength_list = 0;
var confirm_list=false;
$(function() {
    if (location.href.indexOf("s.taobao.com") > -1
		|| location.href.indexOf("list.tmall.com") > -1
		|| location.href.indexOf("list.tmall.hk") > -1
		) {
		 
        var u = "https://www.87k6.com:8444/weitao/checkLogin";
        request_list(u, "", loginCheck_list);
        if (auto_list == "true" && !confirm_list) {
			loaddatalist();
		}
		var keyCodes = {};
		keyCodes['A'] = 65;
		keyCodes['B'] = 66;
		keyCodes['C'] = 67;
		keyCodes['D'] = 68;
		keyCodes['E'] = 67;
		keyCodes['F'] = 70;
		keyCodes['G'] = 71;
		keyCodes['H'] = 72;
		keyCodes['I'] = 73;
		keyCodes['J'] = 74;
		keyCodes['K'] = 75;
		keyCodes['L'] = 76;
		keyCodes['M'] = 77;
		keyCodes['N'] = 78;
		keyCodes['O'] = 79;
		keyCodes['P'] = 80;
		keyCodes['Q'] = 81;
		keyCodes['R'] = 82;
		keyCodes['S'] = 83;
		keyCodes['T'] = 84;
		keyCodes['U'] = 85;
		keyCodes['V'] = 86;
		keyCodes['W'] = 87;
		keyCodes['X'] = 88;
		keyCodes['Y'] = 89;
		keyCodes['Z'] = 90;

		document.onkeydown = function(e) {
			var which = e.which;;
			if (which == keyCodes[showKey_list.toUpperCase()]) {
		   if (location.href.indexOf("s.taobao.com") > -1
				|| location.href.indexOf("list.tmall.com") > -1
				|| location.href.indexOf("list.tmall.hk") > -1
				) {
					if (show_list == 1) {
						if (load_list == 1) {
							$(".haohuotitle").attr("style", "display:none");
						} else {
							loaddatalist();
						}
						show_list = 0;
					} else {
						if (load_list == 1) {
							if (type_list == 1) {
								$(".haohuotitle").attr("style", "width:100%;position:absolute; bottom:3px; left:0px;height:16px;background-color:green;z-index:999999999;");
							} else {
								$(".haohuotitle").attr("style", "width:200px;position:absolute;bottom:3px; left:0px;height:16px;background-color:green;z-index:999999999;");
							}
						} else {
							loaddatalist();
						}
						show_list = 1;
					}
				} 

			}
		}
    }
	
});
function loginCheck_list(j) {
    if (j.status == "1") {
        auto_list = j.user.auto;
        showKey_list = j.user.showKey;
    }
}
function request_list(url, data, func) {
    $.ajax({
        type: "post",
        url: url,
        dataType: 'json',
        async: false,
        data: data,
        success: func
    });
}

function loaddatalist() {
	initHtml();
    if (idLength_list > 0) {
		if (confirm_list || confirm("好货君将为你查询当前页面的查询记录,继续将消耗"+idLength_list + "积分,取消将无需消耗积分！")) {
            if (type_list == 1) {
                $(".haohuotitle").attr("style", "width:100%;position:absolute; bottom:3px; left:0px;height:16px;background-color:green;z-index:999999999");
            } else {
                $(".haohuotitle").attr("style", "width:200px;position:absolute; bottom:3px; left:0px;height:16px;background-color:green;z-index:999999999");
            }
			var u = "https://www.87k6.com:8444/weitao/searchList?itemIds="+ids_list;
			request_list(u, "", filter_list);
           
        }
    }
}
function filter_list(j){
	
	if (j.status == "1") {
        show_list = 1;
        load_list = 1;

		var bhas = j.bhas;
		var vhas = j.vhas;
		for(var key in bhas){
			var list = bhas[key];
			if(list!=null && list != undefined){
				var html = html_list(list);
				$("#"+key+"_bcount").html(list.length);
				if(list.length>0){
					document.getElementById(key+"_btitle").style.backgroundColor="pink";
				}
				$("#"+key+"_blist").html(html);
			}
		}
		for(var key in vhas){
			var list = vhas[key];
			if(list!=null && list != undefined){
				var html = html_list(list);
				$("#"+key+"_vcount").html(list.length);
				if(list.length>0){
					document.getElementById(key+"_vtitle").style.backgroundColor="pink";
				}
				$("#"+key+"_vlist").html(html);
			}
		}
    }
}
function html_list(l){
        var html = "<table width='100%'>";
        var headerStyle = "font-size: 12px;font-weight: bold;text-align: left;background-color: pink;height: 25px;line-height: 25px;color:white";
		html += "<tr style='" + headerStyle + "'>";
        html += "<td>";
        html += "站点名";
        html += "</td>";;
        html += "<td>";
        html += "发布时间";
        html += "</td>";
        html += "<td>";
        html += "详情";
        html += "</td>";
        html += "</tr>";
        for (var i = 0; i < l.length; i++) {
            var o = l[i];
            if (i % 2 == 1) {
                html += "<tr style='background-color: white;height: 20px;line-height: 20px;'>";
            } else {
                html += "<tr style='background-color: #b9e2f8;height: 20px;line-height: 20px;'>";
            }

            html += "<td>";
            html += o.accountNick;
            html += "</td>";
            html += "<td>";
            html += o.publishDate;
            html += "</td>";
            html += "<td>";
            html += "<a target='_blank' href='http://uz.taobao.com/detail/" + o.id + "'>查看</a>";
            html += "</td>";
            html += "</tr>";
        }
        html += "</table>";
        html += "</br>";
		return html;
}
function itemHtml(id,type){
	var itemHtml;
	if(type==1){
		itemHtml ="<table class='haohuotitle' id='" + id + "_title' style='width:100%;position:absolute; top:0px; left:0px;height:16px;background-color:green;z-index:999999999;display:none'>";
	}else if(type==2){
		itemHtml ="<table class='haohuotitle' id='" + id + "_title' style='width:200px;position:absolute; top:0px; left:0px;height:16px;background-color:green;z-index:999999999;display:none'>";
	}
	itemHtml+="<tr>";
	itemHtml+="<td data_id='" + id + "' id='"+id+"_btitle' style='color:white;padding-left:20px;' class='showb'>好货达人:<span id='"+id+"_bcount'>0</span></td>";
	itemHtml+="<td data_id='" + id + "' id='"+id+"_vtitle' style='color:white;padding-right:20px;text-align:right' class='showv'>大V达人:<span id='"+id+"_vcount'>0</span></td>";
	itemHtml+="</tr>";
	itemHtml+="</table>";
	return itemHtml;
}
function initHtml() {
	$(".haohuotitle").remove();
    var griditems = $(".grid .items .item .ctx-box .row-2 a");
	var listitems = $(".list .items .item .col-2 .main-icons");
	var salleritems = $(".grid .items .item .row-2 a");
	var tmailitems = $(".product");
	var aiitems = $(".search-result-box2");
	var mitems = $(".m-items div .items .item");
	var shopitems =  $(".grid .item");
	var tamllitems =  $(".J_TItems .item");
	if (griditems != null && griditems.length > 0) {
        for (var i = 0; i < griditems.length; i++) {
            var id = $(griditems[i]).attr("id");
            id = id.substring(id.lastIndexOf("_") + 1);
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
			

            var item = $("#" + $(griditems[i]).attr("id")).parent().parent().parent();
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
            item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
        }
    }else if (listitems != null && listitems.length > 0) {
		for (var i = 0; i < listitems.length; i++) {
			var id = $(listitems[i]).attr("id");
            id = id.substring(id.lastIndexOf("_") + 1);
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
            var item = $(listitems[i]).parent().parent();
            item.height(item.height() + 20);
            type_list = 2;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }else if (salleritems != null && salleritems.length > 0) {
		for (var i = 0; i < salleritems.length; i++) {
			var id = $(salleritems[i]).attr("href");
            id = getParam_list(id,"id");
             if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
            var item = $(salleritems[i]).parent().parent();
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }else if (tmailitems != null && tmailitems.length > 0) {
		for (var i = 0; i < tmailitems.length; i++) {
			var id = $(tmailitems[i]).attr("data-id");
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
			var parent = $(tmailitems[i]).parent();
			if(parent.attr("class").indexOf("sBr-con")>-1 && parent.attr("class").indexOf("addHeight")<=-1){
				
				var length = parent.children().length;
				var heightIndex = (length/5);
				heightIndex = Math.floor(heightIndex)+1;
				parent.height((parent.height() + 200)*heightIndex);
				parent.attr("class",parent.attr("class")+" addHeight");
			}			
            var item = $(tmailitems[i]);
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }else if (aiitems != null && aiitems.length > 0) {
		for (var i = 0; i < aiitems.length; i++) {
			var id = $(aiitems[i]).attr("data-itemid");
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
			var item = $(aiitems[i]).parent();
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }else if (mitems != null && mitems.length > 0) {
		for (var i = 0; i < mitems.length; i++) {
			var id = $(mitems[i]).attr("data-itemid");
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
			var item = $(mitems[i]);
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }else if (shopitems != null && shopitems.length > 0) {
		for (var i = 0; i < shopitems.length; i++) {
			var id = $(shopitems[i]).attr("data-id");
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
			var item = $(shopitems[i]);
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }else if (tamllitems != null && tamllitems.length > 0) {
		for (var i = 0; i < tamllitems.length; i++) {
			var id = $(tamllitems[i]).attr("data-id");
            if (ids_list == null) {
                ids_list = id;
            } else {
                ids_list += "_@_" + id;
            }
			var item = $(tamllitems[i]);
            item.height(item.height() + 20);
            type_list = 1;
            idLength_list += 1;
			item.attr("style", "position:relative;");
			item.append(itemHtml(id,type_list));
			item.append("<div class='haohuoblist' id='" + id + "_blist' style='display:none;'></div>");
			item.append("<div class='haohuovlist' id='" + id + "_vlist' style='display:none;'></div>");
            
        }
    }


    var griditems = $(".grid .items .item .ctx-box .row-2 a");
    var listitems = $(".list .items .item .col-2 .main-icons");
    $("body").on('mouseenter ', '.showb',
    function() {
        $("#" + $(this).attr("data_id") + "_blist").attr("style", "width:100%;height:100%;position:absolute; top:0px; left:0px;z-index:999999999;background-color:white;filter:alpha(opacity=70); -moz-opacity:0.9; -khtml-opacity: 0.9; opacity: 0.9; ")
    });
    $("body").on('mouseenter ', '.showv',
    function() {
        $("#" + $(this).attr("data_id") + "_vlist").attr("style", "width:100%;height:100%;position:absolute; top:0px; left:0px;z-index:999999999;background-color:white;filter:alpha(opacity=70); -moz-opacity:0.9; -khtml-opacity: 0.9; opacity: 0.9; ")
    });
    $("body").on('mouseleave ', '.haohuovlist',
    function() {
        $(this).attr("style", "display:none;")
    });
    $("body").on('mouseleave', '.haohuoblist',
	function() {
        $(this).attr("style", "display:none;")
    });
		$("body").on('click ', '.J_Pager',init);
	$("body").on('click ', '.tabs tab',init);
	$("body").on('click ', '.icon-tag',init);
	$("body").on('click ', '.J_SubmitMulti',init);
	$("body").on('click ', '.sorts .sort',init);
	$("body").on('click ', '.J_SortbarPriceSubmit',init);
	$("body").on('click ', '.sections .section .item',init);
	$("body").on('click ', '.sections .section .items .item',init);
	$("body").on('click ', '.styles .items .item',init);
	$("body").on('click ', '.pager .items .item .link',init);
	$("body").on('click ', '.filters .filter',init);
	$("body").on('click ', '.merge-item',init);
	$("body").on('click ', '.merge-shop',init);
	$("body").on('click ', '.m-page div div ul li',init);
	$("body").on('click ', '.form .J_Submit',init);
	$("body").on('click ', '.page',init);
	$("body").on('click ', '.page-next',init);
	$("body").on('click ', '.page-prev',init);
	function init(){
		show_list = 0;
		load_list = 0;
		ids_list = null;
		idLength_list = 0;
	}

}
function getParam_list(u,n) {
    var reg = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i");
    var r = u.substr(u.indexOf('?')+1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}