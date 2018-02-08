var mysql=require("mysql");
var pool = mysql.createPool({
    host: '10.37.150.38',
    user: 'selffabu',
    password: 'Rq1qRR9wrC',
    database: 'ivasit1',
    port: 3306
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;