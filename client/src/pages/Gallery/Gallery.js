import CONSTANT from 'constant';
import { PATH } from 'config';

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
        this.initSideTool();
        this.initViewer();
        this.initSearch();

        this.attachEvent();
    }
    initNav() {
        this.cmpt.navbar.setOption({
            navTop: {
                container: document.querySelector('.c-page-header'),
                brand: `<img class="cc-nav-brand-img" src="${PATH.IMAGE}/common/logo.png">`
            },
            navBottom: {
                container: document.querySelector('.c-page-footer')
            }
        });
        this.cmpt.navbar.use();
    }
    initSideTool() {}
    initViewer() {}
    initSearch() {}
    attachEvent() {}
}
