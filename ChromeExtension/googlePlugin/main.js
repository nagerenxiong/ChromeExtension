document.addEventListener('DOMContentLoaded', function () {
	var data = chrome.extension.getBackgroundPage().account_list;
	var account_list = jQuery.parseJSON(data);

	var hr_account_list = account_list.hr;
	var crown_account_list = account_list.crown;
	var assignee_account_list = account_list.assignee;
	var others_account_list = account_list.other;

	var hr_html = rander_html(hr_account_list);
	var crown_html = rander_html(crown_account_list);
	var assignee_html = rander_html(assignee_account_list);
	var others_html = rander_html(others_account_list);

	$('#hr_account').html(hr_html);
	$('#crown_account').html(crown_html);
	$('#assignee_account').html(assignee_html);
	$('#others_account').html(others_html);

	var role_mapping = new Array('hr_account','crown_account','assignee_account','others_account');
	$('.role li').hover(
		function(){
			$('.role li').css('background','#298cba');
			$(this).css('background','#ccc');
			for(var i in role_mapping){
				$('#'+role_mapping[i]).hide();
			}
			var current_class = $(this).attr('class');
			$('#'+current_class+'_account').show();
		}
	);
	$('.hr').trigger('mouseover');

	$('.account li').bind('click',function(){
		$('.account input[type="checkbox"]').prop('checked',false);
		$(this).find('div.check input').prop('checked',true);
		var user = $(this).data('user');
		var password = $(this).data('password');
		$('#login').data('user',user);
		$('#login').data('password',password);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		    chrome.tabs.sendMessage(tabs[0].id, {user:user,password:password,act:'user_password'}, function(response){
		    });    
		});
	});
	$('#login').bind('click',function(){
		var user = $(this).data('user');
		var password = $(this).data('password');
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		    chrome.tabs.sendMessage(tabs[0].id, {act:'login'}, function(response){
		    });    
		});
	})
})
function rander_html(account_list){
	var html = '';
	for(var i in account_list){
	    var odd_even = 'odd';
	    if(i%2==0){
	         odd_even = 'even';
	    }
	    html += '<li class="'+odd_even+'" data-user="'+account_list[i]['account']+'" data-password="'+account_list[i]['password']+'">';
	    html += '<div class="username">'+account_list[i]['account']+'</div>';
	    //html += '<div class="password">'+account_list[i]['password']+'</div>';
	    html += '<div class="check"><input type="checkbox"/></div>';
	    html += '<div class="clear"></div>';
	    html += '</li>';
	}
	return html;
}