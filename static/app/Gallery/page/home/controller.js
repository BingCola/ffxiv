(function(exports) {
    function Controller(page, option) {
        this.page = page;
        this.option = option;
    }
    Controller.prototype = {
        init: function() {},
        getTopItem: function(limit) {
            let $promise = $.Deferred();
            CPlugin.api.getTopGalleryItem(limit).done((result) => {
                if (result && result.success) {
                    $promise.resolveWith(null, result.data);
                } else {
                    $promise.reject();
                }
            }).fail(() => {
                $promise.reject();
            });
            return $promise.promise();
        },
        getPrimeItem: function(data) {
            let $promise = $.Deferred();
            CPlugin.api.getPrimeGalleryItem(data).done((result) => {
                if (result && result.success) {
                    $promise.resolveWith(null, result.data);
                } else {
                    $promise.reject();
                }
            }).fail(() => {
                $promise.reject();
            });
            return $promise.promise();

        },
        getLatestItem: function(data) {
            let $promise = $.Deferred();
            CPlugin.api.getLatestGalleryItem(data).done((result) => {
                if (result && result.success) {
                    $promise.resolveWith(null, result.data);
                } else {
                    $promise.reject();
                }
            }).fail(() => {
                $promise.reject();
            });
            return $promise.promise();
        }
    }
    exports.controller = Controller;
})(namespace('gallery.home'))