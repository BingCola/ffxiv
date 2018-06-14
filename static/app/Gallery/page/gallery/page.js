(function(exports) {
    function Page() {
        this.controller = undefined;
        this.viewer = undefined;
    }
    Page.prototype = {
        get LAYOUT() {
            return {
                view: '/app/Gallery/page/gallery/page.html',
                header: true,
                footer: true
            }
        },
        init: function() {
            this.initFilter();
            this.initDataManager();
            this.initViewer();
            // this.initSearch();
            this.attachEvent();
        },
        initTopDisplayboard: function() {

        },
        initFilter: function() {
            var container = document.getElementById('ctnFilter');
            var fields = [{
                    field: 'job',
                    title: '职业',
                    list: Object.keys(CONSTANT.CHARACTER.JOB).map(key => {
                        return {
                            val: key,
                            text: CONSTANT.CHARACTER.JOB[key].text
                        }
                    })
                },
                {
                    field: 'gender',
                    title: '性别',
                    list: Object.keys(CONSTANT.CHARACTER.GENDER).map(key => {
                        return {
                            val: key,
                            text: CONSTANT.CHARACTER.GENDER[key].text
                        }
                    })
                },
                {
                    field: 'race',
                    title: '种族',
                    list: Object.keys(CONSTANT.CHARACTER.RACE).map(key => {
                        return {
                            val: key,
                            text: CONSTANT.CHARACTER.RACE[key].text
                        }
                    })
                },
                {
                    field: 'tag',
                    title: '标签',
                    list: [
                        { text: '清新', val: 1 },
                        { text: '多人', val: 2 },
                        { text: '搞笑', val: 3 },
                        { text: '稀有', val: 4 },
                        { text: '非洲人', val: 5 },
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
                dom.innerHTML = data[i].text;
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
        // initSearch: function() {
        //     this.controller.search().done(function(result) {
        //         this.viewer.setItemView(result.map(function(item) {
        //             return {
        //                 'height': item.img.height,
        //                 'width': item.img.width,
        //                 'data': item
        //             }
        //         }))
        //     }.bind(this))
        // },
        initViewer: function() {
            var _this = this;
            var container = document.getElementById('ctnItemList');
            var option = {
                item: {
                    imageKey: 'img',
                    margin: 20
                },
                event: {
                    onScroll: null,
                    onClick: function(target) {
                        let id = target.dataset.id;
                        window.open('/works#id=1')
                    },
                    onItemCreate: function(dom, item) {
                        dom.dataset.id = item.id;
                        dom.innerHTML = `
                        <div class="cp-masonry-item-body">
                            <img class="itemImg cp-masonry-img" src="${AppConfig.path.image}/plant/transmog/${item.img.name}">
                            <div class="infoBox">
                                <span class="name">${item.name}</span>
                                <span class="author" data-id="${item.author.id}">${item.author.name}</span>
                                <div class="wrapAction">
                                    <span class="actionItem" data-action="praise">
                                        <span class="icon iconfont icon-praise"></span>
                                        <span class="num">${NumberUtil.limitMax(item.remark.praise, 999)}</span>
                                    </span>
                                    <span class="actionItem" data-action="comment">
                                        <span class="icon iconfont icon-comment"></span>
                                        <span class="num">${NumberUtil.limitMax(item.remark.comment, 999)}</span>
                                    </span>
                                </div>
                            </div>
                        </div>`
                    },

                    beforeAysnc: null,
                    afterAysnc: null,

                    bindCustomEvent: null
                },
                aysnc: {
                    getData: _this.controller.search.bind(this.controller),
                    handleData: null
                }
            }

            // var option = {
            //     event: {
            //         beforeAysnc: beforeAysnc,
            //         onAysnc: null,
            //         afterAysnc: null,
            //         onItemDomCreate: null
            //     },
            //     view: {
            //         margin: 10
            //     },
            //     aynscTip: {
            //         container: document.getElementById('ctnAysncTip'),
            //         loading: '<span class="spinner flyme"><i></i></span>',
            //         end: '<span class="text">已到底部</span>',
            //     },
            //     pagination: {
            //         container: document.getElementById('ctnPagination')
            //     },
            //     createItemDom: createItemDom,
            //     aynsc: {
            //         able: function() {
            //             return _this.controller.total > _this.controller.query.page * _this.controller.query.limit
            //         },
            //         getData: aynsc
            //     }
            // }

            // function aynsc() {
            //     return _this.controller.search();
            // }

            // function beforeAysnc(items) {
            //     return items.map(function(item) {
            //         return {
            //             'height': item.img.height,
            //             'width': item.img.width,
            //             'data': item
            //         }
            //     })
            // }

            // function createItemDom(item) {
            //     var dom = document.createElement('div');
            //     dom.classList = 'wrapItem';
            //     dom.dataset.id = item.id
            //     dom.innerHTML = '\
            //     <img class="itemImg" src="' + AppConfig.path.image + '/plant/transmog/' + item.img.name + '">\
            //     <div class="infoBox">\
            //         <span class="name">' + item.name + '</span>\
            //         <span class="author" data-id="' + item.author.id + '">' + item.author.name + '</span>\
            //         <div class="wrapAction">\
            //             <span class="actionItem" data-action="praise">\
            //                 <span class="icon iconfont icon-praise"></span>\
            //                 <span class="num">' + NumberUtil.limitMax(item.remark.praise, 999) + '</span>\
            //             </span>\
            //             <span class="actionItem" data-action="comment">\
            //                 <span class="icon iconfont icon-comment"></span>\
            //                 <span class="num">' + NumberUtil.limitMax(item.remark.comment, 999) + '</span>\
            //             </span>\
            //         </div>\
            //     </div>'

            //     return dom;
            // }
            this.viewer = new(namespace('component.masonry'))(container, option);
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
    exports.gallery = Page
})(namespace('gallery'))