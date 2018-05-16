(function(exports) {
    class Cmpt {
        constructor() {
            this._aysnc = [];
        }
        get layout() {
            return {};
        }
        get aysnc() {
            return this._aysnc || [];
        }
        show() {
            this.setLayout.done(() => {
                this.init();
            })
        }
        setLayout() {
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
        }
        setHeader() {
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
        setFooter() {

        }
        init() {

        }
        destroy() {}
        close() {
            this.destroy();
            this.stopAysnc();
        }
        stopAysnc() {
            this.aysnc.forEach(item => {
                item.abort && item.abort();
            })
        }
    }
    exports.page = Cmpt;
}(namespace('cmpt')))