function layer_open(el){
		var temp = $('#' + el);
		var bg = temp.prev().hasClass('bg');	
		if(bg){
			$('.layer').fadeIn();	
		}else{
			temp.fadeIn();
		}

		
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

		temp.find('a.cbtn').click(function(e){
			if(bg){
				$('.layer').fadeOut(); 
			}else{
				temp.fadeOut();
			}
			e.preventDefault();
		});

		$('.layer .bg').click(function(e){	
			$('.layer').fadeOut();
			e.preventDefault();
		});

	}

$(document).ready(function() {
 // var panelOne = $('.form-panel.two').height(),
  //  panelTwo = $('.form-panel.two')[0].scrollHeight;

  $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
    e.preventDefault();

    $('.form-toggle').addClass('visible');
    $('.form-panel.one').addClass('hidden');
    $('.form-panel.two').addClass('active');
    //$('.form').animate({
    //  'height': panelTwo
    //}, 200);
  });

  $('.form-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).removeClass('visible');
    $('.form-panel.one').removeClass('hidden');
    $('.form-panel.two').removeClass('active');
    //$('.form').animate({
    //  'height': panelOne
    //}, 200);
  });
});	