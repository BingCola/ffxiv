export default class Components {
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

        this.init();
    }
    initRequire() {}
    initOption() {
        this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);
        this.page = this.require.page;
        this.promise = $.Deferred();
    }

    init() {}

    ready() {
        this.promise.resolve();
    }
    destroy() {}
}
