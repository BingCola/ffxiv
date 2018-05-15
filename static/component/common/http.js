(function(exports) {
    function Cmpt(host, platform) {
        this.host = host
        this.platform = platform;
        this.init();
    }
    Cmpt.prototype = {
        init: function() {
            $.ajaxSetup({
                converters: { "text json": true }, //防止JQuery自动转换JSON格式
                dataFilter: function(result, type) {
                    var data = result;

                    if (type === 'script') {
                        return data;
                    } else if (typeof data === 'string') {
                        if (/^\s*</.test(data)) {
                            //请求为HTML，直接返回
                            return data;
                        }
                        try {
                            data = JSON.parse(result);
                        } catch (e) {
                            return data;
                        }
                    }
                    return data;
                }
            })
        },

        get: function() {
            var url = arguments[0];

            if (this.platform == 'cordova' && this.host) {
                if (url.indexOf('.html') == -1) {
                    url = this.host + url;
                } else if (url[0] == '/') {
                    url = url.slice(1)
                }
            }
            return $.ajax({ url: url, type: 'Get', contentType: 'application/json' });
        },
        post: function() {
            var url = arguments[0];
            var data = arguments[1];
            if (this.platform == 'cordova' && this.host) {
                if (url.indexOf('.html') == -1) {
                    url = this.host + url;
                } else if (url[0] == '/') {
                    url = url.slice(1)
                }
            }
            return $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            });
        }
    }
    exports.http = Cmpt;
}(namespace('cmpt')))