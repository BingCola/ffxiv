var PageGallery = function() {
    function PageGallery() {
        this.manager = undefined;
    }
    PageGallery.prototype = {
        show: function() {
            var _this = this;
            WebAPI.get('/application/Gallery/view/page/gallery/pageGallery.html').done(function(resultHTML) {
                MainContainer.innerHTML - resultHTML;
                _this.init();
            })
        },
        init: function() {
            this.initSideTool();
            this.initSearch();
            this.initDataManager();
            this.attachEvent();
        },
        initTopDisplayboard: function() {

        },
        initSideTool: function() {

        },
        initSearch: function() {

        },
        initDataManager: function() {
            this.manager.init();
        },
        close: function() {

        },
    }
    return PageGallery
}()