function getStatusCookie() {
    var buttonAutorise = document.getElementById("autorise-button-cookie-ga");
    var buttonInterdit = document.getElementById("interdit-button-cookie-ga");

    var regSepCookie = new RegExp("(; )", "g");
    var cookies = document.cookie.split(regSepCookie);
    var i, regInfo, infos;
    for(i = 0; i < cookies.length; i++){
        regInfo = new RegExp("=", "g");
        infos = cookies[i].split(regInfo);
        if(infos[1] == "true"){
            buttonAutorise.setAttribute("disabled","disabled");
            buttonAutorise.setAttribute("class","btn btn-success disabled");
            buttonAutorise.innerHTML = "Les cookies sont autorisés";
            buttonInterdit.removeAttribute("disabled");
        }else if(infos[1] == "false") {
            buttonInterdit.setAttribute("disabled","disabled");
            buttonInterdit.setAttribute("class","btn btn-danger disabled");
            buttonInterdit.innerHTML = "Les cookies sont interdits";
            buttonAutorise.removeAttribute("disabled");
        }
    }
    return null;
}

(function (){
    getStatusCookie();
})()

function setRefuseCookieGA(){
    var date = new Date();
    // 34214400000 13 mois
    date.setTime(date.getTime()+34214400000);
    document.cookie = "hasConsent=false;expires=" + date.toGMTString() + ";domain=.assemblee-nationale.fr;path=/";
    document.location.reload();
    return false;
}
function setAcceptCookieGA(){
    var date = new Date();
    // 34214400000 13 mois
    date.setTime(date.getTime()+34214400000);
    document.cookie = "hasConsent=true;expires=" + date.toGMTString() + ";domain=.assemblee-nationale.fr;path=/";
    document.location.reload();
    return false;
}