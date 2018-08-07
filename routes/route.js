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
            bundle.script.gallery,
            bundle.script.gallery_home,
        ),
        style: [].concat(
            bundle.style.base,
            bundle.style.gallery
        )
    });
});

router.get('/gallery', function(req, res, next) {
    res.render('indexGallery', {
        path: '',
        title: '艾欧泽亚幻化回廊',
        script: [].concat(
            bundle.script.base,
            bundle.script.gallery,
            bundle.script.gallery_gallery
        ),
        style: [].concat(
            bundle.style.base,
            bundle.style.gallery
        )
    });
});

router.get('/illustration', function(req, res, next) {
    res.render('indexGallery', {
        path: '',
        title: '艾欧泽亚幻化回廊',
        script: [].concat(
            bundle.script.base,
            bundle.script.gallery,
            bundle.script.gallery_illustration
        ),
        style: [].concat(
            bundle.style.base,
            bundle.style.gallery
        )
    });
});

router.get('/works', function(req, res, next) {
    res.render('indexGallery', {
        path: '',
        title: '艾欧泽亚幻化回廊',
        script: [].concat(
            bundle.script.base,
            bundle.script.gallery,
            bundle.script.gallery_works
        ),
        style: [].concat(
            bundle.style.base,
            bundle.style.gallery
        )
    });
});

router.get('/post', function(req, res, next) {
    res.render('indexGallery', {
        path: '',
        title: '艾欧泽亚幻化回廊',
        script: [].concat(
            bundle.script.base,
            bundle.script.gallery,
            bundle.script.gallery_post
        ),
        style: [].concat(
            bundle.style.base,
            bundle.style.gallery
        )
    });
});

module.exports = router;