import { HOST } from '../config';

export default class Fetch {
    constructor(opt) {
        this.option = opt;
    }

    get CONFIG() {
        return {
            HOST: HOST
        };
    }

    get DEFAULT_REQUEST_OPTION() {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    init() {
        $.ajaxSetup({
            converters: { 'text json': true }, //防止JQuery自动转换JSON格式
            dataFilter: function(result, type) {
                var data = result;

                if (type === 'script') {
                    return data;
                } else if (typeof data === 'string') {
                    if (/^\s*</.test(data)) {
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
        });
    }

    get(url, data, option = {}) {
        url += this.CONFIG.HOST;
        option = Object.assign({}, this.DEFAULT_REQUEST_OPTION, option);
        option.type = 'GET';
        return $.ajax({ url: url, type: 'GET', contentType: 'application/json' });
    }
    post(url, data, option = {}) {
        var url = arguments[0];
        var data = arguments[1];
        return $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
    }
    abort() {}
}
