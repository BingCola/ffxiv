const format = function(number, symbol, nan) {
    let num = Number(number);
    if (isNaN(num)) return typeof nan == typeof void 0 ? '--' : nan;
    if (Math.abs(num) > 10) {
        num = parseInt(num) + '';
        let re = /\d{1,3}(?=(\d{3})+$)/g;
        let n1 = num.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
            return s1.replace(re, '$&,') + s2;
        });
        return n1;
    } else {
        return Number(num.toFixed(1)) + '';
    }
};
const toFixed = function(number, limit, option = {}, nan) {
    let fixed = option && typeof option.fixed != typeof void 0 ? option.fixed : 1;
    let num = Number(number);
    if (isNaN(num)) return typeof nan == typeof void 0 ? '--' : nan;
    if (!limit && limit !== 0) limit = 10;
    if (Math.abs(num) > limit) {
        return parseInt(num) + '';
    } else {
        return Number(num.toFixed(fixed)) + '';
    }
};

const transferMagnitude = function(number, option = {}, nan) {
    let num = Number(number);
    if (isNaN(num)) return typeof nan == typeof void 0 ? '--' : nan;

    let units = ['', 'k', 'M', 'G'];
    let start = !isNaN(Number(option)) ? Number(option) : Number(option.start) || 0;

    let end = option.end || units.length;
    let split = option.split || 3;
    let min = option.min || false;
    let fix = option.fix || 0;
    let fixMax = option.fixMax || 10;

    if (min && num < min) {
        return num;
    }
    let splitNumber = Math.pow(10, split);
    let value = num;
    let unit = units[start];

    for (let i = 0; i < end - start; i++) {
        if (Math.abs(num / Math.pow(splitNumber, i)) >= 1) {
            value = num / Math.pow(splitNumber, i);
            unit = units[start + i];
        } else {
            break;
        }
    }
    let text = '';
    if (value < fixMax) {
        text = (fix ? parseFloat(value.toFixed(fix)) : NumberUtil.toFixed(value)) + unit;
    } else {
        text = (fix ? parseFloat(value.toFixed(fix)) : parseInt(value)) + unit;
    }
    return text;
};

const limitMax = function(number, max) {
    let num = Number(number);
    if (isNaN(num)) return 0;
    if (!max) {
        return num;
    } else {
        if (max < num && !isNaN(Number(max))) {
            return max + '+';
        } else {
            return num;
        }
    }
};
const getMagnitude = function(magnitude) {
    let map = {
        '0': '',
        '1': 'k',
        '2': 'M',
        '3': 'G'
    };
    return map[magnitude] || '';
};
export default {
    format,
    toFixed,
    transferMagnitude,
    limitMax,
    getMagnitude
};
