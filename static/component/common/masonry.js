(function(exports) {
    class Cmpt {
        constructor(container, option) {
            this.container = container;
            this.option = option || {};
            this.view = {};

            this.store = [];
            this.cursor = {
                x: 0,
                y: 0,
                col: 0
            }
            this.colCursor = []
            this.aysncAble = true;
        }
        get DEFAULT_OPTION() {
            return {
                layout: {
                    col: Math.floor(this.container.offsetWidth / 300)
                },
                item: {
                    margin: 20
                },
                event: {
                    onScroll: null,
                    onClick: null,
                    onItemInsert: null,
                },
                aysnc: {
                    enable: null,
                    getData: null
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
            this.container.onscroll = this.aysnc
        }
        disableAysnc() {
            _this.aysncAble = false;
        }
        initOption() {
            this.option = $.extend(true, {}, this.DEFAULT_OPTION, this.option);

            this.view.uw = this.container.offsetWidth / this.view.col
            this.initCursor();

            this.container.classList.add('cp-masonry-ctn')
        }
        initCursor() {
            this.cursor = {
                x: 0,
                y: 0,
                col: 0
            }
            this.colCursor = [];
            for (var i = 0; i < this.view.col; i++) {
                this.colCursor.push(0)
            }
        }
        aysnc() {
            if (_this.option.aysnc && _this.option.aysnc.getData) {
                if (_this.aysncAble && _this.container.scrollTop + _this.container.offsetHeight >= _this.container.scrollHeight - 10) {
                    _this.aysncAble = false;
                    _this.option.aysnc.getData().done(function(items) {
                        if (_this.option.event.beforeaysnc) {
                            _this.setItemView(_this.option.event.beforeaysnc(items))
                        } else {
                            _this.setItemView(items)
                        }

                    }).always(function() {
                        if (_this.option.aysnc.able()) _this.aysncAble = true;
                    })
                }
            }
        }
        setItemView(items) {
            var _this = this;
            this.store = this.store.concat(items);
            items.forEach(function(item) {
                _this.appendItem(item)
            })
        }
        appendItem(item) {
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
            var itemPos = {
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

        }
    }
    exports.masonry = Cmpt;
})(namespace('component'))