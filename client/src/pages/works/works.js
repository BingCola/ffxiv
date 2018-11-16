import CONSTANT from 'constant';
import { PATH } from 'config';

import Base from 'page';
import html from './works.html';
import style from './works.scss';

import Viewer from './components/viewer';
import Comment from 'comment/comment.js';

export default class Works extends Base {
    constructor(id) {
        super(...arguments);
        this.id = id;
    }
    get container() {
        return this.router.container;
    }
    get CLASSNAMES() {
        return style;
    }
    get HTML() {
        return html;
    }
    show() {
        this.attachEvent();
        this.getData();
    }
    getData() {
        $.when(
            this.api.getWorksInfo(this.id).done(result => {
                if (result.success) {
                    this.store = $.extend({}, this.store, result.data);
                }
            }),
            this.api.getRelateInfo(this.id).done(result => {
                if (result.success) {
                    this.store = $.extend({}, this.store, { relate: result.data });
                }
            })
        ).always(function() {
            this.setViewer();
        });
    }
    initCustomVariable() {
        this.store = {};
    }
    registerComponents() {
        this.initViewer();
        this.initComment();
    }
    setViewer() {
        this.api.getAuthorInfo(this.store.author.id).done(function(result) {
            this.cmpt.viewer.setAuthor(result.data);
        });
        this.cmpt.viewer
            .setRelateWorks(this.store.relate)
            .setAlbum(this.store.img)
            .setBaseInfo(this.store)
            .setModel(this.store.model)
            .setRemark(this.store.remark)
            .setTag(this.store.tag);
    }
    initViewer() {
        this.cmpt.viewer = new Viewer(this);
    }
    initComment() {
        this.cmpt.comment = new Comment();
    }
    attachEvent() {
        this.attachModelEvent();
    }
    attachModelEvent() {
        var $ctn = $('#ctnModelInfo');
        $ctn.off('click').on('click', '.spIndex', function(e) {
            var $target = $(e.currentTarget);
            if ($target.hasClass('focus')) return;
            var index = $target[0].dataset.index;
            $ctn.find('.spIndex.focus').removeClass('focus');
            $ctn.find('.divModel.focus').removeClass('focus');
            $target.addClass('focus');
            $ctn.find('.divModel')
                .eq(index)
                .addClass('focus');
        });
    }
    close() {}
}
