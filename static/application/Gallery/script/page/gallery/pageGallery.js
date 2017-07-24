var PageGallery = function() {
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
            this.initSideTool();
            this.initDataManager();
            this.initViewer();
            this.initSearch();
            this.attachEvent();
        },
        initTopDisplayboard: function() {

        },
        initSideTool: function() {

        },
        initSearch: function() {
            this.controller.search().done(function(result) {
                this.viewer.setItemView()
            })
        },
        initViewer: function() {
            var container = document.getElementById('containerItemList');
            var option = {
                createItemDom: createItemDom
            }

            function createItemDom(item) {
                var dom = document.createElement('div');
                dom.classList = 'wrapItem';
                dom.dataset.id = item.id
                dom.innerHTML = '\
                <img class="itemImg" src="' + AppConfig.staticSrc + '/galleryStore/' + item.id + '.jpg">\
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
            this.viewer = new Waterfall(container, option);
        },
        initDataManager: function() {
            this.controller = new DataManager(this)
            this.controller.init();
        },
        attachEvent: function() {

        },
        close: function() {

        },
    }
    return PageGallery
}()