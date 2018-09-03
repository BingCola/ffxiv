import Router from './router';
export default class Page {
    constructor() {
        this.init();
    }
    init() {
        this.initVariable();
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
    initVariable() {}
    initOption() {}
    registerComponents() {}
    setLayout() {}
    destroy() {}
}
