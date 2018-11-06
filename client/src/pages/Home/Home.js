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
        this.initNav();

        this.initPanelGuide();
        this.initPanelRecommend();
        this.initPanelWorksPartition();
        this.initPanelRouter();

        this.attachEvent();
    }
    initNav() {
        this.cmpt.navbar.setOption({
            navTop: {
                container: document.querySelector('.c-page-header')
            },
            navBottom: {
                container: document.querySelector('.c-page-footer')
            }
        });
        this.cmpt.navbar.use();
    }
    initPanelGuide() {}
    initPanelRecommend() {}
    initPanelWorksPartition() {}
    initPanelRouter() {}
    attachEvent() {}
}
