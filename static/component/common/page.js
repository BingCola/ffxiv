(function(exports) {
    class Cmpt {
        constructor() {
            this._aysnc = [];
            this.pageCtn = CPlugin.screen.pageCtn;
            this.bodyCtn = CPlugin.screen.bodyCtn;
        }
        get LAYOUT() {
            return {};
        }
        get AYSNC() {
            return this._aysnc || [];
        }
        init() {}
        destroy() {}
        close() {
            this.destroy();
            this.stopAysnc();
        }
        stopAysnc() {
            this.AYSNC.forEach(item => {
                item.abort && item.abort();
            })
        }
    }
    exports.page = Cmpt;
}(namespace('cmpt')))