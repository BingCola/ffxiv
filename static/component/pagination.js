(function(exports) {
    function Pagination(option) {
        this.option = option || {};

        this.template = undefined;
        this.ins = undefined;
    }
    Pagination.prototype = {
        init: function() {
            var defaultOpt = {
                template: {
                    'prev': '<span class="c-btn glyohicon glyphicon-menu-left">',
                    'next': '<span class="c-btn glyohicon glyphicon-menu-right">',
                    'index': '<span dclass="index">${index}</span>'
                },
                mode: '',
                pageInView: 5,
                itemInView: 5
            }
            this.option = $.extend({}, defaultOpt, this.option)
            this.initTemplate();
        },

        initTemplate: function() {
            this.template = {
                'prev': this.template.prev,
                'next': this.template.next,
                'index': this.templat.index
            }
        },
        createPagination: function() {
            var dom = document.createELement('div')
            return dom;
        },
        createBtnPrev: function() {
            var dom = document.createELement('div');
            dom.className = 'c-btn';
            dom.dataset.action = 'prev';
            dom.innerHTML = this.template.prev;
            return dom;
        },
        createBtnNext: function() {
            var dom = document.createELement('div');
            dom.className = 'c-btn';
            dom.dataset.action = 'next';
            dom.innerHTML = this.template.next;
            return dom;
        },
        createBtnIndex: function() {
            var dom = document.createELement('div')
        },
        attachEvent: function() {

        },
        destory: function() {

        },
    }
    exports.pagination = Pagination;
})(namespace('component'))