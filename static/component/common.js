//命名空间控件
(function(exports) {
    exports.namespace = function(path) {
        var obj = window;
        path = path.split('.');

        path.forEach(function(p, i) {
            p = p.trim();
            if (i === 0 && p === 'window') return;
            obj = obj[p] = obj[p] || {};
        });

        return obj;
    };
}(window));

//时间格式初始化
function toDate() {
    // return new (Function.prototype.bind.apply(Date,Array.prototype.concat.apply([null],arguments)))()
    if (arguments[0]) {
        if (arguments.length == 1) {
            return arguments[0].toDate();
        } else {
            return new(Function.prototype.bind.apply(Date, Array.prototype.concat.apply([null], arguments)))();
        }
    } else {
        return new Date();
    }
};
String.prototype.toDate = function() {
    var str = this;
    return new Date(str);
};

Number.prototype.toDate = function() {
    return new Date(this);
};

Date.prototype.toDate = function() {
    return new Date(this);
};
//对Date的扩展，将 Date 转化为指定格式的String       
//月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
//eg:       
//(new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423       
//(new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       
//(new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04       
//(new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04       
//(new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18       
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "S": this.getMilliseconds() //毫秒           
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468" : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};
// 生成 object id - 24 位
var ObjectId = function() {
    // 前 13 位，unix 时间戳
    var timestamp = new Date().valueOf();
    // 中间 3 位，用户id，不足补 0，超过从前面截断
    var userId = ('000' + ((window.AppConfig && window.AppConfig.userId) || '000')).slice(-3);
    // 最后 8 位，随机十六进制数
    var hex8 = ('00000000' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16)).slice(-8);

    return timestamp + userId + hex8;
};


// 字符串格式化替换
String.prototype.format = function(store) {
    var str = this;
    var pattern = new RegExp('<%(\\w+)%>', 'g');
    var match = null;
    while ((match = pattern.exec(str)) !== null) {
        str = str.replace(new RegExp(match[0], 'g'), store[match[1]] ? store[match[1]] : '')
    }
    return str
}

