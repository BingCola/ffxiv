(function(exports) {
    function PageGallery() {
        this.controller = undefined;
        this.viewer = undefined;
    }
    PageGallery.prototype = {
        show: function() {
            var _this = this;
            WebAPI.get('/application/Gallery/view/page/gallery/pageGallery.html').done(function(resultHTML) {
                MainContainer.innerHTML = resultHTML;
                _this.init();
            })
        },
        init: function() {
            this.initFilter();
            this.initDataManager();
            this.initViewer();
            this.initSearch();
            this.attachEvent();
        },
        initTopDisplayboard: function() {

        },
        initFilter: function() {
            var container = document.getElementById('ctnFilter');
            var fields = [{
                    field: 'job',
                    list: [
                        { content: '不限', val: 0 },
                        { content: '骑士', val: 1 },
                        { content: '黑骑士', val: 2 },
                        { content: '战士', val: 3 },
                        { content: '学者', val: 4 },
                        { content: '白魔法师', val: 5 },
                        { content: '占星术士', val: 6 },
                        { content: '黑魔法师', val: 7 },
                        { content: '召唤师', val: 8 },
                        { content: '龙骑士', val: 9 },
                        { content: '武僧', val: 10 },
                        { content: '忍者', val: 11 },
                        { content: '吟游诗人', val: 12 },
                        { content: '机工士', val: 13 },
                        { content: '大地使者', val: 14 },
                        { content: '能工巧匠', val: 15 },
                    ]
                },
                {
                    field: 'gender',
                    list: [
                        { content: '不限', val: 0 },
                        { content: '男性', val: 1 },
                        { content: '女性', val: 2 },
                    ]
                },
                {
                    field: 'race',
                    list: [
                        { content: '不限', val: 0 },
                        { content: '人类', val: 1 },
                        { content: '猫魅', val: 2 },
                        { content: '精灵', val: 3 },
                        { content: '鲁加', val: 4 },
                        { content: '拉拉菲尔', val: 5 },
                        { content: '奥拉', val: 6 },
                    ]
                },
                {
                    field: 'tag',
                    list: [
                        { content: '清新', val: 1 },
                        { content: '多人', val: 2 },
                        { content: '搞笑', val: 3 },
                        { content: '稀有', val: 4 },
                        { content: '非洲人', val: 5 },
                    ]
                }
            ]
            for (var i = 0; i < fields.length; i++) {
                this.initFilterItem(fields[i].list, container.querySelector('[data-field="' + fields[i].field + '"] .divQueryItem'))
            }
            var colors = [
                { content: '不限', color: 'transparent', val: 0 },
                { content: '红', color: 'red', val: 1 },
                { content: '蓝', color: 'blue', val: 2 },
                { content: '黄', color: 'yellow', val: 3 },
                { content: '绿', color: 'green', val: 4 },
                { content: '紫', color: 'pueple', val: 5 },
                { content: '粉', color: 'pink', val: 6 },
                { content: '灰', color: 'grey', val: 7 },
                { content: '白', color: 'white', val: 8 },
                { content: '黑', color: 'black', val: 9 }
            ]
            this.initFilterColor(colors, container.querySelector('[data-field="color"] .divQueryItem'));
        },
        initFilterItem: function(data, container) {
            var dom;
            for (i = 0; i < data.length; i++) {
                dom = document.createElement('span');
                dom.classList = "item"
                dom.dataset.val = data[i].val;
                dom.innerHTML = data[i].content;
                dom.style.color = data[i].color;
                container.appendChild(dom)
            }
        },
        initFilterColor: function(data, container) {
            var dom;
            for (i = 0; i < data.length; i++) {
                dom = document.createElement('span');
                dom.classList = "item"
                dom.dataset.val = data[i].val;
                dom.innerHTML = data[i].content;
                container.appendChild(dom)
            }
        },
        initSearch: function() {
            this.controller.search().done(function(result) {
                this.viewer.setItemView(result.map(function(item) {
                    return {
                        'height': item.img.height,
                        'width': item.img.width,
                        'data': item
                    }
                }))
            }.bind(this))
        },
        initViewer: function() {
            var _this = this;
            var container = document.getElementById('ctnItemList');
            var option = {
                event: {
                    beforeAynsc: beforeAynsc
                },
                view: {
                    margin: 10
                },
                aysncTip: {
                    container: document.getElementById('ctnAysncTip'),
                    loading: '<span class="spinner flyme"><i></i></span>',
                    end: '<span class="text">已到底部</span>',
                },
                pagination: {
                    container: document.getElementById('ctnPagination')
                },
                createItemDom: createItemDom,
                aynsc: {
                    able: function() {
                        return _this.controller.total > _this.controller.query.page * _this.controller.query.limit
                    },
                    getData: aynsc
                }
            }

            function aynsc() {
                return _this.controller.search();
            }

            function beforeAynsc(items) {
                return items.map(function(item) {
                    return {
                        'height': item.img.height,
                        'width': item.img.width,
                        'data': item
                    }
                })
            }

            function createItemDom(item) {
                var dom = document.createElement('div');
                dom.classList = 'wrapItem';
                dom.dataset.id = item.id
                dom.innerHTML = '\
                <img class="itemImg" src="' + AppConfig.staticSrc + '/image/galleryStore/' + item.img.name + '">\
                    <div class="wrapBaseInfo">\
                        <span class="name">' + item.name + '</span>\
                        <span class="author" data-id="' + item.author.id + '">' + item.author.name + '</span>\
                    </div>\
                    <div class="wrapAction">\
                        <div class="actionItem" data-action="praise">\
                            <span class="icon heart"></span>\
                        </div>\
                        <div class="actionItem" data-action="collect">\
                            <span class="icon star"></span>\
                        </div>\
                    </div>'

                return dom;
            }
            this.viewer = new(namespace('component.waterfall'))(container, option);
            this.viewer.init();
        },
        initDataManager: function() {
            this.controller = new(namespace('gallery.gallery.controller'))(this)
            this.controller.init();
        },
        attachEvent: function() {

        },
        close: function() {

        },
    }
    exports.gallery = PageGallery
})(namespace('gallery'))