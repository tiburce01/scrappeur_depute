//$(document).ready(function(){

var captchaComment;
var registerRecaptcha;
var onloadCallback = function() {
    captchaComment = grecaptcha.render('recaptcha', {
        'sitekey' : '6LeaBgcTAAAAANWiTDf-STiko0ZU3BCBRl_Ujte6',
        'theme' : 'light'
    });

    registerRecaptcha = grecaptcha.render('registerReCaptcha', {
        'sitekey' : '6LeaBgcTAAAAANWiTDf-STiko0ZU3BCBRl_Ujte6',
        'theme' : 'light'
    });


};

//});