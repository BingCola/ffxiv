import Base from '../plugin';
import style from './comment.scss';

export default class Comment extends Base {
    constructor() {
        super(...arguments);
    }
    get CLASSNAMES() {
        return style;
    }
    setComment(data) {
        data.forEach(
            function() {
                this.setCommentItem(data, this.container.querySelector('.ctnCommentList'));
            }.bind(this)
        );
    }
    setCommentItem(data, container, parent) {
        var dom = this.createCommentDom(data, parent);
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
    }

    setCommentSubItem(data, ctn) {
        var ctn = parent.querySelector('.sub');
        data.reply.forEach(function() {
            var dom = document.createCommentDom();
            ctn.appendChild(dom);
        });
        if (data.reply > 5) {
            ctn.appendChild();
        }
    }

    createCommentDom(data, parent) {
        var dom = document.createElement('div');
        dom.className = 'wrapComment';
        dom.innerHTML =
            '\
            <div class="main">\
                <img class="portrait c-portrait" src="' +
            AppConfig.userImgSrc +
            data.user.id +
            '.png">\
                <span class="name">' +
            data.user.name +
            '</span>\
                <span class="text">' +
            data.text +
            '</span>\
                <span class="extend">\
                    <span class="floor">#' +
            data.floor +
            '</span>\
                    <span class="time">' +
            new Date(data.time).format('yyyy-MM-dd HH:mm:ss') +
            '</span>\
                    <span class="c-btn" data-action="reply">回复</span>\
                    <span class="c-btn" data-action="for"><span class="iconfont icon-for"></span><span class="num">' +
            data.for +
            '</span></span>\
                    <span class="c-btn" data-action="against"><span class="iconfont icon-against"></span><span class="num">' +
            data.against +
            '</span></span>\
                /span>\
            </div>\
            ';
        return dom;
    }

    createPagination(len) {
        var itemPerPage = 5;
        var maxPageInView = 5;
        var dom = document.createElement('div');
        if (len > maxPageInView) {
            dom.innerHTML = '';
        }
        for (var i = 0; i < len; i++) {
            dom.innerHTML += '<span class="spIndex">' + (i + 1) + '</span>';
        }
    }
    setCommentIpt() {}
    attachEvent() {}
}
