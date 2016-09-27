//搜索建议下拉
window.Plugin = window.Plugin || {};
window.Plugin.suggest = window.Plugin.suggest || {};
;(function($){
	var suggest = {
		cache:{},
		init:function(){
			var _this = this;
			$("#taokezhushou-plus .keyword").autocomplete({
				minLength: 1,
				appendTo: "#suggest-panel",
				position:{
					my : "left top",
					at: "left-6 bottom+0"
				},
				open:function(){
					$('.ui-autocomplete').width($('#taokezhushou-plus .keyword').width()+10);
				},
				delay:0,
				source: function( request, response ) {
					cache = _this.cache;
					var term = request.term;
					if ( term in cache ) {
						response( cache[ term ] );
						return;
					}
					$.getJSON( 'https://www.taokezhushou.com/index.php?s=/Index/Search/getRelatedSearch.html' , request, function( data, status, xhr ) {
						cache[ term ] = data.result;
						response( data.result );
					});
				},
				focus: function( event, ui ) {console.log(ui);
					$( "#taokezhushou-plus .keyword" ).val( ui.item.value );
					return false;
				},
				select: function( event, ui ) {
					$( "#taokezhushou-plus .keyword" ).val( ui.item.value );
					$( "#searchform" ).submit();
					/*
					if(DR.selectSearch != false){
						$('#js-eb-search-btn').click();
					}*/
					return false;
				}
			}).data("ui-autocomplete")._renderItem = function( ul, item ) {
					return $( "<li>" )
					.append(item.value)
					.appendTo( ul );
			};
		}
	};
	window.Plugin.suggest = suggest;
})(jQuery);


