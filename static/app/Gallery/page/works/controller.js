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
            return CPlugin.api.getGalleryItemDetail(id)
        },
        getAuthorInfo: function(id) {
            return CPlugin.api.getUserDetail(id)
        },
        getRecommendInfo: function(id) {
            return CPlugin.api.getRelateGalleryItem(id)
        }
    }
    exports.controller = Controller;
})(namespace('gallery.works'))