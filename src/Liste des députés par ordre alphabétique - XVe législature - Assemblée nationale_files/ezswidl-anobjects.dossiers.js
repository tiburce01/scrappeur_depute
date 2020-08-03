function activateEnSavoirPlusLink(){
	
	$( '.contenu-en-savoir-plus-btn' ).click( function(event) {
		event.preventDefault();	
		$(this).next('.info-option-complementaire-dossier').fadeToggle("slow", "linear");
	});
	
	$('.info-option-complementaire-dossier .fermer-info-option').click(function(){
        $(this).parent().fadeToggle("fast", "linear");
    });	
}

function navigationActifInactif() {
	
	$('#etapes-procedure-icons td').each(function( index ) {
		
		actifInactif($(this));

	});
	
};

function actifInactif(obj) {

	if (obj.hasClass('etat-actif')){
			
			obj.removeClass('etat-actif');
			obj.addClass('etat-inactif');
			
	}
		
};

function inactifActif(obj) {
	
	if (obj.hasClass('etat-inactif')){
		
		obj.removeClass('etat-inactif');
		obj.addClass('etat-actif');
		
	}
	
};

function inactifActifComplet(obj) {
	
	if (obj.hasClass('etat-inactif')){
		
		obj.removeClass('etat-inactif');
		obj.addClass('etat-actif');
		
		var a_etape = $('td[data-etape="' + obj.find('a').attr('data-etape') + '"]');
		
		if ($(a_etape).hasClass('etat-inactif')) {
			
			$(a_etape).removeClass('etat-inactif');
			$(a_etape).addClass('etat-actif');
			
		}
		
	}
	
};

function flipAnimation(obj,contenu,fleche) {
	
	if (obj.hasClass('flip')) {
		
		var _velocityEffectOut="transition.flipXOut";
		var _velocityEffectIn="transition.flipXIn";
		
	} else {
		
		var _velocityEffectOut="transition.flipXReverseOut";
		var _velocityEffectIn="transition.flipXReverseIn";
		
	}
	
	animation('.fiche-procedure-contenu:visible',_velocityEffectIn,_velocityEffectOut,contenu);
	animation('.fiche-procedure-haut-bas:visible',_velocityEffectIn,_velocityEffectOut,fleche);
					
};


function etapeLink(link,td_etape,icons){
	
	var contenu_etape = $('.fiche-procedure-contenu[data-codeacte="' + link.data('codeacte') + '"]');
	var fleche_etape = $('.fiche-procedure-haut-bas[data-codeacte="' + link.data('codeacte') + '"]');
	
	var stateObject = {};
	var title = " ";
	var newUrl = $('.fiche-procedure').attr('data-id_omc') + '#?' + link.attr('data-codeacte');
	history.pushState(stateObject,title,newUrl);
			
	navigationActifInactif();

	if (contenu_etape.length > 0) {

		var slide_target=$(td_etape).parents('li').index();
		var slide_current=$('#etapes-procedure-icons li:visible').index();

		if (slide_current>slide_target)

			{
				$('.procedure-contenu .controle-prev-next a.precedent').click();
			}
		else
			{
				$('.procedure-contenu .controle-prev-next a.suivant').click();
			}
			
		if (icons) {

			inactifActif($(td_etape));	
			
		}else{
			
			inactifActifComplet($(td_etape));	
		}
				
		flipAnimation(link,contenu_etape,fleche_etape);
	}
	 
	return false;
	
};

function activateNavigationEtapeLink(){
	
	$('#etapes-procedure-icons').on('click', 'a', function() { 
	
		var td_etape = $('td[data-etape="' + $(this).data('etape') + '"], td[data-codeacte="' + $(this).data('codeacte') + '"]');
		var icons=true;
		etapeLink($(this),td_etape,icons);
		
	});
		  
	$('.fiche-procedure-haut-bas,.les-procedures-bas').on('click', 'a', function() {

		var td_etape = $('td[data-codeacte="' + $(this).data('codeacte') + '"]');
		var icons=false;
		etapeLink($(this),td_etape,icons);
		return false;
		
	});
};


function animation(objet,effetIn,effetOut,container) {
	$.Velocity.RegisterEffect("transition.flipXReverseIn", {
        defaultDuration: 700,
		calls: [[ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateY: [ 0, 55 ] } ]
		],
		reset: { transformPerspective: 0 }
    });
	$.Velocity.RegisterEffect("transition.flipXReverseOut", {
        defaultDuration: 700,
		calls: [[ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], rotateY: -55 } ]
		],
	reset: { transformPerspective: 0, rotateY: 0 }
    });
	$(objet).velocity(
		effetOut,
		{
			duration:400
		}
	);
   
	setTimeout(function() {
		container.velocity(effetIn, { queue: false });
	},300);
};

function cam(obj)
{
	  obj.hover(function () {
                    this.sector.stop();
                    this.sector.scale(1.1, 1.1, this.cx, this.cy);

                    if (this.label) {
                        this.label[0].stop();
                        this.label[0].attr({ r: 7.5 });
                        this.label[1].attr({ "font-weight": 800 });
                    }
                }, function () {
                    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

                    if (this.label) {
                        this.label[0].animate({ r: 5 }, 500, "bounce");
                        this.label[1].attr({ "font-weight": 400 });
                    }
                });
};

