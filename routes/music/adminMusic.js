var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path')
var MusicSelectModel = require('../../models/MusicSelectModel')
var fs = require('fs')
    , gm = require('gm');
var adminRequired = require('../../libs/adminRequired')
var mm = require('musicmetadata');
var uploadDir = path.join(__dirname, '../../musicuploads')

var storage = multer.diskStorage({

    destination : function(req, file, callback){
        callback(null, uploadDir)
    },
    filename : function(req, file, callback){
        callback(null, 'music-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }

})
var upload = multer({storage : storage})

router.get('/', adminRequired,function(req,res){
    //edit에서도 같은 form을 사용하므로 빈 변수( product )를 넣어서 에러를 피해준다
    res.render('musicform');
});

router.post('/', upload.any(), function (req, res, next) {

    var imagePath = 'musicuploads/' + req.files[0].filename;
    gm(imagePath).autoOrient().write('musicuploads/' + req.files[0].filename, function(err){
        if (err) {
            console.log(err)
        }
    });

    if(req.files[1]){
        var audioFileNames = "";
        for(var i = 1;i<req.files.length;i++){

            audioFileNames += ("/" + req.files[i].filename);
        }
    }


    const music = new MusicSelectModel({
        title : req.body.title,
        thumbnail : (req.files[0]) ? req.files[0].filename : "",
        audioFileName: (req.files[1]) ? audioFileNames : "",
        price : req.body.price
    })
    music.save(function(err){
        var parser = mm(fs.createReadStream('musicuploads/' + req.files[1].filename), function (err, metadata) {
            if (err) throw err;
            console.log(metadata);
        });
        res.redirect('/musicbooth')
    })


});







module.exports = router;