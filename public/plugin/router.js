/**
 * Created by BingCola on 2017/1/24.
 */
var CurPage;
var Router = (function() {
    function Router() {
        this.path = [];
    }
    Router.prototype = {
        to: function() {
            var page = arguments[0];
            if (!page) return;
            var param = [];
            for (var i = 1; i < arguments.length; i++) {
                param.push(arguments[i])
            }
            this.path.push([].concat(arguments));
            if (typeof page == 'string') {
                CurPage = {};
                WebAPI.get(page).done(function(html) {
                    CurPage && CurPage.close && CurPage.close();
                    MainContainer.innerHTML = html;
                })
            } else {
                var pageObj = Object.create(page.prototype);
                CurPage && CurPage.close && CurPage.close();
                CurPage = (page.apply(pageObj, param) || pageObj);
                CurPage.show();
            }
            return this;
        },
        back: function() {
            this.path.pop();
            this.to(this.path[this.path.length])
            return this;
        },
        empty: function() {
            this.path = [];
            return this;
        }
    };
    return Router
})();