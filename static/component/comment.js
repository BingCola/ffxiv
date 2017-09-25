(function(exports) {
    function Comment(container, option) {
        this.container = container;
        this.option = option || {};
    }
    Comment.prototype = {
        init: function() {},
        setComment: function(data) {
            data.forEach(function() {
                this.setCommentItem(data)
            }.bind(this))
        },
        setCommentItem: function(data, container, parent) {
            var dom = this.createCommentDom(data)
            dom.dataset.level = data.level = parent.level + 1;
            container.appendChild(dom);
            if (data.reply) {
                data.reply.forEach(function(item) {
                    this.setCommentItem(item, dom.querySelector('.sub'), data)
                }.bind(this))
            }
        },

        createCommentDom: function(data) {
            var dom = document.createElement('div');
            dom.className = 'wrapComment'
            dom.innerHTML = '\
            <div class="main">\
                <img class=""portrait" src="' + AppConfig.userImgSrc + data.user.id + '.png">\
                <span class="text"></span>\
                <span class="funcGrp"><>\/span>\
            </div>\
            <div class="sub"></div>\
            ';
            return dom;
        },

        setCommentIpt: function() {

        },
        attachEvent: function() {

        },
        destory: function() {

        },
    }
    exports.comment = Comment;
})(namespace('component'))