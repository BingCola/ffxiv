var CmptNav = function() {
    function CmptNav(page, container, opt) {
        this.page = page;
        this.navTop = container.top;
        this.navBottom = container.bottom
        this.opt = opt;

        this.user = undefined;
    }
    CmptNav.prototype = {
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
                    location.hash = 'page=' + target.dataset.target;
                } else {
                    location.hash = '';
                }
            })
        },
        initNavBottom: function() {
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
    return CmptNav
}()