var startFag = false;
var i = 0;
var timerT;
$(".nxbtn.primary.GoToCheckout.TopLink").before('<input type="number" name="" id="sx_time" value="800" placeholder="请输入间隔时间"><label>只刷一</label><input type="checkbox" id="ifOne"><a href="javascript:void(0)" id="start" style="display: inline-block; background-color: blue; padding: 5px 15px; color: #fff; border-radius: 7px; margin-left: 10px; margin-top: 10px;">启动</a>');
$("head").append('<style>.abcdedfdf{background-color:red!important}</style>')
$("#ifOne").click(function() {
	if ($("#ifOne").attr("checked")) {
		localStorage["domArray"] = true;
	} else {
		localStorage["domArray"] = false;
	}
})
$("#start").click(function() {
	if ($(this).text() == "启动") {
		localStorage["timems"] = $("#sx_time").val() * 1;
		startFag = true;
		if ($("#ifOne").attr("checked")) {
			localStorage["domArray"] = true;
		} else {
			localStorage["domArray"] = false;
		}
		dy(localStorage["timems"]);
		$(this).text('停止');
		timerT = setTimeout(function() {
			window.location.reload();
		}, 300000)
	} else {
		startFag = false;
		localStorage["shuaxin"] = false;
		clearTimeout(timerT);
		$(this).text('启动');
	}
})
if (localStorage["timems"]) {
	$("#sx_time").val(localStorage["timems"]);
}
if (localStorage["domArray"] == "true") {
	$("#ifOne")[0].click();
}
if (localStorage["shuaxin"] == "true") {
	$("#start")[0].click();
}

setTimeout(function(){
	window.location.reload();
},1200000)

function dy(timems) {
	if (startFag) {
		localStorage["shuaxin"] = true;
		$(".abcdedfdf").removeClass('abcdedfdf');
		setTimeout(function() {
			var arrayDom = [];
			$("#items tbody tr").each(function(index, el) {
				if ($(el).children('.availabilityColumn').hasClass('soldout') || $(el).children('.availabilityColumn').hasClass('delayed')) {
					arrayDom.push(el);
				}
			});
			if (arrayDom.length == 0) {
				return;
			} else if (i > arrayDom.length - 1) {
				i = 0;
			}
			var value = [2, 3, 4, 5, 6, 7, 8][Math.round(Math.random() * ([2, 3, 4, 5, 6, 7, 8].length - 1))];
			value=1;
			if (localStorage["domArray"] == "true") {
				if ($("#items tbody tr").eq(0).children('.availabilityColumn').hasClass('soldout') || $("#items tbody tr").eq(0).children('.availabilityColumn').hasClass('delayed')) {
					$("#items tbody tr").eq(0).children('.qtyColumn').children('.dk_container').children('.dk_toggle').addClass('abcdedfdf');
					$("#items tbody tr").eq(0).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(value * 1).children('a')[0].click();
					var evt1 = document.createEvent("MouseEvents");
					evt1.initEvent("click", true, true);
					$("#items tbody tr").eq(0).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(value * 1).children('a')[0].dispatchEvent(evt1);
					setTimeout(function() {
						$("#items tbody tr").eq(0).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(0).children('a')[0].click();
						var evt2 = document.createEvent("MouseEvents");
						evt2.initEvent("click", true, true);
						$("#items tbody tr").eq(0).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(0).children('a')[0].dispatchEvent(evt2);
						i++;
						dy(localStorage["timems"]);

					}, localStorage["timems"])
				}
			} else {
				$(arrayDom[i]).children('.qtyColumn').children('.dk_container').children('.dk_toggle').addClass('abcdedfdf');
				$(arrayDom[i]).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(value * 1).children('a')[0].click();
				var evt1 = document.createEvent("MouseEvents");
				evt1.initEvent("click", true, true);
				$(arrayDom[i]).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(value * 1).children('a')[0].dispatchEvent(evt1);
				setTimeout(function() {
					$(arrayDom[i]).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(0).children('a')[0].click();
					var evt2 = document.createEvent("MouseEvents");
					evt2.initEvent("click", true, true);
					$(arrayDom[i]).children('.qtyColumn').children('.dk_container').children('.dk_options').children('.dk_options_inner').children('li').eq(0).children('a')[0].dispatchEvent(evt2);
					i++;
					dy(localStorage["timems"]);

				}, localStorage["timems"])
			}
		}, localStorage["timems"] * 2)
	}
}
