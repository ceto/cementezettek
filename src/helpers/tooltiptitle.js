const handlebars = require('handlebars');
module.exports = function(color, nev, pozicio, datestart, dateend, custominfo, lang) {
    var dateLabel;
    var dateLavelSD;
    var dateLavelED;
    var sdLabel = lang === 'hu' ? 'Megbízás kezdete' : 'Appointed';
    var edLabel = lang === 'hu' ? 'Megbízás vége' : 'Term ends';
    var locale = lang !== 'hu' ? 'en' : 'hu';
    var fmt = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' });
    var sd = new Date(Date.parse(datestart));
    var ed = new Date(Date.parse(dateend));
    dateLavelSD = fmt.format(sd);
    dateLavelED = fmt.format(ed);
    dateLabel = dateLavelSD + ' – ' + dateLavelED;

    var html = '<div class="ttcard ' + color + '">';
    if (nev) html += '<span class="ttcard__name">' + nev + '</span>';
    if (pozicio) html += '<span class="ttcard__role">' + pozicio + '</span>';
    html += '<div class="ttcard__dates">';
    html += '<span class="ttcard__dates__sd"><span class="ttcard__label">' + sdLabel + '</span>' + dateLavelSD + '</span>';
    html += '<span class="ttcard__dates__ed"><span class="ttcard__label">' + edLabel + '</span>' + dateLavelED + '</span>';
    html += '</div>';
    if (custominfo) html += '<span class="ttcard__info">' + custominfo + '</span>';
    html += '</div>';

    return new handlebars.SafeString(html);
};
