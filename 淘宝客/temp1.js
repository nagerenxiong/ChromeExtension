window.onload = function() {
  setTimeout(function() {
    $("#loginname").val("527935649@qq.com");
    $("#nloginpwd").val("ngr816729438");
    setTimeout(function() {
      $("#paipaiLoginSubmit").click();
      console.log(document.body)
    }, 1000)
  }, 1000)
}
