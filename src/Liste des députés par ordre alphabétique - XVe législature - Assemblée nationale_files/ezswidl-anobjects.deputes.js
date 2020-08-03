$(document).ready(function() {
	
	
	 $(".deputes-image img").on("error", function(){
        $(this).attr('src', '/extension/ezswidl-anobjects/design/ezflow/images/defaut-depute.png');
    });
	
	// Accès rapide à la fiche d'un député
	$('#rec_depute').prop("selectedIndex", -1);
	
	$('#rec_depute').change(function()
			{
				var _url = $(this).find("option:selected").val();
				window.location = _url;
			});
		
	$('.menu-non-ajax ul.menu-secondaire li a').click(function(){
		$('.menu-non-ajax ul.menu-secondaire li a').removeClass("actif");
		$(this).addClass('actif');
        var id_div = $(this).attr('href');
        
        id_div = id_div.substring(1,(id_div.length));
        
		$('.contenu-non-ajax > div > article > div:visible').animate({opacity: 0}, 200, function(){
					$('.contenu-non-ajax > div > article > div').addClass('hide');
					$('#'+id_div).animate({opacity: 1}, 200).removeClass('hide').trigger('tab');
			});
        return false;
   });
   
	$('.nav-tabs').each(function(index) { 
		$(this).children('li').first().addClass('active');
	});
   
	$('.tab-content').each(function(index) {
		$(this).children('.tab-pane').first().addClass('active');
	});
	
	$('.tab-pane').each(function(index) {
		$(this).children('h4').first().removeClass('bordure-top');
	});
	
	$('#deputes-fiche .nav-tabs a').first().on('first_tab', function(evt) {	
		if($(evt.target).attr('href')!='#videos') load_tab_contenu( $(evt.target),evt);
	});
	
	$('.nav-tabs a').first().trigger('first_tab');
	
	$(document).on('tab', function(evt) {  
	   $(evt.target).find('.nav-tabs:visible').each(function(index) {
		
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
						//$(this).children('li').last().innerWidth($(this).children('li').last().innerWidth()+$(this).children('li').length-2);
						
						equalHeight($(this).children('li').children('a'));
						//if($(this).children('li').length>6) $(this).children('li').children('a').css('font-size','0.9em');
					}
				});
				
		 $(evt.target).find('.afficher-reponse').each(function(index) {
				$(this).click(function(event){
					
					if($(this).hasClass('collapsed'))
						{
							$(this).find('img').attr("src","/extension/ansearch/design/an/images/details_close.png");
							$(this).children('span').text($(this).text().replace("Afficher","Fermer"));
						}
					else
						{
							$(this).find('img').attr("src","/extension/ansearch/design/an/images/details_open.png");
							$(this).children('span').text($(this).text().replace("Fermer","Afficher"));
						}
				});
		});	
		
		if (($(this).find("div.chart svg").length<1)) {
			$(evt.target).trigger('piechart');
		};
				
	});
	
	$(document).on('videos', function(evt) {  
		/* Affichage du player video */
		
		$(evt.target).find('.video-tag').each(function(index, el) {
			
			var ivideo = $(el).attr('href');
			var iChemin;
			iChemin=ivideo.substring(0,ivideo.lastIndexOf("."));
        	iChemin=iChemin.replace(/^[\/]+/, "");
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

			if(!$(el).attr('id')) $(el).attr('id',$(el).attr('title')+Math.floor((Math.random() * 100) + 1)); //vérue pour les videos embarquées dans ezoe 
			var path = '/extension/common/design/an/javascript/jwplayer-6.12/',
				img = $(el).children('img'),
				video_id = $(el).attr('id');
                v_width = $(el).parent().width();
				v_height = $(el).parent().height();
			jwplayer(video_id).setup({
				autostart: false,
				flashplayer: path + 'player.swf',
                html5player: path + 'jwplayer.html5.js',
                playlist: [{
                    image: img.attr('src'),
					sources: [{ 
						file: 'http://videos-diffusion.assemblee-nationale.fr/'+iChemin+'.m3u8'
					},{
						file: 'http://videos-diffusion.assemblee-nationale.fr/'+iChemin+suffixeToAddToMP4+'.mp4'
					}]
                }],
                primary: "html5",
                height:  v_height,
                width: v_width
			})
			if ( ( $(el).attr('data-offset') ) &&  ($(el).attr('data-offset') > 0 ) )
			   {
				   jwplayer(video_id).onBeforePlay(function(){ 
						jwplayer(video_id).seek($(el).attr('data-offset')); 
					});
			   }
		});
	});
	
	//Hemicycle
	$(document).on('hemi', function(evt) {		
		$(evt.target).prepend('<a id="agrandirHemi" class="center" href="#"><i class="fa fa-expand"></i> Agrandir l\'hémicycle</a>');
		$(evt.target).find('#hemicycle a[title="place n° ' + $('#hemicycle-container').attr('data-place') + '"] path').attr('fill','#B53333').attr('data-current','current');

		var h = Snap("#hemicycle");
		var current_place_id='#p' + $('#hemicycle-container').attr('data-place');
		if(current_place_id!='#p0')
		
			{
			var current_place=h.select(current_place_id);
			
			var initial_x=current_place.getBBox().x - 12;
			var initial_y=current_place.getBBox().y - 12;
			var fauteuil = h.image("/extension/ezswidl-anobjects/design/ezflow/images/f.png", initial_x, initial_y, 24, 24);
			var current_place_texte = h.text(initial_x + 6, initial_y + 12, $('#hemicycle-container').attr('data-place')).attr({
		'fill': '#fff','font-size':8});
			}
	
		$(evt.target).find('#hemicycle a')
			.click(function() {
				window.location = $( this ).attr('href');
			});		
		$('#agrandirHemi').click(function(e){			
			agrandir_hemi($('#agrandirHemi'),e,fauteuil,current_place,current_place_texte,initial_x,initial_y);	
		});
		
		$(document).on('modal_hemi', function(evt) {	
		$(evt.target).find('.modal-backdrop')
				.click(function(e) {
					agrandir_hemi($('#agrandirHemi'),e,fauteuil,current_place,current_place_texte,initial_x,initial_y);
				});
		});
	});
		
	// carte france	
	$(document).on('carte', function(evt) {
		
		$(evt.target).prepend('<a id="agrandirCarte" class="center" href="#"><i class="fa fa-expand"></i> Agrandir la carte</a>');
		$(evt.target).find('#carte-france a[title="Accédez à la liste des députés - ' + $('#carte-france-container').attr('data-departement') + '"] path').attr('class','depcurrent').attr('data-current','current');

		$(evt.target).find('#carte-france a path[data-current!="current"]')
			.mouseover(function() {
				$( this ).attr('fill','#0077a9');
				$( this ).attr('class','hover');
			})
			.mouseout(function() {
				$( this ).attr('fill','#d9dadc');
				$( this ).attr('class','dep');
		});
				
		$(evt.target).find('#carte-france a')
			.click(function() {
				window.location = $( this ).attr('href');
			});

		$('#agrandirCarte').click(function(e){
				agrandir_carte($('#agrandirCarte'),e);
		});
	});
	
	$(document).on('modal_carte', function(evt) {	
		$(evt.target).find('.modal-backdrop')
				.click(function(e) {
					agrandir_carte($('#agrandirCarte'),e);
				});
	});
		
	
	// Liens de la pagination des vidéos - chargement ajax
	
	$(document).on('click','.ajax-videos', function(e) {
    	e.preventDefault();
    	var _this = $(this);
		var uri_suffix = $(this).attr('data-uri-suffix');
		var target= '#' + $(this).attr('data-target');
		$(target).animate({opacity: 0}, 200, function(){
				var elmt = $(this).parent().find('.image-tabmat-ajax');
				elmt.show().animate({opacity: 1}, 200);
			});
		$(target).load('/layout/set/ajax/deputes/videos' + uri_suffix, function() {
			var elmt = $(this).parent().find('.image-tabmat-ajax');
			elmt.animate({opacity: 0}, 200, function(){
			elmt.hide();
			$(target).show().animate({opacity: 1}, 200).trigger('tab').trigger('videos');
			});
		});
        
		return false;
    });
	
	// recherche embarqué
	
	$(document).on("submit", ".embed-search", function(e){
		
        e.preventDefault();
		var form = $(e.target);
		var target= form.attr('data-target');
		var uri_suffix = form.attr('action');
		
		var searchtext=form.find('input:text').val().replace(/ /g,'%20');
		searchtext = (searchtext == '' ) ? '*' : searchtext;

		$(target).animate({opacity: 0}, 200, function(){
			var elmt = $(this).parent().find('.image-tabmat-ajax');
			elmt.show().animate({opacity: 1}, 200);
		});
				
        $(target).load('/layout/set/ajax/deputes/documents_parlementaires' + uri_suffix + '/(searchtext)/' + searchtext, function() {
			form.children('input:text').attr('placeholder',searchtext);
			var elmt = $(this).parent().find('.image-tabmat-ajax');
			elmt.animate({opacity: 0}, 200, function(){
				elmt.hide();
				$(target).show().animate({opacity: 1}, 200).trigger('tab');
			 });
		});
           
    })
	
	// Liens de la pagination des documents An - chargement ajax
	
	$(document).on('click','.ajax-documents', function(e) {
    	e.preventDefault();
		
		if ($(this).hasClass('instance') && history.pushState) {
			
			var stateObject = {};
			var title = "Wow Title";
			var newUrl = $(this).attr('data-uri-init');
			history.pushState(stateObject,title,newUrl);
			
		}
	
    	var _this = $(this);
		var target= $(this).attr('data-target');
		var uri_suffix = $(this).attr('data-uri-suffix');
		
		$(target).animate({opacity: 0}, 200, function(){
				var elmt = $(this).parent().find('.image-tabmat-ajax');
				elmt.show().animate({opacity: 1}, 200);
			});
		
        $(target).load('/layout/set/ajax/deputes/documents_parlementaires' + uri_suffix, function() {
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
    
    
    $(document).on('click','.ajax-positions-votes', function(e) {
    	e.preventDefault();
	
    	var _this = $(this);
		var target= "#" + $(this).attr('data-target');
		var uri_suffix = $(this).attr('data-uri-suffix');
		
		$(target).animate({opacity: 0}, 200, function(){
			var elmt = $(this).parent().find('.image-tabmat-ajax');
			elmt.show().animate({opacity: 1}, 200);
		});
		
        $(target).load('/layout/set/ajax/deputes/votes' + uri_suffix, function() {
			var elmt = $(this).parent().find('.image-tabmat-ajax');
			elmt.animate({opacity: 0}, 200, function(){
				elmt.hide();
				$(target).show().animate({opacity: 1}, 200).trigger('tab');
			});
			$(this).trigger('piechart');			
		});
		
		if ($(this).hasClass('bas')) {
			$('html, body').animate({
				scrollTop: $(target).offset().top - 50
			},100);
		}
		return false;
    });
    
	
	$('body').trigger('tab');
	$('#carte-france-container').trigger('carte');
	$('#hemicycle-container').trigger('hemi');

});




/* fonction qui charge les svg */

function load_contenu_svg(cible,url_fichier,trig){
	cible.load(url_fichier, function() {
		/*cible.parent().find(".image-tabmat-ajax").animate({height: "0",margin:"0"},800, function(){
		
			//$(".image-tabmat-ajax").animate({width: "0",margin:"0"},400);
			
		});*/
		
		cible.parent().find(".image-tabmat-ajax").slideUp(200,function(){cible.animate({opacity: 1},200);});
		//cible.animate({opacity: 1},200);
		cible.trigger(trig);
	});
};

function agrandir_carte(objet,e){
	e.preventDefault();
	if (objet.hasClass('reduite')) 
		{
			$('#carte-france-container').velocity({
				left:'+=510px',
				top:'+=250px',
				height: '293px',
				width:'252px'
				},
				{
				complete : function (element) {
					$("#agrandirCarte").removeClass('reduite').html('<i class="fa fa-expand"></i> Agrandir la carte');
					$('.modal-backdrop').fadeOut(500).remove();
					$(element).css('border','0 none').css('box-shadow', '1px 1px 3px #fff').css('z-index',0);
					}
			});
			$('#carte-france').velocity({
				height: '271px',
				width:'252px',
				transformPerspective: [ 800, 800 ],
				rotateY: [ 0, -180 ] 
				}
			).find('path').attr('transform','matrix(0.5,0,0,0.5,0,0)');
		}
	else
		{
			$('#carte-france-container').velocity({
				left:'-=510px',
				top:'-=250px',
				height: '629px',
				width:'514px'
				},
				{
				complete : function (element) {
					$(element).css('border','7px solid #FFFFFF').css('box-shadow', '3px 3px 3px #000').css('z-index',1041);
					$("#agrandirCarte").addClass('reduite').html('<i class="fa fa-compress"></i> Réduire la carte');
					var _modal=$('<div class="modal-backdrop" style="display:none"></div>').fadeIn(500);
					$('body').append(_modal).trigger('modal_carte');
					}
			}).css('z-index',1041);
			$('#carte-france').velocity({
				height: '+=329px',
				width:'+=248px',
				left:'0px',
				transformPerspective: [ 800, 800 ],
				rotateY: [ 0, -180 ] 
				},500
			).find('path').attr('transform','matrix(1,0,0,1,0,0)');
			var obj_node_id='#carte-france-container';
			$('html, body').animate({
				scrollTop: $(obj_node_id).offset().top - 350
			},800);
		}		
};

function agrandir_hemi(objet,e,f,c,c_t,ix,iy){
	e.preventDefault();
	var _this=objet;
		if (_this.hasClass('reduite')) 
		{
			$('#hemicycle-container').velocity({
				left: '+=650px',
				top: '+=0px',
				height: '-=420',
				width:'-=608'
			},
			{
			complete: function (element) {
				$(element).css('border','0 none').css('box-shadow', '1px 1px 3px #fff').css('z-index',0);
				$("#agrandirHemi").removeClass('reduite').html('<i class="fa fa-expand"></i> Agrandir l\'hémicycle');
				$('.modal-backdrop').fadeOut(500).remove();
			}
			});
			$('#hemicycle').velocity({
				height: '-=420',
				width:'-=608',
				transformPerspective: [ 800, 800 ],
				rotateY: [ 0, -180 ] 
				},
				{
					complete: function(element) {
						$(element).find('path').attr('transform','matrix(0.28,0,0,0.28,0,0)');
					}
				});
			f.animate({x: ix,y:iy}, 200);
			c_t.animate({x: ix + 6,y: iy + 12}, 200);
		}
	else
		{
			var _modal=$('<div class="modal-backdrop" style="display:none"></div>').fadeIn(500);
			$('body').append(_modal).trigger('modal_hemi');
			var obj_node_id='#hemicycle-container';
			$('html, body').animate({
				scrollTop: $(obj_node_id).offset().top - 50
			},200);
			$('#hemicycle-container').velocity({
				left: '-=650px',
				top: '-=0px',
				height: '+=420',
				width:'+=608'
				},
				{
				complete : function (element) {
					$(element).css('border','7px solid #FFFFFF').css('box-shadow', '3px 3px 3px #000').css('z-index',1041);
					$("#agrandirHemi").addClass('reduite').html('<i class="fa fa-compress"></i> Réduire l\'hémicycle');
					
					}
				}
			);
			$('#hemicycle').velocity({
				height: '+=420',
				width:'+=608',
				transformPerspective: [ 800, 800 ],
				rotateY: [ 0, -180 ] 
				},200
			).find('path').attr('transform','matrix(1,0,0,1,0,0)');
			f.animate({x: c.getBBox().x,y: c.getBBox().y}, 200);
			c_t.animate({x: c.getBBox().x + 6,y: c.getBBox().y + 12}, 200);
			
		}	
};