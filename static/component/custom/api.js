(function(exports) {
    class Cmpt{
        constructor(http){
            this.http = http
        }
    }
    exports.api = Cmpt;
}(namespace('cmpt')))