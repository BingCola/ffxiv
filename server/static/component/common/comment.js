(function(exports) {
    function Comment(container, option) {
        this.container = container;
        this.option = option || {};
    }
    Comment.prototype = {
        init: function() {},
        setComment: function(data) {
            data.forEach(function() {
                this.setCommentItem(data, this.container.querySelector('.ctnCommentList'))
            }.bind(this))
        },
        setCommentItem: function(data, container, parent) {
            var dom = this.createCommentDom(data, parent)
            if (!parent) {
                dom.dataset.level = data.level = 0;
            } else {
                dom.dataset.level = data.level = parent.level + 1;
            }
            container.appendChild(dom);
            if (data.reply) {
                dom.innerHTML += '<div class="sub"></div>';
                // data.reply.forEach(function(item) {
                //     this.setCommentItem(item, dom.querySelector('.sub'), data)
                // }.bind(this))
                this.setCommentSubItem(data, dom.querySelector('.sub'));
            }
        },

        setCommentSubItem: function(data, ctn) {
            var ctn = parent.querySelector('.sub')
            data.reply.forEach(function() {
                var dom = document.createCommentDom();
                ctn.appendChild(dom)
            })
            if (data.reply > 5) {
                ctn.appendChild()
            }
        },

        createCommentDom: function(data, parent) {
            var dom = document.createElement('div');
            dom.className = 'wrapComment'
            dom.innerHTML = '\
            <div class="main">\
                <img class="portrait c-portrait" src="' + AppConfig.userImgSrc + data.user.id + '.png">\
                <span class="name">' + data.user.name + '</span>\
                <span class="text">' + data.text + '</span>\
                <span class="extend">\
                    <span class="floor">#' + data.floor + '</span>\
                    <span class="time">' + new Date(data.time).format('yyyy-MM-dd HH:mm:ss') + '</span>\
                    <span class="c-btn" data-action="reply">回复</span>\
                    <span class="c-btn" data-action="for"><span class="iconfont icon-for"></span><span class="num">' + data.for+'</span></span>\
                    <span class="c-btn" data-action="against"><span class="iconfont icon-against"></span><span class="num">' + data.against + '</span></span>\
                /span>\
            </div>\
            ';
            return dom;
        },

        createPagination: function(len) {
            var itemPerPage = 5;
            var maxPageInView = 5;
            var dom = document.createElement('div')
            if (len > maxPageInView) {
                dom.innerHTML = ''
            }
            for (var i = 0; i < len; i++) {
                dom.innerHTML += '<span class="spIndex">' + (i + 1) + '</span>'
            }
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