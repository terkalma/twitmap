TwitMap = {
  init: function () {
    TwitMap.initializeMap();
    TwitMap.requestTwits(5000);
  },

  requestTwits: function(freq) {
    setInterval(function() {
      var params = {};
      $.get('/twitter', params, TwitMap.applyMarkers);
    }, freq);
  },

  applyMarkers: function(data) {
    var myLatlng, twits;
    twits = data.twits;
    for (i=0; i < twits.length; i++) {
      myLatlng = new google.maps.LatLng(twits[i].lat,twits[i].long);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: TwitMap.map,
        title: twits[i].text
      });
    }
  },

  initializeMap: function () {
    var mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(0,0)
    };
    TwitMap.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }
}

$(window).load(function () {
  TwitMap.init();
});