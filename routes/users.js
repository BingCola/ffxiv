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
            'works': parseInt(Math.random() * 100)
        }
    });
});

module.exports = router;