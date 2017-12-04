var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/info/:id', function(req, res, next) {
    var id = req.params.id;
    res.send({
        success: true,
        data: {
            'id': id,
            'name': '作者' + id,
            'server': 1,
            'desc': '这是个人简介' + id,
            'attention': parseInt(Math.random() * 2000),
            'works': parseInt(Math.random() * 100),
            'fans': parseInt(Math.random() * 100)
        }
    });
});

router.get('/login', function(req, res, next) {
    var id = req.params.id;
    res.send({
        success: true,
        data: {
            'id': 1,
            'account': 'BingCola1993',
            'pwd': '123456',
            'name': '可乐',
            'role': 1,
            'mail': '841820707@qq.com',
            'phone': '',
            'communication': {
                'qq': '8888888888',
                'wechat': ''
            },
            'score': 700,
            'nameInGame': '坏掉de可乐',
            'server': 1,
            'submitTime': '2012-12-12 12:12:12',
            'portrait': '1.png',
            'desc': '这个人很懒，什么都没留下',
            'leftNumberToday': 3
        }
    });
});
router.get('/login', function(req, res, next) {
    var id = req.params.id;
    res.send({
        success: true,
        data: {
            'id': 123456,
            'name': '游客123456',
            'role': 4,
            'submitTime': '2012-12-12 12:12:12',
            'leftNumberToday': 3
        }
    });
});
module.exports = router;