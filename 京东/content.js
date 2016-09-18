var id = $("#choose-btn-coll").attr("data-id");
chrome.runtime.sendMessage({
  id: id
}, function(response) {
  console.log(response);
  if (response == "error") {
    $("#summary-price .dd").append(
      "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:请登陆联盟"
    );
  } else if (response == "无") {
    $("#summary-price .dd").append(
      "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:无"
    );
  } else {
    $("#summary-price .dd").append(
      "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:" +
      response.v2 + "(" + response
      .v1 + ")</span>");
    $(".summary-price .dd").append(
      "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:" +
      response.v2 + "(" + response
      .v1 + ")</span>");
  }
})
