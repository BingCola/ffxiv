;
(function(exports) {
    class App{
        constructor(){
            this.init()
        }
        init() {
            this.setGlobalVariable();
            this.initPlugin();
            this.attachEvent();
            this.toFirstPage();
        }
        setGlobalVariable() {
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
        }
        initPlugin() {
            this.initRouterPlugin();
            this.initApiPlugin();
            CPlugin.screen = new(namespace('cmpt.screen'))()
            this.initNavPlugin();
            this.initAccountPlugin();
        }
        initApiPlugin(){
            CPlugin.http = new(namespace('cmpt.http'))(Setting.host, Device.platform);
            CPlugin.api = window.API = new(namespace('gallery.api'))(CPlugin.http);
        }
        initRouterPlugin(){
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
            CPlugin.account = new(namespace('cmpt.account'))();
            CPlugin.account.init();
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