/**
 * Created by BingCola on 2017/2/9.
 */
import CONSTANT from 'constant';
import { PATH } from 'config';

import Base from 'page';
import html from './post.html';
import style from './post.scss';
export default class Page extends Base {
    constructor() {
        super(...arguments);
    }

    get HTML() {
        return html;
    }
    get CLASSNAMES() {
        return style;
    }

    get TEMPLATE() {
        return {
            MODEL: `
            <span class="btnDel iconfont icon-delete-alt"></span>
            <div class="${this.CLN.divCharacter} c-clear-fix">
                <div class="${this.CLN.ctnCharChoose}">
                    <div class="${this.CLN.wrapCharChoose} selected" data-user="author">
                        <div class="c-check-wrap">
                            <span class="c-check-icon"></span><span class="c-check-text">模特为上传者</span></span>
                        </div>
                    </div>
                    <div class="${this.CLN.wrapCharChoose} c-check-wrap" data-user="select">
                        <div class="c-check-wrap">
                            <span class="c-check-icon"></span><span class="c-check-text">模特为其他已注册用户</span></span>
                        </div>
                        <input class="iptUserSel selectIpt" data-type="user" type="text" placeholder="请输入已注册用户名">
                        <div class="wrapUserSelect">
                            <div class="wrapUserInfo selectInfo"></div>
                            <div class="userList selectList"></div>
                        </div>
                    </div>
                    <div class="${this.CLN.wrapCharChoose} c-check-wrap" data-user="custom">
                        <div class="c-check-wrap">
                            <span class="c-check-icon"></span><span class="c-check-text">自定义模特</span></span>
                        </div>
                    </div>
                </div>
                <div class="${this.CLN.ctnCharInfo}">
                    <div class="${this.CLN.divField} c-input-wrap" data-field="name">
                        <div class="c-label">姓名：</div>
                        <input disabled type="text" class="c-input" value="上传者名字">
                    </div>
                    <div class="divField" data-field="race">
                        <div class="c-label">职业：</div>
                        <select disabled type="text" class="c-input">
                            ${Object.keys(CONSTANT.CHARACTER.JOB).map(key => {
                                return `<option value="${key}">${CONSTANT.CHARACTER.JOB[key].text}</option>`;
                            })}
                        </select>
                    </div>
                    <div class="${this.CLN.divField}" data-field="server">
                        <div class="c-label">服务器：</div>
                        <select disabled type="text" class="c-input">
                        ${Object.keys(CONSTANT.SERVER).map(key => {
                            return `<option value="${key}">${CONSTANT.SERVER[key].text}</option>`;
                        })}
                        </select>
                    </div>
                    <div class="${this.CLN.divField}" data-field="race">
                        <div class="c-label">种族：</div>
                        <select disabled type="text" class="c-input">
                            ${Object.keys(CONSTANT.CHARACTER.RACE).map(key => {
                                return `<option value="${key}">${CONSTANT.CHARACTER.RACE[key].text}</option>`;
                            })}
                        </select>
                    </div>
                    <div class="${this.CLN.divField}" data-field="gender">
                        <div class="c-label">性别：</div>
                        <select disabled type="text" class="c-input">
                            ${Object.keys(CONSTANT.CHARACTER.GENDER).map(key => {
                                return `<option value="${key}">${CONSTANT.CHARACTER.GENDER[key].text}</option>`;
                            })}
                        </select>
                    </div>
                    <div class="${this.CLN.divField}" data-field="desc">
                        <div class="c-label">性别：</div>
                        <textaera disabled type="text" class="c-input" placeholder="上传者描述"></textaera>
                    </div>
                </div>
            </div>
            <div class="${this.CLN.divEquipment}">
                <div class="${this.CLN.divEquipBlock}" data-pos="left">
                ${Object.keys(CONSTANT.EQUIPMENT)
                    .filter(key => {
                        return CONSTANT.EQUIPMENT[key].pos == 1;
                    })
                    .map(key => {
                        return `            
                        <div class="${this.CLN.item}" data-part="${key}">
                            <img class="${this.CLN.icon}" src="${PATH.IMAGE}/common/equip/equip_icon_sm_${key}.jpg">
                            <span class="part">${CONSTANT.EQUIPMENT[key].text}</span>
                            <div class="itemSel">
                                <input type="text" class="c-input" placeholder="请选择装备">
                                <div class="wrapItemSelect">
                                    <div class="wrapItemInfo selectInfo"></div>
                                    <div class="itemList selectList"></div>
                                </div>
                            </div>
                        </div>`;
                    })}
                </div>
                <div class="divEquipBlock" data-pos="right">
                ${Object.keys(CONSTANT.EQUIPMENT)
                    .filter(key => {
                        return CONSTANT.EQUIPMENT[key].pos == 2;
                    })
                    .map(key => {
                        return `            
                        <div class="${this.CLN.item}" data-part="${key}">
                            <img class="${this.CLN.icon}" src="${PATH.IMAGE}/common/equip/equip_icon_sm_${key}.jpg">
                            <span class="part">${CONSTANT.EQUIPMENT[key].text}</span>
                            <div class="itemSel">
                                <input type="text" class="c-input" placeholder="请选择装备">
                                <div class="wrapItemSelect">
                                    <div class="wrapItemInfo selectInfo"></div>
                                    <div class="itemList selectList"></div>
                                </div>
                            </div>
                        </div>`;
                    })}
                </div>
            </div>        
        `,
            IMAGE: `
            <div class="toolGrp">
                <span class="btnTool iconfont icon-tailor"></span>
                <span class="btnTool iconfont icon-draw-brush"></span>
                <div class="beautyTool">
                    <span class="btnTool iconfont icon-pic-alt"></span>
                    <div class="subTool beautyItemList">
                        <span class="item">
                            <span class="name">亮度</span><span class="bar"></span>
                        </span>
                        <span class="item">
                            <span class="name">对比度</span><span class="bar"></span>
                        </span>
                        <span class="item">
                            <span class="name">灰度</span><span class="bar"></span>
                        </span>
                    </div>
                </div>
            </div>
            <span class="btnDel iconfont icon-delete-alt"></span>
            <span class="${this.CLN.wrapImg}"><img class="img" src={url}></span>
            `
        };
    }

