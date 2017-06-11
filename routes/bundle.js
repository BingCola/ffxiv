// var path = ''
var bundle = {
    'script': {
        "base": [
            '/lib/jquery-3.0.0.min.js',
            '/lib/bootstrap/js/bootstrap.min.js'
        ],
        "gallery": []
    },
    'style': {
        "base": [
            '/lib/bootstrap/css/bootstrap.min.css'
        ],
        "gallery": []
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