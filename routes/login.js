var express = require('express');
var router = express.Router();

var userModel = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login', isShow: false });
});

// 接受post请求、并验证数据库里面是否有该数据
router.post('/', function(req, res){
    userModel.find({
        email: req.body.email,
        password: req.body.password
    }).then((result) => {
        // console.log(result,'---result') // result是一个数组/
        if (result.length >= 1) {
            // 开辟有效存储的session的空间(1、内存；2、存在文件中；3、数据库中)
            // req.sessions[cookie] = {}
            req.session.userInfo = result[0] // 有效信息
            res.redirect('/')
        } else {
            res.render('login',{title: 'login', isShow: true})
        }
    })
})

module.exports = router;
