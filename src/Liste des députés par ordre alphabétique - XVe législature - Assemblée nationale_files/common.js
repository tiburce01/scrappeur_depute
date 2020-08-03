/* ----- Clé player Vidéo ------ */
jwplayer.key = 'G01h/DZYBVd+uJhqye3/nXL29RUmfGijoaHuxw3UrxQ=';

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position){
	position = position || 0;
	return this.substr(position, searchString.length) === searchString;
	};
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search, this_len) {
	if (this_len === undefined || this_len > this.length) {
	this_len = this.length;
	}
	return this.substring(this_len - search.length, this_len) === search;
	};
}

/*--------------------------------------------------------------
*     Extension de datatable.js : tri currency
 ---------------------------------------------------------------*/
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
		"currency-pre": function ( a ) {
			a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			return parseFloat( a );
		},

		"currency-asc": function ( a, b ) {
			return a - b;
		},

		"currency-desc": function ( a, b ) {
			return b - a;
		}
	} 
);

$(function() {
	
    // Affichage du menu
    $("ul.sf-menu").superfish({
        delay: 600,
        Speed: 100,
        animation: {
            opacity: 'show',
            height: 'show'
        },
        autoArrows: false
    });
	    
	/*Menu principal en haut à droite*/
	$('#menu-missions a').bind('click', function(event) {
		$('#menu-missions .hide').remove();
		if (!$(this).hasClass('actif')) {
			var	_this 	= $(this),
				_hash 	= _this.attr('href'),
				_parent	= _this.parent('li')
			;
			
			_this.before("<span class='hide'>Vous &ecirc;tes ici: </span>");
			$('#page').find('.c-actif').removeClass('c-actif');
			$(_hash).addClass('c-actif');
			
			_parent.siblings('li').children('.actif').removeClass('actif');
			/*_parent.addClass('active');*/
			_this.addClass('actif').blur();
			$('#page ul.tabs-content > li.active').fadeIn();
		}
	});
        
	/*Bouton "voir la suite" dans l'encadré du haut*/
	
	$('a.suite').bind('click', function(event) {
		var	_this 	= $(this),
			_hash 	= _this.attr('href');
			$('.c-actif').removeClass('c-actif');
			$('#actu').addClass('c-actif');
			$('#menu-missions li').removeClass('active');
			$('#menu-missions li').eq(0).addClass('active');
			_this.blur();
			$('#page ul.tabs-content > li.active').fadeIn();
			
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
					verticalDragMaxHeight: 100,
					showArrows: true
				}
			);
		}
	)
	
	$('.contenu-agenda-avec-ascenseur').each(
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
	)
	
	/*----------------------------------------------------------------------
	*  Choosen select
	----------------------------------------------------------------------*/

	$(".chzn-select").chosen();
	$(".chzn-select-deselect").chosen({allow_single_deselect:true});

	/*----------------------------------------------------------------------
	*  
	----------------------------------------------------------------------*/
	
	$('.som').on('click', function(e) {
    	e.preventDefault();
		var _this = $(this);
        $('.menu-secondaire li.hide').fadeIn(function(){_this.fadeOut();});
		
		return false;
    });

	/*-----------------------------------------------------------------------------
     *     affichage de la vue ajax de l'item sélectionné
     ------------------------------------------------------------------------------*/

	$(document).on('click', '.ajax', function(e) {
    	e.preventDefault();
		var _this = $(this);
        var node_id = _this.attr('data-node-id');
		var node_vue=_this.attr('data-vue');
		var uri_suffix=$(this).attr('data-uri-suffix') ? $(this).attr('data-uri-suffix') : '';
		var form_token=$(this).attr('data-form_token') ? $(this).attr('data-form_token') : '';
		var session_id=$(this).attr('data-session-id') ? $(this).attr('data-session-id') : '';
		var session_name=$(this).attr('data-session-name') ? $(this).attr('data-session-name') : '';
		
		var objPostData = {};
		objPostData['ezxform_token'] = form_token; 
		objPostData[session_name] = session_id;
		
		if (history.pushState) {
			var stateObject = {};
			var title = "Wow Title";
			var newUrl = $(this).attr('data-url');
			history.pushState(stateObject,title,newUrl);
		}
		
		
		if (_this.parents('.menu-secondaire').length)
		{
			$('.actif').removeClass('actif');
			_this.addClass('actif');
		}
		if (_this.parents('.nav-pills').length || _this.parents('ul.nav').length )
		{
			$('.active').removeClass('active');
			_this.parent().addClass('active');
		}
		load_contenu($('#ajax-wrapper'), node_vue, node_id, uri_suffix, 'true', objPostData, session_name);
    });
	
	/*------------------------------------------------------------------------------------
     *     affichage de la vue ajax de l'item sélectionné dans le navigateur de pagination
     ------------------------------------------------------------------------------------*/

	$(document).on('click','.ajax-navigator', function(e) {
		e.preventDefault();
    	var _this = $(this);
        var node_id = _this.attr('data-parent-id') ? _this.attr('data-parent-id') : _this.attr('data-node-id');
		var node_vue=_this.attr('data-vue') ? _this.attr('data-vue'):'ajax';
		var target=_this.attr('data-target') ? _this.attr('data-target'):'#ajax-wrapper';
		var uri_suffix =  _this.attr('data-uri-suffix');
		if (_this.parents('.menu-secondaire').length)
		{
			$('.actif').removeClass('actif');
			_this.addClass('actif');
		}	
		load_contenu($(target),node_vue,node_id,uri_suffix,'false');
    });
	
	/*------------------------------------------------------------------------------------
     *     affichage de la vue ajax de l'item sélectionné dans le navigateur de pagination
     ------------------------------------------------------------------------------------*/

	$(document).on('click','.ajax-navigator-onglet', function(e) {
		e.preventDefault();
    	var _this = $(this);
        var node_id = _this.attr('data-node-id');
		var node_vue=_this.attr('data-vue') ? _this.attr('data-vue'):'embed';
		var target=_this.attr('data-target') ? $(_this.attr('data-target')):$(this).parents('.interieur-entiere-colonne').parent();
		var uri_suffix = '/(titre)/false/(ajax)/true' + _this.attr('data-uri-suffix');
		load_contenu(target,node_vue,node_id,uri_suffix,'false');
    });
	
	/*------------------------------------------------------------------------------------
     *     affichage de la vue ajax de l'item sélectionné dans le navigateur alphabet
     ------------------------------------------------------------------------------------*/
	
	$(document).on('click','.ajax-alphabet', function(e) {
    	e.preventDefault();
    	var _this = $(this);
        var node_id = $(this).attr('data-node-id');
		var node_vue='embed_inline';
		var target=_this.attr('data-target') ? $(_this.attr('data-target')):$(this).parents('.interieur-entiere-colonne').parent();
		var uri_suffix=$(this).attr('href');
		load_contenu(target,node_vue,node_id,uri_suffix,'false');
    });
	
	/*------------------------------------------------------------------------------------
     *     affichage de la vue embed de de la classe an_index
     ------------------------------------------------------------------------------------*/
	
	$(document).on('click','.ajax-listes', function(e) {
    	e.preventDefault();
		
	   	var _this = $(this);
		var target= $(this).attr('data-target');
		var uri_suffix = $(this).attr('data-uri-suffix');
		var href = $(this).attr('href');
		
		$(target).animate({opacity: 0}, 200, function(){
				var elmt = $(this).parent().find('.image-tabmat-ajax');
				elmt.show().animate({opacity: 1}, 200);
			});
		
        $(target).load(href, function() {
			var elmt = $(this).parent().find('.image-tabmat-ajax');
			elmt.animate({opacity: 0}, 200, function(){
				elmt.hide();
				$(target).show().animate({opacity: 1}, 200).trigger('tab');
			 });
		});
		
		if ($(this).hasClass('bas'))
		{
			$('html, body').animate({
				scrollTop: $(target).offset().top - 50
			},100);
			
		}
		
		return false;
    });
	
	/*-------------------------------------------------------------------
     *   initialisation de la page
     --------------------------------------------------------------------*/
	var _this = $('a.ajax.actif:first') ? $('a.ajax.actif:first') : $('a.ajax.alphabet:first'); 	
	var node_id = _this.attr('data-node-id');
	var node_suffix = _this.attr('data-uri-suffix');
	var node_vue=_this.attr('data-vue');
	var hash = $('a[data-node-id="' + window.location.hash.substring(6) + '"]');
	var form_token=_this.attr('data-form_token') ? _this.attr('data-form_token') : '';
	var session_id=_this.attr('data-session-id') ? _this.attr('data-session-id') : '';
	var session_name=_this.attr('data-session-name') ? _this.attr('data-session-name') : '';
	
	var objPostData = {};
	objPostData['ezxform_token'] = form_token; 
	objPostData[session_name] = session_id;
			
	if (hash.attr('data-node-id'))
	{ 
		var uri_suffix = hash.attr('data-uri-suffix');
		node_id=hash.hasClass('ajax-navigator') ? hash.attr('data-parent-id') : hash.attr('data-node-id');
		node_vue=hash.attr('data-vue');
		var target=hash.hasClass('ajax-navigator') ? hash.attr('data-target'):'#ajax-wrapper';
		$('.actif').removeClass('actif');
		hash.addClass('actif');
		load_contenu($(target), node_vue, node_id, uri_suffix, 'true', objPostData, session_name);
	}
	else if(node_id || node_suffix) 
	{
		var uri_suffix = _this.attr('data-uri-suffix');
		$('.actif').removeClass('actif');
		_this.addClass('actif');
		load_contenu($('#ajax-wrapper'), node_vue, node_id, uri_suffix, 'false', objPostData, session_name);
	}
	/*--------------------------------------------------------------
	* Smooth Scrool Top
	--------------------------------------------------------------*/
	
	var top_anchors = $('#to-top, .bouton-retourner-haut');
	
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 200) {
			top_anchors.fadeIn();
		} else {
			top_anchors.fadeOut();
		}
	});
	
	top_anchors.on('click', function () {
		$('body,html').animate({scrollTop: 0}, 800);
			
	});
		
	/*-------------------------------------------------------------------------------
     *      Egalisation de la hauteur des élements passés à la fonction equalHeight()
     -------------------------------------------------------------------------------*/
	 	
	equalHeight($(".quatre-colonne-contenu a"));
	equalHeight($(".trois-colonne-contenu>li"));
	equalHeight($(".deux-colonne-omc ul.liens-liste>li"));
	equalHeightGalerie($(".grid_3"));
	//equalHeight($(".tab-lien-vertical>div"));
	
	/*-------------------------------------------------------------------------------
     *     Scrollbar du menu secondaire : activé que si la hauteur >= css : max-height
     -------------------------------------------------------------------------------*/
	
	$('.avec-scrollbar').each(function(){
		
		if($(this).height()>=parseInt($(this).css('max-height')))
		{
			$(this).perfectScrollbar({
				wheelSpeed: 20
			});
		}
		
	});
	/*--------------------------------------------------------------
	* Tablesorter
	--------------------------------------------------------------*/
	
	  $('table.representant_interet').dataTable({
		"aoColumns": [      
			{ "stype": 'string'},
			{ "sType": "string" },
			{ "sType": "string" },
			{ "sType": "string","bSortable": false },
			{ "sType": "string" }
		],
		"bPaginate": false,
		"bInfo": false,
		"bSort": true,
		"bFilter": false
	});
	
	$("table.tablesorter_reserve").dataTable({
		"aoColumns": [      
						{ "bSortable": false },
						{ "sType": "string" },
						{ "sType": "currency" },
						{ "sType": "html" },
						{ "sType": "string" }
					],
		"bPaginate": false,
		"bInfo": false,
		"bFilter": false
	});
	
	
	$('.tablesorter_reserve a.action_details').on('click', function (e) {
		e.preventDefault();
		var nTr = $(this).parents('tr')[0];
		if ( $('.tablesorter_reserve').dataTable().fnIsOpen(nTr) )
		{
			$(this).find('img').attr("src","/extension/ansearch/design/an/images/details_open.png");
			$('.tablesorter_reserve').dataTable().fnClose( nTr );
		}
		else
		{
			$(this).find('img').attr("src","/extension/ansearch/design/an/images/details_close.png");
			fnFormatDetails($('.tablesorter_reserve').dataTable(), nTr, $(this).attr('href'), $(this).attr('data-id'));
		}
	} );
	/*--------------------------------------------------------------
     *      07/01/2014 : création d'un "custom event : ajax"
	 *		listener : document
	 *      target : body ou la div de chargement de l'appel ajax
     ---------------------------------------------------------------*/

	$(document).on('ajax', function(evt) {
		
		equalHeightGalerie($('.grid_3'));
		
		/* Animation de l'opacité des carrousel (telle que prévue dans an-front-loader.js)*/
		
		$(evt.target).find('.carrousel-auto-false').animate({opacity: 1}, 1500);
		
		/* idTabs : tabulations */
		
		/*$(evt.target).find('.tab-lien-liste').idTabs();*/
		
		/* Affichage du player video */
        
		
		$(evt.target).find('.video-tag').each(function(index, el) {

			if(!$(el).attr('id')) $(el).attr('id',$(el).attr('title')+Math.floor((Math.random() * 100) + 1)); //vérue pour les videos embarquées dans ezoe
			var path = '/extension/common/design/an/javascript/jwplayer-6.12/',
				img = $(el).children('img'),
				video_id = $(el).attr('id');
            var ivideo = $(el).attr('href');
            var iString;
            var iString2;
            var iChemin;
            if ($(el).parents('.videos-dep').length) {
            	iChemin=ivideo.substring(0,ivideo.lastIndexOf("."));
            	iChemin=iChemin.replace(/^[\/]+/, "");
            }
            else
            {
            	iString=ivideo.substring(ivideo.lastIndexOf("/")+1,ivideo.lastIndexOf("."));
            	iString2=ivideo.substring(0,ivideo.lastIndexOf("."));
            	iString2=iString2.replace(/^[\/]+/, "");
            	iChemin=iString2+'/'+iString;
            }
            // Les rédacteurs copient l'url fournit par le portail vidéo event en supprimant le _1 à la fin
			// L'url fournit est de la forme xxxx_1.mp4 on se trouve donc avec xxxx.mp4
			// Pour déterimer l'url m3u8 il suffit donc de remplacer l'extension
			// Par contre pour l'url mp4 cela ne fonctionne pas: Il faut ajouter "_1" avant l'extension
			// Cette règle ne doit être appliqué que depuis que les liens sont récupérés du portail vidéo event
			// On repère leur origine en regardant si le nom du fichier commence par encoder ou QG_
			// cf. http://ceredmine/issues/1758
            var suffixeToAddToMP4="";
            var filepart=iChemin.substring(iChemin.lastIndexOf('/')+1);
            if ((filepart.startsWith('encoder') || filepart.startsWith('QG_')) && !filepart.endsWith("_1")) {
                suffixeToAddToMP4='_1';
            }
            v_width = parseInt($(el).parent().css('width'));
                /* La barre de pilotage a disparu */
			v_height = parseInt($(el).parent().css('height'));
            if (v_height == 0) {
                    v_height = $(el).parent().height();
            }
                
			jwplayer(video_id).setup({
				autostart: false,
				flashplayer: path + 'player.swf',
                html5player: path + 'jwplayer.html5.js',
                playlist: [{
                    image: img.attr('src'),
					sources: [
					{ 
						file: 'http://videos-diffusion.assemblee-nationale.fr/'+iChemin+'.m3u8'
					}
					,
					{
						file: 'http://videos-diffusion.assemblee-nationale.fr/'+iChemin+suffixeToAddToMP4+'.mp4'
					}
					],
                    stretching: 'exactfit',
                }],
                primary: "html5",
                height: v_height,
                width: v_width
			});
           if ( ( $(el).attr('data-offset') ) &&  ($(el).attr('data-offset') > 0 ) )
           {
               jwplayer(video_id).onBeforePlay(function(){ 
                    jwplayer(video_id).seek($(el).attr('data-offset')); 
                });
           }
		});
		
		
		/* Transformation des liens de la class .ina en iframe affichant la vidéo */

		var src="";
		$(evt.target).find('a.ina').each(function(){
			src="<iframe width='320' height='240' frameborder='0' marginheight ='0' marginwidth='0' scrolling ='no' src='" + $(this).attr("href") + "'></iframe>";
			$(this).replaceWith(src);
		});
		
		/* Lecteur audio jwplayer sur les liens de la classe .audio-tag */ 
		$(evt.target).find('.audio-tag').each(function(index, el) {
		
			if(!$(el).attr('id')) $(el).attr('id',$(el).attr('title')); //vérue pour les videos embarquées dans ezoe qui supprime l'attribut id des liens
			var path = '/extension/common/design/an/javascript/jwplayer-6.12/',
			img = $(el).children('img'),
			audio_id = $(el).attr('id');
		
			if(img.length==0)
				{
					var v_width = 240;
					var v_height = 24;
					jwplayer(audio_id).setup({
						autostart: false,
						controlbar: 'bottom',
						flashplayer: path + 'player.swf',
						file: $(el).attr('href'),
						height:  v_height,
						width: v_width
					});
				}
			else
				{
					var v_width = (img.width()>240) ? img.width() : 240;
					var v_height = img.height();
					v_height = v_height; // taille de la barre d'outils
					jwplayer(audio_id).setup({
						autostart: false,
						controlbar: 'bottom',
						flashplayer: path + 'player.swf',
						file: $(el).attr('href'),
						image: img.attr('src'),
						height:  v_height,
						width: v_width
					});
				}
		});
		
		/* carrousel-bxslider-auto-false */
			
		$(evt.target).find('.carrousel-auto-false:visible').each(function(index) {
			
			var SelectorItem = $(this);
			var j=Math.floor((Math.random()*100)+1);
			var ulClass = 'liste-carrousel' + j + index;
			SelectorItem.find('> ul').addClass(ulClass);
			$(this).children('ul').css('text-indent',0);
			$(this).removeClass('carrousel-auto-false').addClass('carrousel-auto-false-ok');
			
			if ($(this).hasClass('auto')) {
					var automatique=true;
					var infiniteloop=true;
					var autohover=true;
			}else{
					var automatique=false;
					var infiniteloop=false;
					var autohover=false;
			}
			
			var SelectorPagination = ulClass +' .page-pagination';
			
			var carrousel = $('ul.liste-carrousel' + j + index).bxSlider({
				auto: automatique,
				controls: false,
				pager : true,
				infiniteLoop:  infiniteloop,
				pagerSelector: SelectorItem.find('.page-pagination'),
				pagerType: 'short',
				autoHidePager: true,
				autoHover:autohover,
				pause : 3000,
				onSliderLoad: function(){
					//if (SelectorItem.find('a.actif').parents('li').last().index()>0) carrousel.goToSlide(SelectorItem.find('a.actif').parents('li').last().index());
				}
			});
			
			var slideCount = carrousel.getSlideCount();
			
			if (slideCount==1)
				{
					SelectorItem.find('.controle-pagination').hide();
					SelectorItem.find('.titre-carrousel').css('padding-top','0px');
				}
			
			
			SelectorItem.find('.controle-pagination .precedent').addClass('inactif');
			
			if (SelectorItem.find('a.actif').parents('li').last().index()>0) 
				
			{
				carrousel.goToSlide(SelectorItem.find('a.actif').parents('li').last().index());
				if ( carrousel.getCurrentSlide() + 1 == slideCount) 
				{
					SelectorItem.find('.controle-pagination .suivant').addClass('inactif');
					SelectorItem.find('.controle-pagination .precedent').removeClass('inactif');
				}
			}
			
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
		
		
		/* carrousel-bxslider-auto-false-bootstrap */
	 
		$(evt.target).find('.carrousel-auto-false-bootstrap:visible').each(function(index) {
			var SelectorItem = $(this);
			var j=Math.floor((Math.random()*100)+1);
			var ulClass = 'liste-carrousel-bootstrap' + j + index;
			SelectorItem.find('> ul.cible').addClass(ulClass);
						
			$(this).removeClass('carrousel-auto-false-bootstrap');
			
			var carrousel = $('ul.liste-carrousel-bootstrap' + j + index).bxSlider({
				auto: false,
				controls: false,
				pager : true,
				infiniteLoop:  false,
				pagerSelector: SelectorItem.find('.page-pagination'),
				pagerType: 'full',
				pause : 5000,
				/*buildPager: function(slideIndex){
					  i=parseInt(slideIndex) + 1;
					  alert(i);
					  if (i==1)
						{
							return '<a class="first-slide pager-link pager-' + i + '" href="" data-slide-index="' + i + '">'+ i + '</a>';
						}
						else
						{
							return '<a class="pager-link pager-' + i + '" href="" data-slide-index="' + i + '">'+ i + '</a>';
						}
				  }*/
			});
			
			var slideRange=SelectorItem.find('.pagination-bootstrap').data('range');
			SelectorItem.find('.page-pagination a').first().addClass('first-slide');
			SelectorItem.find('.page-pagination a').last().addClass('last-slide');
			
			var slideCount = carrousel.getSlideCount();
			if (slideCount==1)
			{
				SelectorItem.find('.pagination-bootstrap').hide();
			}
						
			SelectorItem.find('.pagination-bootstrap .precedent').parent().addClass('disabled');
			
			SelectorItem.find('.pagination-bootstrap .precedent').click(function(){
				carrousel.goToPrevSlide();
				var slideCurrent = carrousel.getCurrentSlide() + 1 ;
				raz_pager(SelectorItem,carrousel,slideRange);
				if (slideCurrent==1)
				{
					$(this).parent().addClass('disabled');
				}
				if(slideCurrent<=slideCount)
				{
					SelectorItem.find('.pagination-bootstrap .suivant').parent().removeClass('disabled');
				}
				return false;
			});
			
			SelectorItem.find('.pagination-bootstrap .suivant').click(function(){
				carrousel.goToNextSlide();
				var slideCurrent = carrousel.getCurrentSlide() + 1 ;
				raz_pager(SelectorItem,carrousel,slideRange);
				
				if (slideCurrent==slideCount)
				{
					$(this).parent().addClass('disabled');
				}
				if(slideCurrent>=1)
				{
					SelectorItem.find('.pagination-bootstrap .precedent').parent().removeClass('disabled');
				}
				return false;
			});
			
			SelectorItem.find('.pagination-bootstrap .bx-pager-link').click(function(){
				var slideCurrent = carrousel.getCurrentSlide() + 1 ;
				raz_pager(SelectorItem,carrousel,slideRange);
				SelectorItem.find('.pagination-bootstrap .precedent').parent().removeClass('disabled');
				SelectorItem.find('.pagination-bootstrap .suivant').parent().removeClass('disabled');
				if(SelectorItem.find('.page-pagination a').eq(slideCurrent-1).hasClass('last-slide'))  
					{
						SelectorItem.find('.pagination-bootstrap .suivant').parent().addClass('disabled');
						SelectorItem.find('.pagination-bootstrap .precedent').parent().removeClass('disabled');
					}
				if(SelectorItem.find('.page-pagination a').eq(slideCurrent-1).hasClass('first-slide'))  
					{
						SelectorItem.find('.pagination-bootstrap .suivant').parent().removeClass('disabled');
						SelectorItem.find('.pagination-bootstrap .precedent').parent().addClass('disabled');
					}
			});
						
			raz_pager(SelectorItem,carrousel,slideRange);
		});
		
		
		 $(evt.target).find('.fermer').each(function(index) {
				$(this).click(function(event){
					$(this).parents('.accordion').find('.ouvert').removeClass('ouvert');
					$(this).addClass('ouvert');
				});
		});	
		
		
		/* supression de l'indentation dans tous les carrousels */
		$(evt.target).find('.carrousel-auto-false-ok,.carrousel-auto-false').each(function(index) {
			$(this).find('ul').css('text-indent',0);
		});
	});
	
	$(document).on('datatable', function(evt) { 
		$(evt.target).find('.cr_archives:visible').each(function(index) {
			$(this).dataTable({
				/*"sScrollY": "300px",*/
				"bScrollCollapse": true,
				"bPaginate": false,
				"bInfo": false,
				"bSort": false,
				"bFilter": false,
				"fnDrawCallback": function( oSettings ) {
				  /*$('.dataTables_scrollBody').css('overflow','hidden').perfectScrollbar({
						wheelSpeed: 20
					});*/
					$('.dataTables_scrollHeadInner').css('width','100%');
					$('.dataTables_scrollHeadInner').css('padding-right','0');
					$('.dataTables_scrollHeadInner .cr_archives').css('width','100%');
				}
			} );
		});	
	});
	
	/* Onglets horizontaux (bootstrap) */
	
		$(document).on('click','.nav-tabs a',function (e) {
			load_tab_contenu( $(this), e);
		});

	/*$(document).on('grecaptcha', function(){
        var captchaComment;
        var onloadCallback = function() {
            captchaComment = grecaptcha.render('recaptcha', {
                'sitekey' : '6Le3RQUTAAAAALq_PTw79Kp5nEKv2M3ddgcASWBf',
                'theme' : 'light'
            });
        };
    });*/
		
	
	/*--------------------------------------------------------------
     *      07/01/2014 : déclenchement des "custom event : ajax et datatable"
     ---------------------------------------------------------------*/
	
	$('body').trigger('ajax');
	$('body').trigger('datatable');
    //$('body').trigger('grecaptcha');
	
});

