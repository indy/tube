describe('London underground network', function () {

  function expectedRoute(from, to, expected) {

    require(['tube'], function(tube) {

      var r = tube.route(from, to);

      expect(r.success).to.be.true;
      expect(r.path).to.have.length(expected.length);

      var expectedStation, expectedLine;
      expected.map(function(e, i) {
        expectedStation = e[0];
        expectedLine = e[1];
//        console.log(r.path[i].name);
//        console.log(r.path[i].connection.line);
        expect(r.path[i].name).to.equal(expectedStation);
        expect(r.path[i].connection.line).to.equal(expectedLine);
      });

    });
  }

  it('should have 580 stations in total', function () {
    require(['stations'], function(londonStations) {
      expect(londonStations.length).to.equal(580);
    });
  });

  it('should have 303 connected stations', function () {
    require(['tube'], function(tube) {
      expect(tube.network().connectedStations.length).to.equal(303);
    });
  });

  it('should route between Archway and Golders Green', function () {
    expectedRoute("Archway", "Golders Green",
                  [["Archway", "Northern"],
                   ["Tufnell Park", "Northern"],
                   ["Kentish Town", "Northern"],
                   ["Camden Town", "Northern"],
                   ["Chalk Farm", "Northern"],
                   ["Belsize Park", "Northern"],
                   ["Hampstead", "Northern"],
                   ["Golders Green", "Northern"]]);
  });

  it('should route between Whitechapel and Tower Hill', function () {
    expectedRoute("Whitechapel", "Tower Hill",
                  [["Whitechapel", "District"],
                   ["Aldgate East", "District"],
                   ["Tower Hill", "District"]]);
  });

  it('should route between Tufnell Park and Arsenal', function () {
    expectedRoute("Tufnell Park", "Arsenal",
                  [["Tufnell Park", "Northern"],
                   ["Kentish Town", "Northern"],
                   ["Camden Town", "Northern"],
                   ["Euston", "Northern"],
                   ["Kings Cross St. Pancras", "Piccadilly"],
                   ["Caledonian Road", "Piccadilly"],
                   ["Holloway Road", "Piccadilly"],
                   ["Arsenal", "Piccadilly"]]);
  });

  it('should route between Balham and Sloane Square', function () {
    expectedRoute("Balham", "Sloane Square",
                  [["Balham", "Northern"],
                   ["Clapham South", "Northern"],
                   ["Clapham Common", "Northern"],
                   ["Clapham North", "Northern"],
                   ["Stockwell", "Victoria"],
                   ["Vauxhall", "Victoria"],
                   ["Pimlico", "Victoria"],
                   ["Victoria", "District"],
                   ["Sloane Square", "District"]]);
  });


});
