import Base from '../Nav';
import style from './NavTop.scss';
import html from './NavTop.html';

export default class NavTop extends Base {
    constructor() {
        super(...arguments);
    }

    get DEFAULT_OPTION() {
        return {
            container: null,
            show: true,
            tpl: ``,

            brand: '',
            router: {
                tpl: `        
                    <div class="nav-content">
                        <span class="text">{text}</span>
                    </div>
                    <div class="nav-sub-list"></div>`,
                tplSub: `
                <div class="nav-content">
                    <span class="text">{text}</span>
                </div>`,
                routes: []
            },
            userProfile: {
                tpl: ``
            },

            event: {
                onInit: null
            }
        };
    }
    get CLASSNAMES() {
        return style;
    }
    get HTML() {
        return html;
    }
    initNavContent() {
        this.initBrand();
        this.initRoutes();
        this.initUserProfile();
    }
    initBrand() {
        let container = this.container.querySelector(`.${this.CLN['nav-brand']}`);
        if (this.option.brand) {
            container.innerHTML = this.option.brand;
        } else {
            container.classList.add('c-hide');
        }
    }
    initRoutes() {
        let container = this.container.querySelector(`.${this.CLN['nav-router']}`);
        this.option.router.routes.forEach(route => {
            let tpl = route.tpl || this.option.router.tpl;
            let dom = document.createElement('div');
            dom.className = 'nav-item';
            dom.innerHTML = tpl.fill(route);
            if (route.action) {
                dom.dataset[action.type] = route.action.content;
            }

            if (route.children instanceof Array && route.children.length > 0) {
                this.setSubRoutes(route.children);
            }
            container.appendChild(dom);
        });
    }
    setSubRoutes(container, routes) {
        routes.forEach(route => {
            let tpl = route.tpl || this.option.router.tplSub;
            let dom = document.createElement('div');
            dom.className = 'nav-item sub';
            dom.innerHTML = tpl.fill(route);
            if (route.action) {
                dom.dataset[action.type] = route.action.content;
            }
            container.appendChild(dom);
        });
    }
    initUserProfile() {
        let container = this.container.querySelector(`.${this.CLN['nav-user-profile']}`);
    }
    attachEvent() {}
}
