(function(exports) {
    function Controller(page, option) {
        this.page = page;
        this.option = option;
    }
    Controller.prototype = {
        init: function() {},
        getTopRecommend: function() {
            return WebAPI.get('/gallery/getTopRecommend/5')
        },
        getModulePrimeItem: function(option) {
            return WebAPI.post('/gallery/getItem/prime', option)
        },
        getModuleLatestItem: function(option) {
            return WebAPI.post('/gallery/getItem/latest', option)
        }
    }
    exports.controller = Controller;
})(namespace('gallery.home'))