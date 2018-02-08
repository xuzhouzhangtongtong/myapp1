
var express = require('express');
var router = express.Router();

router.all("*", function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

module.exports = router;