var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  longUrl: String,
  index: Number
});


UrlSchema.statics.maxIndex = function (cb) {
  return this.findOne({})
    .sort('-index') // give me the max
    .exec(cb);
}

module.exports = mongoose.model('Url', UrlSchema);