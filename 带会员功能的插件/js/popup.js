$(function() {
    GetLastUser();
	var islogin, infohtml;
	$('#login').click(function() {
        login();
		SetPwdAndChk();
    });	
    $('#pluginLogout').click(function() {
        $.ajax({
            type: "post",
            url: "https://www.87k6.com:8444/weitao/logout",
            dataType: 'json',
            async: false,
            data: "",
            success: function() {
                islogin = false;
				$('.info').hide();
                $('.main').show();
				$('#userName').val("");
				$('#password').val("");
				document.getElementById('chkpwd').checked = false;
				document.getElementById('chkauto').checked = false
				var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
				var expdate = new Date();
				expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
		        SetCookie(id, null, expdate);	
				
            }
        });
    });
	$('#search-show').change(function() {
        $.ajax({
            type: "post",
            url: "https://www.87k6.com:8444/weitao/show?user.showKey="+$('#search-show').val(),
            dataType: 'json',
            async: false,
            data: "",
            success: function() {
				
            }
        });
    });
	$('#search-auto').click(function() {
        $.ajax({
            type: "post",
            url: "https://www.87k6.com:8444/weitao/auto?user.auto="+$('#search-auto').is(':checked'),
            dataType: 'json',
            async: false,
            data: "",
            success: function() {
				
            }
        });
    });
});
function login(){
		 o = {};
            o.userName = $.trim($('#userName').val());
            o.password = $.trim($('#password').val());
            if (!o.userName) {
                return $('#userName').focus();
            }
            if (!o.password) {
                return $('#userName').focus();
            }
            o.submit = "登录";
            $.ajax({
                type: "post",
                url: "https://www.87k6.com:8444/weitao/login",
                dataType: 'json',
                async: false,
                data: "user.userName=" + o.userName + "&user.password=" + o.password,
                success: function(json) {
                    if (json.status == "1") {
                        islogin = true;
                        infohtml = json.msg;
                        $('.main').hide();
                        $('.info').show();
						checklogin();
                    }else{
						$('.error-msg').html(json.msg);
					}
                }
            });
	}
	function checklogin(){
		 $.ajax({
                type: "post",
                url: "https://www.87k6.com:8444/weitao/checkLogin",
                dataType: 'json',
                async: false,
                data: "",
                success: function(json) {
					if (json.status == "1") {
						islogin = true;
						infohtml = json.msg;
						infohtmls = infohtml.split("_#@#_");
						$("#userName").html(json.user.userName);
						$("#remains").html(json.user.remains);
						$('#search-show').val(json.user.showKey);
						if(json.user.auto=="true"){
							$('#search-auto').attr("checked", true);
						}else{
							$('#search-auto').attr("checked", false);
						}
						$('.main').hide();
						$('.info').show();
					} else {
						$('.main').show();
						$('.info').hide();
						SetPwdAndChk();
					}
				}
			});
	}
	function GetLastUser() {
        var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
        var user = GetCookie(id);
        user = JSON.parse(user);
        if (user != null) {
        	document.getElementById('userName').value = user.userName;
            document.getElementById('password').value = user.password;
            if(user.userName != null && user.userName.trim()!=""){
            	document.getElementById('chkpwd').checked = true;
            }
            if(user.chkauto != null && user.chkauto==true){
            	document.getElementById('chkauto').checked = true;
				login();
            }
        }else{
        	document.getElementById('userName').value = "";
            document.getElementById('password').value = "";
            document.getElementById('chkpwd').checked = false;
            document.getElementById('chkauto').checked = false
        }
    }
    //点击登录时触发客户端事件
     
    function SetPwdAndChk() {
       var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
       var user = null;
       if (document.getElementById('chkpwd').checked == true) {
         user = {}
         //取用户名
         var userName = document.getElementById('userName').value;
         //取密码值
         var password = document.getElementById('password').value;
         //取是否自动登录
         var chkauto = document.getElementById('chkauto').checked;
         user.userName = userName;
         user.password = password;
         user.chkauto = chkauto;
       }
       //将最后一个用户信息写入到Cookie
       var expdate = new Date();
       expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
       SetCookie(id, JSON.stringify(user), expdate);
    }     
    //取Cookie的值
     
    function GetCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
    }     
    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    }
    //写入到Cookie
     
    function SetCookie(name, value, expires) {
        var argv = SetCookie.arguments;
        //本例中length = 3
        var argc = SetCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        var path = (argc > 3) ? argv[3] : null;
        var domain = (argc > 4) ? argv[4] : null;
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    }