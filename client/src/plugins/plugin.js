export default class Plugin {
    constructor(container, option, require = {}) {
        this.container = container;
        this.option = option;
        this.require = require;
    }

    get DEFAULT_OPTION() {
        return {};
    }
    get CLASSNAMES() {
        return {};
    }

    get CLN() {
        return this.CLASSNAMES;
    }

    use() {
        this.initRequire();
        this.initOption();
        this.initCustomVariable();
        this.init();
    }
    initCustomVariable() {}
    initRequire() {}
    initOption() {
        this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);
        this.page = this.require.page;
        this.promise = $.Deferred();
    }

    setOption(option, noMerge) {
        if (noMerge) {
            this.option = option;
        } else {
            this.option = $.extend(true, {}, this.option, option);
        }
    }
    init() {}

    ready() {
        this.promise.resolve();
    }
    unuse() {}
    destroy() {}
}
