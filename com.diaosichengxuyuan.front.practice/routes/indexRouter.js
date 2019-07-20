var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index.pug', { title: "首页" });
});

router.get('/test', function (req, res, next) {
    res.render('test.htm');
});

router.get('/10086', function (req, res, next) {
    res.render('10086.htm');
});

router.get('/10086Vue', function (req, res, next) {
    res.render('10086Vue.htm');
});

router.get('/12306', function (req, res, next) {
    res.render('12306.htm');
});

router.get('/12306Vue', function (req, res, next) {
    res.render('12306Vue.htm');
});

router.get('/leecode', function (req, res, next) {
    res.render('leecode.htm');
});

module.exports = router;
