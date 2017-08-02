/**
 * Created by BingCola on 2017/1/24.
 */
(function(exports) {

    function Router() {
        this.path = [];
        this.current = undefined;
        this.attachEvent();
    }
    Router.prototype = {
        init: function() {
            var pageOpt = location.hash.split('#page=')[1];
            var app = location.pathname.split('/')[1];
            if (!app) {
                app = 'gallery'
            }
            var page = '';
            if (pageOpt) {
                page = pageOpt.split('&')[0]
            }
            if (!page) {
                page = 'homepage'
            }
            var obj = namespace(app + '.' + page)
            if (typeof obj != 'function') return;
            this.to(obj)
        },
        attachEvent: function() {
            var _this = this;
            window.onhashchange = function() {
                _this.init();
            }
        },
        to: function() {
            var _this = this;
            var page = arguments[0];
            if (!page) return;
            var param = [];
            for (var i = 1; i < arguments.length; i++) {
                param.push(arguments[i])
            }
            this.path.push([].concat(arguments));
            if (typeof page == 'string') {
                WebAPI.get(page).done(function(html) {
                    _this.current = {};
                    MainContainer.innerHTML = html;
                })
            } else {
                var pageObj = Object.create(page.prototype);
                _this.current && _this.current.close && _this.current.close();
                _this.current = (page.apply(pageObj, param) || pageObj);
                _this.current.show();
            }
            return this;
        },
        open: function(url, blank) {
            window.open(url, blank ? "_blank" : "")
        },
        back: function() {
            this.path.pop();
            this.to(this.path[this.path.length - 1])
            return this;
        },
        empty: function() {
            this.path = [];
            this.current = undefined;
            return this;
        },
        destory: function() {

        }
    };
    exports.router = Router
})(namespace('component'));