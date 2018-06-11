(function(exports) {
    class Cmpt {
        constructor(container, option) {
            this.container = container;
            this.option = option || {};

            this.store = [];
            this.enable = true;
        }
        get DEFAULT_OPTION() {
            return {
                layout: {
                    col: Math.floor(this.container.offsetWidth / 300),
                    paddingTop: 15,
                    paddingBotttom: 10
                },
                item: {
                    margin: 20
                },
                event: {
                    onScroll: null,
                    onClick: null,
                    onItemCreate: null,

                    beforeAysnc: null,
                    afterAysnc: null,

                    custom: null
                },
                aysnc: {
                    enable: null,
                    getData: null,
                    handleData: null
                },
                plugin: {

                }
            }
        }

        init() {
            this.initOption();
            this.attachEvent();
        }
        attachEvent() {
            var _this = this;
            this.container.onscroll = this.aysnc.bind(this)

            this.custom(this.container)
        }

        initOption() {
            this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);

            this.option.layout.uw = this.container.offsetWidth / this.option.layout.col
            this.initCursor();
            this.initEvent();
            this.container.classList.add('cp-masonry-ctn')
        }
        initEvent() {
            if (this.option.event) {
                Object.keys(this.option.event).forEach(e => {
                    if (typeof this.option.event[e] == 'function') {
                        this[e] = this.option.event[e].bind(this)
                    }
                })
            }
        }
        initCursor() {
            this.cursor = {
                x: 0,
                y: 0,
                col: 0,
            }
            this.bottoms = [];
            for (var i = 0; i < this.option.layout.col; i++) {
                this.bottoms.push(0)
            }
        }
        aysnc() {
            this.onScroll && this.onScroll();
            if (this.option.aysnc && this.option.aysnc.getData) {
                if (typeof this.option.aysnc.enable == 'function') this.enable = this.option.aysnc.enable(this.container);
                if (this.enable && this.container.scrollTop + this.container.offsetHeight >= this.container.scrollHeight - (this.option.layout.paddingTop + this.option.layout.paddingBottom)) {
                    this.enable = false;
                    this.afterAysnc && this.afterAysnc();
                    this.option.aysnc.getData().done((items) => {
                        this.handleData(items);
                        this.insert();
                    }).always(() => {
                        this.afterAysnc && this.afterAysnc();
                    })
                }
            }
        }

        handleData(data) {
            let store = data;
            if (this.option.aysnc.handleData) {
                store = this.option.aysnc.handleData(data)
            }
            this.store = store;
            return store;
        }
        insert(result) {
            this.store.forEach(item => {
                this.insertItem(item);
            })
        }

        insertItem(item) {
            let dom = document.createElement('div');
            dom.className = 'cp-masonary-item';

            let size = this.getItemSize({
                h: item.height,
                w: item.width
            });
            dom.style.width = size.w + 'px';
            dom.style.height = size.h + 'px';
            dom.style.left = this.cursor.x + 'px'
            dom.style.top = this.cursor.y + 'px'

            this.onItemCreate && this.onItemCreate(dom, item, pos)
            this.container.appendChild(dom);

            this.setCursor(size);
        }

        setCursor(usize) {
            this.bottoms[this.cursor.col] += usize.h;
            let bottomCol = 0;
            for (let i = 1; i < this.option.layout.col; i++) {
                if (this.bottoms[i] < this.bottoms[i - 1]) {
                    bottomCol = i;
                }
            }
            this.cursor.y = this.bottoms[bottomCol];
            this.cursor.col = bottomCol;
            this.cursor.x = this.cursor.col * this.option.layout.uw
        }

        getItemSize() {

        }
        getItemPos(size) {
            let itemPos = {
                x: this.cursor.x + this.view.margin,
                y: this.cursor.y + this.view.margin,
                w: this.view.uw - 2 * this.item.margin,
                h: size.h * this.view.uw / size.w - 2 * this.view.margin
            }
            this.colCursor[this.cursor.col] += size.h * this.view.uw / size.w;
            this.cursor = this.getMostBottomPos();
            return itemPos;
        }

        insert(item) {
            var dom = this.option.createItemDom(item.data);
            var pos = this.getItemPos({
                h: item.height,
                w: item.width
            });
            dom.style.width = pos.w + 'px';
            dom.style.height = pos.h + 'px';
            dom.style.left = pos.x + 'px'
            dom.style.top = pos.y + 'px'
            dom.classList.add('cp-masonry-item');
            this.container.appendChild(dom)
        }
        getMostBottomPos() {
            var col = 0;
            var bottom = 0;
            for (var i = 0; i < this.colCursor.length; i++) {
                if (i == 0) {
                    bottom = this.colCursor[0];
                } else {
                    if (this.colCursor[i] < bottom) {
                        col = i;
                        bottom = this.colCursor[i]
                    }
                }
            }
            return { col: col, x: this.view.uw * col, y: bottom }
        }
        getItemPos(size) {
            let itemPos = {
                x: this.cursor.x + this.view.margin,
                y: this.cursor.y + this.view.margin,
                w: this.view.uw - 2 * this.view.margin,
                h: size.h * this.view.uw / size.w - 2 * this.view.margin
            }
            this.colCursor[this.cursor.col] += size.h * this.view.uw / size.w;
            this.cursor = this.getMostBottomPos();
            return itemPos;
        }

        clear() {
            this.store = [];
            this.container.innerHTML = '';
        }
        destory() {
            this.clear();
        }
    }
    exports.masonry = Cmpt;
})(namespace('component'))