var express = require("express");
var router = express.Router();

var isDev = process.env.NODE_ENV === 'dev'

router.get('/', function (req, res, next) {
	if (isDev) {
		res.render('vr');
	} else {
		res.render('vr_prod');	
	}
});

router.get('/drive', function (req, res, next) {
    res.render('index');
});


module.exports = router;
