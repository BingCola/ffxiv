var Nav = function() {
    function Nav(page, container, opt) {
        this.page = page;
        this.container = container;
        this.opt = opt;

        this.user = undefined;
    }
    Nav.prototype = {
        init: function() {
            this.initNavTop();
            this.initNavBottom();
        },
        initNavTop: function() {
            this.initUserNav();
            this.attachNavTopEvent();
        },
        initNavBottom: function() {
            this.attachNavBottomEvent();
        },
        initUserNav: function() {

        },
    }
    return Nav
}()