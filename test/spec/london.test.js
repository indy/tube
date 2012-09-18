describe('London underground network', function () {

  function expectedRoute(tube, from, to, expected) {
    var i;

    var r = tube.route(from, to);
    var arr = r.path.map(function(s) {return s.name;});

    expect(r.success).to.be.true;

    expect(arr).to.have.length(expected.length);
    for(i=0;i<expected.length;i++) {
      expect(arr[i]).to.equal(expected[i]);
    }
  }


  it('should have 580 stations in total', function () {
    require(['stations'], function(londonStations) {
      expect(londonStations.length).to.equal(580);
    });
  });

  it('should have 303 connected stations', function () {
    require(['network', 'stations', 'connections'], function(Network, s, c) {
      var tube = new Network(s, c);
      expect(tube.connectedStations.length).to.equal(303);
    });
  });

  it('routes', function () {
    require(['network', 'stations', 'connections'], function(Network, s, c) {

      var londonStations = s;
      var londonConnections = c;
      var tube = new Network(londonStations, londonConnections);

      expectedRoute(tube, "Archway", "Golders Green",
                    ["Archway",
                     "Tufnell Park",
                     "Kentish Town",
                     "Camden Town",
                     "Chalk Farm",
                     "Belsize Park",
                     "Hampstead",
                     "Golders Green"]);
    });
  });
});
