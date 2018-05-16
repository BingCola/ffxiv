(function(exports) {
    function Cmpt(option) {
        this.option = option || {};
        this.init();
    }
    Cmpt.prototype = {
        init: function() {
            var ctnOption = this.option.container || {};
            this.screenCtn = ctnOption.screen || document.querySelector('.c-screen');
            this.mainCtn = ctnOption.main || document.querySelector('.c-page-main');
            this.bodyCtn = ctnOption.body || document.querySelector('.c-page-body');
            this.headerCtn = ctnOption.header || document.querySelector('.c-page-header');
        },
        setLayout: function(setting) {
            if (setting && setting.header) this.setHeader(setting.header)
            if (!(setting && setting.view)) {
                return $.Deferred().resolve();
            } else if (setting.view.indexOf('.html') == -1) {
                this.mainCtn.innerHTML = setting.view;
                return $.Deferred().resolve();
            } else {
                return CPlugin.http.get(setting.view).done(function(result) {
                    this.mainCtn.innerHTML = result;
                }.bind(this))
            }
        },
        setHeader: function(setting) {
            if (!setting && setting !== false) return;
            if (setting.view) {
                this.headerCtn.innerHTML = setting.view;
            }
            if (setting === true || setting.show === true) {
                this.headerCtn.classList.remove('hide')
                this.screenCtn.classList.add('header')
            } else if (setting === false || setting.show === false) {
                this.headerCtn.classList.add('hide');
                this.screenCtn.classList.remove('header')
            }
        },
    }
    exports.screen = Cmpt;
})(namespace('cmpt'))

;

(function(exports) {
    class Cmpt extends exports {
        constructor() {
            super();
        }

        init() {
            var ctnOption = this.option.container || {};
            this.screenCtn = ctnOption.screen || document.querySelector('.c-screen');
        }
        initCtn(setting) {
            if (!Router.current.layout || setting.upper != Router.current.layout.upper || !setting.upper) {
                this.setNewPageCtn(setting);
                this.pageCtn = document.querySelector('.c-page.hide');
                this.headerCtn = document.querySelector('.hide .c-page-header');
                this.footerCtn = document.querySelector('.hide .c-page-footer');
                this.bodyCtn = document.querySelector('.hide .c-page-body');
                this.mainCtn = document.querySelector('.hide .c-page-main');
                return true;
            }
            return false;
        }
        bindFooterEvent(setting) {
            $(this.footerCtn).on('click', '.c-footer-item', e => {
                if (e.currentTarget.dataset.page) {
                    $(e.currentTarget).siblings().removeClass('focus');
                    $(e.currentTarget).addClass('focus');
                    Router.to(e.currentTarget.dataset.page)
                }
            })
            $(this.footerCtn).find(`[data-module="${setting.module}"]`).addClass('focus')
        }
        clearPrevCtn(setting) {
            $(document.querySelector('.c-page.focus')).remove();
            this.pageCtn.classList.remove('hide')
            this.pageCtn.classList.add('focus')
        }
        setNewPageCtn(setting) {
            var dom = document.createElement('div');
            dom.className = 'c-page hide';
            dom.innerHTML = `
            <div class="c-page-header"></div>
            <div class="c-page-body"><div class="c-page-main"></div></div>
            <div class="c-page-footer"></div>`
            this.screenCtn.appendChild(dom)
        }
        setLayout(setting) {
            var pageToggle = this.initCtn(setting);
            if (setting && setting.header) this.setHeader(setting.header)
            if (pageToggle && setting && setting.footer) {
                setting.footer.module = setting.module;
                this.setFooter(setting.footer)
            }
            if (!(setting && setting.view)) {
                return $.Deferred().resolve();
            } else if (setting.view.indexOf('.html') == -1) {
                this.mainCtn.innerHTML = setting.view;
                pageToggle && this.clearPrevCtn();
                return $.Deferred().resolve();
            } else {
                return CPlugin.http.get(setting.view).done(function(result) {
                    this.mainCtn.innerHTML = result;
                    pageToggle && this.clearPrevCtn();
                }.bind(this))
            }
        }
        setHeader(setting) {
            if (!setting && setting !== false) return;
            if (setting.view) {
                this.headerCtn.innerHTML = setting.view;
            }
            if (setting === true || setting.show === true) {
                this.headerCtn.classList.remove('hide')
                this.screenCtn.classList.add('header')
            } else if (setting === false || setting.show === false) {
                this.headerCtn.classList.add('hide');
                this.screenCtn.classList.remove('header')
            }
        }
        setFooter(setting) {
            if (!setting && setting !== false) return;
            if (setting.view) {
                this.footerCtn.innerHTML = setting.view;
            }
            if (setting === true || setting.show === true) {
                this.footerCtn.classList.remove('hide')
                this.screenCtn.classList.add('footer')
            } else if (setting === false || setting.show === false) {
                this.footerCtn.classList.add('hide');
                this.screenCtn.classList.remove('footer')
            }
            this.bindFooterEvent(setting);
        }
    }
    exports.m = Cmpt;
})(namespace('cmpt.screen'))