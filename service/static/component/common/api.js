(function(exports) {
    class Cmpt {
        constructor(http){
            this.http = http;
        }
        get get(){
            return this.http.get
        }        
        get post(){
            return this.http.post
        }
    }
    exports.api = Cmpt;
}(namespace('cmpt')))