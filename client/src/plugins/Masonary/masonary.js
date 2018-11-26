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
            mode: 'masonary',
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

                bindCustomEvent: null,

                onModeToggle: null
            },
            aysnc: {
                enable: null,
                getData: null,
                handleData: null,
                reset: null,
                query: {
                    page: 0,
                    limit: 20
                }
            },
            mode: {
                masonary: {},
                plane: {}
            },
            plugin: {
                pagination: {
                    range: 2
                }
            }
        };
    }

    get query() {
        return this.option.aysnc.query;
    }
    get event() {
        return this.option.event || {};
    }
    get mode() {
        return this.option.mode;
    }
    set mode(mode) {
        this.option.mode = mode;
    }
    init() {
        this.attachEvent();
        this.toggleMode(this.option.mode);
    }
    initCustomVariable() {
        this.store = [];
        this.stack = [];
        this.aysncEnable = true;
        this.aysncInitFlag = false;
    }
    attachEvent() {
        this.container.onscroll = this.scroll.bind(this);
        this.$container.off('click').on('click', `.${this.CLN.item}`, e => {
            this.onClick && this.onClick(e.currentTarget);
        });

        this.option.plugin.pagination.container &&
            $(this.option.plugin.pagination.container).on('click', '[data-page]', e => {
                this.togglePage(e.currentTarget.dataset.page);
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
        this.cursor = {
            x: 0,
            y: this.option.layout.paddingTop,
            col: 0
        };
        this.bottoms = [];
        for (let i = 0; i < this.option.layout.col; i++) {
            this.bottoms.push(this.option.layout.paddingTop);
        }
    }
    scroll() {
        this.onScroll && this.onScroll();
        if (this.option.aysnc && this.option.aysnc.getData) {
            if (typeof this.option.aysnc.enable == 'function') this.aysncEnable = this.option.aysnc.enable(this.container);
            if (this.aysncEnable && this.container.scrollTop + this.container.offsetHeight >= this.container.scrollHeight - this.option.layout.aysncSection) {
                this.aysnc();
            }
        }
    }

    aysnc() {
        this.aysncEnable = false;
        this.beforeAysnc && this.beforeAysnc();
        this.option.aysnc
            .getData()
            .done(data => {
                this.handleData(data);
                this.insert();
                if (this.mode == 'masonary') {
                    if (this.container.scrollHeight - Math.max.apply(null, this.bottoms) > 0) {
                        window.setTimeout(() => {
                            this.aysnc();
                        }, 0);
                    }
                } else {
                    if (!this.aysncInitFlag) this.setPagination();
                }
            })
            .always(() => {
                this.event.afterAysnc && this.event.afterAysnc();
                this.aysncEnable = true;
                this.aysncInitFlag = true;
            });
    }
    handleData(data) {
        let store = data.list;
        if (this.option.aysnc.handleData) {
            store = this.option.aysnc.handleData(data);
        }
        this.stack = store;
        this.store = this.store.concat(this.stack);
        if (!this.aysncInitFlag) {
            this.query.limit = this.store.length;
            // this.query.total = data.total;
            this.query.total = 150;
        }
        this.query.page = this.store.length / this.query.limit - 1;

        return store;
    }
    insert() {
        this.stack.forEach(item => {
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
    toggleMode(mode) {
        if (!mode) {
            if (this.container.dataset.mode == 'masonary') {
                this.mode = this.container.dataset.mode = 'plane';
            } else {
                this.mode = this.container.dataset.mode = 'masonary';
            }
        } else {
            this.mode = mode;
            this.container.dataset.mode = this.mode;
        }
        this.event.onModeToggle && this.event.onModeToggle(this.mode);
        this.reset();
        this.aysnc();
    }

    setPagination() {
        let container;
        if (this.option.plugin && this.option.plugin.pagination && this.option.plugin.pagination.container) {
            container = this.option.plugin.pagination.container;
        } else {
            return;
        }
        container.classList.add(this.CLN.pagination);
        container.innerHTML = `
        <span class="c-btn iconfont icon-double-arrow-left" data-action="prev"></span>
        <div class="${this.CLN.list}"></div>
        <span class="c-btn iconfont icon-double-arrow-right" data-action="next"></span>

        <span class="wrapPageSkip">
            <input type="" class="c-input">
            <span class="c-btn" data-action="skip">跳转</span>
        </span>
        `;
        this.togglePage(1);
    }
    togglePage(index) {
        this.option.plugin.pagination.container.querySelector(`.${this.CLN.list}`).innerHTML = (() => {
            let html = ``;
            let end = Math.floor(this.query.total / this.query.limit);
            let range = this.option.plugin.pagination.range;
            if (end - range <= 0) {
                for (let i = 1; i < end + 1; i++) {
                    html += `<span class="${this.CLN.index}" data-page="${i}">${i}</span>`;
                }
            } else {
                if (index - range > 1) {
                    html += `<span class="${this.CLN.indexEllipsis} iconfont icon-ellipsis"></span>`;
                }
                for (let i = Math.min(1, index - range); i < Math.max(end, index + range); i++) {
                    html += `<span class="${this.CLN.index}" data-page="${i}">${i}</span>`;
                }
                if (index + range < end - 1) {
                    html += `<span class="${this.CLN.indexEllipsis} iconfont icon-ellipsis"></span>`;
                }
            }
            return html;
        })();
    }
    reset() {}
    destory() {
        this.clear();
    }
}
