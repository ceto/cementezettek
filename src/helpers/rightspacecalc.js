const handlebars = require('handlebars');
module.exports = function(dateend = '2037.12.31.') {
    var hundredpercent = (Date.parse('2037.12.31.') - Date.parse('2014.01.01.'))/1000;

    return new handlebars.SafeString(((Date.parse('2037.12.31.') - Date.parse(dateend))/1000 / hundredpercent * 100));
}