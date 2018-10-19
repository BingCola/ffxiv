export default class Router {
    constructor(opt) {
        this.option = opt || {};
        this.container = this.option.container;
        this.init();
    }
    get DEFAULT_OPTION() {
        return {
            root: '',
            pageFlag: 'page',
            enableHash: true,
            path: [],

            event: {
                onToggle: null
            }
        };
    }
    get path() {
        return this.option.path || [];
    }
    set current(page) {
        this._current = page;
    }
    get current() {
        return this._current;
    }
    get history() {
        return this._history || [];
    }
    init() {
        this.initVariable();
        this.initOption();
        this.attachEvent();

        this.toFirstPage();
    }
    initVariable() {
        this._current = {};
        this._history = [];
    }
    initOption() {
        this.option = $.extend({}, this.DEFAULT_OPTION, this.option);
    }
    attachEvent() {
        var _this = this;
        window.onhashchange = function() {
            _this.toggle();
        };
    }
    open() {
        if (this.option.enableHash && arguments[0] != this.option.root) {
            this.change(...arguments);
        } else {
            this.to(...arguments);
        }
    }
    change() {
        var params = this.unserializeParam(...arguments);
        var url = '';
        var args = [];
        if (Object.keys(params).length == 0 || !params[this.option.pageFlag]) {
            return false;
        }
        if (params[this.option.pageFlag] == this.option.root) delete params[this.option.pageFlag];
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                args.push(param + '=' + this.encodeParams(params[param]));
            }
        }
        url = args.join('&');
        location.hash = url;
    }
    toggle() {
        var params = this.serializeParams(...arguments);
        var args = [];
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                args.push(params[param]);
            }
        }
        if (Object.keys(params).length == 0 || !params[this.option.pageFlag]) {
            args.unshift(this.option.root);
        }
        this.to(...args);
    }
    to() {
        var constructor = this.getConstructorByName(arguments[0]);
        var param = Array.prototype.slice.bind(arguments)(1);
        if (!constructor) return;
        this.current.close && this.current.close();

        this.option.event.onToggle && this.option.event.onToggle();
        this.current = new constructor(...param);
        Object.keys(this.option.plugin).forEach(plugin => {
            this.current[plugin] = this.option.plugin[plugin];
        });
        this.current.router = this;
        this.current.init();

        this.path.push({ ins: this.current, cls: constructor, param: param });
    }
    toFirstPage() {
        if (location.hash) {
            this.toggle(location.hash);
        } else {
            this.open(this.option.root);
        }
    }

    back() {
        this.history.pop();
        this.open(this.history[this.history.length - 1].cls, ...this.history[this.history.length - 1].param);
    }
    empty() {
        this._history = [];
    }

    encodeParams(params) {
        return window.encodeURIComponent(typeof params == 'string' ? params : JSON.stringify(params));
    }

    decodeParams(params) {
        try {
            params = JSON.parse(window.decodeURIComponent(params));
        } catch (e) {}
        return params;
    }
    //获取hash参数
    serializeParams() {
        var list,
            map = {};
        var url = location.hash;
        if (url[0] == '#') url = url.substr(1);
        list = url.split('&');
        for (var m = 0; m < list.length; m++) {
            var item = list[m].split('=');
            map[item[0]] = this.decodeParams(item[1]);
        }
        return map;
    }
    //生成hash参数
    unserializeParam() {
        var pageClass = namespace(arguments[0]);
        var paramObj = {},
            paramList = this.getConstructorParams(pageClass);
        paramObj[this.option.pageFlag] = arguments[0];
        for (var m = 0, n = paramList.length; m < n; m++) {
            if (typeof arguments[m + 1] != typeof undefined) {
                paramObj[paramList[m]] = arguments[m + 1];
            }
        }
        return paramObj;
    }
    //获取对象参数
    getConstructorParams(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
            ARGUMENT_NAMES = /([^\s,]+)/g,
            fnStr,
            result;

        fnStr = func.toString().replace(STRIP_COMMENTS, '');
        result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null) {
            result = [];
        }
        return result;
    }

    getConstructorByName(name) {
        for (let i = 0; i < this.path.length; i++) {
            if (this.path[i].name == name) {
                return this.path[i].constructor;
            }
        }
        return false;
    }
}
