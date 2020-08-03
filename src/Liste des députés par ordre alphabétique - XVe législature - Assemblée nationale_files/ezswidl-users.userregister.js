$(document).ready(function() {
			
			$('input[id$="_user_account_email"]').keyup(function() {
				
				var str_email = $(this).val();
				$('input[id$="_user_account_login"]').val(str_email);
			});
			
			$('input[id$="_user_account_email"]').blur(function() {
				var str_email = $(this).val();
				$('input[id$="_user_account_login"]').val(str_email);
			});
			
			$('input[id$="_user_account_email"]').change(function() {
				var str_email = $(this).val();
				$('input[id$="_user_account_login"]').val(str_email);
			});

});
