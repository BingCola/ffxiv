var Waterfall = (function() {
    function Waterfall(container, option) {
        this.container = container;
        this.option = option || {};

        this.store = [];
        this.pos = {
            x: 0,
            y: 0
        }
    }
    Waterfall.prototype = {
        init: function() {
            this.initOption();
        },
        initOption: function() {
            if (!this.option.margin) this.option.margin = 20;

            if (!this.option.col) {
                this.option.col = this.container.offsetWidth / 240
            }

            this.option.uw = this.container.offsetWidth / this.option.col

        },
        setItemView: function(items) {
            this.store = this.store.concat(items);
        },
        appendItem: function(item) {
            var dom = this.option.createItemDom();
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
        getItemPos: function(size) {
            var itemPos = {
                x: this.pos.x + this.option.margin,
                y: this.pos.y + this.option.margin,
                w: this.option.uw - 2 * this.option.margin,
                h: size.h * this.option.uw / size.w - 2 * this.option.margin
            }
            this.pos.x += this.option.uw;
            if (this.pos.x >= this.container.offsetWidth) {
                this.pos.x = 0;
            } else {
                this.pos
            }
            this.pos.y += size.h;
            return itemPos;
        },
        clear: function() {
            this.store = [];
            this.container.innerHTML = '';
        },
        destory: function() {

        },
    }
    return Waterfall;
})()