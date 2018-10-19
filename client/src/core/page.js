import Router from './router';
export default class Page {
    constructor() {}
    init() {
        this.initCommonVariable();
        this.initCustomVariable();
        this.initOption();
        this.registerComponents();
        this.setLayout();
        this.open();
    }
    get name() {
        return '';
    }
    get path() {
        return '';
    }
    get aysnc() {
        return this._aysnc || [];
    }
    initCommonVariable() {
        this._aysnc = [];

        let apiStack = {};
        Object.keys(this.api).forEach(api => {
            apiStack[api] = () => {
                let request = this.api[api]();
                this._aysnc.push(request);
                return request;
            };
        });
        this.api = apiStack;
    }
    initCustomVariable() {}
    initOption() {}
    registerComponents() {}
    setLayout() {}
    open() {}
    destroy() {}
    close() {}
}
