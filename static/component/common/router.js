(function(exports) {
    function Cmpt(opt) {
        this.option = opt || {};
        this.current = {};
        this.path = [];

        this.init();
    }
    Cmpt.prototype = {
        init: function() {
            this.initOption();
            this.attachEvent();
        },
        initOption: function() {
            var defaultOption = {
                root: '',
                pageFlag: 'page',
                enableHash: true
            }
            this.option = $.extend({}, defaultOption, this.option)
        },
        attachEvent: function() {
            var _this = this;
            window.onhashchange = function() {
                _this.toggle();
            }
        },
        show: function() {
            if (this.option.enableHash && arguments[0] != this.option.root) {
                this.change(...arguments)
            } else {
                this.to(...arguments)
            }
        },
        change: function() {
            var params = this.generateUrlParamsMap(...arguments);
            var url = '';
            var arrUrl = [];
            if (Object.keys(params).length == 0 || !params[this.option.pageFlag]) {
                return false;
            }
            if (params[this.option.pageFlag] == this.option.root) delete params[this.option.pageFlag];
            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    arrUrl.push(param + '=' + this.serializeParams(params[param]));
                }
            }
            url = arrUrl.join('&');
            location.hash = url;
        },
        toggle: function() {
            var params = this.getUrlParamsMap(...arguments);
            var args = [];
            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    args.push(params[param]);
                }
            }
            if (Object.keys(params).length == 0 || !params[this.option.pageFlag]) {
                args.unshift(this.option.root);
            }
            this.to(...args)
        },
        to: function() {
            var pageConstructor = namespace(arguments[0])
            var param = Array.prototype.slice.bind(arguments)(1);
            var page = new pageConstructor(...param)

            this.path.push({ ins: page, cls: pageConstructor, param: param });

            this.current.close && this.current.close();
            var layout = page.LAYOUT;
            CPlugin.screen.setLayout(layout).done(function() {
                this.current = page;
                this.option.event && this.option.event.onToggle && this.option.event.onToggle(page, param, pageConstructor)
                page.init();
            }.bind(this))
        },
        toFirstPage: function() {
            if (location.hash) {
                this.toggle(location.hash)
            } else {
                this.show(this.option.root)
            }
        },

        back: function() {},
        empty: function() { this.path = []; },

        serializeParams: function(params) {
            return window.encodeURIComponent(typeof params == "string" ? params : JSON.stringify(params));
        },

        unserializeParams: function(params) {
            try {
                params = JSON.parse(window.decodeURIComponent(params));
            } catch (e) {}
            return params;
        },
        //获取hash参数
        getUrlParamsMap: function() {
            var list, map = {};
            var url = location.hash;
            if (url[0] == '#') url = url.substr(1)
            list = url.split('&');
            for (var m = 0; m < list.length; m++) {
                var item = list[m].split('=');
                map[item[0]] = this.unserializeParams(item[1]);
            }
            return map;
        },
        //生成hash参数
        generateUrlParamsMap: function() {
            var pageClass = namespace(arguments[0])
            var paramObj = {},
                paramList = this.getFunctionParams(pageClass);
            paramObj[this.option.pageFlag] = arguments[0];
            for (var m = 0, n = paramList.length; m < n; m++) {
                if (typeof arguments[m + 1] != typeof undefined) {
                    paramObj[paramList[m]] = arguments[m + 1];
                }
            }
            return paramObj;
        },
        //获取对象参数
        getFunctionParams: function(func) {
                var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
                    ARGUMENT_NAMES = /([^\s,]+)/g,
                    fnStr, result;

                fnStr = func.toString().replace(STRIP_COMMENTS, '');
                result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
                if (result === null) {
                    result = [];
                }
                return result;
            }
            //
    }
    exports.router = Cmpt;
}(namespace('cmpt')))

;
(function(exports) {
    class Cmpt extends exports {
        constructor(opt) {
            super();
            this.option = opt || {};
            this.current = {};
            this.path = [];
        }
        to() {
            var pageConstructor = namespace('page.' + arguments[0])
            var param = Array.prototype.slice.bind(arguments)(1);
            var page = new pageConstructor(...param)

            var layout = page.layout;

            this.current.close && this.current.close();
            var layout = (page.setLayout && page.setLayout());
            if (!page.layout) page.layout = layout;
            // if(page.layout.virtual !== true){
            this.path.push({ ins: page, cls: arguments[0], param: param });
            // }
            CPlugin.screen.setLayout(layout || page.layout).done(function() {
                this.current = page;
                this.option.event && this.option.event.onToggle && this.option.event.onToggle(page, param, pageConstructor)
                page.init();
            }.bind(this))
        }
        back() {
            if (this.path.length > 0) {
                this.path.pop();
                var lastPath = this.path[this.path.length - 1]
                this.path.pop();
                this.to(...[].concat(lastPath.cls, lastPath.param))
            } else {
                this.exit();
            }
        }
        exit() {

        }
        empty() { this.path = []; }
    }
    exports.m = Cmpt;
})(namespace('cmpt.router'));