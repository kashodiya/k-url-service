var express = require('express');
var router = express.Router();

var Url = require("../models/url");

router.get(/^\/new\/(.+)/, function(req, res, next) {
  var longUrl = req.params[0]; // regexp's numbered capture group
  Url.maxIndex(function(err, maxIndex){
    if(err){
      res.json({ err: err});
    }else{
      var nextIndex = 0;
      if(maxIndex){
        nextIndex = maxIndex.index + 1;
      } 
      var url = new Url();
      url.longUrl = longUrl;
      url.index = nextIndex;
      url.save(function(err, u){
        if(err){
          res.json({ err: err});
        }else{
          res.json({ "original_url": longUrl, "short_url":  nextIndex});
        }
      })
    }
  });
});

router.get("/:index", function(req, res, next) {
  var index = req.params.index;
  
  Url.findOne({index: Number(index)}, function(err, u){
    console.log(err, u);
    if(err){
      res.json({err: err});
    }else{
      res.redirect(u.longUrl);
    }
  });
  
});


module.exports = router;
