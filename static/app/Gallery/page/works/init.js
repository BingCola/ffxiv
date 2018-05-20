;
(function(base) {
    class App extends base {
        constructor() {
            super(...arguments)
        }
        initRouterPlugin() {
            CPlugin.router = window.Router = new(namespace('cmpt.router'))({ root: 'gallery.works' })
        }
    }

    $(document).ready(function() {
        window.App = new(App)()
    })

}(window.gallery))