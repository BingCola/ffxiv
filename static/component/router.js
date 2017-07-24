/**
 * Created by BingCola on 2017/1/24.
 */
var Router = (function() {
    var _this = this;

    function Router() {
        this.path = [];
        this.current = undefined;
        this.attachEvent();
    }
    Router.prototype = {
        attachEvent: function() {
            var _this = this;
            window.onhashchange = function() {
                var pageOpt = location.hash.split('#page=')[1];
                var page = '';
                if (pageOpt) {
                    page = pageOpt.split('&')[0]
                }
                if (!page || !window[page]) {
                    page = 'PageHomepage'
                }
                _this.to(window[page])
            }
        },
        to: function() {
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
    return Router
})();