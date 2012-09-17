define(['network', 'stations', 'connections'], function(Network, s, c) {

  describe('London underground network', function () {

    var londonStations = s;
    var londonConnections = c;
    var tube = new Network(londonStations, londonConnections);

    function expectedRoute(from, to, expected) {
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
      expect(londonStations.length).to.equal(580);
    });

    it('should have 303 connected stations', function () {
      expect(tube.connectedStations.length).to.equal(303);
    });

    it('routes', function () {
      expectedRoute("Archway", "Golders Green",
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
