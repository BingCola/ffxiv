(function(exports) {
    function Comment(container, option) {
        this.container = container;
        this.option = option || {};
        this.view = {};

        this.store = [];
        this.cursor = {
            x: 0,
            y: 0,
            col: 0
        }
        this.colCursor = []
        this.aynscAble = true;
    }
    Comment.prototype = {
        init: function() {},
        destory: function() {

        },
    }
    exports.comment = Comment;
})(namespace('component'))