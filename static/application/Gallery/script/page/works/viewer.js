(function(exports) {
    function Viewer(page, option) {
        this.page = page;
        this.option = option;
        this.query = undefined;

        this.total = 0;
    }
    Viewer.prototype = {
        init: function() {},
        setAlbum: function(data) {

        },
        setBaseInfo: function() {

        },
        setRemark: function() {

        },
        setAuthorInfo: function() {

        },
        setModelInfo: function() {

        },
        setRecommend: function(data) {

        }
    }
    exports.viewer = Viewer;
})(namespace('gallery.works'))