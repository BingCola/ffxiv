import Base from 'page';
import html from './Home.html';
import style from './Home.scss';

export default class Page extends Base {
    constructor() {
        super(...arguments);
    }
    get CLASSNAMES() {
        return style;
    }
    get HTML() {
        return html;
    }
    get container() {
        return this.router.container;
    }
    registerComponents() {}
    show() {
        this.initPanelGuide();
        this.initPanelRecommend();
        this.initPanelWorksPartition();
        this.initPanelRouter();

        this.attachEvent();
    }
    initPanelGuide() {}
    initPanelRecommend() {}
    initPanelWorksPartition() {}
    initPanelRouter() {}
    attachEvent() {}
}
