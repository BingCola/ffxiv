// var path = ''
var bundle = {
    'script': {
        "base": [
            '/lib/jquery-3.0.0.min.js',
            '/lib/bootstrap/js/bootstrap.min.js',

            '/component/common.js'
        ],
        "gallery": [
            '/component/webAPI.js',
            '/component/router.js',
            '/component/account.js',
            '/component/nav.js',
            '/component/waterfall.js',

            '/application/Gallery/constant.js',
            '/application/Gallery/app.js',
        ],
        "gallery_home": [
            '/application/Gallery/script/page/home/pageHome.js'
        ],
        "gallery_gallery": [
            '/application/Gallery/script/page/gallery/pageGallery.js',
            '/application/Gallery/script/page/gallery/Controller.js',
        ],
        "gallery_works": [
            '/component/comment.js',

            '/application/Gallery/script/page/works/pageWorks.js',
            '/application/Gallery/script/page/works/controller.js',
            '/application/Gallery/script/page/works/viewer.js',
        ]
    },
    'style': {
        "base": [
            '/lib/bootstrap/css/bootstrap.min.css',
            '/icon/iconFont/iconfont.css',

            '/style/common.css',
            '/style/component.css',
        ],
        "gallery": [
            '/application/Gallery/style/common.css',
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