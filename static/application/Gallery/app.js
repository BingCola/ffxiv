;
(function(exports) {
    function App() {
        this.init()
    }
    App.prototype = {
        init: function() {
            this.initGlobalVariable();
            this.initPlugin();
            this.attachEvent();
            Router.init();
        },
        initGlobalVariable: function() {
            window.Plugin = {};
            window.AppConfig = {
                'staticSrc': ''
            };
            window.MainContainer = document.getElementById('mainContainer');
        },
        initPlugin: function() {
            Plugin.router = new(namespace('component.router'))()
            window.Router = Plugin.router;

            Plugin.webAPI = window.webAPI;

            this.initNavPlugin();
            this.initAccountPlugin();
        },
        initNavPlugin: function() {
            var dictContainer = {
                top: document.getElementById('navTop'),
                bottom: document.getElementById('navBottom')
            }
            Plugin.nav = new(namespace('component.nav'))(Router.current, dictContainer);
            Plugin.nav.init();
        },
        initAccountPlugin: function() {
            Plugin.account = new(namespace('component.account'))(Router.current);
            Plugin.account.init();
        },
        attachEvent: function() {

        },
        exit: function() {

        },
    }

    exports.gallery = App
}(window))


$(document).ready(function() {
    new(namespace('gallery'))();
})