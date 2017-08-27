(function(exports) {
    function PageWorks() {
        this.controller = undefined;
        this.viewer = undefined;
        this.store = {};

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
            this.initController();
            this.initViewer();
            this.initComment();
            this.attachEvent();
            this.controller.getWorksInfo().done(function(result) {
                if (result.success) {
                    this.store = result.data;
                }
                this.setInfoViewer();
            })
        },
        initController: function() {
            var option = {
                id: 1
            }
            this.controller = new(namespace('gallery.works.controller'))(this, option)
        },
        setInfoViewer: function() {
            this.viewer.setUserViewer(this.store.author)
        },
        initViewer: function() {
            this.viewer = new(namespace('gallery.works.viewer'))(this, {})
        },
        initComment: function() {

        },
        attachEvent: function() {

        },
        close: function() {

        },
    }
    exports.works = PageWorks
})(namespace('gallery'))