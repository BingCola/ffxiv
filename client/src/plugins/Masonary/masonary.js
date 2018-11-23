import Base from '../plugin';
import style from './masonary.scss';

export default class Masonary extends Base {
    constructor() {
        super(...arguments);
        this.$container = $(this.container);
    }
    get HTML() {
        return html;
    }
    get CLASSNAMES() {
        return style;
    }
    get DEFAULT_OPTION() {
        return {
            layout: {
                col: Math.floor(this.container.offsetWidth / 400),
                paddingTop: 0,
                paddingBottom: 10,
                aysncSection: 20
            },
            item: {
                margin: 20,
                padding: 10,
                getSize: null
            },
            event: {
                onScroll: null,
                onClick: null,
                onItemCreate: null,

                beforeAysnc: null,
                afterAysnc: null,

                bindCustomEvent: null
            },
            aysnc: {
                enable: null,
                getData: null,
                handleData: null
            },
            plugin: {}
        };
    }

    init() {
        this.attachEvent();
        this.aysnc();
    }
    initCustomVariable() {
        this.store = [];
        this.enable = true;
    }
    attachEvent() {
        this.container.onscroll = this.scroll.bind(this);
        this.$container.off('click').on('click', `.${this.CLN.item}`, e => {
            this.onClick && this.onClick(e.currentTarget);
        });

        this.bindCustomEvent && this.bindCustomEvent(this.container);
    }
    initOption() {
        this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);

        this.option.layout.uw = this.container.offsetWidth / this.option.layout.col;
        this.initCursor();
        this.initEvent();
        this.container.classList.add(this.CLN.ctn);
    }
    initEvent() {
        if (this.option.event) {
            Object.keys(this.option.event).forEach(e => {
                if (typeof this.option.event[e] == 'function') {
                    this[e] = this.option.event[e].bind(this);
                }
            });
        }
    }
    initCursor() {
        let _this = this;
        this.cursor = {
            x: 0,
            y: _this.option.layout.paddingTop,
            col: 0
        };
        this.bottoms = [];
        for (var i = 0; i < this.option.layout.col; i++) {
            this.bottoms.push(_this.option.layout.paddingTop);
        }
    }
    scroll() {
        this.onScroll && this.onScroll();
        if (this.option.aysnc && this.option.aysnc.getData) {
            if (typeof this.option.aysnc.enable == 'function') this.enable = this.option.aysnc.enable(this.container);
            if (this.enable && this.container.scrollTop + this.container.offsetHeight >= this.container.scrollHeight - this.option.layout.aysncSection) {
                this.aysnc();
            }
        }
    }

    aysnc() {
        this.enable = false;
        this.beforeAysnc && this.beforeAysnc();
        this.option.aysnc
            .getData()
            .done(items => {
                this.handleData(items);
                this.insert();
                if (this.container.scrollHeight - Math.max.apply(null, this.bottoms) > 0) {
                    window.setTimeout(() => {
                        this.aysnc();
                    }, 0);
                }
            })
            .always(() => {
                this.afterAysnc && this.afterAysnc();
                this.enable = true;
            });
    }
    handleData(data) {
        let store = data;
        if (this.option.aysnc.handleData) {
            store = this.option.aysnc.handleData(data);
        }
        this.store = store;
        return store;
    }
    insert() {
        this.store.forEach(item => {
            this.insertItem(item);
        });
    }

    insertItem(item) {
        let dom = document.createElement('div');
        dom.className = this.CLN.item;

        let size = this.getItemSize(item);
        dom.dataset.height = size.h;
        dom.style.width = 100 / this.option.layout.col + '%';

        // dom.style.height = size.h + 'px';

        dom.style.left = this.cursor.col * (100 / this.option.layout.col) + '%';
        dom.style.top = this.cursor.y + 'px';

        this.onItemCreate && this.onItemCreate(dom, item, this);
        this.container.appendChild(dom);

        this.setCursor(item);
    }

    setCursor(item) {
        let size = this.getItemSize(item);
        this.bottoms[this.cursor.col] += size.h;
        let bottomCol = 0;
        let bottom = this.bottoms[0];
        for (let i = 1; i < this.option.layout.col; i++) {
            if (this.bottoms[i] < bottom) {
                bottom = this.bottoms[i];
                bottomCol = i;
            }
        }
        this.cursor.y = this.bottoms[bottomCol];
        this.cursor.col = bottomCol;
        // this.cursor.x = this.cursor.col * this.option.layout.uw
    }

    getItemSize(item) {
        let img = this.option.item.imageKey ? item[this.option.item.imageKey] : item;
        let size = this.option.item.getSize
            ? this.option.item.getSize(item)
            : {
                  h: img.height,
                  w: img.width
              };
        return {
            w: this.option.layout.uw,
            h: (size.h * (this.option.layout.uw - this.option.item.padding * 2)) / size.w + this.option.item.padding * 2
        };
    }

    clear() {
        this.store = [];
        this.container.innerHTML = '';
    }
    destory() {
        this.clear();
    }
}
