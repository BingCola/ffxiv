import CONSTANT from 'constant';
import { PATH } from 'config';

import Base from 'page';
import html from './gallery.html';
import style from './gallery.scss';

import SideTool from './components/sideTool';
import Masonary from 'masonary/masonary.js';
import Controller from './components/controller.js';
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
    registerComponents() {
        this.initSideTool();
        this.initController();
        this.initViewer();
    }
    show() {
        this.initNav();
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
    initSideTool() {
        let contianer = document.getElementById('ctnFilter');
        this.cmpt.sideTool = new SideTool(this, contianer);
        this.cmpt.sideTool.use();
    }
    initViewer() {
        let container = document.getElementById('ctnItemList');
        let option = {
            mode: 'plane',
            layout: {
                paddingTop: 37
            },
            item: {
                imageKey: 'img',
                margin: 20
            },
            event: {
                onScroll: null,
                onClick: function(target) {
                    let id = target.dataset.id;
                    window.open(`/works#id=${id}`);
                },
                onItemCreate: (dom, item, cmpt) => {
                    dom.dataset.id = item.id;
                    dom.innerHTML = `
                        <div class="${cmpt.CLN.body}">
                            <img class="${cmpt.CLN.img}" src="${PATH.IMAGE}/plant/transmog/${item.img.name}">
                            <div class="${this.CLN.infoBox}">
                                <span class="${this.CLN.name}">${item.name}</span>
                                <span class="${this.CLN.author}" data-id="${item.author.id}">${item.author.name}</span>
                                <div class="${this.CLN.remark}">
                                    <span class="${this.CLN.remarkItem}" data-action="praise">
                                        <span class="${this.CLN.icon} iconfont icon-praise"></span>
                                        <span class="num">${NumberUtil.limitMax(item.remark.praise, 999)}</span>
                                    </span>
                                    <span class="${this.CLN.remarkItem}" data-action="comment">
                                        <span class="${this.CLN.icon} iconfont icon-comment"></span>
                                        <span class="num">${NumberUtil.limitMax(item.remark.comment, 999)}</span>
                                    </span>
                                </div>
                            </div>
                        </div>`;
                },

                beforeAysnc: null,
                afterAysnc: null,

                bindCustomEvent: null
            },
            aysnc: {
                getData: this.cmpt.controller.search.bind(this.cmpt.controller),
                handleData: null
            },
            plugin: {
                pagination: {
                    container: this.container.querySelector(`.${this.CLN.ctnPagination}`)
                }
            }
        };
        this.cmpt.viewer = new Masonary(container, option);
        this.cmpt.viewer.use();
    }
    initController() {
        this.cmpt.controller = new Controller(this);
        this.cmpt.controller.use();
    }
    attachEvent() {}
}
