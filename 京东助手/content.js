var url = window.location.href;
var xx = url.lastIndexOf(".html");
var pp = url.lastIndexOf("/");
var id = url.substring(pp + 1, xx);
var hpd = $(".rate strong").text();
window.onload = function() {
  chrome.runtime.sendMessage({
    type: 1,
    id: id,
    url: url + "#comment"
  }, function(response) {
    if (response == "error") {
      $("#summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:<a href='https://media.jd.com/' target='_blank' style='color:red' >点击登录联盟</a>"
      );
      $(".summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:<a href='https://media.jd.com/' target='_blank' style='color:red'>点击登录联盟</a>"
      );
    } else if (response == "无") {
      $("#summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:无"
      );
      $(".summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:无"
      );
    } else {
      $("#summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:" +
        response.v2 + "(" + response
        .v1 +
        ")" + hpd +
        "</span><span class='hpl_hhhh' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;'></span><a class='postToServerBtn' data-v2='" +
        response.v2 +
        "' data-v1='" + response.v1 +
        "'  href='javascript:void(0)' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;display:none'>提交</a>"
      );
      $(".summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:" +
        response.v2 + "(" + response
        .v1 +
        ")" + hpd +
        "</span><span class='hpl_hhhh' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;'></span><a class='postToServerBtn' data-v2='" +
        response.v2 +
        "' data-v1='" + response.v1 +
        "' href='javascript:void(0)' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;display:none'>提交</a>"
      );
    }
  })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.commentUrl);
    var commentUrl = request.commentUrl;
    chrome.runtime.sendMessage({
      commentUrl: commentUrl,
      type: 3
    }, function(response) {
      $(".hpl_hhhh").text("好评率：" + response.hpl + "  差评数:" + response.cps);
    })
  });

// function fetchTwitterFeed(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(data) {
//     if (xhr.readyState == 4) {
//       if (xhr.status == 200) {
//         // var data = JSON.parse(xhr.responseText);
//         callback(data);
//       } else {
//         callback(null);
//       }
//     }
//   }
//   var url = url;
//   xhr.open('GET', url, true);
//   xhr.send();
// };

$(document).on('click', '.postToServerBtn', function() {
  var commission = $(this).attr("data-v2").replace('￥', '');
  var scale = $(this).attr("data-v1");
  var link = window.location.href;
  chrome.runtime.sendMessage({
    type: 2,
    commission: commission,
    scale: scale,
    link: link
  }, function(response) {
    if (response == "success") {
      alert("提交成功！");
    } else {
      alert("提交失败！")
    }
  })
})
