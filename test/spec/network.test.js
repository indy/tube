define(['network'], function(Network) {

  describe('A* development', function () {

    // [id, name, lng, lat]
    var stationData = [[0, "a", 20, 5],
                       [1, "b", 32, 5],
                       [2, "c", 40, 10],
                       [3, "d", 7, 20],
                       [4, "e", 20, 20],
                       [5, "f", 32, 20],
                       [6, "g", 52, 20],
                       [7, "h", 19, 30],
                       [8, "i", 32, 30],
                       [9, "j", 40, 30],
                       [10, "k", 7, 40],
                       [11, "l", 18, 40],
                       [12, "m", 32, 40],
                       [13, "n", 50, 40],
                       [14, "o", 14, 50],
                       [15, "p", 20, 55],
                       [16, "q", 32, 55],
                       [17, "r", 50, 50],
                       [18, "s", 50, 55],
                       [19, "t", 60, 60],
                       [20, "u", 50, 65],
                       [21, "v", 50, 70],
                       [22, "w", 50, 70]]; // [22, "w", 48, 75]

    // [line name, line data, ...[connection data]]
    var connectionData = [["Alpha", {colour: "red"},
                           {direction: "S",
                            opposingDirection: "N", 
                            connections: [0, 4, 7, 11, 15]}],
                          ["Beta", {},
                           {direction: "S", 
                            opposingDirection: "N", 
                            connections: [1, 5, 8, 12, 16]}, 
                           {direction: "S", 
                            opposingDirection: "N", 
                            connections: [5, 9]}],
                          ["Delta", {},
                           {direction: "E", 
                            opposingDirection: "W", 
                            connections: [3, 4, 5, 6]}],
                          ["Kappa", {}, 
                           {direction: "E", 
                            opposingDirection: "W", 
                            connections: [10, 11, 12, 13]}],
                          ["Omicron", {},
                           {direction: "N", 
                            opposingDirection: "S", 
                            connections: [14, 11, 5, 2]}],
                          ["Psi", {},
                           {direction: "N", 
                            opposingDirection: "S", 
                            connections: [22, 21, 20, 19, 18, 17, 13]}],
                          ["Psi2", {},
                           {direction: "N", 
                            opposingDirection: "S", 
                            connections: [21, 22, 13]}]];

    //  var testtube = new Network(stationData, connectionData);
    //  var stations = testtube.stations;

    describe('line data', function() {

      it('should store data for the Alpha line', function () {
        var testtube = new Network(stationData, connectionData);
        expect(testtube.lineData["Alpha"].colour).toEqual("red");
      });
    });


    describe('buildStations', function () {

      var testtube;
      beforeEach(function() {
        testtube = new Network(stationData, connectionData);
      });

      it('should build all the Station objects', function () {
        expect(testtube.stations).toEqual(jasmine.any(Object));
      });

      it('should fill the stations with sane values', function () {
        var stations = testtube.stations;

        // sanity check
        var stationA = stations.a;
        expect(stationA.name).toEqual("a");
        expect(stationA.lng).toEqual(20);
        expect(stationA.lat).toEqual(5);
      });

      it('should build connection structures', function () {
        var stations = testtube.stations;

        var stationA = stations.a;
        expect(stationA.connections.length).toEqual(1);

        var conn = stationA.connections[0];
        expect(conn.line).toEqual("Alpha");
        expect(conn.direction).toEqual("S");
        expect(conn.dest.name).toEqual("e");
      });
    });

    describe('travelTime', function () {
      it('should calculate straight line travelTime', function () {
        var testtube = new Network(stationData, connectionData);
        var stations = testtube.stations;
        var a = stations.a;
        var b = stations.b;
        expect(testtube._travelTime(a, b)).toEqual(12);
      });
    });


    function expectedRoute(testtube, from, to, expected) {
      var i;
      var r = testtube.route(from, to);
      var arr = r.path.map(function(s) {return s.name;});

      expect(r.success).toBe(true);

      expect(arr.length).toEqual(expected.length);
      for(i=0;i<expected.length;i++) {
        expect(arr[i]).toEqual(expected[i]);
      }
    }

    describe('route', function() {
      
      var t;
      beforeEach(function() {
        t = new Network(stationData, connectionData);
      });

      it('should find a valid route', function () {
        expectedRoute(t, "a", "e", ["a", "e"]);
        expectedRoute(t, "a", "i", ["a", "e", "f", "i"]);
        expectedRoute(t, "o", "i", ["o", "l", "m", "i"]);
        expectedRoute(t, "l", "j", ["l", "f", "j"]);
        expectedRoute(t, "d", "n", ["d", "e", "f", "i", "m", "n"]);
      });

      it('should find a valid route for stations in a different case', function () {
        expectedRoute(t, "A", "E", ["a", "e"]);
        expectedRoute(t, "A", "I", ["a", "e", "f", "i"]);
        expectedRoute(t, "O", "I", ["o", "l", "m", "i"]);
        expectedRoute(t, "L", "J", ["l", "f", "j"]);
        expectedRoute(t, "D", "N", ["d", "e", "f", "i", "m", "n"]);
      });

      it('should return an error when given unknown stations', function() {
        var r = t.route("fakeStation1", "fakeStation2");
        expect(r.success).toBe(false);

        r = t.route("fakeStation1", "b");
        expect(r.success).toBe(false);
        expect(r.message).toEqual("unknown starting station: fakeStation1");

        r = t.route("a", "fakeStation2");
        expect(r.success).toBe(false);
        expect(r.message).toEqual("unknown destination station: fakeStation2");
      });

      it('find a sensible route between n and w', function () {
        expectedRoute(t, "n", "v", ["n", "w", "v"]);
      });

    });
  })



});
