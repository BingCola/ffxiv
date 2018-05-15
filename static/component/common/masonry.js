(function(exports) {
    function Waterfall(container, option) {
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
        this.aynscAble = true;
    }
    Waterfall.prototype = {
        init: function() {
            this.initOption();
            this.attachEvent();
        },
        attachEvent: function() {
            var _this = this;
            this.container.onscroll = function() {
                if (_this.option.aynsc && _this.option.aynsc.getData) {
                    if (_this.aynscAble && _this.container.scrollTop + _this.container.offsetHeight >= _this.container.scrollHeight - 10) {
                        _this.aynscAble = false;
                        _this.option.aynsc.getData().done(function(items) {
                            if (_this.option.event.beforeAynsc) {
                                _this.setItemView(_this.option.event.beforeAynsc(items))
                            } else {
                                _this.setItemView(items)
                            }
                        }).always(function() {
                            if (_this.option.aynsc.able()) _this.aynscAble = true;
                        })
                    }
                }
            }
        },
        disableAynsc: function() {
            _this.aynscAble = false;
        },
        initOption: function() {
            if (!this.option.view.margin) {
                this.view.margin = 20;
            } else {
                this.view.margin = this.option.view.margin;
            }

            if (!this.option.col) {
                this.view.col = Math.floor(this.container.offsetWidth / 300)
            } else {
                this.view.col = this.option.col;
            }

            this.view.uw = this.container.offsetWidth / this.view.col
            this.initCursor();

            this.container.classList.add('waterfallGalleryCtn')
        },
        initCursor: function() {
            this.cursor = {
                x: 0,
                y: 0,
                col: 0
            }
            this.colCursor = [];
            for (var i = 0; i < this.view.col; i++) {
                this.colCursor.push(0)
            }
        },
        setItemView: function(items) {
            var _this = this;
            this.store = this.store.concat(items);
            items.forEach(function(item) {
                _this.appendItem(item)
            })
        },
        appendItem: function(item) {
            var dom = this.option.createItemDom(item.data);
            var pos = this.getItemPos({
                h: item.height,
                w: item.width
            });
            dom.style.width = pos.w + 'px';
            dom.style.height = pos.h + 'px';
            dom.style.left = pos.x + 'px'
            dom.style.top = pos.y + 'px'
            dom.classList.add('itemBox');
            this.container.appendChild(dom)
        },
        getMostBottomPos: function() {
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
        },
        getItemPos: function(size) {
            var itemPos = {
                x: this.cursor.x + this.view.margin,
                y: this.cursor.y + this.view.margin,
                w: this.view.uw - 2 * this.view.margin,
                h: size.h * this.view.uw / size.w - 2 * this.view.margin
            }
            this.colCursor[this.cursor.col] += size.h * this.view.uw / size.w;
            this.cursor = this.getMostBottomPos();
            return itemPos;
        },

        clear: function() {
            this.store = [];
            this.container.innerHTML = '';
        },
        destory: function() {

        },
    }
    exports.waterfall = Waterfall;
})(namespace('component'))