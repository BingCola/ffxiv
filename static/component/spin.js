(function(exports) {
    function Cmpt() {

    }
    Cmpt.prototype = {
        template: {
            style_1: '<div class="c-spin-wrap"><div class="c-spin"></div><div class="c-spin-background"></div></div>'
        },
        spin: function($ctn) {
            if (!($ctn instanceof jQuery)) $ctn = $($ctn)
            $ctn.append($(this.template.style_1));
        },
        stop: function($ctn) {
            if (!($ctn instanceof jQuery)) $ctn = $($ctn)
            $ctn.children('.c-spin-wrap').remove();
        },
        destory: function() {}
    }
    exports.spin = Cmpt;
}(namespace('cmpt')))