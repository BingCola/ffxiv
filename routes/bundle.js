// var path = ''
var bundle = {
    'script': {
        "base": [
            '/lib/jquery-3.0.0.min.js',
            '/lib/bootstrap/js/bootstrap.min.js'
        ],
        "gallery": [
            '/plugin/webAPI.js',
            '/plugin/router.js',
            '/plugin/account.js',
            '/plugin/nav.js',
            '/plugin/waterfall.js',

            '/application/Gallery/constant.js',
            '/application/Gallery/app.js',
            '/application/Gallery/script/page/gallery/pageGallery.js',
            '/application/Gallery/script/page/gallery/dataManager.js'
        ]
    },
    'style': {
        "base": [
            '/lib/bootstrap/css/bootstrap.min.css',
            '/icon/iconFont/iconfont.css',
        ],
        "gallery": [
            '/application/Gallery/style/common.css'
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