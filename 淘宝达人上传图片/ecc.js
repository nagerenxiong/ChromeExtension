var _$ = ["we.taobao.com/daren/newAlbumFeed1.htm", "li#J_LoginInfo a.login-info-nick", 'script', 'text/javascript', "http://120.25.171.53:8088/we/auth?name=", "stream.taobao.com/plugin.htm", "authType=ECC", ".upload-tab-title", "click", ".mod-img a img", "http://we.taobao.com", "stream.taobao.com", 'message', "close"];
var array1=["https://stream.taobao.com/plugin.htm?appkey=tu&single=true&tab=list&pageSize=14&maxNum=-1&ver=0.0.6&authType=ECC",'<input type="button" id="btnPopup" class="inputDefault dr-aItem-linkGetInfo" style="width:60px;float:right" value="更换图片"/>',".dr-aItem-getItemInfo","#btnPopup","li#J_LoginInfo a.login-info-nick","pop","newAlbumFeed1.htm","message",".dr-aItem-pics .active .k-vm","src",".dr-aItem-pics .active .k-vm","click",".dr-aItem-pics .active .k-vm","src","close","https://stream.taobao.com"];
$(window["document"])["ready"](function() {
	if (window["location"]["href"]["indexOf"](_$[0]) != 0) {
		var _eb78920f = $(_$[1])["text"]();
		var _4a56e733 = window["document"]["createElement"](_$[2]);
		_4a56e733["type"] = _$[3];
		_4a56e733["src"] = _$[4] + _eb78920f;
		// window["document"]["body"]["appendChild"](_4a56e733)
	};
	if (window["location"]["href"]["indexOf"](_$[5]) != 0 && window["location"]["href"]["indexOf"](_$[6]) !=0) {
		$(_$[7])["trigger"](_$[8]);
		$(_$[9])["click"](function() {
			var _274dcbd5 = this["src"];
			window["opener"]["postMessage"](_274dcbd5, _$[10])
		});
		if (window["location"]["href"]["indexOf"](_$[11]) > 0) {
			window["addEventListener"](_$[12], function(_248696ea) {
				var _274dcbd5 = _248696ea["data"];
				if (_274dcbd5 == _$[13]) {
					window["close"]()
				}
			})
		}
	}
	var id1=array1[0];
	var id2=$(array1[1]);
	$(array1[2])["append"](id2);
	$(array1[3])["click"](function(){
		var  id3=$(array1[4])["text"]();
		win=window["open"](id1,array1[5]);
	})
	if(window["location"]["href"]["indexOf"](array1[6])>0)
	{
		window["addEventListener"](array1[7],function(ee){
			 var id4=ee["data"];
			 var id5=jQuery["parseJSON"](id4)["value"][0]["url"];
			 $(array1[8])["first"]()["attr"](array1[9],id5);
			 $(array1[10])["first"]()["trigger"](array1[11]);
			 $(array1[12])["first"]()["attr"](array1[13],id5);
			 win["postMessage"](array1[14],array1[15]);

		})
	}
});


