(function(exports) {
    function Cmpt(container, opt) {
        this.navTop = container.top;
        this.navBottom = container.bottom
        this.opt = opt;

        this.user = undefined;
    }
    Cmpt.prototype = {
        init: function() {
            this.initNavTop();
            this.initNavBottom();
        },
        initNavTop: function() {
            this.initUserNav();
            this.attachNavTopEvent();
        },
        attachNavTopEvent: function() {
            $(this.navTop).off('click').on('click', '.navItem', function(e) {
                var target = e.currentTarget;
                if (target.dataset.target) {
                    location.href = location.origin + target.dataset.target
                } else {
                    location.href = location.origin;
                }
            })
        },
        initNavBottom: function() {
            if (!this.navBottom) return;
            this.attachNavBottomEvent();
        },
        attachNavBottomEvent: function() {

        },
        initUserNav: function(status) {
            switch (parseInt(status)) {
                case 0:
                    this.setBeforeLoginUserNav();
                    break;
                case 1:
                    this.setAfterLoginUserNav();
                    break;
            }
        },
    }
    exports.nav = Cmpt
})(namespace('cmpt'))