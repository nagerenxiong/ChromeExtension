var url = window.location.href;
var xx = url.lastIndexOf(".html");
var pp = url.lastIndexOf("/");
var id = url.substring(pp + 1, xx);
window.onload = function() {
  chrome.runtime.sendMessage({
    type: 1,
    id: id
  }, function(response) {
    console.log(response);
    if (response == "null") {
      $("#summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:无(检查当前账号是否登陆或者注册达人精选)"
      );
      $(".summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:无(检查当前账号是否登陆或者注册达人精选)"
      );
    } else {
      var price = $(".J-p-" + id).eq(0).text().replace("￥", "");
      var yjl = response.yjl.replace("%", "");
      if ($("#jd-price").length > 0) {
        price = $("#jd-price").text();
      }
      var yj = parseFloat(yjl) * parseFloat(price) / 100;
      console.log(price);
      $("#summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:" +
        parseFloat(yj.toFixed(2)) + "(" + response
        .yjl +
        ") 好评率：" + response.hpl + " 差评数:" + response.cps +
        "</span><span class='hpl_hhhh' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;'></span><a class='postToServerBtn' data-v2='" +
        response.v2 +
        "' data-v1='" + response.v1 +
        "'  href='javascript:void(0)' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;display:none'>提交</a><br>插件反馈群：426387850"
      );
      $(".summary-price .dd").append(
        "<span style='font-size:16px;color:red;font-weight:bold;margin-left:30px;'>佣金:" +
        parseFloat(yj.toFixed(2)) + "(" + response
        .yjl +
        ") 好评率：" + response.hpl + " 差评数:" + response.cps +
        "</span><span class='hpl_hhhh' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;'></span><a class='postToServerBtn' data-v2='" +
        response.v2 +
        "' data-v1='" + response.v1 +
        "' href='javascript:void(0)' style='font-size:16px;color:red;font-weight:bold;margin-left:10px;display:none'>提交</a><br>插件反馈群：426387850"
      );
    }
  })
  $(".file").remove();
  $(".file_explain").css("position", "relative").parent().append(
    "<div id='checkBox' style='position:absolute;left:200px;height:100%;top:0'></div>"
  );
  $("#sku").on('blur', function() {
    setTimeout(function() {
      $("#checkBox").html($(".pics").clone(true));
      $("#checkBox .pic").removeClass("on");
      $("#checkBox .pic").click(function() {
        $(".file_view img").css("display", "inline").attr("src",
          $(this)
          .children("img").attr("src"));
      })
    }, 1000)
  })
}


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