function carrousel(SelectorItem,index) {
	
	var ulClass = 'liste-les-procedures' + index;
	SelectorItem.find('.procedure-contenu > ul').addClass(ulClass);
	
	var carrousel = $('ul.liste-les-procedures' + index).bxSlider({
		auto: false,
		autoControls: false,
		controls: false,
		pager : false,
		infiniteLoop: false,
		pagerType: 'short',
		moveSlides:1
	});
	
	
	var slideCount = carrousel.getSlideCount();
	//carrousel.goToSlide(slideCount-1);
	if (slideCount==1)
	{
		SelectorItem.find('.controle-prev-next').hide();
	}
	else
	{
		SelectorItem.find('.controle-prev-next').show();
		SelectorItem.find('.controle-prev-next .suivant').addClass('inactif');
		
		SelectorItem.find('.controle-prev-next .precedent').click(function(){
			carrousel.goToPrevSlide();
			
			var slideCurrent = carrousel.getCurrentSlide() + 1 ;
			if (slideCurrent==1)
			{
				$(this).addClass('inactif');
			}
			if(slideCurrent<=slideCount)
			{
				SelectorItem.find('.controle-prev-next .suivant').removeClass('inactif');
			}
			return false;
		});
		
		SelectorItem.find('.controle-prev-next .suivant').click(function(){
			carrousel.goToNextSlide();

			var slideCurrent = carrousel.getCurrentSlide() + 1 ;
			if (slideCurrent==slideCount)
			{
				$(this).addClass('inactif');
			}
			if(slideCurrent>=1)
			{
				SelectorItem.find('.controle-prev-next .precedent').removeClass('inactif');
			}
			return false;
		});
	}
	
};


$(function() {
	
	activateEnSavoirPlusLink();
	activateNavigationEtapeLink();
	
	$('.les-procedures').each(function(index) {carrousel($(this),index);});
	
	var hash=window.location.hash;
	
	if (hash.substring(1,2)=="?") {
				
		$('a.image-procedure[data-codeacte="' + hash.substring(2) + '"]').trigger('click');
		
	}else{
		
		$('a.image-procedure').last().trigger('click');
		
	};
	
	
 	
	$(document).on('piechart', function(evt) {  
		
		/* Animation de l'opacité des carrousel (telle que prévue dans an-front-loader.js)*/
		$(evt.target).find('.chart').each(function(index) {
			
			var s1 =[];
			var ticks = [];
			var s1label = [];
			
			s1[0]=parseFloat($(this).attr('data-pour'));
			s1[1]=parseFloat($(this).attr('data-contre'));
			
			if (parseFloat($(this).attr('data-pour')) > parseFloat($(this).attr('data-contre')))
				{
				ticks[0]="Pour l'adoption : "+$(this).attr('data-pour');
				ticks[1]="Contre : "+$(this).attr('data-contre');
				s1label[0]='Pour l\'adoption';
				s1label[1]='Contre';
				}
			else
				{
				ticks[0]="Pour : "+$(this).attr('data-pour');
				ticks[1]="Contre l'adoption : "+$(this).attr('data-contre');
				s1label[0]='Pour';
				s1label[1]='Contre l\'adoption';
				}
			
			
			// Abstention : affichée que si > 0
			if (parseFloat($(this).attr('data-abstention'))>=0) 
			{
				s1[2]=parseFloat($(this).attr('data-abstention'));
				ticks[2]="Abstention : "+ s1[2];
				s1label[2]="Abstention : " + s1[2];
			}
			
			var id=$(this).attr('id');
			
			if (s1[0]==Math.max(s1[0],s1[1],s1[2]))
			{
				if (s1[1]>s1[2])
				{
					var couleurs=["#155B87","#FF5353", "#dadada"];
				}
				else
				{
					var couleurs=["#155B87","#dadada","#FF5353"];
				}
			}
			if (s1[1]==Math.max(s1[0],s1[1],s1[2]))
			{
				if (s1[0]>s1[2])
				{
					var couleurs=["#FF5353","#155B87", "#dadada"];
				}
				else
				{
					var couleurs=["#FF5353", "#dadada", "#155B87"];
				}
			}
			if (s1[2]==Math.max(s1[0],s1[1],s1[2]))
			{
				if (s1[0]>s1[1])
				{
					var couleurs=["#dadada", "#155B87","#FF5353"];
				}
				else
				{
					var couleurs=["#dadada","#155B87","#FF5353"];
				}
			}
			
			if (s1[2]==0) s1.remove(s1[2]);
			if (s1[1]==0) s1.remove(s1[1]);
			if (s1[0]==0) s1.remove(s1[0]);
			
			//var cible='chart1t';
			
			r = Raphael(document.getElementById(id),290,250);
			pie = r.piechart(130, 100, 85, s1, { legend: ticks, legendpos: "south", colors: couleurs});
			
			cam(pie);
		});
	});
	
	$('.accordion-toggle').on('click', function(e){
		
		if(!($(this).parent().next('div').hasClass('in')))
			{
				$(this).closest('.accordion').find('.in').prev('.accordion-heading').find('a').toggleClass('collapsed', 200);
				if (($(this).parent().next('div').find("div.chart svg").length<1)) 
				{
					$(this).parent().next('div').trigger('piechart');
				}
			}
			
	});
});