var express = require('express');
var router = express.Router();
const articleModel = require('../model/article');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  // req.sessions['newID'] = {}
  if (req.session.userInfo) {
    // req.params.id
    // articleModel.find({
    //     _id:
    // }) // 返回一定是数组 result[0]
    articleModel.findById(req.params.id).then(result => {
        res.render('detail', { 
            title: 'detail',
            info: result // 是一个对象
        });
    })
    
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
