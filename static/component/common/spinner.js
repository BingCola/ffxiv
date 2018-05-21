(function(exports) {
    function Cmpt() {

    }
    Cmpt.prototype = {
        template: {
            style_1: '<div class="cp-spinner style-1"><div class="body"></div><div class="cp-spinner-overlay"></div></div>',
            style_2: `<div class="cp-spinner style-2">               
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                </div>
                `,
            style_3: `<div class="cp-spinner style-3">               
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>
                <div class="unit"></div>'
                </div>
                `,
            style_4: `<div class="cp-spinner style-4">               
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
            $ctn.children('.cp-spinner').remove();
        },
        destory: function() {}
    }
    exports.spinner = Cmpt;
}(namespace('cmpt')))