/**
 * Scripts utilisés par la recherche FO
 */

$(document).ready(function() {
	// Questions 
	$('#recherche-questions').find('#legislature').on('change', function(e) {
		e.preventDefault();

		var legislature = $(this).val();
        var destination = '';
        if ($('#usage').length) {
            destination='/' + $('#usage').val();
        }
        
		if(legislature !== undefined && legislature != '') {
			location.href = '/recherche/questions/'+  legislature + destination;
		}
		
		return false;
	});
	
    $('#resultats-questions').find('.detail_question').click(function(e) {
		e.preventDefault();
        var idqst=$(this).attr("data-idqst");

        if ($('#resultats-questions #detail_'+idqst).css('display') != 'none') {
            
            $('#resultats-questions #open_'+idqst).removeClass("hide");
            $('#resultats-questions #close_'+idqst).addClass("hide");
            
            $('#resultats-questions #detail_'+idqst).addClass("hide");
        }
        else 
        {
            $('#resultats-questions #close_'+idqst).removeClass("hide");
            $('#resultats-questions #open_'+idqst).addClass("hide");
            
            $('#resultats-questions #detail_'+idqst).removeClass("hide");
		}
		return false;
	});
    
	
	
	
	$('#form_recherche').submit(function(event) {
		event.preventDefault();
		
		var recherche = encodeURI($("#field_recherche").val());
		var tri = encodeURI($("#field_tri").val());
		var auteur = encodeURI($("#field_auteur").val());
		var legislature = encodeURI($("#field_legislature").val());
		var nb_res = encodeURI($("#field_nb_res").val());
		
		// recherche actualite
		$.ez( 'ezjscsearchfront::searchArticles::'+recherche+'::'+tri+'::'+auteur+'::'+legislature+'::'+0+'::::'+true+'::'+nb_res,{}, function( data ){ 
		       if ( data.error_text ){
		    	   alert(data.error_text);
		       } else {
		    	   $("#tabs_liste_resultats_articles_actualite").html(data.content.tab);
		    	   
		    	   // reaffichage des actualites
		    	   $("#actualites_hide").removeClass("hide");
			   	   $("#tabs_liste_resultats_articles_actualite").removeClass("hide");
			   	   $("#actualites_show").addClass("hide");
		       }
		});
		
		// recherche du tri
		$.ez( 'ezjscsearchfront::searchArticles::'+recherche+'::'+tri+'::'+auteur+'::'+legislature+'::'+0+'::::'+false+'::'+nb_res,{}, function( data ){ 
		       if ( data.error_text ){
		    	   alert(data.error_text);
		       } else {
		    	   $("#tabs_liste_resultats_articles").html(data.content.tab);
		    	   var result_facettes_zone_article =  $("#zoneFacettesArticles").detach();
		    	   $("#resultFacettesArticles").html(result_facettes_zone_article);
		    	   
		    	   $("#afficher_tous_auteurs").click(function() {
		    			$("#afficher_tous_auteurs").addClass("hide");
		    			$(".author_more").removeClass("hide");
		    		});
		    	   
		    	   $("#afficher_toutes_rubriques").click(function() {
		    			$("#afficher_toutes_rubriques").addClass("hide");
		    			$(".rubrique_more").removeClass("hide");
		    		});
		       }
		});
		//faire appaitre le lien s'abonner

 	    $("#addSubscription").removeClass("hide");
		return false;
	});
	
	
	$('#field_auteur').autocomplete({
		minLength: 3,
        source: function( request, response ) {
        	var str_term = request.term.toLowerCase();
        	
        	$.ez( 'ezjscsearchfront::autocompleteAuteurs::'+str_term,{}, function( data )
        		    { 
        		       if ( data.error_text ){
        		    	   alert(data.error_text);
        		       }else{
        		    	   response( $.map( data.content, function( item ) {
        		    		   return {label: item}
                           }));

        		       }
        		    });
        }
    });
	
	$(".chzn-select").chosen({no_results_text: "Aucun résultat"});
	
	//$("#tabs_liste_resultats").tabs();
	
	
	
	
	$("#search_criteres_sup_show").click(function() {
		$("#search_criteres_sup_hide").removeClass("hide");
		$("#div_form_recherche_criteres_sup").removeClass("hide");
		$("#search_criteres_sup_show").addClass("hide");
	});
	$("#search_criteres_sup_hide").click(function() {
		$("#search_criteres_sup_show").removeClass("hide");
		$("#div_form_recherche_criteres_sup").addClass("hide");
		$("#search_criteres_sup_hide").addClass("hide");
	});
	
	
	$("#actualites_show").click(function() {
		$("#actualites_hide").removeClass("hide");
		$("#tabs_liste_resultats_articles_actualite").removeClass("hide");
		$("#actualites_show").addClass("hide");
	});
	$("#actualites_hide").click(function() {
		$("#actualites_show").removeClass("hide");
		$("#tabs_liste_resultats_articles_actualite").addClass("hide");
		$("#actualites_hide").addClass("hide");
	});
    
});

/**
 * Recupere la liste des facettes selectionnees puis relance la recherche en utilisant les parametres fournit 
 * @param termes
 * @param intervalleDates
 * @param startPage
 */
function chercheArticles(termes, startPage) {
	setTimeout(function(){
		var listFacettes = $('#divFacettesArticles :input:checkbox:checked');
		var tri = encodeURI($("#field_tri").val());
		var auteur = encodeURI($("#field_auteur").val());
		var legislature = encodeURI($("#field_legislature").val());
		var queryFacette = null;
		var nb_res = encodeURI($("#field_nb_res").val());
		if (listFacettes!=null) {
			queryFacettes = "";
			for (var i=0; i < listFacettes.length; i++) {
				queryFacettes = queryFacettes + "+" + listFacettes[i].id;
			}
		}
		queryFacettes = encodeURI(queryFacettes);
		
		
		// recherche actualite
		/*$.ez( 'ezjscsearchfront::searchArticles::'+termes+'::'+tri+'::'+auteur+'::'+legislature+'::'+startPage+'::'+queryFacettes+'::'+true+'::'+nb_res,{}, function( data ){ 
		       if ( data.error_text ){
		    	   alert(data.error_text);
		       } else {
		    	   $("#tabs_liste_resultats_articles_actualite").html(data.content.tab);
		       }
		});*/
		
		$.ez( 'ezjscsearchfront::searchArticles::'+termes+'::'+tri+'::'+auteur+'::'+legislature+'::'+startPage+'::'+queryFacettes+'::'+false+'::'+nb_res,{}, function( data ){ 
		       if ( data.error_text ){
		    	   alert(data.error_text);
		       } else {
		    	   $("#tabs_liste_resultats_articles").html(data.content.tab);
		    	   var result_facettes_zone_article =  $("#zoneFacettesArticles").detach();
		    	   $("#resultFacettesArticles").html(result_facettes_zone_article);
		       }
		});
		if (startPage!=0) {
			//$("#tabs_liste_resultats_articles_actualite").css({'display':'none'});
		}
	},200) // utilise dans le cas où le test sur le check de la checkbox serait trop lent
};