function load_tab_contenu(objet,e)
{
	var selector = objet.attr('href'),
	url=objet.attr("data-url"),
	pane=objet;

	if (selector.substring(0,1)=='#')
	{
		e.preventDefault();
		pane.tab('show');
		if (!$(selector).hasClass('non-ajax'))
			{
				load_tab(selector,pane,url);
			}	
		else	
			{
				contenu_tab(selector,pane);
			}
	}
}

function equalHeight(obj){
	var heightArray = obj.map( function(){
			 return  $(this).height();
	}).get();
	var maxHeight = Math.max.apply( Math, heightArray);
	obj.height(maxHeight);
};

function equalHeightGalerie(obj){
	var heightArray = obj.map( function(){
			 return  parseInt($(this).find('img').attr('height')) + parseInt($(this).find('h3').height()) + 10;
	}).get();
	var maxHeight = Math.max.apply( Math, heightArray);
	obj.height(maxHeight);
};

	/* 24/01/2014 : détails du tableau de la réserve parlementaire */

	function fnFormatDetails ( oTable, nTr, objet, id )
	{
		$('#page').css('cursor','wait');
		var aData = oTable.fnGetData( nTr );
		var contentdet = new Array(6);
		var req = $.getJSON(objet, function(data){
			var item=[];
			var sOut='<dl class="deputes-liste-attributs">';
			sOut += '<dt class="reserve">Bénéficiaire : </dt><dd><ul><li>' + data[0].beneficiaire + '</li></ul></dt>';
			sOut += '<dt class="reserve">Montant : </dt><dd><ul><li>' + parseInt(data[0].montant).toString() + ' €</li></ul></dt>';
			if (data[0].adresse) sOut += '<dt class="reserve">Adresse : </dt><dd><ul><li>' + data[0].adresse.replace(/$/mg,'<br>') + '</li></ul></dt>';
			if (data[0].descriptif) sOut += '<dt class="reserve">Nature de la subvention : </dt><dd><ul><li>' + data[0].descriptif + '</li></ul></dt>';
			if (data[0].programme_budgetaire) sOut += '<dt class="reserve">Programme et action budgétaires : </dt><dd><ul><li>' + data[0].programme_budgetaire + '</li></ul></dt>';
			if (data[0].id_acteur)
				{ 
					sOut += '<dt class="reserve">Député ou groupe ayant demandé la subvention : </dt><dd><ul><li><a target="_blank" href="http://www.assemblee-nationale.fr/14/tribun/fiches_id/' + data[0].id_acteur + '.asp">' + data[0].nom + ' ' + data[0].prenom + '</a> (' + data[0].groupe + ')</li></ul></dt>';
				}
			if (data[0].id_groupe)
				{ 
					sOut += '<dt class="reserve">Député ou groupe ayant demandé la subvention : </dt><dd><ul><li><a target="_blank" href="http://www.assemblee-nationale.fr/qui/xml/organe.asp?id_organe=/14/tribun/xml/xml/organes/' + data[0].id_groupe + '.xml">' + data[0].nom + ' ' + data[0].prenom + '</a></li></ul></dt>';
				}
			if (data[0].is_presidence)
				{
					sOut += '<dt class="reserve">Député ou groupe ayant demandé la subvention : </dt><dd><ul><li><a target="_blank" href="http://presidence.assemblee-nationale.fr/">' + data[0].nom + ' ' + data[0].prenom + '</a></li></ul></dt>';
				};
			if (data[0].departement)	sOut += '<dt class="reserve">Département : </dt><dd><ul><li>' + data[0].departement + '</li></ul></dt>';
			
			if (data[0].observations)
			{ 
				sOut += '<dt class="reserve">Informations complémentaires : </dt><dd><ul><li>' + data[0].observations + '</li></ul></dt>';
			}
			sOut += '</dl>';
			
			if (data[0].id_acteur && data[0].id_acteur!=99999)
				{ 
					sOut += '<a target="_blank" href="http://www.assemblee-nationale.fr/14/tribun/fiches_id/' + data[0].id_acteur + '.asp"><img class="clearfix" src="http://www.assemblee-nationale.fr/14/tribun/photos/' + data[0].id_acteur + '.jpg" /></a>';
				}
			

		
			
			sOut += '<p class="lien-encadre"><a target="_blank" href="/reserve_parlementaire/reserve_parlementaire_detail/(Beneficiaire)/' + id + '"><span class="icone-document"></span> Afficher la fiche détail</a></p>'
			
			oTable.fnOpen( nTr, sOut, 'details no-print' );

		});
		$('#page').css('cursor','default');
	};
	
	
	/* 24/04/2014 : timer qui vérifie si la div contenu-principal a une largeur = 954px 
	
	function checkWidthTimer(){		
		if($('#contenu-page .contenu-principal').width() == '954' || $('#contenu-page .contenu-principal').attr('attente') == 'true'){
			//alert($('#contenu-page .contenu-principal').attr('clearattente'));
			clearTimeout(attente);
			$('#ajax-wrapper').fadeIn();
			return false;
		}
		var attente=setTimeout(checkWidthTimer, 500); //at 500 miliseconds
	};
	*/
	
	
