var Plugin = {};
var AppConfig = {};
$(document).ready(function() {
    new App();
})
var App = function() {
    function App() {
        this.init()
    }
    App.prototype = {
        init: function() {
            this.initPlugin();
            this.attachEvent();
            this.initPage();
        },
        initPlugin: function() {
            Plugin.router = new Router()
            window.Router = Plugin.router;

            Plugin.webAPI = window.webAPI;
            Plugin.nav = new Nav();
            Plugin.account = new Account();
        },
        attachEvent: function() {

        },
        initPage: function() {
            var page = location.hash.split('?')[0];
            if (!page || !window[page]) {
                page = 'PageGallery'
            }
            Router.empty().to(window[page])
        },
        exit: function() {

        },
    }

    return App
}()