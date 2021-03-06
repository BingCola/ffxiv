import html from './topTool.html';
import style from './topTool.scss';

import Dropdown from 'dropdown/dropdown.js';
import Theme from 'theme/theme.js';

export default class TopTool {
    constructor(page, container, option) {
        this.page = page;
        this.container = container;
    }
    use() {
        this.init();
    }
    init() {
        this.setLayout();
        this.setConfigItem();
    }
    get HTML() {
        return html;
    }
    get CLN() {
        return style;
    }
    setLayout() {
        this.container.classList.add(this.CLN.ctn);
        this.container.innerHTML = this.HTML.fill(this.CLN);
    }

    setConfigItem() {
        let $container = $(this.container);
        let $iptKeyword = $container.find(`[data-field="keyword"] .${this.CLN.iptQuery}`);
        $container.find('[data-action="keyword"]').on('click', () => {
            this.page.cmpt.controller.keyword = $iptKeyword.val();
        });
        Theme.set('border.3', $container.find(`[data-field="keyword"]`)[0], { hover: true }).set('button.1', $container.find(`[data-field="keyword"]`)[0]);

        let $iptEquipment = $container.find(`[data-field="equipment"] .${this.CLN.iptQuery}`);
        $container.find('[data-action="equipment"]').on('click', () => {
            this.page.cmpt.controller.keyword = $iptEquipment.val();
        });
        Theme.set('border.3', $container.find(`[data-field="equipment"]`)[0], { hover: true }).set('button.1', $container.find(`[data-field="equipment"]`)[0]);

        Dropdown.init($container.find('[data-field="sort"]')[0], {
            ele: {
                item: `.${this.CLN.item}`
            },
            event: {
                onItemClick: e => {
                    this.page.cmpt.controller.sort = target.dataset.value;
                    this.page.cmpt.controller.asc = false;
                    this.page.cmpt.viewer.refresh();
                }
            }
        });

        Dropdown.init($container.find('[data-field="time"]')[0], {
            ele: {
                item: `.${this.CLN.item}`
            },
            event: {
                onItemClick: target => {
                    this.page.cmpt.controller.time = target.dataset.value;
                    this.page.cmpt.viewer.refresh();
                }
            }
        });

        let $btnMasonary = $container.find('[data-action="masonary"]');
        let $btnPlane = $container.find('[data-action="plane"]');
        let $domForView = $container.find('[data-field="view"]');
        $btnMasonary.on('click', () => {
            $domForView[0].dataset.mode = 'masonary';
            this.page.cmpt.viewer.toggleMode('masonary');
        });
        $btnPlane.on('click', () => {
            $domForView[0].dataset.mode = 'plane';
            this.page.cmpt.viewer.toggleMode('plane');
        });

        $container.find(`.${this.CLN.divBtnItem}`).each((index, dom) => {
            if (dom.classList.contains(`${this.CLN.divBtnGrp}`)) return;
            Theme.set('button.1', dom);
        });
        $container.find(`.${this.CLN.divBtnGrp} .${this.CLN.item}`).each((index, dom) => {
            if (dom.classList.contains(`${this.CLN.divBtnGrp}`)) return;
            Theme.set('button.2', dom);
        });
    }
}
