var express = require("express");
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('vr_prod');
});

router.get('/drive', function (req, res, next) {
    res.render('index');
});


module.exports = router;
