jQuery(document).ready(function($) {
	setTimeout(function() {
		setInterval(function() {
			if ($("body").length == 0) {
			  window.location.reload();
			}
		}, 5000)
		var script = document.createElement('script');
		script.src = "http://1.nageren.sinaapp.com/js/qiangyifu.js";
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(script);
	}, 2000)
});