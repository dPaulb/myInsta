var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var ThumbnailSchema = new Schema({
    title : String,
    created_at : {
        type : Date,
        default : Date.now()
    }

});

ThumbnailSchema.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});

autoIncrement.initialize(mongoose.connection)

ThumbnailSchema.plugin( autoIncrement.plugin , { model : "thumbnail", field : "id" , startAt : 1 } );
module.exports = mongoose.model('thumbnail' , ThumbnailSchema);