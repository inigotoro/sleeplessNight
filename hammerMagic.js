(function () {
    'use strict';
    var touchDevice = (window.matchMedia) ?
        window.matchMedia('only screen and (max-width: 768px)') :
        $(window).width() < 768;
    var eventSwipers = {
        LEFT: 'swipeleft',
        RIGHT: 'swiperight'
    };

    var Swiping = {
        init: function () {
            this.loadLibrary();
        },
        loadLibrary: function () {
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js', this.enableSwipes.bind(this));
        },
        enableSwipes: function () {
            var swipeListener = new Hammer(document.querySelector('.mdl-layout__content'));
            swipeListener.on(eventSwipers.LEFT + ' ' + eventSwipers.RIGHT, this.gestureDetector.bind(this));
        },
        gestureDetector: function (ev) {
            var $tabs = $('.mdl-layout__tab');
            var $currentTab = $('.mdl-layout__tab.is-active');
            var isFirstTab = $currentTab.index() === 0;
            var isLastTab = $currentTab.index() === $tabs.length - 1;
            var $newActiveTab;

            switch (ev.type) {
                case eventSwipers.LEFT:
                    if (isLastTab) {
                        $newActiveTab = $tabs.first();
                        $newActiveTab.click();
                        this.adjustMenuPosition($newActiveTab, 'left');
                    } else {
                        $newActiveTab = $currentTab.next();
                        $newActiveTab.click();
                        this.adjustMenuPosition($newActiveTab, 'right');  
                    }
                    
                    break;
                case eventSwipers.RIGHT:
                    if (isFirstTab) {
                        $newActiveTab = $tabs.last();
                        $newActiveTab.click();
                        this.adjustMenuPosition($newActiveTab, 'right');                       
                    } else {
                        $newActiveTab = $currentTab.prev();
                        $newActiveTab.click();
                        this.adjustMenuPosition($newActiveTab, 'left');
                    }
                    
                    break;
            }
        },
        adjustMenuPosition: function($tab, direction) {
            while (!this.tabInViewport($tab)) {
                $('.mdl-layout__tab-bar-' + direction + '-button').click();
            }         
        },
        tabInViewport: function ($tab) {
            var rect = $tab[0].getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= $(window).height() && 
                rect.right <= $(window).width()
            );
        }        
    };
    Swiping.init();
}());