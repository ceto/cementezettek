const handlebars = require('handlebars');
module.exports = function(color='', datestart='2014.01.01.', dateend='2037.12.31.', custominfo='', lang='hu') {

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }

    var hex='';
    var hundredpercent = (Date.parse('2037.12.31.') - Date.parse('2014.01.01.'))/1000;
    
    var svgtitle='Megbízatásának ideje: ' + datestart + ' - ' + dateend;
    if (lang !== 'hu' ) {
        let o = new Intl.DateTimeFormat("en" , {
            dateStyle: "short"
        });
        var sd = new Date(Date.parse(datestart));
        var ed = new Date(Date.parse(dateend));
        svgtitle='Appointment term: ' + o.format(sd) + ' - ' + o.format(ed);
    }
    if (custominfo!=='') {
        svgtitle = custominfo;
    }

    switch (color) {
        case 'cl1':
            hex = shadeColor('#CEDED6',0);
        break;
        case 'cl2':
            hex = shadeColor('#CBE3F6',0);
        break;
        case 'cl3':
            hex = shadeColor('#F4BDB9',0);
        break;
        case 'cl4':
            hex = shadeColor('#FCDC73',0);
        break;
        default:
          hex = shadeColor('#666666',0);
    }



    var svg = '<svg class="svgbar color" viewBox="0 0 600 15" fill="' + hex +'" width="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'+
        '<title>'+ svgtitle + '</title>' +        
        '<g mask="url(#barstripes)">' + 
            '<rect class="base" fill="#efefef" x="0" y="0" width="100%" height="100%" />' +
            '<rect fill="url(#' + color + '-grad)" class="progress" x="'+ (100-((Date.parse('2037.12.31.') - Date.parse(datestart))/1000 / hundredpercent * 100)) +'%" y="0" width="'+ ((Date.parse(dateend) - Date.parse(datestart))/1000 / hundredpercent * 100) +'%" height="100%" mask="url(#barmask)" />' +
        '</g>' +   
    '</svg>';
    return new handlebars.SafeString(svg);
}

