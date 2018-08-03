// var path = ''
var bundle = {
    script: {
        base: ["/lib/jquery-3.0.0.min.js", "/lib/moment-with-locales.min.js", "/component/common/common.js"],
        gallery: [
            "/component/common/http.js",
            "/component/common/api.js",
            "/component/common/router.js",
            "/component/common/masonry.js",
            "/component/common/page.js",
            "/component/common/screen.js",
            "/component/common/spinner.js",

            "/component/custom/authorize.js",
            "/component/custom/nav.js",

            "/app/Gallery/constant.js",
            "/app/Gallery/app.js",
            "/app/Gallery/api.js"
        ],
        gallery_home: ["/app/Gallery/page/home/page.js", "/app/Gallery/page/home/controller.js", "/app/Gallery/page/home/viewer.js", "/app/Gallery/init.js"],
        gallery_gallery: [
            "/app/Gallery/page/gallery/page.js",
            "/app/Gallery/page/gallery/controller.js",
            "/app/Gallery/page/gallery/component/sideToolbar.js",

            "/app/Gallery/page/gallery/init.js"
        ],
        gallery_works: [
            "/component/common/comment.js",

            "/app/Gallery/page/works/page.js",
            "/app/Gallery/page/works/controller.js",
            "/app/Gallery/page/works/viewer.js",

            "/app/Gallery/page/works/init.js"
        ],
        gallery_post: ["/app/Gallery/page/post/page.js"]
    },
    style: {
        base: [
            // '/lib/bootstrap/css/bootstrap.min.css',
            // '/icon/iconFont/iconfont.css',
            "//at.alicdn.com/t/font_180029_r8zblo0n2o4m42t9.css",

            "/style/c-ui.css",
            "/style/custom.css",
            "/style/component.css",
            "/style/customComponent.css"
        ],
        gallery: ["/app/Gallery/style/common.css"]
    }
};

// Object.keys(bundle).forEach(function(type) {
//     Object.keys(bundle[type]).forEach(function(package, index, self) {
//         bundle[type][package].forEach(function(src, i, self) {
//             self[i] = path + src
//         })
//     })
// })
module.exports = bundle;
