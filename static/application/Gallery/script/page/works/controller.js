(function(exports) {
    function Controller(page, option) {
        this.page = page;
        this.option = option;
        this.query = undefined;

        this.total = 0;
    }
    Controller.prototype = {
        init: function() {},
        getWorksItem: function() {
            return WebAPI.get('/gallery/getItem/detail/' + option.id, )
        }
    }
    exports.controller = Controller;
})(namespace('gallery.works'))