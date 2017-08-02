(function(exports) {
    function PageHomepage() {

    }
    PageHomepage.prototype = {
        show: function() {
            var _this = this;
            WebAPI.get('/application/Gallery/view/page/homepage/PageHomepage.html').done(function(resultHTML) {
                MainContainer.innerHTML = resultHTML;
                _this.init();
            })
        },
        init: function() {
            this.initDisplayBoard()
            this.initTransmogSection();
            this.initDecorateSection();
            this.initPictureSection();
            this.initGuideLine();

            this.attachEvent();
        },
        initDisplayBoard: function() {
            var container = document.getElementById('panelDisplayboard')
            var option = {
                template: -1
            }
            WebAPI.post('/gallery/getItem/prime', option).done(function(result) {
                if (result.success) {
                    var items = result.data
                }
            })
        },
        initTransmogSection: function() {
            var container = document.getElementById('panelTransmog')
            var option = {
                template: -1
            }
            WebAPI.post('/gallery/getItem/prime', option).done(function(result) {
                if (result.success) {
                    var items = result.data
                }
            })
        },
        initDecorateSection: function() {
            var container = document.getElementById('panelDecoration')
            var option = {
                template: -1
            }
            WebAPI.post('/gallery/getItem/prime', option).done(function(result) {
                if (result.success) {
                    var items = result.data
                }
            })
        },
        initPictureSection: function() {
            var container = document.getElementById('panelPicture')
            var option = {
                template: -1
            }
            WebAPI.post('/gallery/getItem/prime', option).done(function(result) {
                if (result.success) {
                    var items = result.data
                }
            })
        },
        initGuideLine: function() {

        },
        attachEvent: function() {

        },
        close: function() {

        },
    }
    exports.homepage = PageHomepage
})(namespace('gallery'))