var lock_click_captcha=false;
	function activeRefreshCaptcha(){
		$(document).on('click','#refresh-captcha',function() {
			var thisForm=$(this).closest('form');
			if(lock_click_captcha==false){
				lock_click_captcha=true;
			$.ez( 'ezjscusercompte::refreshcaptcha::'+thisForm.attr("name"),{}, function( data )
			    { 
			       if ( data.error_text ){
			    	   alert(data.error_text);
			       }else{
			    	   $("#block_captcha").attr('id','block_captcha_temp');
			    	   $("#block_captcha_temp").after(data.content);
			    	   $("#block_captcha_temp").empty().remove();  
			    	   activeRefreshCaptcha();
			       }
			       lock_click_captcha=false;
			    });
			}else{
				alert("Géneration du captcha en cours")
			}
		});
	}

	var regrouper_dialog="#dialog-regrouper";
	function initDialogsMsg(){
		$( regrouper_dialog ).dialog({
			title:'Message',
			height:150,
			width:400,
			autoOpen: false,
			resizable: false,
			modal:true, 
			hide:{
				effect:"fade",
				duration:1000
			},
			open: function(event, ui) {
	   		    setTimeout(function(){
	   		        $(regrouper_dialog).dialog('close');                
	   		    }, 3000);
	   		}
		}); 
	}
$(document).ready(function() {
	
	initDialogsMsg();
	 activeRefreshCaptcha();
	 
});