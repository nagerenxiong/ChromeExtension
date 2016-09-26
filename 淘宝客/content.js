var url = window.location.href;
var xx = url.lastIndexOf(".html");
var pp = url.lastIndexOf("/");
var id = url.substring(pp + 1, xx);
var hpd = $(".rate strong").text();
window.onload = function() {
  chrome.runtime.sendMessage({

  }, function(response) {

  })
}
