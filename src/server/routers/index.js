var express = require("express");
var router = express.Router();

router.get('/vr/:id*?', function (req, res, next) {
    res.render('vr');
});

router.get('/', function (req, res, next) {
    res.render('index');
});


module.exports = router;
