function gaSSDSLoad (acct) {
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."),
        pageTracker,
        s;
    s = document.createElement('script');
    s.src = gaJsHost + 'google-analytics.com/ga.js';
    s.type = 'text/javascript';
    s.onloadDone = false;

    function init () {
        pageTracker = _gat._getTracker(acct);
        pageTracker._trackPageview();
    }
    s.onload = function () {
        s.onloadDone = true;
        init();
    };
    s.onreadystatechange = function() {
        if (('loaded' === s.readyState || 'complete' === s.readyState) && !s.onloadDone) {
            s.onloadDone = true;
            init();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}

function toggleClass() {
    var el = document.getElementById('footer');
    if (el.className == '') {
        el.className = 'open';
        window.scrollTo(0,8000);
        return;
    }

    el.className = '';
}

window.onload = function () { console.log('about to call'); gaSSDSLoad("UA-42201274-1"); };