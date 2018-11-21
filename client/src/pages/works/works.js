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
            this.api.getGalleryItemDetail(this.id).done(result => {
                if (result.success) {
                    this.store = $.extend({}, this.store, result.data);
                }
            }),
            this.api.getRelateGalleryItem(this.id).done(result => {
                if (result.success) {
                    this.store = $.extend({}, this.store, { relate: result.data });
                }
            })
        ).always(() => {
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
        this.api.getUserDetail(this.store.author.id).done(result => {
            this.cmpt.viewer.setAuthor(result.data);
        });
        this.cmpt.viewer
            .setRelateWorks(this.store.relate)
            .setAlbum(this.store.img)
            .setBase(this.store)
            .setModel(this.store.model)
            .setRemark(this.store.remark)
            .setTag(this.store.tag);
    }
    initViewer() {
        this.cmpt.viewer = new Viewer(this);
    }
    initComment() {
        let option = {};
        let container = this.container.querySelector(`.${this.CLN.ctnComment}`);
        this.cmpt.comment = new Comment(container, option);
    }
    attachEvent() {
        this.attachModelEvent();
    }
    attachModelEvent() {
        var $modelCtn = $(`.${this.CLN.ctnModel}`);
        $modelCtn.off('click').on('click', `.${this.CLN.modelItemIndex} ${this.CLN.item}`, function(e) {
            var $target = $(e.currentTarget);
            if ($target.hasClass('focus')) return;
            var index = $target[0].dataset.index;
            $modelCtn.find(`.${this.CLN.modelItemIndex} ${this.CLN.item}.focus`).removeClass('focus');
            $modelCtn.find(`.${this.CLN.divModel}.focus`).removeClass('focus');
            $target.addClass('focus');
            $ctn.find(`.${this.CLN.divModel}`)
                .eq(index)
                .addClass('focus');
        });
    }
    close() {}
}
