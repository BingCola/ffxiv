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
                plugin: {

                }
            }
        }

        init() {
            this.initOption();
            this.attachEvent();
            this.aysnc();
        }
        attachEvent() {
            var _this = this;
            this.container.onscroll = this.scroll.bind(this)

            this.bindCustomEvent && this.bindCustomEvent(this.container)
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
            this.option.aysnc.getData().done((items) => {
                this.handleData(items);
                this.insert();
                if (this.container.scrollHeight - Math.max.apply(null, this.bottoms) > 0) {
                    window.setTimeout(() => {
                        this.aysnc();
                    }, 0)
                }
            }).always(() => {
                this.afterAysnc && this.afterAysnc();
                this.enable = true;
            })
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
            dom.className = 'cp-masonry-item';

            let size = this.getItemSize(item);
            dom.dataset.height = size.h;
            dom.style.width = (100 / this.option.layout.col) + '%';

            // dom.style.height = size.h + 'px';

            dom.style.left = this.cursor.col * (100 / this.option.layout.col) + '%'
            dom.style.top = this.cursor.y + 'px'

            this.onItemCreate && this.onItemCreate(dom, item)
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
            let size = this.option.item.getSize ? this.option.item.getSize(item) : {
                h: img.height,
                w: img.width
            }
            return {
                w: this.option.layout.uw,
                h: size.h * (this.option.layout.uw - this.option.item.padding * 2) / size.w + this.option.item.padding * 2
            }
        }

        // getItemPos(size) {
        //     let itemPos = {
        //         x: this.cursor.x + this.view.margin,
        //         y: this.cursor.y + this.view.margin,
        //         w: this.view.uw - 2 * this.item.margin,
        //         h: size.h * this.view.uw / size.w - 2 * this.view.margin
        //     }
        //     this.colCursor[this.cursor.col] += size.h * this.view.uw / size.w;
        //     this.cursor = this.getMostBottomPos();
        //     return itemPos;
        // }

        // insert(item) {
        //     var dom = this.option.createItemDom(item.data);
        //     var pos = this.getItemPos({
        //         h: item.height,
        //         w: item.width
        //     });
        //     dom.style.width = pos.w + 'px';
        //     dom.style.height = pos.h + 'px';
        //     dom.style.left = pos.x + 'px'
        //     dom.style.top = pos.y + 'px'
        //     dom.classList.add('cp-masonry-item');
        //     this.container.appendChild(dom)
        // }
        // getMostBottomPos() {
        //     var col = 0;
        //     var bottom = 0;
        //     for (var i = 0; i < this.colCursor.length; i++) {
        //         if (i == 0) {
        //             bottom = this.colCursor[0];
        //         } else {
        //             if (this.colCursor[i] < bottom) {
        //                 col = i;
        //                 bottom = this.colCursor[i]
        //             }
        //         }
        //     }
        //     return { col: col, x: this.view.uw * col, y: bottom }
        // }
        // getItemPos(size) {
        //     let itemPos = {
        //         x: this.cursor.x + this.view.margin,
        //         y: this.cursor.y + this.view.margin,
        //         w: this.view.uw - 2 * this.view.margin,
        //         h: size.h * this.view.uw / size.w - 2 * this.view.margin
        //     }
        //     this.colCursor[this.cursor.col] += size.h * this.view.uw / size.w;
        //     this.cursor = this.getMostBottomPos();
        //     return itemPos;
        // }

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