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
    var pattern = new RegExp('{(\\w+)}', 'g');
    var match = null;
    while ((match = pattern.exec(str)) !== null) {
        str = str.replace(new RegExp(match[0], 'g'), store[match[1]] ? store[match[1]] : '')
    }
    return str
}

window.NumberUtil = {
    limitMax: function(number, max) {
        let num = Number(number)
        if (isNaN(num)) return '--'
        if (num <= max) {
            return num;
        } else {
            return max + '+';
        }
    }
}