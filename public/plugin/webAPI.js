var WebAPI = (function() {


    function requestFailHandle(result) {
        if (result && result.status == 401) {
            console.log('request fail')
        }
    }

    function WebAPI() {}

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
                    console.log('request error: ' + e + ', the data is :' + data);
                    return data;
                }
            }

            if (data) {
                if (data.error) {
                    switch (data.error) {
                        case 'token_invalid':
                            {
                                console.log(this.url + ' (' + data.error + ': code"' + data.msg + '")');
                                //TODO 测试confirm
                                confirm(i18n_resource.error.token[data.msg] + '. ' + i18n_resource.error.relogin + '.', function() {
                                    location.href = '/';
                                });
                                throw data.error;
                            }
                        case 'historyData':
                            {
                                console.log(this.url + ' (' + data.error + ': code"' + data.msg + '")');
                                return {};
                            }
                        default:
                            break;
                    }
                }
                if (data.code == 403) {
                    console.log(this.url + ' (' + data.msg + '")');
                    return {};
                }
            }
            return data;
        }
    });

    WebAPI.post = function(url, data, isMock) {
        if (typeof cordova != 'undefined' && AppConfig.host) {
            if (url.indexOf('.html') == -1) {
                url = AppConfig.host + url;
            } else if (url[0] == '/') {
                url = url.slice(1)
            }
        }
        return $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).fail(requestFailHandle);
    };

    WebAPI.get = function(url, isMock) {

        if (typeof cordova != 'undefined' && AppConfig.host) {
            if (url.indexOf('.html') == -1) {
                url = AppConfig.host + url;
            } else if (url[0] == '/') {
                url = url.slice(1)
            }
        }
        return $.ajax({ url: url, type: 'Get', contentType: 'application/json' }).fail(requestFailHandle);
    };

    WebAPI.getHistoryDS = function(callback) {

    };

    WebAPI.getHistory = function(callback) {

    };

    //用于调试工具跨域并且server端异步响应情形
    WebAPI.ajaxForDebugTool = function(ajaxObj, host, dtuName, endpoint) {
        var defaultUrl = 'http://' + host + '/' + endpoint + '/' + dtuName,
            defaultAjaxObj = {
                url: defaultUrl,
                crossDomain: true,
                dataType: 'json'
            },
            dfd, timer = 10,
            intervalFlags, url, requestFlag = 'requestFlag=' + new Date().getTime() + Math.ceil(Math.random() * 100);
        $.extend(defaultAjaxObj, ajaxObj);
        url = defaultAjaxObj.url;
        if (url.indexOf('?') < 0) {
            requestFlag = '?' + requestFlag
        } else {
            requestFlag = '&' + requestFlag
        }
        var userId = BEOPUtil.getCookie('userId');
        //跨域cookie无法发送问题
        defaultAjaxObj.url += requestFlag + '&userId=' + userId;

        return $.ajax(defaultAjaxObj).then(function(result) {
            dfd = $.Deferred();
            if (result.success) {
                intervalFlags = setInterval(function() {
                    if (timer < 0) {
                        clearInterval(intervalFlags);
                        return dfd.reject({ success: false, msg: 'no response from server' });
                    }
                    $.ajax({
                        type: 'GET',
                        url: 'http://' + host + '/getCMDResponse/' + dtuName + requestFlag,
                        crossDomain: true,
                        dataType: 'json'
                    }).done(function(result) {
                        if (result.success) {
                            clearInterval(intervalFlags);
                            return dfd.resolve(result);
                        }
                    }).always(function() {
                        timer--;
                    })
                }, 2000);
            } else {
                return dfd.reject(result);
            }
            return dfd;
        });
    };

    return WebAPI;
})();