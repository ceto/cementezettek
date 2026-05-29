import $ from 'jquery';
import whatInput from 'what-input';
import AOS from 'aos';

import CC from "CookieConsent";
// const CC = require( "CookieConsent" );




// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
// window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';
import './lib/todayline';

// import 'waypoints/lib/noframework.waypoints.js';


window.cookieconsent.initialise({
    // container: document.getElementById("cookieConsentModal"),
    position: "bottom-right",
    palette:{
        // popup: {background: "#efefef"},
        // button: {background: "#aa0000"},
    },
    revokable:false,
    onStatusChange: function(status) {
     console.log(this.hasConsented() ?
      'enable cookies' : 'disable cookies');
    },
    law: {
     regionalLaw: false,
    },
    location: false,
    content: {
        header: 'Cookies used on the website!',
        message: 'Tájékoztatjuk, hogy a honlapunkon sütiket alkalmazunk. A honlapunk használatával ön a tájékoztatásunkat tudomásul veszi.',
        dismiss: 'Megértettem',
        allow: 'Allow cookies',
        deny: 'Decline',
        link: 'Bővebben',
        href: 'https://helsinki.hu/adatkezelesi-tajekoztato/',
        close: '&#x274c;',
        policy: 'Cookie Policy',
        target: '_blank',
    }
   });



$(document).foundation();

AOS.init({

});


$('.startgomb').on("click", function(e) {
    $(this).addClass('dontshow');
});


var leadbasebottom = 0; 

function poscheck(){
    leadbasebottom = window.innerHeight - ( $('.thelead').offset().top + $('.thelead').height() ); 
}
$(document).ready(function () {
    poscheck();
});
$(window).resize(function () {
    poscheck();
});

$(document).on('scroll', function () {    

    $('.startgomb').addClass('dontshow');
    
    if ( $(window).scrollTop() === 0 ) {
        $('.banner').css('transform', 'translate3d(0, 0, 0)');
        poscheck();
        $('.startgomb').removeClass('dontshow');
        
    } else if ( ( ($(window).scrollTop() - leadbasebottom ) > 0) && ( ($(window).scrollTop() - leadbasebottom ) <= window.innerHeight) && ( (window.innerHeight + $(window).scrollTop())>0  )) {
        var ytolas = 0 - ($(window).scrollTop() - leadbasebottom );
        $('.banner').css('transform', 'translate3d(0,' + ytolas +'px, 0)');
       
    } else if ( $(window).scrollTop() < leadbasebottom ) {
        // console.log('scrolltop: ' + $(window).scrollTop() + ' leadbasebottom: ' + leadbasebottom);
    }  
});



