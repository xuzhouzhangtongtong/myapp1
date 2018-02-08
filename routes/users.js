var express = require('express');
var redis = require('redis');
var query = require("./mysql");
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Users output Time: ', Date.now());
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
   console.log("enter first function");
    var client = redis.createClient(6379,'10.37.150.54',{});

    client.on('error', function (err) {
        console.log('Error ' + err);
    });

    client.set('myapp:string_key', 'string val', redis.print);
    client.hset('myapp:hash_key', 'hashtest 1', 'some value', redis.print);
    client.hset(['myapp:hash_key', 'hashtest 2', 'some other value'], redis.print);

    client.hkeys('myapp:hash_key', function (err, replies) {

        console.log(replies.length + ' replies:');
        replies.forEach(function (reply, i) {
            console.log('    ' + i + ': ' + reply);
        });

        client.quit();

    });

   next();
}, function(req, res, next) {

    query("select * from t_iva_project_banner_generate_task limit 20",function(err,vals,fields){
        res.send(vals);
    });

});

// 网站首页接受 POST 请求
router.post('/', function (req, res) {
    res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
router.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
router.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

module.exports = router;