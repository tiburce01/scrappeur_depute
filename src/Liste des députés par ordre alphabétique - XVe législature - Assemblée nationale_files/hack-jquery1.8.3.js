//ON AJOUTE CETTE METHODE CAR SINON PROBLEME AVEC JQUERY UI 1.8.21
jQuery.curCSS = function(element, prop, val) {
    return jQuery(element).css(prop, val);
};