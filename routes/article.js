var express = require('express');
var router = express.Router();
const articleModel = require('../model/article');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' }); // 可以处理所有的content-type类型

/* GET home page. */
router.get('/', function(req, res, next) {
  // req.sessions['newID'] = {}
  if (req.session.userInfo) {
    res.render('article', { title: 'article', info: {}, isNew: true });
  } else {
    res.redirect('/login');
  }
});

router.get('/delete/:id', function(req, res) {
    // articleModel.remove
    articleModel.findByIdAndRemove(req.params.id).then(result => {
        res.redirect('/')
    })
})

router.get('/update/:id', function(req, res) {
    articleModel.findById(req.params.id).then(result => {
        res.render('article', { 
            title: 'article', 
            info: result, 
            isNew: false
        });
    })
})

router.post('/update/:id', upload.single('photo'), function(req, res) {
    articleModel.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        content: req.body.content,
        filePath: req.file ? "/uploads/" + req.file.filename : req.body.oldPath // 图片路径、不要加public
    }).then(result => {
        res.redirect('/');
    })
})

router.post('/', upload.single('photo'), function(req, res){
    // 这个字段要和model里面的对应
    articleModel.create({
        title: req.body.title,
        content:  req.body.content, 
        createData: new Date(),// 时间戳new Date().getTime()
        author: req.session.userInfo.username,
        filePath: req.file ? "/uploads/" + req.file.filename : "" // 图片路径、不要加public
    }).then(result => {
        res.redirect('/');
    })
})


module.exports = router;
