$(document).ready(function() {
    new App();
})
var App = function() {
    function App() {
        this.init()
    }
    App.prototype = {
        init: function() {
            this.initGlobalVariable();
            this.initPlugin();
            this.attachEvent();
            this.initPage();
        },
        initGlobalVariable: function() {
            window.Plugin = {};
            window.AppConfig = {
                'staticSrc': '/static'
            };
            window.MainContainer = document.getElementById('mainContainer');
        },
        initPlugin: function() {
            Plugin.router = new Router()
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
            Plugin.nav = new CmptNav(Router.current, dictContainer);
            Plugin.nav.init();
        },
        initAccountPlugin: function() {
            Plugin.account = new CmptAccount(Router.current);
            Plugin.account.init();
        },
        attachEvent: function() {

        },
        initPage: function() {
            var pageOpt = location.hash.split('#page=')[1];
            var page = '';
            if (pageOpt) {
                page = pageOpt.split('&')[0]
            }
            if (!page || !window[page]) {
                page = 'PageHomepage'
            }
            Router.empty().to(window[page])
        },
        exit: function() {

        },
    }

    return App
}()