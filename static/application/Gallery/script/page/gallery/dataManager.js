var DataManager = (function() {
    function DataManager(page) {
        this.page = page;
        this.query = undefined;
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
        search: function() {
            var deferred = $.Deferred();
            WebAPI.post('/gallery/getItem/overview', this.query).done(function(result) {
                if (result.data) {
                    deferred.resolve(this.screen, [result.data])
                } else {
                    deferred.reject()
                }
            })
            return deferred.promise()
        },
        setHistory: function() {

        },
    }
    return DataManager
})()