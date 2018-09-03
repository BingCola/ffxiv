import Router from './router';
export default class Page {
    constructor() {
        this.init();
    }
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
        return [];
    }
    initCommonVariable() {
        this._aysnc = [];
    }
    initCustomVariable() {}
    initOption() {}
    registerComponents() {}
    setLayout() {}
    open() {}
    destroy() {}
    close() {}
}