/* 06/05/2014 : RAZ pager carousel carrousel-auto-false-bootstrap */
	
	function raz_pager(objet,carrousel,slideRange) {
		var slideCurrent = carrousel.getCurrentSlide() + 1 ;
		objet.find('.page-pagination a.interval-right').removeClass('interval-right');
		objet.find('.page-pagination a.interval-left').removeClass('interval-left');
		objet.find('.page-pagination a.inrange').removeClass('inrange');
		
		objet.find('.pagination-bootstrap .bx-pager-link').each(function(index){
				$(this).html($(this).parent().index()+1);
				if (index+1>slideCurrent)
					{
						if (index+1 <= slideCurrent+Math.ceil(slideRange/2))
						{
							$(this).addClass('inrange');
							if (index+1 == slideCurrent+Math.ceil(slideRange/2)) 
								{	
									if($(this).hasClass('last-slide'))
										{
											$(this).addClass('interval-right');
										}
										else
										{
											$(this).html('...').addClass('interval-right');
										}
								}
						}
					}
				else if 
					(index+1<slideCurrent)
					{
						if (index+1 >= slideCurrent-Math.ceil(slideRange/2))
						{
							$(this).addClass('inrange');
							if (index+1 == slideCurrent-Math.ceil(slideRange/2)) 
								{
									if($(this).hasClass('first-slide'))
										{
											$(this).addClass('interval-left');
										}
									else
										{
											$(this).html('...').addClass('interval-left');
										}
								}
						}
					}
			});
	};
	
	/* Chargement des onglets */
	
	function load_tab(selector,pane,url) {
		if($(selector).hasClass('tab-deputes'))	{
			var target= $(pane).attr('data-wrapper');
			$(target).animate({opacity: 0}, 200, function(){
					var elmt = $(this).parent().find('.image-tabmat-ajax');
					elmt.show().animate({opacity: 1}, 200);
				});
			
			$(target).load(url, function() {
				$(selector).addClass('non-ajax');
				var elmt = $(this).parent().find('.image-tabmat-ajax');
				elmt.animate({opacity: 0}, 200, function(){
					elmt.hide();
					$(target).show().animate({opacity: 1}, 200).trigger('tab');
				 });			 
			});
		} else {
			$(selector).animate({opacity: 0}, 200, function(){		
				if ( $(this).parent().hasClass('contenu-principal')) {
					var elmt = $(this).parent().find('.image-tabmat-ajax');
					elmt.show().animate({opacity: 1}, 200);
				} else {
					$(".image-tabmat-ajax").detach().prependTo($(this).parent());
					var elmt = $(this).parent().find('.image-tabmat-ajax');
					elmt.show().animate({opacity: 1}, 200);
				}
			});
			$(selector).load(url,function() {  
				$(selector).addClass('non-ajax');
				$(".image-tabmat-ajax").animate({opacity: 0}, 200, function(){
					$(".image-tabmat-ajax").hide();
					$(".image-tabmat-ajax").detach().insertBefore($('#ajax-wrapper'));
					$(selector).show().animate({opacity: 1}, 200);
				});
				contenu_tab(selector,pane);
			});
		}
	};
	
	function contenu_tab(selector,pane) {
		selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
		$(selector).trigger('ajax');	
		if (($(selector).find("a[data-rel^='prettyPhoto']").length>0)) $("a[data-rel^='prettyPhoto']").prettyPhoto({show_title: false,social_tools:false,allow_resize:true,theme:'light_square'});	
		if (($(selector).find("a[class^='prettyPhoto']").length>0)) $("a[class^='prettyPhoto']").prettyPhoto({show_title: false,social_tools:false,allow_resize:false,theme:'light_square'});
		if (($(selector).find('.acces-par-date').length>0)) datepicker_init();	
		if (($(selector).find('.dataTables_wrapper').length==0) && ($(selector).find('.cr_archives').length>0)) $(selector).trigger('datatable');
		if ($(selector).find("div.chart svg").length<1) $(selector).find("div.chart").parent().trigger('piechart');
		if ($(selector).find("div.section_resultats").length>0) {
			if ($(selector).find(".page_resultats").css('display')=="none") {
				$(selector).find(".tab_resultats").trigger('amendement');
			}		
		}
		$('.dropdown-toggle').removeAttr('data-toggle').removeAttr('data-target');
		if (pane.hasClass('dropdown-toggle')) pane.attr('data-toggle','dropdown').attr('data-target','#');
		pane.next('.dropdown-menu').css('width',pane.innerWidth());
	};
	
	function returnMaxHeight(obj){
	var heightArray = obj.map( function(){
			 return  $(this).height();
			 }).get();
	var maxHeight = Math.max.apply( Math, heightArray);
	return maxHeight;
};

