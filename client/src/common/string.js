String.prototype.fill = function(o, defaultVal, label) {
    var str = this.toString();
    if (!str) return '';
    var arrLabel = [];
    if (typeof label == 'string') {
        arrLabel = [label, label];
    } else if (label instanceof Array) {
        arrLabel = [label[0], label[1]];
    } else {
        arrLabel = ['{', '}'];
    }
    if (!o) return str;

    for (var p in o) {
        if (o.hasOwnProperty(p)) {
            str = str.replace(new RegExp(arrLabel[0] + p + arrLabel[1], 'g'), o[p]);
        }
    }

    if (typeof defaultVal !== 'undefined') {
        // str = str.replace(/{[^{}]*?}/g, defaultVal);
        str = str.replace(new RegExp(arrLabel[0] + '[^{}]*?' + arrLabel[1], 'g'), defaultVal);
    }

    return str;
};

String.prototype.fill2 = function() {
    if (arguments[0] === undefined) {
        return '';
    }
    if (arguments[0].constructor === Array) {
        var args = arguments[0];
    } else {
        var args = arguments;
    }

    // var i = 0;
    // var str = this.toString();
    // while (args[i]) str = str.replace('{'+i+'}', args[i++]);
    // return str;

    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

export default {};
