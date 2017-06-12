var DataManager = (function() {
    function DataManager(page) {
        this.page = page;
        this.query = undefined;
    }
    DataManager.prototype = {
        init: function() {
            this.initQuery();
            this.search();
        },
        initQuery: function() {
            this.query = {
                page: 0,
                interval: 20,
                sort: 'id',
                asc: true,
                filter: '',
            }
        },
        setQueryToCommand: function() {

        },
        search: function() {

        },
        setHistory: function() {

        },
    }
    return DataManager
})()