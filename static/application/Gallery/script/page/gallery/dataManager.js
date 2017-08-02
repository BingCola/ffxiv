(function(exports) {
    function DataManager(page, option) {
        this.page = page;
        this.option = option;
        this.query = undefined;

        this.total = 0;
    }
    DataManager.prototype = {
        init: function() {
            this.initQuery();
        },
        initQuery: function() {
            this.query = {
                page: 0,
                limit: 20,
                sort: 'id',
                asc: true,
                filter: '',
            }
        },
        setQueryToCommand: function() {

        },
        search: function(page) {
            var deferred = $.Deferred();
            var _this = this;
            if (page == null) {
                _this.query.page++;
            } else {
                _this.query.page = page;
            }
            WebAPI.post('/gallery/getItem/overview', this.query).done(function(result) {
                if (result.data && result.data.list) {
                    _this.total = result.data.total;
                    deferred.resolveWith(_this.screen, [result.data.list])
                } else {
                    deferred.reject()
                }
            })
            return deferred.promise()
        },
        setHistory: function() {

        },
    }
    exports.controller = DataManager;
})(namespace('gallery.gallery'))