    initCustomVariable() {
        this.store = {};
    }
    show() {
        this.initModel();
        this.initImage();
        this.attachEvent();
    }
    initModel() {
        this.createModel();
    }
    initImage() {
        this.createImage(this.container.querySelector(`.${this.CLN.ctnCoverImage}`));
    }
    createModel() {
        let container = this.container.querySelector(`.${this.CLN.ctnModel} .${this.CLN.divModelList}`);
        let dom = document.createElement('div');
        dom.className = this.CLN.divModel;
        dom.innerHTML = this.TEMPLATE.MODEL;
        container.appendChild(dom);
    }
    createTag(text) {
        let container = this.container.querySelector(`.${this.CLN.ctnImgGroup} .${this.CLN.divImgSlideList}`);
        let dom = document.createElement('div');
        dom.className = this.CLN.divTag;
        dom.innerHTML = text;
        container.appendChild(dom);
    }
    createImage(url) {
        if (!container) container = this.container.querySelector(`.${this.CLN.ctnImg} .${this.CLN.divModelList}`);
        let dom = document.createElement('div');
        dom.className = this.CLN.divModel;
        dom.innerHTML = this.TEMPLATE.IMAGE.fill({
            url: url ? url : ''
        });
        container.appendChild(dom);
        return dom;
    }
    attachEvent() {
        this.bindImageEvent();
        this.bindImageEvent(this.container.querySelector(`.${this.CLN.ctnCoverImage}`));
        this.bindModelEvent();
    }
    bindModelEvent() {
        let container = this.container.querySelector(`.${this.CLN.ctnModel}`);
        let $container = $(container);
        $container.on('click', `[data-action="add"]`, () => {
            this.createModel();
        });
        $container.on('click', '[data-action="del"]', e => {
            $(e.currentTarget)
                .parent()
                .remove();
        });
        $container.on('click', `.c-check-wrap`, e => {
            let $target = $(e.currentTarget).parent();
            $target.siblings().removeClass('selected');
            $target.addClass('selected');

            let $infoCtn = $traget.parentUtil(`.${this.CLN.divModel}`, `.${this.CLN.divCharacter}`).find(`.${this.CLN.ctnCharInfo}`);

            let mode = $target[0].dataset.user;
            switch (mode) {
                case 'author':
                    $infoCtn.find('input').attr('disabled', true);
                    $infoCtn.find('textaera').attr('disabled', true);
                    $infoCtn.find('select').attr('disabled', true);
                    $infoCtn
                        .find('[data-info="name"]')
                        .children('input')
                        .val('上传者名字');
                    $infoCtn
                        .find('[data-info="desc"]')
                        .children('textaera')
                        .html('上传者描述描述');
                    break;
                case 'select':
                    $infoCtn.find('input').attr('disabled', true);
                    $infoCtn.find('textaera').attr('disabled', true);
                    $infoCtn.find('select').attr('disabled', true);
                    $infoCtn
                        .find('[data-info="name"]')
                        .children('input')
                        .val();
                    $infoCtn
                        .find('[data-info="desc"]')
                        .children('textaera')
                        .html();
                    break;
                case 'custom':
                    $infoCtn.find('input').attr('disabled', false);
                    $infoCtn.find('textaera').attr('disabled', false);
                    $infoCtn.find('select').attr('disabled', false);
                    break;
            }
        });
    }
    bindImageEvent(container) {
        if (!container) container = this.container.querySelector(`.${this.CLN.ctnImgGroup}`);
        let $container = $(container);
        let $ipt = $container.find('input');
        $container.find('.btnImgUpload').on('click', () => {
            if ($container.hasClass('disable')) return;
            $ipt.trigger('click');
        });
        $ipt.on('change', () => {
            container.dataset.num = parseInt(container.dataset.num) + 1;
            if (container.dataset.num == 2) $container.addClass('disable');
            let url = window.URL.createObjectURL($ipt[0].files[0]);
            let imgDom = this.createImage(url);
            $ipt[0].val = '';
            imgDom.querySelector('img').onload = function() {
                window.URL.revokeObjectURL(url);
            };
        });
        $container.on('click', '[data-action="del"]', e => {
            container.dataset.num = parseInt(container.dataset.num) - 1;
            if (container.dataset.num == 2) container.classList.remove('disable');
            $(e.currentTarget)
                .parent()
                .remove();
        });
    }
}
