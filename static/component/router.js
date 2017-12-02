(function(exports) {
    function Cmpt(opt) {
        this.option = opt || {};
        this.current = {};
        this.path = [];
    }
    Cmpt.prototype = {
        to: function() {
            var pageConstructor = namespace(arguments[0])
            var param = Array.prototype.slice.bind(arguments)(1);
            var page = new pageConstructor(...param)

            var layout = page.layout;
            this.path.push({ ins: page, cls: pageConstructor, param: param });

            this.current.close && this.current.close();
            var layout = (page.setLayout && page.setLayout());
            if (!page.layout) page.layout = layout;
            CPlugin.screen.setLayout(layout || page.layout).done(function() {
                this.current = page;
                this.option.event && this.option.event.onToggle && this.option.event.onToggle(page, param, pageConstructor)
                page.init();
            }.bind(this))
        },
        toFirstPage: function() {
            if (location.hash) {
                this.to(location.hash)
            } else {
                this.to(this.option.root)
            }
        },

        back: function() {},
        empty: function() { this.path = []; },

        serializeParams: function(params) {
            return window.encodeURIComponent(JSON.stringify(params));
        },

        unserializeParams: function(params) {
            try {
                params = JSON.parse(window.decodeURIComponent(params));
            } catch (e) {}
            return params;
        },
        //获取hash参数
        getHashParamsMap: function() {
            var list, map = {};
            list = location.hash.substr(1).split('&');
            for (var m = 0; m < list.length; m++) {
                var item = list[m].split('=');
                map[item[0]] = unserializeParams(item[1]);
            }
            return map;
        },
        //生成hash参数
        generateHashParamsMap: function() {
            var paramObj = {
                    page: screenClass.name
                },
                paramList = ScreenManager._getFunctionParams(screenClass);
            for (var m = 0, n = paramList.length; m < n; m++) {
                if (typeof arguments[m + 1] != typeof undefined) {
                    paramObj[paramList[m]] = arguments[m + 1];
                }
            }
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