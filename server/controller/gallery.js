var express = require('express');
var router = express.Router();

var arrSize = [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
    { width: 533, height: 300 },
    { width: 1920, height: 1080 },
    { width: 1070, height: 751 },
    { width: 720, height: 450 },
    { width: 1920, height: 1080 },
    { width: 658, height: 370 },
    { width: 1920, height: 1080 }
];

router.post('/getItem/list', function(req, res, next) {
    var data = [];
    for (var i = 0; i < req.body.limit; i++) {
        data.push({
            id: i,
            img: {
                name: parseInt((i % 10) + 1) + '.jpg',
                height: arrSize[i % 10].height,
                width: arrSize[i % 10].width
            },
            name: '测试图片' + i,
            author: { name: '作者' + i, id: parseInt(i) },
            time: new Date(),
            remark: {
                comment: parseInt(Math.random() * 2000),
                praise: parseInt(Math.random() * 2000),
                collect: parseInt(Math.random() * 2000),
                shield: parseInt(Math.random() * 2000),
                view: parseInt(Math.random() * 2000),
                share: parseInt(Math.random() * 2000)
            },
            userAction: {
                isPraise: true,
                isCollect: true,
                isShield: false
            },
            desc: '关于本作品的描述' + i
        });
    }
    res.send({
        success: true,
        data: { list: data, total: 60 }
    });
});
router.post('/getItem/prime', function(req, res, next) {
    var data = [];
    for (var i = 0; i < req.body.limit; i++) {
        data.push({
            id: i + 1,
            img: {
                name: parseInt((i % 10) + 1) + '.jpg',
                height: arrSize[i % 10].height,
                width: arrSize[i % 10].width
            },
            name: '测试图片' + i,
            author: { name: '作者' + i, id: parseInt(i) },
            time: new Date(),
            remark: {
                comment: parseInt(Math.random() * 2000),
                praise: parseInt(Math.random() * 2000),
                collect: parseInt(Math.random() * 2000),
                shield: parseInt(Math.random() * 2000),
                view: parseInt(Math.random() * 2000),
                share: parseInt(Math.random() * 2000)
            },
            userAction: {
                isPraise: true,
                isCollect: true,
                isShield: false
            },
            desc: '关于本作品的描述' + i
        });
    }
    res.send({
        success: true,
        data: data
    });
});

router.post('/getItem/latest', function(req, res, next) {
    var data = [];
    for (var i = 0; i < req.body.limit; i++) {
        data.push({
            id: i + 1,
            img: {
                name: parseInt((i % 10) + 1) + '.jpg',
                height: arrSize[i % 10].height,
                width: arrSize[i % 10].width
            },
            name: '测试图片' + i,
            author: { name: '作者' + i, id: parseInt(i) },
            time: new Date(+new Date() - 86400000),
            remark: {
                comment: parseInt(Math.random() * 2000),
                praise: parseInt(Math.random() * 2000),
                collect: parseInt(Math.random() * 2000),
                shield: parseInt(Math.random() * 2000),
                view: parseInt(Math.random() * 2000),
                share: parseInt(Math.random() * 2000)
            },
            userAction: {
                isPraise: true,
                isCollect: true,
                isShield: false
            },
            desc: '关于本作品的描述' + i
        });
    }
    res.send({
        success: true,
        data: data
    });
});

router.get('/getItem/top/:num', function(req, res, next) {
    res.send({
        success: true,
        data: [
            {
                id: 1,
                name: '测试图片001',
                text: { content: '描述', style: '' },
                mode: 'single',
                img: [{ src: '1_0.jpg', animation: { delay: '0.3s', opacity: {} } }, { src: '1_1.png', animation: { delay: '0.3s', opacity: {} } }]
            },
            {
                id: 2,
                name: '测试图片002',
                text: { content: '描述', style: '' },
                mode: 'multi',
                img: [{ src: '2_0.jpg', animation: { delay: '0.3s', opacity: {} } }, { src: '2_1.png', animation: { delay: '0.3s', opacity: {} } }]
            },
            { id: 3, name: '测试图片003', text: { content: '描述', style: '' }, mode: 'single', img: [{ src: '3_0.jpg', animation: {} }] },
            { id: 5, name: '测试图片005', text: { content: '描述', style: '' }, mode: 'single', img: [{ src: '4_0.jpg', animation: {} }] },
            { id: 6, name: '测试图片006', text: { content: '描述', style: '' }, mode: 'single', img: [{ src: '5_0.jpg', animation: {} }] }
        ]
    });
});

