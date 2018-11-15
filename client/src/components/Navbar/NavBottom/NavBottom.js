import Base from '../nav';
import style from './navBottom.scss';
import html from './navBottom.html';

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
                    <div class="${this.CLN.sectionContent}">
                        <span class="text">{text}</span>
                    </div>
                    <div class="${this.CLN.routeList}"></div>`,
                tpl: `
                <div class="${this.CLN.route}">
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
    get action() {
        return {};
    }
    initNavContent() {
        this.container.classList.add(this.CLN['ctn']);
        this.initCopyright();
        this.initRouter();
    }
    initCopyright() {
        let container = this.container.querySelector(`.${this.CLN['copyright']}`);
        if (this.option.copyright) {
            container.innerHTML = this.option.copyright;
        } else {
            container.classList.add('c-hide');
        }
    }
    initRouter() {
        let container = this.container.querySelector(`.${this.CLN['router']}`);
        this.option.router.cols.forEach(col => {
            let dom = document.createElement('div');
            dom.className = this.CLN['router-col'];
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
            dom.className = this.CLN['router-section'];
            dom.innerHTML = tpl.fill(section);
            if (section.routes instanceof Array && section.routes.length > 0) {
                this.setRoutes(dom.querySelector(`.${this.CLN['route-list']}`), section.routes);
            }
            container.appendChild(dom);
        });
    }
    setRoutes(container, routes) {
        routes.forEach(route => {
            let tpl = route.tpl || this.option.router.tpl;
            let dom = document.createElement('div');
            dom.className = this.CLN['route'];
            dom.innerHTML = tpl.fill(route);
            if (route.action) {
                dom.dataset[action.type] = route.action.content;
            }
            container.appendChild(dom);
        });
    }
    attachEvent() {
        $(this.container).on('click.route.href', '[data-href]', e => {
            location.href = e.currentTarget.dataset.href;
        });

        $(this.container).on('click.route.action', '[data-action]', e => {
            this.action[e.currentTarget.dataset.href] && this.action[e.currentTarget.dataset.href](e.currentTarget);
        });
    }
}
