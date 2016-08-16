//chrome.browserAction.setBadgeText({text: '3'});
//var abc='love';
var i=10;

var text0='';
var text1='';
var tag0='';
var tag1='';
var tag2='';
var tag3='';
var tag4='';
var tag5='';
var tag6='';
var tag7='';
var tag8='';
var tag9='';

var tag10='';
var tag11='';
var tag12='';
var tag13='';
var tag14='';
var tag15='';
var tag16='';
var tag17='';
var tag18='';
var tag19='';

var attr0='';
var attrName0='';
var attrVal0='';
var showTime='';

chrome.tabs.onUpdated.addListener(function(a) {
        //chrome.browserAction.setBadgeText({text: '3'+i});
		i++;
		//向page传值
		//chrome.tabs.sendRequest(a, {greeting: abc}, function(data) {});  
		chrome.tabs.sendRequest(a, {
			text0: text0,text1:text1,
			tag0:tag0,tag1:tag1,
			tag2:tag2,tag3:tag3,
			tag4:tag4,tag5:tag5,
			tag6:tag6,tag7:tag7,
			tag8:tag8,tag9:tag9,
			
			tag10:tag10,tag11:tag11,
			tag12:tag12,tag13:tag13,
			tag14:tag14,tag15:tag15,
			tag16:tag16,tag17:tag17,
			tag18:tag18,tag19:tag19
			,
			attr0:attr0,attrName0:attrName0,
			attrVal0:attrVal0,
			showTime:showTime
			
		}, function(data) {});  
		
    });


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	//chrome.browserAction.setBadgeText({text: request.greeting});
	text0=request.text0;
	text1=request.text1;
	tag0=request.tag0;
	tag1=request.tag1;
	tag2=request.tag2;
	tag3=request.tag3;
	tag4=request.tag4;
	tag5=request.tag5;
	tag6=request.tag6;
	tag7=request.tag7;
	tag8=request.tag8;
	tag9=request.tag9;
	
	tag10=request.tag10;
	tag11=request.tag11;
	tag12=request.tag12;
	tag13=request.tag13;
	tag14=request.tag14;
	tag15=request.tag15;
	tag16=request.tag16;
	tag17=request.tag17;
	tag18=request.tag18;
	tag19=request.tag19;
	
	attr0=request.attr0;
	attrName0=request.attrName0;
	attrVal0=request.attrVal0;
	
	showTime=request.showTime;
	});  
  