router.get('/getItem/detail/:id', function(req, res, next) {
    var id = req.params.id;
    var imgGrp = [];
    for (var i = 0; i < 4; i++) {
        imgGrp.push({
            name: parseInt(((id + i) % 10) + 1) + '.jpg',
            height: arrSize[(id + i) % 10].height,
            width: arrSize[(id + i) % 10].width
        });
    }
    var modelGrp = [];
    for (var i = 0; i < parseInt(Math.random() * 2) + 2; i++) {
        modelGrp.push({
            name: '模特' + i,
            id: i % 2 == 0 ? parseInt(i) + 1 : 0,
            server: parseInt(Math.random() * 4) + 1,
            desc: '模特' + i + '描述',
            race: parseInt(Math.random() * 4) + 1,
            equip: {
                1: { name: '某主武器', color: 'red' },
                2: { name: '某副武器', color: 'red' },
                3: { name: '某头盔', color: 'red' },
                4: { name: '某上装', color: 'black' },
                5: { name: '某下装', color: 'red' },
                6: { name: '某腰带', color: 'red' },
                7: { name: '某手套', color: 'red' },
                8: { name: '某鞋子', color: 'red' },
                9: { name: '某项链', color: 'red' },
                10: { name: '某耳环', color: 'red' },
                11: { name: '某手镯', color: 'red' },
                12: { name: '某戒指(左)', color: 'red' },
                13: { name: '某戒指(右)', color: 'red' }
            }
        });
    }
    res.send({
        success: true,
        data: {
            id: id,
            img: imgGrp,
            title: '测试图片' + id,
            author: { name: '作者' + i, id: parseInt(id) },
            time: +new Date(),
            remark: {
                comment: parseInt(Math.random() * 2000),
                praise: parseInt(Math.random() * 2000),
                collect: parseInt(Math.random() * 2000),
                shield: parseInt(Math.random() * 2000),
                view: parseInt(Math.random() * 2000),
                share: parseInt(Math.random() * 2000)
            },
            model: modelGrp,
            userAction: {
                isPraise: true,
                isCollect: true,
                isShield: false
            },
            tag: [
                { content: '毒奶色', for: parseInt(Math.random() * 1000), against: parseInt(Math.random() * 100), time: new Date(), creator: 1 },
                { content: '赞美后期', for: parseInt(Math.random() * 1000), against: parseInt(Math.random() * 100), time: new Date(), creator: 1 },
                { content: '大清药丸', for: parseInt(Math.random() * 1000), against: parseInt(Math.random() * 100), time: new Date(), creator: 1 }
            ],
            desc: '关于本作品的描述' + id
        }
    });
});
router.get('/getItem/relate/:id', function(req, res, next) {
    var arrItem = [];
    for (var i = 0; i < parseInt(Math.random() * 4) + 10; i++) {
        arrItem.push({
            title: '相关作品' + i,
            id: 1
        });
    }
    res.send({
        success: true,
        data: arrItem
    });
});

router.get('/getItem/comment/:id', function(req, res, next) {
    var arrItem = [];
    for (var i = 0; i < parseInt(Math.random() * 4) + 10; i++) {
        arrItem.push({
            id: i,
            content: '这是一条回复:i',
            for: parseInt(Math.random() * 1000),
            against: parseInt(Math.random() * 1000),
            time: +new Date() - Math.random() * 864000000,
            replyId: parseInt(Math.random() * i)
        });
    }
    res.send({
        success: true,
        data: arrItem
    });
});

module.exports = router;
