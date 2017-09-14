var express = require('express');
var router = express.Router();
const loginRequired = require('../../libs/loginRequired');
var musicSelectModel = require('../../models/MusicSelectModel')
var co = require('co')

router.get('/', function(req, res){
    var getData = co(function*(){
        return {
            music : yield musicSelectModel.find({}).sort({id : 'desc'}).exec()
        }
    })

    getData.then(function(result){
        res.render('music/musicSelect', { music : result.music})
    })
})


// router.get('/', function(req, res){
//     musicSelectModel.find( function(err, music){ //첫번째 인자는 err, 두번째는 받을 변수명
//
//         res.render( 'music/musicSelect' , { music : music });
//     });
// })

router.get('/mobile', function(req, res){
    musicSelectModel.find( function(err, music){ //첫번째 인자는 err, 두번째는 받을 변수명

        res.render( 'music/m_musicSelect.ejs' , { music : music });
    });
})


module.exports = router;