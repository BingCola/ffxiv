;
(function(exports) {
    class App {
        constructor() {
            this.init()
        }
        init() {
            this.setGlobalVariable();
            this.initPlugin();
            this.attachEvent();
            this.toFirstPage();
        }
        setGlobalVariable() {
            moment.locale('zh-cn');
            window.CPlugin = {};
            window.AppConfig = {
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
        }
        initPlugin() {
            CPlugin.screen = new(namespace('cmpt.screen'))();
            CPlugin.spinner = new(namespace('cmpt.spinner'))();
            this.initRouterPlugin();
            this.initApiPlugin();
            this.initNavPlugin();
            this.initAccountPlugin();
        }
        initApiPlugin() {
            CPlugin.http = new(namespace('cmpt.http'))(AppConfig.host, Device.platform);
            CPlugin.api = window.API = new(namespace('gallery.api'))(CPlugin.http);
        }
        initRouterPlugin() {
            CPlugin.router = window.Router = new(namespace('cmpt.router'))({ root: 'gallery.home' })
        }
        initNavPlugin() {
            var dictContainer = {
                top: CPlugin.screen.headerCtn,
                bottom: CPlugin.screen.footerCtn
            }
            CPlugin.nav = new(namespace('cmpt.nav'))(dictContainer);
            CPlugin.nav.init();
        }
        initAccountPlugin() {
            CPlugin.authorize = new(namespace('cmpt.authorize'))();
            CPlugin.authorize.init();
        }
        attachEvent() {

        }
        toFirstPage() {
            Router.toFirstPage();
        }
        exit() {

        }
    }

    exports.gallery = App
}(window))