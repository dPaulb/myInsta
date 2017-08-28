var express = require('express');
var router = express.Router();
const loginRequired = require('../../libs/loginRequired');
var categoryModel = require('../../models/CategoryModel')
var co = require('co')


router.get('/', function(req, res){
    categoryModel.find(function(err, category){
        categoryModel.count(function(err, c){
            res.render('photo/categoryselect', {category : category, countnum : c});
        })

    })
})

router.get('/delete/:id', function(req, res){
    var getData = co(function*(){
        //var product = yield ProductsModel.findOne({'id' :  req.params.id}).exec();
        //var comment = yield CommentsModel.find({'product_id' : req.params.id}).exec();
        return {
            category : yield categoryModel.remove({'id' :  req.params.id}).exec()
        }
    })

    getData.then(function(result){
        //res.send(result)
        res.redirect('/photocategoryselect')
    })
})

router.get('/testcategoryselect', function(req, res){


    categoryModel.find(function(err, category){
        categoryModel.count(function(err, c){
            res.render('photo/testcategoryselect', {category : category, countnum : c});
        })

    })
})

router.get('/testdetail', function(req, res){
    res.render('photo/testdetail')
})

module.exports = router;