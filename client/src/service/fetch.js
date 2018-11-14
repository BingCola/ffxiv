import { HOST } from 'config';

const CONFIG = {
    HOST: HOST
};
const DEFAULT_REQUEST_OPTION = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

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

const get = (url, data, option = {}) => {
    url = CONFIG.HOST + url;
    option = Object.assign({}, DEFAULT_REQUEST_OPTION, option);
    option.type = 'GET';
    return $.ajax({ url: url, type: 'GET', contentType: 'application/json' });
};
const post = (url, data, option = {}) => {
    return $.ajax({
        url: HOST + url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
};
const abort = () => {};

export default {
    get,
    post,
    abort
};
