(function(exports) {
    function PageWorks() {
        this.controller = undefined;
        this.viewer = undefined;
        this.store = {};
        this.id = 1;

        this.comment = undefined;
    }
    PageWorks.prototype = {
        show: function() {
            var _this = this;
            WebAPI.get('/application/Gallery/view/page/works/pageWorks.html').done(function(resultHTML) {
                MainContainer.innerHTML = resultHTML;
                _this.init();
            })
        },
        init: function() {
            var _this = this;
            this.initController();
            this.initViewer();
            this.initComment();
            this.attachEvent();
            this.getData();
        },
        initController: function() {
            var option = {
                id: 1
            }
            this.controller = new(namespace('gallery.works.controller'))(this, option)
        },
        getData: function() {
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
        },
        setViewer: function() {
            var _this = this;
            this.controller.getAuthorInfo(this.store.author.id).done(function() { _this.viewer.setAuthor(_this.store.author) });
            this.viewer.setRecommend(this.store.recommend)
            this.viewer.setAlbum(this.store.img);
            this.viewer.setBase(this.store);
            this.viewer.setModel(this.store.model);
            this.viewer.setRemark(this.store.remark)
            this.viewer.setTag(this.store.tag)
        },
        initViewer: function() {
            this.viewer = new(namespace('gallery.works.viewer'))(this, {})
        },
        initComment: function() {
            var option = {};
            this.comment = new(namespace('component.comment'))(this, option)
        },
        attachEvent: function() {

        },
        close: function() {

        },
    }
    exports.works = PageWorks
})(namespace('gallery'))