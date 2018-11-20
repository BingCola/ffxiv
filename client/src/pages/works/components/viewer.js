import { PATH } from 'config';
import CONSTANT from 'constant';
export default class Viewer {
    constructor(page) {
        this.page = page;
        this.container = this.page.container;
    }
    get TEMPLATE() {
        return {
            RELATE: `<img class="c-slide-img" src="{img}"><span class="c-slide-title">{title}</span>`,
            TAG: `    
            <span class="content">{content}</span>
            <div class="${this.CLN.divDetail} c-popover-body">
                <div class="c-clear-fix ${this.CLN.btnTagRemarkGrp}">
                    <span class="${this.CLN.content}">{content}</span>
                    <span class="c-btn" data-action="for">
                        <span class="icon iconfont icon-thumb-up"></span>
                        <span class="${this.CLN.text}">{for}</span>
                    </span>
                    <span class="c-btn iconfont icon-thumb-down" data-action="down">
                        <span class="icon iconfont icon-thumb-down"></span>
                        <span class="${this.CLN.text}">{against}</span>
                    </span>
                </div>
                <div class="c-clear-fix">
                    <span class="c-btn" data-action="attention">关注</span>
                    <span class="c-btn" data-action="delete">删除</span>
                    <span class="c-btn" data-action="report">举报</span>
                </div>
            </div>;`,
            MODEL: `
            <div class="${this.CLN.divCharacter}">
                {character}
            </div>
            <div class="${this.CLN.divEquipment}">
                {equipment}
            </div>`,
            MODEL_CHAR: `
            <div class="divField" data-fill="portrait"><img src="{portrait}" onerror="this.style.display=\'none\'" class="c-portrait"></div>
            <div class="c-clear-fix fluid">
                <div class="c-wrap c-clear-fix ${this.CLN.btnToolGrp}">{tool}</div>
                <div class="c-wrap divField" data-fill="race">{race}</div>
                <div class="c-wrap divField" data-fill="name">{name}</div>
            </div>
            <div class="divField" data-fill="desc">{desc}</div>
            `,
            MODEL_EQUIP: `
            <div class="${this.CLN.item}" data-pos="{pos}">
                <img data-field="icon" src="{icon}" onerror="this.src != \'{partDefaultIcon}\' && (this.src=\'{partDefaultIcon}\')">\
                <span data-field="part">{part}</span>
                <span data-field="name">{name}</span>
                <span data-field="color" style="background-color:{color}"></span>
                <span data-field="c-btn btnMore">更多作品</span>
            </div>
            `
        };
    }
    get CLN() {
        return this.page.CLN;
    }
    setAlbum(data) {
        let container = this.container.querySelector(`.${this.CLN.ctnPhotoAlbum}`);
        return this;
    }
    setBase(data) {
        let container = this.container.querySelector(`.${this.CLN.ctnBase}`);
        let fields = ['title', 'time'].map(function(item) {
            if (item == 'time') {
                return {
                    name: item,
                    data: moment(data[item]).format('YYYY-MM-DD HH:mm:ss')
                };
            } else {
                return {
                    name: item,
                    data: data[item]
                };
            }
        });
        this.fillContent(container, fields);

        this.setDesc(data);
        return this;
    }
    setDesc(data) {
        let container = this.container.querySelector(`.${this.CLN.ctnDesc}`);
        let fields = ['desc'].map(function(item) {
            return {
                name: item,
                data: data[item]
            };
        });
        this.fillContent(container, fields);

        return this;
    }
    setTag(data) {
        let container = this.container.querySelector(`.${this.CLN.ctnTag} .tagItemList`);
        data.forEach(
            function(item) {
                container.appendChild(this.createTagDom(item));
            }.bind(this)
        );
        return this;
    }
    createTagDom(data) {
        let dom = document.createElement('div');
        dom.className = `${this.CLN.item} c-popover`;
        dom.dataset.theme = 'light';
        dom.dataset.toggle = 'hover';

        dom.innerHTML = this.TEMPLATE.TAG.fill({
            content: data.content,
            for: NumberUtil.format(data.for),
            against: NumberUtil.format(data.against)
        });
        return dom;
    }
    setRemark(data) {
        let container = this.container.querySelector(`.${this.CLN.ctnRemark}`);
        let template = `
        <span class="icon {icon}"></span>
        <span class="text">{text}</span>
        <span class="num">{num}</sann>`;

        var mapRemark = {
            view: '浏览',
            praise: '赞',
            collect: '收藏',
            shield: '屏蔽',
            share: '分享'
        };
        var fields = ['share', 'view', 'praise', 'collect', 'shield'].map(function(item) {
            return {
                name: item,
                data: {
                    icon: 'iconfont icon-' + item,
                    num: NumberUtil.format(data[item]),
                    text: mapRemark[item]
                }
            };
        });
        this.fillContent(container, fields, template);
        return this;
    }
    setAuthor(data) {
        var container = this.container.querySelector(`.${this.CLN.ctnAuthor}`);

        container.querySelector('[data-fill="portrait"]').src = `${PATH.IMAGE}/user/portrait/${data.id}.png`;
        var fields = ['name', 'server', 'desc', 'works', 'fans'].map(function(item) {
            let field = {
                name: item
            };
            if (item == 'server') {
                field.data = CONSTANT.SERVER[data[item]].text;
            } else if (item == 'works' || item == 'fans') {
                field.data = NumberUtil.format(data[item]);
            } else {
                field.data = data[item];
            }
            return field;
        });
        this.fillContent(container, fields);
        return this;
    }
    setModel(data) {
        var ctnItemList = this.container.querySelector(`.${this.CLN.ctnModel} .${this.CLN.modelItemList}`);
        var ctnIndex = this.container.querySelector(`.${this.CLN.ctnModel} .${this.CLN.modelItemIndex}`);
        ctnIndex.innerHTML = '';
        if (data.lenth == 0) {
            ctnIndex.classList.add('c-hide');
        }
        data.forEach(
            function(item, index) {
                var dom = this.createModelDom(item);
                ctnItemList.appendChild(dom);
                if (index == 0) {
                    dom.classList.add('focus');
                    ctnIndex.innerHTML += '<span class="item focus" data-index="' + index + '"></span>';
                } else {
                    ctnIndex.innerHTML += '<span class="item" data-index="' + index + '"></span>';
                }
            }.bind(this)
        );
        return this;
    }
    createModelDom(data) {
        let charHtml = this.TEMPLATE.MODEL_CHAR.fill({
            name: data.name,
            race: CONSTANT.CHARACTER.RACE[data.race].text,
            desc: data.desc,
            portrait: data.id ? `${PATH.IMAGE}/user/${data.id}.png ` : `${PATH.IMAGE}/common/character/race_icon_${data.race}.png `,
            tool: data.id
                ? `
            <span class="c-btn iconfont icon-attention" data-action="attention"></span>
            <span class="c-btn iconfont icon-message" data-action="message"></span>`
                : '<span class="noRegisterTip">未注册</span>'
        });

        let equipHtml = Object.keys(CONSTANT.EQUIPMENT.PART)
            .map(item => {
                return this.TEMPLATE.MODEL_EQUIP.fill({
                    icon: ` ${PATH.IMAGE}/plant/single/${data.equip[item].id}.jpg `,
                    partDefaultIcon: `${PATH.IMAGE}/common/equip/equip_icon_sm_${item}.jpg `,
                    name: data.equip[item].name,
                    part: CONSTANT.EQUIPMENT.PART[item].text,
                    color: data.equip[item].color,
                    pos: CONSTANT.EQUIPMENT.PART[item].pos
                });
            })
            .join('');
        let dom = document.createElement('div');
        dom.innerHTML = this.TEMPLATE.MODEL.fill({
            character: charHtml,
            equipment: equipHtml
        });
        dom.className = this.CLN['divModel'];
        if (data.id == this.page.store.author.id) {
            dom.classList.add('isSelf');
        }
        return dom;
    }
    setRelateWorks(data) {
        var container = this.container.querySelector(`.${this.CLN.ctnRelate} .c-slide-list`);
        container.innerHTML = '';
        data.forEach(
            function(item) {
                container.appendChild(this.createRelateWorksDom(item));
            }.bind(this)
        );
        return this;
    }
    createRelateWorksDom(data) {
        var dom = document.createElement('div');
        dom.className = 'c-slide';
        dom.dataset.id = data.id;
        dom.innerHTML = this.TEMPLATE.RELATE.fill({
            img: `${PATH.IMAGE}/plant/transmog/${data.id}.jpg `,
            title: data.title
        });
        return dom;
    }
    fillContent(container, fields, template) {
        if (!fields) return;
        fields.forEach(function(item) {
            container.querySelector('[data-fill="' + item.name + '"]').innerHTML = template ? template.fill(item.data) : item.data;
        });
    }
}
