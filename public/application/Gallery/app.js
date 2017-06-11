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
        },
        attachEvent: function() {

        },
        initPage: function() {

        },
        destory: function() {

        },
    }

    return App
}()