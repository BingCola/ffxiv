// var path = ''
var bundle = {
    'script': {
        "base": [
            '/lib/jquery-3.0.0.min.js',
            '/lib/bootstrap/js/bootstrap.min.js',
            '/lib/moment-with-locales.min.js',
            '/component/common.js'
        ],
        "gallery": [
            '/component/common/http.js',
            '/component/common/router.js',
            '/component/common/account.js',
            '/component/custom/nav.js',
            '/component/common/waterfall.js',
            '/component/common/screen.js',

            '/app/Gallery/constant.js',
            '/app/Gallery/app.js',
        ],
        "gallery_home": [
            '/app/Gallery/page/home/page.js',
            '/app/Gallery/page/home/controller.js',
            '/app/Gallery/page/home/viewer.js'
        ],
        "gallery_gallery": [
            '/app/Gallery/page/gallery/page.js',
            '/app/Gallery/page/gallery/controller.js',
        ],
        "gallery_works": [
            '/component/comment.js',

            '/app/Gallery/page/works/page.js',
            '/app/Gallery/page/works/controller.js',
            '/app/Gallery/page/works/viewer.js',
        ],
        "gallery_post": [
            '/app/Gallery/page/post/page.js'
        ]
    },
    'style': {
        "base": [
            '/lib/bootstrap/css/bootstrap.min.css',
            // '/icon/iconFont/iconfont.css',
            '//at.alicdn.com/t/font_180029_6pw1liyzljl9pb9.css',

            '/style/c-ui.css',
            '/style/common.css',
            '/style/component.css',
        ],
        "gallery": [
            '/app/Gallery/style/common.css',
        ]
    }
}

// Object.keys(bundle).forEach(function(type) {
//     Object.keys(bundle[type]).forEach(function(package, index, self) {
//         bundle[type][package].forEach(function(src, i, self) {
//             self[i] = path + src
//         })
//     })
// })
module.exports = bundle