export default class Nav {
    constructor(cmpt, container, option) {
        this.cmpt = cmpt;
        this.container = container;
        this.option = option;
        this.init();
    }
    get CLASSNAMES() {
        return {};
    }
    get DEFAULT_OPTION() {}
    get CLN() {
        return this.CLASSNAMES;
    }
    get HTML() {
        return ``;
    }

    init() {
        if (!this.container) {
            console.error('顶部导航条加载失败：未找到有效容器。');
            return;
        }
        this.initOption();
        this.setLayout();
        this.initNavContent();
        this.attachEvent();

        this.option.event && this.option.event.onInit && this.option.event.onInit();
    }
    initOption() {
        this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);
        if (!this.option.tpl) this.option.tpl = this.HTML;
    }
    setLayout() {
        let html = this.option.tpl.fill(this.getLayoutParam());
        this.container.innerHTML = html.fill(this.CLN);
        if (!this.option.show) this.container.classList.add('c-hide');
    }
    getLayoutParam() {}
    initNavContent() {}
    attachEvent() {}
}
