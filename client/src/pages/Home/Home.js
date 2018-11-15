import CONSTANT from 'constant';
import { PATH } from 'config';

import Base from 'page';
import html from './home.html';
import style from './home.scss';

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
                container: document.querySelector('.c-page-header'),
                brand: `<img class="cc-navTop-brand-img" src="${PATH.IMAGE}/common/logo.png">`
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
