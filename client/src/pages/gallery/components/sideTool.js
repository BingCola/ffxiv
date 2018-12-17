import CONSTANT from 'constant';

import html from './sideTool.html';
import style from './sideTool.scss';

export default class SideTool {
    constructor(page, container, option) {
        this.page = page;
        this.container = container;
        this.option = option;
    }
    use() {
        this.init();
    }
    init() {
        this.initOption();
        this.setLayout();
        this.fillContent();
        this.attachEvent();
    }
    get HTML() {
        return html;
    }
    get CLN() {
        return style;
    }
    initOption() {
        this.option = [
            {
                field: 'job',
                title: '职业',
                toggle: 'extend',
                mode: 'single',
                list: Object.keys(CONSTANT.CHARACTER.JOB).map(key => {
                    return {
                        val: key,
                        text: CONSTANT.CHARACTER.JOB[key].text
                    };
                })
            },
            {
                field: 'gender',
                title: '性别',
                mode: 'single',
                list: Object.keys(CONSTANT.CHARACTER.GENDER).map(key => {
                    return {
                        val: key,
                        text: CONSTANT.CHARACTER.GENDER[key].text
                    };
                })
            },
            {
                field: 'race',
                title: '种族',
                mode: 'single',
                list: Object.keys(CONSTANT.CHARACTER.RACE).map(key => {
                    return {
                        val: key,
                        text: CONSTANT.CHARACTER.RACE[key].text
                    };
                })
            },
            {
                field: 'tag',
                title: '标签',
                mode: 'multi',
                list: [{ text: '清新', val: 1 }, { text: '多人', val: 2 }, { text: '搞笑', val: 3 }, { text: '稀有', val: 4 }, { text: '非洲人', val: 5 }]
            },
            {
                field: 'color',
                title: '色系',
                mode: 'multi',
                hover: false,
                list: [
                    { content: '红', color: 'red', val: 1 },
                    { content: '蓝', color: 'blue', val: 2 },
                    { content: '黄', color: 'yellow', val: 3 },
                    { content: '绿', color: 'green', val: 4 },
                    { content: '紫', color: 'purple', val: 5 },
                    { content: '粉', color: 'pink', val: 6 },
                    { content: '灰', color: 'grey', val: 7 },
                    { content: '白', color: 'white', val: 8 },
                    { content: '黑', color: 'black', val: 9 }
                ],
                onItemDomCreate(dom, item) {
                    dom.style.background = item.color;
                    dom.setAttribute('text', item.content);
                }
            }
        ];

        this.query = {};
    }
    setLayout() {
        this.container.classList.add(this.CLN.ctn);
        this.container.innerHTML = this.HTML.fill(this.CLN);
    }
    fillContent() {
        let container = this.container.querySelector(`.${this.CLN.workspace}`);
        for (var i = 0; i < this.option.length; i++) {
            if (this.option[i].custom) continue;
            container.appendChild(this.createFieldCtn(this.option[i]));
        }
    }
    createFieldCtn(field) {
        let container = document.createElement('div');
        container.className = this.CLN['wrapFilterField'];
        container.dataset.field = field.field;
        container.dataset.mode = field.mode;
        if (field.toggle) container.dataset.toggle = field.toggle;
        container.innerHTML = `
            <div class="${this.CLN.header}">
                <span class="${this.CLN.title}">${field.title}</span>
                <div class="${this.CLN.btnToolGrp}">
                    <span class="c-btn" data-action="revert">重置</span>
                    <span class="c-btn" data-action="multi">多选</span>
                    <span class="c-btn iconfont icon-arrow-right"></span>
                </div>
            </div>
            <div class="${this.CLN.divItemList} c-clear-fix"></div>
            `;
        let listCtn = container.querySelector(`.${this.CLN.divItemList}`);
        if (field.hover !== false) listCtn.classList.add('hover');
        field.list.forEach(item => {
            let dom = document.createElement('span');
            dom.className = this.CLN['item'];
            dom.dataset.field = field.field;
            dom.dataset.mode = field.mode;
            // item.text && (dom.innerHTML = `<span class="text" data-text="${item.text}">${item.text}</span>`);
            item.text && (dom.innerHTML = `${item.text}`);
            field.onItemDomCreate && field.onItemDomCreate(dom, item);
            listCtn.appendChild(dom);
        });
        return container;
    }
    attachEvent() {
        $(this.container)
            .find(`.${this.CLN.workspace}`)
            .on('click', `.${this.CLN.item}`, e => {
                let $target = $(e.currentTarget);
                let $parent = $target.parentsUntil(`.${this.CLN.workspace}`, `.${this.CLN.wrapQueryField}`);
                $target.toggleClass('selected');
                this.setFilter($parent);
            });
    }
    setFilter($dom) {
        let field = $dom.data().field;
        this.query[field] = [];
        $dom.find(`.${this.CLN.item}.selected`).each((index, dom) => {
            this.query[field].push(parseInt(dom.dataset.value));
        });
    }
    getFilter() {
        return this.query;
    }
}
