var express = require('express');
var router = express.Router();


router.post('/getItem/overview', function(req, res, next) {
    var data = []
    for (var i = 0; i < req.body.limit; i++) {
        data.push({
            'id': i,
            'name': '测试图片' + i,
            'author': { 'name': '作者' + i, 'id': parseInt(i) },
            'time': new Date(),
            'remark': {
                'comment': parseInt(Math.random() * 1000),
                'praise': parseInt(Math.random() * 1000),
                'collect': parseInt(Math.random() * 1000),
                'shield': parseInt(Math.random() * 1000),
                'view': parseInt(Math.random() * 1000),
                'share': parseInt(Math.random() * 1000),
            },
            'userAction': {
                'isPraise': true,
                'isCollect': true,
                'isShield': false
            },
            'desc': '关于本作品的描述' + i
        })
    }
    res.send({
        success: true,
        data: data
    });
});
router.post('/getItem/prime', function(req, res, next) {
    res.send({
        success: true,
        data: [
            { id: 1, name: '测试图片001', 'author': { 'name': '作者1', 'id': 1 } },
            { id: 2, name: '测试图片002', 'author': { 'name': '作者2', 'id': 2 } },
            { id: 3, name: '测试图片003', 'author': { 'name': '作者3', 'id': 3 } },
            { id: 4, name: '测试图片004', 'author': { 'name': '作者4', 'id': 4 } },
            { id: 5, name: '测试图片005', 'author': { 'name': '作者5', 'id': 5 } },
            { id: 6, name: '测试图片006', 'author': { 'name': '作者6', 'id': 6 } }
        ]
    });
});

module.exports = router;