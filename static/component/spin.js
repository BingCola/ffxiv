(function(exports) {
    function Cmpt() {

    }
    Cmpt.prototype = {
        template: {
            style_1: '<div class="cp-spin-wrap style-1"><div class="body"></div><div class="background"></div></div>',
            style_2: `<div class="cp-spin-wrap style-2">               
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                </div>
                `,
            style_3: `<div class="cp-spin-wrap style-3">               
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>'
                </div>
                `,
            style_4: `<div class="cp-spin-wrap style-4">               
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>'
                </div>
                `,
        },
        spin: function($ctn, template) {
            if (!($ctn instanceof jQuery)) $ctn = $($ctn);
            var template = this.template['style_' + (template ? template : 1)];
            $ctn.append($(template));
        },
        stop: function($ctn) {
            if (!($ctn instanceof jQuery)) $ctn = $($ctn)
            $ctn.children('.cp-spin-wrap').remove();
        },
        destory: function() {}
    }
    exports.spin = Cmpt;
}(namespace('cmpt')))