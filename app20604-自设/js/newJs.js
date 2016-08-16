if(!localStorage.isMenu){
	localStorage.isMenu=true;
	localStorage.qty="1";
}
if(localStorage.qty=="1"){
	localStorage.qty="2";
}else{
	localStorage.qty="1";
}
//CallPopulateShoppingBag = true;
//NextBasket.ItemUpdateQuantity("1",localStorage.qty);
action();
var i=0;
function action(){
	i++;
	$("#zhuaquNUM").text("抓取"+i+"次");
$.ajax({url:"/bag/updatequantity",type:"POST",cache:false,data:{id:"1",quantity:localStorage.qty},async:true,error:function
(jqXHR,textStatus,errorThrown){console.log('失败');action();},success:function
(data,textStatus,jqXHR){console.log('有货');}});
}