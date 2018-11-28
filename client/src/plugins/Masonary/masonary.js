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
                aysncWaitingArea: 20
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
                handleRequest: null,
                handleData: null,
                reset: null,
                query: {
                    page: 0,
                    limit: 20
                }
            },
            mode: {
                masonary: {
                    response: {
                        container: null,
                        loading: '加载中，请稍等',
                        fail: '加载失败，点击重试',
                        end: '已到底部'
                    }
                },
                plane: {}
            },
            plugin: {
                pagination: {
                    container: null,
                    range: 2,
                    terminalKeepShow: 2
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
        this.$container.off('click').on('click', `.${this.CLN.item}`, e => {
            this.onClick && this.onClick(e.currentTarget);
        });

        this.option.plugin.pagination.container &&
            $(this.option.plugin.pagination.container).on('click', '[data-page]', e => {
                this.togglePage(e.currentTarget.dataset.page);
            });

        this.bindCustomEvent && this.bindCustomEvent(this.container);

        $(window).on('resize.masonary', () => {
            this.onResize();
        });
    }
    initOption() {
        this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);

        this.option.layout.uw = this.container.offsetWidth / this.option.layout.col;
        this.initEvent();
        this.container.classList.add(this.CLN.ctn);
        this.container.style.paddingTop = this.option.layout.paddingTop + 'px';
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
            if (
                this.aysncEnable &&
                this.container.scrollTop + this.container.offsetHeight >= this.container.scrollHeight - this.option.layout.aysncWaitingArea
            ) {
                this.query.page++;
                this.aysnc();
            }
        }
    }

    aysnc() {
        this.aysncEnable = false;
        this.beforeAysnc && this.beforeAysnc();
        let request = this.query;
        let tmp = request;
        this.option.aysnc.handleRequest && (tmp = this.option.aysnc.handleRequest(request));
        if (tmp) request = tmp;
        this.option.aysnc
            .getData(request)
            .done(data => {
                this.handleData(data);
                this.insert();
                if (this.mode == 'masonary') {
                    if (this.container.scrollHeight - Math.max.apply(null, this.bottoms) > 0) {
                        window.setTimeout(() => {
                            this.aysnc();
                        }, 0);
                    }
                    if (this.option.mode.masonary.response.container) {
                        if (this.stack.length == 0) {
                            this.setResponseInfo('end');
                        } else {
                            this.setResponseInfo('loading');
                        }
                    }
                } else {
                    if (!this.aysncInitFlag) this.setPagination();
                }
            })
            .fail(() => {
                this.setResponseInfo('fail');
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
        if (this.mode == 'masonary') {
            this.store = this.store.concat(this.stack);
        } else {
            for (let i = 0; i < this.stack.length; i++) {
                this.store[this.query.page * this.query.limit + i] = this.stack[i];
            }
        }
        if (!this.aysncInitFlag) {
            this.query.total = data.total;
        }
        // this.query.page = this.store.length / this.query.limit - 1;

        return store;
    }
    insert() {
        this.stack.forEach((item, index) => {
            let dom = this.insertItem(item);
            dom.dataset.index = this.query.page * this.query.limit + index;
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
        return dom;
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
        if (this.mode == 'masonary') {
            this.initMasonarMode();
        } else {
            this.initPlaneMode();
        }
        this.aysnc();
    }
    initMasonarMode() {
        this.store = [];
        this.stack = [];
        this.query.page = 0;
        this.query.limit = this.option.layout.col * 10;
        this.container.onscroll = this.scroll.bind(this);
        this.option.plugin.pagination.container.classList.remove('active');
    }
    initPlaneMode() {
        this.query.limit = 12 * Math.floor(this.container.offsetHeight / 300);
        this.option.plugin.pagination.container.classList.add('active');
        this.togglePage(1);
    }
    setPagination() {
        let container;
        if (!(this.option.plugin && this.option.plugin.pagination && this.option.plugin.pagination.container)) {
            this.option.plugin.pagination.container = document.createElement('div');
            this.option.plugin.pagination.container.classList.add(`${this.CLN.pagination}`);
        }
        container = this.option.plugin.pagination.container;
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
    setResponseInfo(mode) {
        if (!this.option.mode.masonary.response.container) return;
        this.option.mode.masonary.response.container.dataset.mode = mode;
        this.option.mode.masonary.response.container.innerHTML = this.option.mode.masonary.response[mode];
    }
    togglePage(index) {
        this.query.page = index - 1;
        this.option.plugin.pagination.container.querySelector(`.${this.CLN.list}`).innerHTML = (() => {
            let html = ``;
            let end = Math.ceil(this.query.total / this.query.limit);
            let { range, terminalKeepShow } = this.option.plugin.pagination;
            if (end - (range * 2 + 1) <= 0) {
                for (let i = 1; i < end + 1; i++) {
                    html += `<span class="${this.CLN.index}" data-page="${i}">${i}</span>`;
                }
            } else {
                html += `<span class="${this.CLN.index}" data-page="${1}">${1}</span>`;
                html += `<span class="${this.CLN.index}" data-page="${2}">${2}</span>`;
                if (index - range > terminalKeepShow + 1) {
                    html += `<span class="${this.CLN.indexEllipsis} iconfont icon-ellipsis"></span>`;
                }
                for (let i = Math.max(terminalKeepShow + 1, index - range); i < Math.min(end - terminalKeepShow, index + range + 1); i++) {
                    html += `<span class="${this.CLN.index}" data-page="${i}">${i}</span>`;
                }
                if (index + range < end - terminalKeepShow) {
                    html += `<span class="${this.CLN.indexEllipsis} iconfont icon-ellipsis"></span>`;
                }
                html += `<span class="${this.CLN.index}" data-page="${end - 1}">${end - 1}</span>`;
                html += `<span class="${this.CLN.index}" data-page="${end}">${end}</span>`;
            }
            return html;
        })();
    }
    reset() {
        this.container.onscroll = null;
        this.initCursor();
    }
    refresh() {
        this.toggleMode(this.mode);
    }
    onResize() {
        if (this.mode == 'masonary') {
            this.resizeItem();
        }
    }
    resizeItem() {
        this.option.layout.col = Math.floor(this.container.offsetWidth / 400);
        this.initCursor();
        $(this.container)
            .find(`.${this.CLN.item}`)
            .each((index, dom) => {
                let item = this.store[index];
                let size = this.getItemSize(item);
                dom.dataset.height = size.h;
                dom.style.width = 100 / this.option.layout.col + '%';

                // dom.style.height = size.h + 'px';

                dom.style.left = this.cursor.col * (100 / this.option.layout.col) + '%';
                dom.style.top = this.cursor.y + 'px';

                this.setCursor(item);
            });
    }
    destory() {
        this.clear();
        $(window).off('resize.masonary');
    }
}
