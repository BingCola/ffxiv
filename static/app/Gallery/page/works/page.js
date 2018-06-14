(function(exports) {
    class Page extends namespace('cmpt.page') {
        constructor(id) {
            super(...arguments)
            this.controller = undefined;
            this.viewer = undefined;
            this.store = {};
            this.id = id;

            this.comment = undefined;
        }
        get LAYOUT() {
            return {
                view: '/app/Gallery/page/works/page.html',
                header: true,
                footer: true
            }
        }

        init() {
            var _this = this;
            this.initController();
            this.initViewer();
            this.initComment();
            this.attachEvent();
            this.getData();
        }
        initController() {
            var option = {
                id: this.id
            }
            this.controller = new(namespace('gallery.works.controller'))(this, option)
        }
        getData() {
            var _this = this;
            $.when(this.controller.getWorksInfo(this.id).done(function(result) {
                    if (result.success) {
                        _this.store = $.extend({}, _this.store, result.data);
                    }
                }),
                this.controller.getRecommendInfo(this.id).done(function(result) {
                    if (result.success) {
                        _this.store = $.extend({}, _this.store, { recommend: result.data });
                    }
                })).always(function() {
                _this.setViewer();
            })
        }
        setViewer() {
            var _this = this;
            this.controller.getAuthorInfo(this.store.author.id).done(function(result) { _this.viewer.setAuthor(result.data) });
            this.viewer.setRecommend(this.store.recommend)
            this.viewer.setAlbum(this.store.img);
            this.viewer.setBase(this.store);
            this.viewer.setModel(this.store.model);
            this.viewer.setRemark(this.store.remark)
            this.viewer.setTag(this.store.tag)
        }
        initViewer() {
            this.viewer = new(namespace('gallery.works.viewer'))(this, {})
        }
        initComment() {
            var option = {};
            this.comment = new(namespace('component.comment'))(this, option)
        }
        attachEvent() {
            this.attachModelEvent();
        }
        attachModelEvent() {
            var $ctn = $('#ctnModelInfo');
            $ctn.off('click').on('click', '.spIndex', function(e) {
                var $target = $(e.currentTarget)
                if ($target.hasClass('focus')) return;
                var index = $target[0].dataset.index;
                $ctn.find('.spIndex.focus').removeClass('focus')
                $ctn.find('.divModel.focus').removeClass('focus')
                $target.addClass('focus');
                $ctn.find('.divModel').eq(index).addClass('focus')
            })
        }
        close() {

        }
    }
    exports.works = Page
})(namespace('gallery'))