(function(exports) {
    function Controller(page, option) {
        this.page = page;
        this.option = option;
        this.query = undefined;

        this.total = 0;
    }
    Controller.prototype = {
        init: function() {},
        getWorksInfo: function(id) {
            return WebAPI.get('/gallery/getItem/detail/' + id)
        },
        getAuthorInfo: function(id) {
            return WebAPI.get('/user/info/' + id)
        },
        getRecommendInfo: function(id) {
            return WebAPI.get('/gallery/getItem/recommend/' + id)
        }
    }
    exports.controller = Controller;
})(namespace('gallery.works'))