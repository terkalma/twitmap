// twitter
var Twit = require('twit');

var twit = new Twit({
    consumer_key:         process.env.twitter_consumer_key,
    consumer_secret:      process.env.twitter_consumer_secret,
    access_token:         process.env.twitter_access_token,
    access_token_secret:  process.env.twitter_access_token_secret
});

exports.streamTwitter = function (collection) {
  var stream = twit.stream('statuses/filter', { track: 'Obama'})

  stream.on('tweet', function (tweet) {
    var params;
    console.log(tweet);
    if (tweet.geo) {

      params = {
        keyword: 'fuck',
        long: tweet.geo.coordinates[1],
        lat: tweet.geo.coordinates[0],
        text: tweet.text,
        imgUrl: tweet.user.profile_image_url,
        createdAt: Date.now()
      }

      collection.insert(params, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });

    }
  });
}
