$(document).ready(function() {
    /*--------------------------------------------------------------
     *      Retourner haut de page
     ---------------------------------------------------------------*/
	 /*
	$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$('.bouton-retourner-haut').fadeIn();	
			} else {
				$('.bouton-retourner-haut').fadeOut();
			}
		});
	 
		$('.bouton-retourner-haut').click(function() {
			$('body,html').animate({scrollTop:0},800);
		});
	*/
		
    /*--------------------------------------------------------------
     *      carrousel-bxslider-auto-false
     ---------------------------------------------------------------*/
	$('.carrousel').each(function(index) {
		var SelectorItem = $(this);
		var ulClass = 'liste-carrousel' + index;
		SelectorItem.find('> ul').addClass(ulClass);
		
		var SelectorPagination = ulClass +' .page-pagination';
        var param_auto=false;
        var param_pager=false;
        var param_infiniteLoop=false;
        if($(this).hasClass('carrousel-auto')){
            param_auto=true;
        }

        if($(this).hasClass('carrousel-pager')){
            param_pager=true;
        }
        if($(this).hasClass('carrousel-loop')){
            param_infiniteLoop=true;
        }
		
		/*var carrousel = $('ul.liste-carrousel' + index).bxSlider({
			auto: false,
			controls: false,
			pager : true,
			infiniteLoop:  false,
			pagerSelector: SelectorItem.find('.page-pagination'),
			pagerType: 'short',
			pause : 5000
		});*/
        
        var carrousel = $('ul.liste-carrousel' + index).bxSlider({
			auto: param_auto,
			controls: false,
			pager : param_pager,
			infiniteLoop:  param_infiniteLoop,
			pagerSelector: SelectorItem.find('.page-pagination'),
			pagerType: 'short',
			pause : 5000
		});
		
		var slideCount = carrousel.getSlideCount();
		if (slideCount==1)
		{
			SelectorItem.find('.controle-pagination').hide();
		}
        
        if(param_pager==false)
        {
            SelectorItem.find('.page-pagination').hide();
        }
		
		SelectorItem.find('.controle-pagination .precedent').addClass('inactif');
		
		SelectorItem.find('.controle-pagination .precedent').click(function(){
			carrousel.goToPrevSlide();
			
			var slideCurrent = carrousel.getCurrentSlide() + 1 ;
			if (slideCurrent==1)
			{
				$(this).addClass('inactif');
			}
			if(slideCurrent<=slideCount)
			{
				SelectorItem.find('.controle-pagination .suivant').removeClass('inactif');
			}
			return false;
		});
		
		SelectorItem.find('.controle-pagination .suivant').click(function(){
			carrousel.goToNextSlide();

			var slideCurrent = carrousel.getCurrentSlide() + 1 ;
			if (slideCurrent==slideCount)
			{
				$(this).addClass('inactif');
			}
			if(slideCurrent>=1)
			{
				SelectorItem.find('.controle-pagination .precedent').removeClass('inactif');
			}
			return false;
		});
		
	});
    
    /*--------------------------------------------------------------
     *      carrousel-les-membres
     ---------------------------------------------------------------*/
	if($('.les-membres').length)
	{
		var SelectorItemMembres = $('.les-membres');
		var carrouselMembres = $('.membres-contenu > ul').bxSlider({
			auto: false,
			autoControls: false,
			controls: false,
			pager : true,
			infiniteLoop: true,
			pagerSelector: SelectorItemMembres.find(' .page-pagination'),
			pagerType: 'short'
		});
		var slideCountMembres = carrouselMembres.getSlideCount();
		if (slideCountMembres==1)
		{
			SelectorItemMembres.find('.controle-pagination').hide();
			SelectorItemMembres.find('.controle-prev-next').hide();
		}
		
		$('.les-membres .controle-prev-next .precedent').click(function(){
			carrouselMembres.goToPrevSlide();
			return false;
		});
		
		$('.les-membres .controle-prev-next .suivant').click(function(){
			carrouselMembres.goToNextSlide();
			return false;
		});
		
		$('.les-membres .controle-pagination .precedent').click(function(){
			carrouselMembres.goToPrevSlide();
			return false;
		});
		
		$('.les-membres .controle-pagination .suivant').click(function(){
			carrouselMembres.goToNextSlide();
			return false;
		});
	}
    
    /*--------------------------------------------------------------
     *      carrousel-les-videos
     ---------------------------------------------------------------*/
    if($('.les-videos').length)
	{
		var SelectorItemVideos = $('.les-videos');
		var carrouselVideos = $('.videos-contenu > ul').bxSlider({
			auto: false,
			autoControls: false,
			controls: false,
			pager : true,
			infiniteLoop: true,
			pagerSelector: SelectorItemVideos.find(' .page-pagination'),
			pagerType: 'short'
		});
			
		var slideCountVideos = carrouselVideos.getSlideCount();
		if (slideCountVideos==1)
		{
			SelectorItemVideos.find('.controle-pagination').hide();
			SelectorItemVideos.find('.controle-prev-next').hide();
		}
		
		$('.les-videos .controle-prev-next .precedent').click(function(){
			carrouselVideos.goToPrevSlide();
			return false;
		});
		
		$('.les-videos .controle-prev-next .suivant').click(function(){
			carrouselVideos.goToNextSlide();
			return false;
		});
		
		$('.les-videos .controle-pagination .precedent').click(function(){
			carrouselVideos.goToPrevSlide();
			return false;
		});
		
		$('.les-videos .controle-pagination .suivant').click(function(){
			carrouselVideos.goToNextSlide();
			return false;
		});
	}
    

    /*--------------------------------------------------------------
     *      fil twitter
     ---------------------------------------------------------------*/
    var twitter_carrousel = $('#flux_twitter ul').bxSlider({
        auto: true,
        autoControls: false,
        controls: false,
        mode : 'vertical'
    });
    
    var twitter_sliding = true;
    $('#stop_twitter .start').hide();
    
    $('#stop_twitter').click(function(){
        if(twitter_sliding == true){
            twitter_carrousel.stopShow();
            $(this).find('.stop').hide();
            $(this).find('.start').show();
            twitter_sliding = false;
        }else{
            twitter_carrousel.startShow();
            $(this).find('.start').hide();
            $(this).find('.stop').show();
            twitter_sliding = true;
        }
        return false;
    });
	
    /*--------------------------------------------------------------
     *      Datepicker
     ---------------------------------------------------------------*/
	$('#datepicker').datepicker({
		inline: true
	});
	
    /*--------------------------------------------------------------
     *      Ligne pair impair
     ---------------------------------------------------------------*/
    $('.liste-commentaire').each(function() {
        $('li:even', this).addClass('pair');
    });
	
    /*--------------------------------------------------------------
     *      Simulation Ajax
     ---------------------------------------------------------------*/
	//Gestion click Sword
    /*if (!($.browser.msie)) {
		$('.image-recharger-ajax').css('opacity',0);
		$('#page .bouton-control-agenda').click(function() {
			$('#page .bloc-les-agendas .liens-liste li').removeClass();
			$('#page .bloc-les-agendas .liens-liste li .fermer-element-agenda').css("display","none");
			$('#page .bloc-les-agendas .contenu-element-agenda').stop().animate({
				maxHeight: 0,
				paddingTop: 0,
				paddingBottom: 0
			 }, {
				 duration: 50, 
				 easing: 'easeInOutQuad',
				 queue: false
			 });
			var elmt = $(this).parent().parent().find(' .contenu-recharger-ajax');
			var elmtTitre = $(this).parent().find(' .titre-agenda');
			var elmtImage = $(this).parent().parent().find(' .image-recharger-ajax');
			elmtImage.html('<table><tbody><tr><td><img src="images/ajax-loader.gif" alt=""></td></tr></tbody></table>');
			elmt.animate({opacity: 0}, 400).delay(800).animate({opacity: 1}, 400);
			elmtTitre.animate({opacity: 0}, 400).delay(800).animate({opacity: 1}, 400);
			elmtImage.animate({opacity: 1}, 400).delay(600).animate({opacity: 0}, 400);
		});
	}*/
	
    /*--------------------------------------------------------------
     *      info-option-complementaire
     ---------------------------------------------------------------*/
     $('.info-option-complementaire').fadeToggle("slow", "linear");
     $('.info-option-complementaire .fermer-info-option').click(function(){
        $(this).parent().fadeToggle("fast", "linear");
    });
	
    /*--------------------------------------------------------------
     *      contenu avec ascenseur
     ---------------------------------------------------------------*/
    $('.contenu-avec-ascenseur').each(
		function()
		{
			$(this).jScrollPane(
				{
					verticalDragMinHeight: 40,
					verticalDragMaxHeight: 40,
					showArrows: true
				}
			);
		}
	)
	
	/*$('.contenu-agenda-avec-ascenseur').each(
		function()
		{
			$(this).jScrollPane(
				{
					verticalDragMinHeight: 40,
					verticalDragMaxHeight: 100,
					horizontalDragMinWidth: 8,
					horizontalDragMaxWidth: 8,
					showArrows: true
				}
			);
		}
	)*/
	
		
    /*--------------------------------------------------------------
     *      contenu-ouvrir-fermer
     ---------------------------------------------------------------*/
	 $('.liste-contenu-ouvrir-fermer li:first-child').addClass('active');
     
     $('.titre-ouvrir-fermer').click(function(){
         $(this).parent().parent().find(' .contenu-ouvrir-fermer').stop().animate({
            maxHeight: 0
         }, {
             duration: 300, 
             easing: 'easeInOutQuad',
             queue: false
         });
        $(this).parent().parent().removeClass('active');
        $(this).parent().addClass('active');
        
        $(this).parent().find(' .contenu-ouvrir-fermer').stop().animate({
            maxHeight: 1000
         }, {
             duration: 300, 
             easing: 'easeInOutQuad',
             queue: false
         });
        
        return false;
    });
	
     
    
});