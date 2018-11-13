import api from 'api';
export default class Page {
    constructor() {}
    init() {
        this.initApi();
        this.initCommonVariable();
        this.initCustomVariable();
        this.initOption();
        this.registerComponents();
        this.setLayout();
    }
    get NAME() {
        return '';
    }
    get PATH() {
        return '';
    }
    get HTML() {
        return '';
    }
    get CLASSNAMES() {
        return {};
    }
    get CLN() {
        return this.CLASSNAMES;
    }
    get aysnc() {
        return this._aysnc || [];
    }
    get api() {
        return this._api || {};
    }
    initApi() {
        this._aysnc = [];
        this._api = [];

        let apiStack = {};
        Object.keys(api).forEach(name => {
            apiStack[name] = () => {
                let request = api[name](...arguments);
                this._aysnc.push(request);
                return request;
            };
        });
        this._api = apiStack;
    }
    initCommonVariable() {
        this.cmpt = {};
        this.util = {};
    }
    initCustomVariable() {}
    initOption() {}
    registerComponents() {}
    setLayout() {
        this.container.innerHTML = this.HTML.fill(this.CLASSNAMES);
    }
    show() {}
    destroy() {}
    close() {}
}
