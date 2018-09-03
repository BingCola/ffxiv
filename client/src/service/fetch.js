import { API_HOST } from './config';

export default class Fetch {
    constructor(opt) {
        this.option = opt;
    }

    get DEFAULT_OPTION() {
        return {
            host: API_HOST
        };
    }

    get DEFAULT_REQUEST_OPTION() {
        return {
            method: 'post',
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
        });
    }

    get(url, data, option = {}) {
        var url = arguments[0];
        return $.ajax({ url: url, type: 'Get', contentType: 'application/json' });
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
}
