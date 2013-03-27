var main = (function() {
    var main = {
        panels: null,
        init: function() {
            this.panels = new wink.plugins.AsyncPanels ({
                duration: 500,
                pages: [
                    'page1',
                    {id: 'locations', url: 'locations.html'},
                    {id: 'search', url: 'search.html'},
                    'events',
                    'news',
                    {id: 'help', url: 'help.html'}
                ]
            });
            document.body.appendChild(this.panels.getDomNode());

            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});
            scrollTo(0, 0, 0);

        },
        toggleBackButtonDisplay: function(params, status) {
            switch ( params.id ) {
                case 'page1':
                    if ( status == 'start' ) {
                        wink.byId('back').style.display = 'none';
                    }
                    if ( status == 'end' ) {
                        wink.byId('news').removeChild(newsAccordion.getDomNode());
                        wink.byId('events').removeChild(eventsAccordion.getDomNode());
                    }
                    break;

                case 'news':
                    if ( status == 'end' ) {
                        wink.byId('back').style.display = 'block';
                        newsAccordionInit();
                    }
                    break;

                case 'events':
                    if ( status == 'end' ) {
                        wink.byId('back').style.display = 'block';
                        eventsAccordionInit();
                    }
                    break;

                default:
                    if ( status == 'end' ) {
                        wink.byId('back').style.display = 'block';
                    }
                    break;
            };
        }
    }

    window.addEventListener('load', wink.bind(main.init, main), false);

    return main;
}());

