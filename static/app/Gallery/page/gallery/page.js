(function(exports) {
    function Page() {
        this.controller = undefined;
        this.viewer = undefined;

        this.sideToolbar = undefined;
    }
    Page.prototype = {
        get LAYOUT() {
            return {
                view: "/app/Gallery/page/gallery/page.html",
                header: true,
                footer: true
            };
        },
        init: function() {
            this.initSideToolbar();
            this.initController();
            this.initViewer();
            // this.initSearch();
            this.attachEvent();
        },
        initSideToolbar: function() {
            this.sideToolbar = new (namespace("gallery.gallery.sideToolbar"))(this, document.getElementById("ctnFilter"));
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
            var container = document.getElementById("ctnItemList");
            var option = {
                layout: {
                    paddingTop: 37
                },
                item: {
                    imageKey: "img",
                    margin: 20
                },
                event: {
                    onScroll: null,
                    onClick: function(target) {
                        let id = target.dataset.id;
                        window.open("/works#id=1");
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
                        </div>`;
                    },

                    beforeAysnc: null,
                    afterAysnc: null,

                    bindCustomEvent: null
                },
                aysnc: {
                    getData: _this.controller.search.bind(this.controller),
                    handleData: null
                }
            };

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
            this.viewer = new (namespace("component.masonry"))(container, option);
            this.viewer.init();
        },
        initController: function() {
            this.controller = new (namespace("gallery.gallery.controller"))(this);
            this.controller.init();
        },
        attachEvent: function() {},
        close: function() {}
    };
    exports.gallery = Page;
})(namespace("gallery"));