function load_contenu(cible, vue, id, suffix, scroll, objPostData, session_name){
		
	if (scroll=='true')
		{
			var obj_node_id='#ajax-wrapper';
			$('html, body').animate({
				scrollTop: $(obj_node_id).offset().top - 50
			},800);
		}
	
	cible.animate({opacity: 0}, 200, function(){
		if ($(this).parent().hasClass('contenu-principal'))
			{
				var elmt = $(this).parent().find('.image-tabmat-ajax');
				elmt.show().animate({opacity: 1}, 200);
			}
		else
			{
				$(".image-tabmat-ajax").detach().prependTo($(this).parent());
				var elmt = $(this).parent().find('.image-tabmat-ajax');
				elmt.show().animate({opacity: 1}, 200);
			}
		});
			
	if (!vue)
	{
		var url_load=suffix;
	}
	else
	{
		var url_load='/layout/set/ajax/content/view/' + vue + '/' + id + suffix;
	}
	
	url_load=url_load.replace(/ /g,'-').replace(/'/g,'_');
				
	cible.load(url_load,
		objPostData
	, 
	function(response, status, xhr) {
		$(".image-tabmat-ajax").animate({opacity: 0}, 200, function(){
			$(".image-tabmat-ajax").hide();
			$(".image-tabmat-ajax").detach().insertBefore($('#ajax-wrapper'));
			cible.show().animate({opacity: 1}, 200);
		});
		
		/*      prettyPhoto pour les images chargées en ajax */
		
		if (cible.find("a[data-rel^='prettyPhoto']").length>0) $("a[data-rel^='prettyPhoto']").prettyPhoto({show_title: false,social_tools:false,allow_resize:true,theme:'light_square'});
		
		/* Pour les images insérées dans un attribut xmltext*/
	
		if (cible.find("a[class^='prettyPhoto']").length>0) $("a[class^='prettyPhoto']").prettyPhoto({show_title: false,social_tools:false,allow_resize:false,theme:'light_square'});
		
		
		/* 07/01/2014 : déclenchement du "custom event : ajax" */
		
		$('#ajax-wrapper').trigger('ajax');
		
		/* 20/01/2014 : déclenchement du "custom event : datatable" */
		
		$('#ajax-wrapper').trigger('datatable');
		
		/*      égalisation des hauteurs/largeurs des tabs bootstrap */
		
		$('.nav-tabs').each(function(index) {
	
			if(!$(this).parent().hasClass('tabs-left'))
				{
					var total_longueur=0;
					$(this).children('li').each(function(index) {
						total_longueur+=$(this).innerWidth();
					});
					
					if ((total_longueur>=$(this).innerWidth()) && (total_longueur>0))
						{

							$(this).children('li').innerWidth(($(this).innerWidth()/$(this).children('li').length)-1);
						}
					equalHeight($(this).children('li').children('a'));
				}
			});
		
		/*  20/01/2014 : datepicker" */
		
		datepicker_init();
	});	
};

function datepicker_init(){
	var obj = new Array;
		var jour = new Array;

		$.datepicker.regional['fr'] = {clearText: 'Effacer', clearStatus: '',
			closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
			prevText: '&lt;Préc', prevStatus: 'Voir le mois précédent',
			nextText: 'Suiv&gt;', nextStatus: 'Voir le mois suivant',
			currentText: 'Courant', currentStatus: 'Voir le mois courant',
			monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
			'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
			monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
			'Jul','Aoû','Sep','Oct','Nov','Déc'],
			monthStatus: 'Voir un autre mois', 
			yearStatus: 'Voir un autre année',
			weekHeader: 'Sm', 
			weekStatus: '',
			dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
			dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
			dayStatus: 'Utiliser DD comme premier jour de la semaine', 
			dateStatus: 'Choisir le DD, MM d',
			dateFormat: 'dd/mm/yy',
			firstDay: 1, 
			initStatus: 'Choisir la date', isRTL: false};
		 $.datepicker.setDefaults($.datepicker.regional['fr']);


		$('.datepicker').datepicker({
			inline: true,
			changeMonth:true,
			changeYear:true,
			onSelect: function(dateText) { 
				obj=dateText.split("/");
				contenu=$('#' + parseInt(obj[0])+ "-" + (parseInt(obj[1])-1) + "-" +parseInt(obj[2]) + "-" + $(this).attr('id').replace(/datepicker-/,''));
				$(this).parent().next('div').children('.acces-par-date').animate({opacity: 0}, 400, function(){$(this).empty();$(this).append('<h4>' + contenu.data('titre') + '</h4>' + contenu.html());}).delay(200).animate({opacity: 1}, 400);
			},
			beforeShowDay: function(thedate) { 
				var d = thedate.getDate();
				var m = thedate.getMonth();
				var y = thedate.getFullYear();
				var c = d + "/" + m + "/" + y;
				if( $.inArray(c,$(this).data("dates").split(",")) == -1 ) return [false,""];return [true, "cr"];
			}
		});

		$('.datepicker').each(function() {
			var jour=$(this).data("dates").split(",");
			// tri du tableau jour par date croissante
			jour.sort(function(a,b){ 
					var date_a=a.split("/");
					var date_b=b.split("/");
					var c = new Date((parseInt(date_a[1])+1) + "/" + date_a[0] + "/" + date_a[2]);
					var d = new Date((parseInt(date_b[1])+1) + "/" + date_b[0] + "/" + date_b[2]);
					return c-d;
				});
			premierJour=jour[0].split("/");
			lastJour=jour[jour.length-1].split("/");
			$(this).datepicker( "setDate", (parseInt(premierJour[0])<10 ? ("0" + parseInt(premierJour[0])) :parseInt(premierJour[0])) + "/" + ((parseInt(premierJour[1])+1)<10 ? ("0" + (parseInt(premierJour[1])+1)) : (parseInt(premierJour[1])+1)) + "/" +parseInt(premierJour[2]) );
			$(this).datepicker( "option", "minDate", (parseInt(premierJour[0])<10 ? ("0" + parseInt(premierJour[0])) :parseInt(premierJour[0])) + "/" + ((parseInt(premierJour[1])+1)<10 ? ("0" + (parseInt(premierJour[1])+1)) : (parseInt(premierJour[1])+1)) + "/" +parseInt(premierJour[2]));
			$(this).datepicker( "option", "maxDate", (parseInt(lastJour[0])<10 ? ("0" + parseInt(lastJour[0])) :parseInt(lastJour[0])) + "/" + ((parseInt(lastJour[1])+1)<10 ? ("0" + (parseInt(lastJour[1])+1)) : (parseInt(lastJour[1])+1)) + "/" +parseInt(lastJour[2]));
		 });
};