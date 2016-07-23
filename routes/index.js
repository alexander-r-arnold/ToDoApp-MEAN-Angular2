// require packages
var express = require('express');
var router = express.Router();

// get home page
router.get('/', function(req, res, next) {
	res.render('index.html');
});

module.exports = router;

