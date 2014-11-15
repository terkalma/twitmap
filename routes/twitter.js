exports.markers = function (collection) {
  var twitter = function(req, res) {
    var date = req.query.date || Date.now() - 5000;
    collection.find({'createdAt': {$gt: date}}, function(err, twits){
      if (err) {
        res.json(500, err);
      } else {


        res.json({time: Date.now(), twits: twits});
      }
    });
  }
  return twitter;
};