//时间相关处理
var DateUtil = (function() {
    var dateLocale = {
        month: {
            en: {
                month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            zh: {
                month_names: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                month_names_short: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            }
        }
    };

    function getWeekNumber(d) {
        d = new Date(+d);
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        var yearStart = new Date(d.getFullYear(), 0, 1);
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return [d.getFullYear(), weekNo];
    }

    function getLastWeekNumberOf(y, w) {
        w -= 1;
        if (w === 0) {
            y = y - 1;
            w = 52;
        }
        return [y, w];
    }

    function getNextWeekNumberOf(y, w) {
        w += 1;
        if (w === 53) {
            y += 1;
            w = 1;
        }
        return [y, w];
    }

    function isLeapYear(y) {
        if (Object.prototype.toString.call(y) === '[object Date]') {
            y = y.getFullYear();
        }
        return ((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0);
    }

    function daysInMonth(dt) {
        var m = dt.getMonth();
        if (m === 1) {
            return isLeapYear(dt) ? 29 : 28;
        }
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
    }

    function getFirstDayOfWeek(year, week) {
        var d = new Date(year, 0, 1),
            offset = d.getTimezoneOffset();
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));

        d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 *
            (week + (year == d.getFullYear() ? -1 : 0)));

        d.setTime(d.getTime() +
            (d.getTimezoneOffset() - offset) * 60 * 1000);

        d.setDate(d.getDate() - 3);

        return d;
    }

    function getDateRangeOnWeekNumber(year, week) {
        if (!year || !week) {
            return;
        }
        var firstDay = getFirstDayOfWeek(year, week),
            lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);
        return [firstDay, lastDay];
    }

    function getMonthName(index, language) {
        var monthList = language && language in dateLocale.month ? dateLocale.month[language].month_names : dateLocale.month['en'].month_names;
        return monthList[index];
    }

    function getMonthNameShort(index, language) {
        var monthList = language && language in dateLocale.month ? dateLocale.month[language].month_names_short : dateLocale.month['en'].month_names_short;
        return monthList[index];
    }

    function getLastMonth(currentMonth) {
        if (!currentMonth) {
            currentMonth = new Date().getMonth() + 1;
        }
        if (currentMonth === 1) {
            return 12;
        } else {
            return currentMonth - 1;
        }
    }

    function getNextMonth(currentMonth) {
        if (!currentMonth) {
            currentMonth = new Date().getMonth() + 1;
        }
        if (currentMonth === 12) {
            return 1;
        } else {
            return currentMonth + 1;
        }
    }

    /**
     * get the relative date info from date2 according to date1
     * TESTS:
     * TEST_1
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2015-05-04 14:41:57'))
     * output: "4 days ago"
     * TEST_2
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2015-05-08 15:41:57'))
     * output: "21 minutes ago"
     * TEST_3
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2015-04-04 14:41:57'))
     * output: "34 days ago"
     * TEST_4
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2014-05-04 14:41:57'))
     * output: "1 year ago"
     */
    function getRelativeDateInfo(date1, date2) {
        var now = new Date();
        var lang = 'zh';
        var value1, value2, ts, info;

        // deal with all empty
        if (!date1 && !date2) return '';

        date1 = +new Date(date1);
        if (isNaN(date1)) date1 = ''
        date2 = +new Date(date2);
        if (isNaN(date2)) date2 = ''

        value1 = (date1 || now).valueOf();
        value2 = (date2 || now).valueOf();

        // do Math.abs, and turn millisecond to second
        ts = Math.floor(Math.abs(value1 - value2) / 1000);

        switch (true) {
            // seconds level
            // will show "n second(s) ago/later"
            case ts < 60:
                info = ts + (ts === 1 ? ' second' : ' seconds');
                break;
                // minutes level
                // will show "n minute(s) ago/later"
            case ts < 3600 /*60 * 60*/ :
                ts = Math.floor(ts / 60);
                info = ts + (ts === 1 ? ' minute' : ' minutes');
                break;
                // hours level
                // will show "n hour(s) ago/later"
            case ts < 86400 /*60 * 60 * 24*/ :
                ts = Math.floor(ts / (3600 /*60 * 60*/ ));
                info = ts + (ts === 1 ? ' hour' : ' hours');
                break;
                // days level
                // will show "n day(s) ago/later"
            case ts < 31536000 /*60 * 60 * 24 * 365*/ :
                ts = Math.floor(ts / (86400 /*60 * 60 * 24*/ ));
                info = ts + (ts === 1 ? ' day' : ' days');
                break;
                // years level
                // will show "n year(s) ago/later"
            default:
                ts = Math.floor(ts / (31536000 /*60 * 60 * 24 * 365*/ ));
                info = ts + (ts === 1 ? ' year' : ' years');
                break;
        }
        info += value1 <= value2 ? ' ago' : ' later';
        if (lang === 'zh') {
            info = info.replace(/\s(seconds?|minutes?|hours?|days?|years?)\s(ago|later)$/, function($0, $1, $2) {
                var rs = '';
                if ($1.indexOf('second') > -1) rs += '秒';
                if ($1.indexOf('minute') > -1) rs += '分钟';
                if ($1.indexOf('hour') > -1) rs += '小时';
                if ($1.indexOf('day') > -1) rs += '天';
                if ($1.indexOf('year') > -1) rs += '年';
                if ($2 === 'ago') rs += '前';
                if ($2 === 'later') rs += '后';
                return rs;
            });
        }
        return info;
    }

    return {
        getWeekNumber: getWeekNumber,
        isLeapYear: isLeapYear,
        daysInMonth: daysInMonth,
        getLastWeekNumberOf: getLastWeekNumberOf,
        getNextWeekNumberOf: getNextWeekNumberOf,
        getDateRangeOnWeekNumber: getDateRangeOnWeekNumber,
        getFirstDayOfWeek: getFirstDayOfWeek,
        getMonthName: getMonthName,
        getMonthNameShort: getMonthNameShort,
        getLastMonth: getLastMonth,
        getNextMonth: getNextMonth,
        getRelativeDateInfo: getRelativeDateInfo,
        DATA_FORMAT: {
            FULL_DATETIME: 'yyyy-mm-dd hh:ii:ss',
            FULL_DATETIME_CHANGE: 'yyyy-MM-dd HH:mm:ss',
            FULL_DATETIME_ALL_SEC_CHANGE: 'yyyy-MM-dd 00:00:00',
            FULL_DATETIME_ZERO_SEC_CHANGE: 'yyyy-MM-dd HH:mm:00',
            FULL_DATETIME_NO_SEC_CHANGE: 'yyyy-MM-dd HH:mm',
            FULL_DATETIME_ZERO_SEC: 'yyyy-mm-dd hh:ii:00',
            FULL_DATETIME_HH_00_00: 'yyyy-mm-dd hh:00:00',
            FULL_DATETIME_00_00_00: 'yyyy-mm-dd 00:00:00',
            FULL_DATETIME_NO_SEC: 'yyyy-mm-dd hh:ii',
            FULL_DATETIME_HH_00: 'yyyy-mm-dd hh:00',
            FULL_DATETIME_00_00: 'yyyy-mm-dd 00:00',
            FULL_DATE: 'yyyy-mm-dd',
            TIME: 'hh:ii:ss',
            TIME_HOUR_MINUTE: 'hh:ii',
            TIME_ZERO_SEC: 'hh:ii:00'
        }
    }
})();