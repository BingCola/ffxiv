var express = require('express');
var router = express.Router();
var bundle = require('./bundle')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('indexGallery', {
        path: '',
        title: '艾欧泽亚幻化回廊',
        script: [].concat(
            bundle.script.base,
            bundle.script.gallery
        ),
        style: [].concat(
            bundle.style.base,
            bundle.style.gallery
        )
    });
});

module.exports = router;