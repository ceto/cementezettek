// Sets the today-line position based on the current date
// on a timeline from 2014-01-01 to 2037-12-31
(function () {
    const start = new Date('2014-01-01').getTime();
    const end   = new Date('2037-12-31').getTime();
    const today = Date.now();
    const pct   = Math.min(1, Math.max(0, (today - start) / (end - start)));
    const pctStr = (pct * 100).toFixed(4) + '%';
    const restStr = ((1 - pct) * 100).toFixed(4) + '%';

    // CSS custom property for the ::before divider line
    document.documentElement.style.setProperty('--today-left', pctStr);

    const todayDate = new Date(today);
    const lang = document.documentElement.getAttribute('lang') || 'hu';
    const dateLabel = todayDate.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // SVG barmask: past rect (gray) covers [0 → today], future rect (white) covers [today → 100%]
    function updateDOM() {
        const mask = document.getElementById('barmask');
        if (mask) {
            mask.querySelectorAll('rect').forEach(function (rect) {
                if (rect.getAttribute('fill') === 'white') {
                    rect.setAttribute('x', pctStr);
                    rect.setAttribute('width', restStr);
                } else {
                    rect.setAttribute('width', pctStr);
                }
            });
        }

        document.querySelectorAll('.today-line-label').forEach(function (el) {
            el.appendChild(document.createTextNode('\u00a0' + dateLabel));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDOM);
    } else {
        updateDOM();
    }
})();
