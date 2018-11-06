import Base from '../Nav';
import style from './NavBottom.scss';
import html from './NavBottom.html';

export default class NavBottom extends Base {
    constructor() {
        super(...arguments);
    }

    get DEFAULT_OPTION() {
        return {
            container: null,
            show: true,
            tpl: ``,

            copyright: ``,
            router: {
                tplSection: `        
                    <div class="nav-section">
                        <span class="text">{text}</span>
                    </div>
                    <div class="nav-list"></div>`,
                tpl: `
                <div class="nav-content">
                    <span class="text">{text}</span>
                </div>`,
                col: []
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
        this.initCopyright();
        this.initRouter();
    }
    initCopyright() {
        let container = this.container.querySelector(`.${this.CLN['nav-copyright']}`);
        if (this.option.copyright) {
            container.innerHTML = this.option.copyright;
        } else {
            container.classList.add('c-hide');
        }
    }
    initRouter() {
        let container = this.container.querySelector(`.${this.CLN['nav-router']}`);
        this.option.router.cols.forEach(col => {
            let dom = document.createElement('div');
            dom.className = 'nav-section-col';
            if (col.sections instanceof Array && col.sections.length > 0) {
                this.setRouteSection(dom, col.sections);
            }
            container.appendChild(dom);
        });
    }
    setRouteSection(container, sections) {
        sections.forEach(section => {
            let tpl = section.tpl || this.option.router.tplSection;
            let dom = document.createElement('div');
            dom.className = 'nav-section';
            dom.innerHTML = tpl.fill(section);
            if (section.routes instanceof Array && section.routes.length > 0) {
                this.setRoutes(dom, section.routes);
            }
            container.appendChild(dom);
        });
    }
    setRoutes(container, routes) {
        routes.forEach(route => {
            let tpl = route.tpl || this.option.router.tpl;
            let dom = document.createElement('div');
            dom.className = 'nav-item';
            dom.innerHTML = tpl.fill(route);
            if (route.action) {
                dom.dataset[action.type] = route.action.content;
            }
            container.appendChild(dom);
        });
    }
    attachEvent() {}
}
