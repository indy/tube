define(['tube', 'stations'], function(tube, londonStations) {

  describe('London underground network', function () {

    function expectedRoute(from, to, expected) {
        var r = tube.route(from, to);

        expect(r.success).toBe(true);
        expect(r.path.length).toEqual(expected.length);

        var expectedStation, expectedLine;
        expected.map(function(e, i) {
          expectedStation = e[0];
          expectedLine = e[1];
          expect(r.path[i].name).toEqual(expectedStation);
          expect(r.path[i].connection.line).toEqual(expectedLine);
        });
    }

    it('should have 580 stations in total', function () {
        expect(londonStations.length).toEqual(580);
    });

    it('should have 303 connected stations', function () {
        expect(tube.network().connectedStations.length).toEqual(303);
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

    it('should route between Balham and Hyde Park Corner', function () {
      expectedRoute("Balham", "Hyde Park Corner",
                    [["Balham", "Northern"],
                     ["Clapham South", "Northern"],
                     ["Clapham Common", "Northern"],
                     ["Clapham North", "Northern"],
                     ["Stockwell", "Victoria"],
                     ["Vauxhall", "Victoria"],
                     ["Pimlico", "Victoria"],
                     ["Victoria", "Victoria"],
                     ["Green Park", "Piccadilly"],
                     ["Hyde Park Corner", "Piccadilly"]]);
    });

  });

});

