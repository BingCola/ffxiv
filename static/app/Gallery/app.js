;
(function(exports) {
    function App() {
        this.init()
    }
    App.prototype = {
        init: function() {
            this.setGlobalVariable();
            this.initPlugin();
            this.attachEvent();
            this.toFirstPage();
        },
        setGlobalVariable: function() {
            window.CPlugin = {};
            window.Setting = {
                host: '',
                path: {
                    image: '/image',
                    page: '/app/Gallery/page',
                }
            };
            window.Device = {
                platform: 'PC',
                isMobile: false
            };
            window.User = {};
        },
        initPlugin: function() {
            CPlugin.router = window.Router = new(namespace('cmpt.router'))({ root: 'gallery.home' })
            CPlugin.webAPI = window.WebAPI = new(namespace('cmpt.webAPI'))(Setting.host, Device.platform);
            CPlugin.screen = new(namespace('cmpt.screen'))()
            this.initNavPlugin();
            this.initAccountPlugin();
        },
        initNavPlugin: function() {
            var dictContainer = {
                top: CPlugin.screen.headerCtn,
                bottom: CPlugin.screen.footerCtn
            }
            CPlugin.nav = new(namespace('cmpt.nav'))(dictContainer);
            CPlugin.nav.init();
        },
        initAccountPlugin: function() {
            CPlugin.account = new(namespace('cmpt.account'))();
            CPlugin.account.init();
        },
        attachEvent: function() {

        },
        toFirstPage: function() {
            Router.toFirstPage();
        },
        exit: function() {

        },
    }

    exports.gallery = App
}(window))

AppStart = function() {
    window.AppDriver = new(window.gallery)();
}

$(document).ready(AppStart)