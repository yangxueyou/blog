var express = require('express');
var router = express.Router();
const articleMode = require('../model/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  // req.sessions['newID'] = {}
  console.log(req.session,'===req.session')
  if (req.session.userInfo) {
    articleMode.find({
      author: req.session.userInfo.username
    }).then(result => {
      res.render('index', { 
        title: 'Express', 
        currentUser: req.session.userInfo.username,
        list: result
      });
    })
  } else {
    res.redirect('/login');
  }
});

// 注销路由
router.get('/logout',function(req, res) {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = router;
