console.log("main_script");
url = ""
id = ""
start = ""

chrome.runtime.sendMessage({
	cmd: "get"
}, function(response) {
	url = response.url;
	id = response.id;
	start = response.start;
	email = response.email;
	console.log("url=" + url);
	console.log("id=" + id);
	console.log("start=" + start);
	main();
});


function main() {
	if (start == 1) {
		// window.location.href=url;
		window.onload = function() {
			if (window.location.href.toString() == url) {
				console.log("11");
				document.getElementsByClassName('btnv6_green_white_innerfade btn_medium')[id].click();

			} else if (window.location.href.toString() == 'http://store.steampowered.com/cart/') {
				document.getElementsByClassName('btnv6_green_white_innerfade btn_medium')[0].click();
			} else if (window.location.href.toString() == 'https://store.steampowered.com/checkout/?purchasetype=gift') {
				document.getElementById("gift_note_tab").style.display = "block";
				document.getElementById("review_tab").style.display = "block";
				document.getElementById("gift_recipient_name").value = 1;
				document.getElementById("gift_message_text").value = 1;
				document.getElementById("gift_signature").value = 1;
				document.getElementById("email_input").value = email;
				document.getElementsByClassName("btnv6_green_white_innerfade btn_medium")[1].click();
				setTimeout(function() {
					document.getElementById('accept_ssa').click();
					document.getElementsByClassName('btnv6_green_white_innerfade btn_medium')[3].click();
					setTimeout(function() {
						window.location.href = url;
					}, 5000);
				}, 2000);
			} else {
				start = 0;
				chrome.runtime.sendMessage({
					cmd: "init",
					text1: 0,
					text2: url,
					start: start
				}, function(response) {
					console.log(response);
				});
			}
		}
	}
}