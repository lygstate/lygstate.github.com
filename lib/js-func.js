var TWITTER_USERNAME = 'metamorph';

//Slider Callback
function mycarousel_initCallback(carousel) {
	$('#slider-next').bind('click', function() {
        carousel.next();
        return false;
    });
    $('#slider-prev').bind('click', function() {
        carousel.prev();
        return false;
    });
    $('.slider-pagination a').bind('click', function() {
        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        return false;
    });
}

function mycarousel_itemFirstInCallback(carousel, item, idx, state) {
	$('.slider-pagination a').removeClass('active');
	$('.slider-pagination a').eq(idx-1).addClass('active');
}

//Home Style 2 Fader Function
function inspire_fader($items_to_click, $items_to_fade, $texts_to_fade) {	
	var $item = $($items_to_fade);
	var $text = $($texts_to_fade);
	$($items_to_click).each(function(i)
	{
		$(this).click(function()
		{	
			$new_item = $item.filter(":eq("+i+")");
			$new_text = $text.filter(":eq("+i+")");
			
			if( $new_item.css("display") == "none" && $new_text.css("display") == "none" )
			{
				$item.filter(":visible").fadeOut(400, function()
				{	
					$new_item.fadeIn(400);
				});
				
				$text.filter(":visible").fadeOut(400, function()
				{	
					$new_text.fadeIn(400);
				});
			}
			
			return false;
			
		});
		
	});
	
}

//Home Style 2 Fade Pointer Function 
function inspire_pointer()
{	
	var $wrapper = $(".fade_item_thumbs");
	var $fader = $('<div class="fade_pointer"></div>').appendTo($wrapper);
	
	var $fader_half = $fader.width()/2;
	$(".fade_item_thumbs a").each(function(i)
	{
		$(this).click(function()
		{	
			$(".current_thumb").removeClass('current_thumb');
			$(this).addClass('current_thumb');
			
			$image_pos = $(this).position();
			$newposition = $image_pos.left + $(this).width()/2 - $fader_half;
			$fader.animate({"left":$newposition},600,"easeOutBack");
		});
		
	});
	
}

//Home Style 2 Auto Fade Function
function inspire_autofade($items_to_click, $display_time) {	
	var interval = setInterval(inspire_start_autoplay, $display_time);
	var $click_these_items = $($items_to_click);
	var i = 1;
	
	$click_these_items.click(function($eventobject, $autoplay) {
		if(interval && !$autoplay) clearInterval(interval);
	});
	
	function inspire_start_autoplay() {	
		$click_these_items.filter(":eq("+i+")").trigger('click',[true]);
		i+1 < $click_these_items.length ? i++ : i = 0;
	}
	
}


//Quotes Block Fade
function quote_fade($quote_to_fade, $display_time) { 
	var interval = setInterval(quote_autofade, $display_time);
	var $quote = $($quote_to_fade);
	var $count = $quote.size();
	var i=1;
	
	function quote_autofade() { 
		var $new_quote = $quote.eq(i++);
		if($new_quote.css("display") == "none") { 
			$quote.filter(":visible").fadeOut(400, function() {	
					$new_quote.fadeIn(400, function() {
							if ( i == $count) { i = 0; }
						});
				});
			}
		return false;
	}
		
}

$(function(){ 
	
	//Navigation 
	$('#navigation ul li a').each(function() {
		$(this).has('.nav-arrow').addClass('l-dd');
	});
	
	$('#navigation ul li').hover(function(){ 
		$(this).find('.dd:eq(0)').show();
		$(this).find('a:eq(0)').addClass('hover');
		$(this).find('.nav-arrow').addClass('nav-arrow-hover');
	 },
	 function(){  
		$(this).find('.dd').hide();
		$(this).find('a:eq(0)').removeClass('hover');
		$(this).find('.nav-arrow').removeClass('nav-arrow-hover');
 	});
 	
 	$('.dd ul li').hover(function(){ 
 		$(this).find('.dd').show();
 		$(this).find('a:eq(0)').addClass('hover');
 		$(this).find('.dd-arrow').addClass('dd-arrow-hover');
 	 },
 	 function(){ 
 	 	$(this).find('.dd').hide();
 		$(this).find('a:eq(0)').removeClass('hover');
 		$(this).find('.dd-arrow').removeClass('dd-arrow-hover');
 	  });
	
	//Home Slider, Project Page Slider
	$('.slider-content ul').jcarousel({
		auto: 4,
		wrap: "last",
		scroll: 1,
		visible: 1,
		initCallback: mycarousel_initCallback,
        buttonNextHTML: null,
        buttonPrevHTML: null,
        itemFirstInCallback: mycarousel_itemFirstInCallback
	});
	
	//Home Slider with Fade
	inspire_fader(".fade_item_thumbs a",".fade_item",".fade_items_text li");
	inspire_pointer();
	inspire_autofade(".fade_item_thumbs a",5000); 
	 quote_fade(".quote-block ul li",3000);
	
	//Fancy box 
	$(".gallery-holder ul li a, .project-gallery ul li a, .service-main-image a.images").fancybox({
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'easingIn'      : 'easeOutBack',
		'easingOut'     : 'easeInBack',
		'overlayColor'	: '#000',
		'overlayOpacity' : '0.7'
	});
 	  
 	  //Contact Form Input Focus 
 	  $('.row .field').focus(function(){ 
 	  	$(this).addClass('field-focus');
 	   }).blur(function(){
 	   	$(this).removeClass('field-focus'); 	  
 	 });
 	  
 	 // Contact Form
	$('.validate-form').submit(function(){
		var form = $(this);
		form.find('.required').parents('.row:eq(0)').removeClass('field-error');
		
		var field, v, id, msg, t, field_holder;
		var alert_msg = $('.msg-alert');
		var error = false;
		form.find('.required').each(function(){
			field = $(this);
			field_holder = field.parents('.row:eq(0)');
			v = $(this).val();
			t = $(this).attr('title');
			id = $(this).attr('id');
			
			if( $(this).hasClass('valid-email') ){
				if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v) == false ) {
					error = true;
				}
			}else {
				if( v == '' || v == t ){
					error = true;
				}
			}
			
			if( error ) {
				field.addClass('field-error');
				alert_msg.fadeIn();
				//error_fields.push( field );
			}
		});
		
		if( !error ) {
		
			form.find('.required').removeClass('field-error');
			var data = {}
			
			form.find('.text-field').each(function(){
				data[ $(this).attr('name') ] = $(this).val();
			});
			
			form.find('.text-field').each(function(){
				$(this).val( $(this).attr('title') );
			});
			
			$('#message-field').val( 'Loading...' );
			
			$.post('send.html', data, function(){
				alert_msg.fadeOut();
				form.find('.msg-thanks').fadeIn(function(){
					
					$('#message-field').val( $('#message-field').attr('title') );
					
					window.setTimeout(function(){
						form.find('.msg-thanks').fadeOut();
					}, 5000);
					
				});
			});
		}
		
		return false;
	}); 

	//Twitts
	if( $('#twitts').length > 0 ) {
		$('#twitts').tweet({
			count: 2,
			username: TWITTER_USERNAME,
			loading_text: 'loading twitter...'
		});
	};
	
});




