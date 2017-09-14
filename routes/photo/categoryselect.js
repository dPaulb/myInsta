var express = require('express');
var router = express.Router();
const loginRequired = require('../../libs/loginRequired');
const adminRequired = require('../../libs/adminRequired');
const fs = require('fs')
var categoryModel = require('../../models/CategoryModel')
var co = require('co')


router.get('/', function(req, res){
    var getData = co(function*(){
        return {
            category : yield categoryModel.find({}).sort({id : 'desc'}).exec(),
            countnum : yield categoryModel.count({}).exec()
        }
    })

    getData.then(function(result){
        res.render('photo/categoryselect', { category : result.category, countnum: result.countnum})
    })
})

// router.get('/', function(req, res){
//     categoryModel.find(function(err, category){
//         categoryModel.count(function(err, c){
//             res.render('photo/categoryselect', {category : category, countnum : c});
//         })
//
//     })
// })

router.get('/delete/:id', adminRequired,function(req, res){
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

var limit = 0;



router.get('/ajax_more_photo/:limit', function(req, res){

    limit += req.query.limit;

    var getData = co(function*(){
        return {
            category : yield categoryModel.find({}).sort({id : 'desc'}).exec(),
            countnum : yield categoryModel.count({}).exec(),

        }
    })

    getData.then(function(result){
        res.render('photo/categoryselect', { category : result.category, countnum: limit})
    })


})


module.exports = router;