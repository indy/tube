define(['pqueue'], function(PQueue) {

  /** Station constructor */
  function Station(args) {
    // [name, lng, lat]
    this.id = args[0];
    this.name = args[1];

    this.lng = args[2];
    this.lat = args[3];
    this.connections = [];

    // used for comparison testing against user input
    this.lowercaseName = this.name.toLowerCase();

    this.addConnection = function(c) {
      this.connections.push(c);
    }
  }

  /** Connection constructor */
  function Connection (args) {
    // [line, direction, destination station]
    this.line = args[0];
    this.direction = args[1];
    this.dest = args[2];
  }

  function PathNode (data, g, h, fromPathNode) {
    this.station = data[0];
    this.connection = data[1];


    this.g = g;
    this.h = h;
    this.f = g + h;

    this.fromPathNode = fromPathNode;
  }

  function distance (stationA, stationB) {
    var lngDelta = stationA.lng - stationB.lng;
    var latDelta = stationA.lat - stationB.lat;
    return Math.sqrt((lngDelta * lngDelta) + (latDelta * latDelta));
  }

  function travelTime (stationA, stationB) {
    // for the moment just assume speed is a constant of 1 unit
    // will have to take lng,lat into account if using another
    // more realistic speed
    return distance(stationA, stationB);
  }

  function createPriorityQueue () {
    var compFn = function (a, b) {
      return a.f - b.f;
    };

    var identFn = function (pathNode, obj) {
      return pathNode.station.lowercaseName === obj.lowercaseName;
    };

    // the 'open' priority queue stores the pathNodes on the frontier
    return new PQueue(compFn, identFn);
  }

  function constructConnection(line, direction, opposingDirection, from, to) {
    from.addConnection(new Connection([line, direction, to]));
    to.addConnection(new Connection([line, opposingDirection, from]));
  }

  // would going to the next connection mean switching lines?
  function switchingLines(pathNode, connection) {
    if(pathNode.connection === undefined) {
      return false;
    }
    if(pathNode.connection.line === connection.line) {
      return false;
    }
    return true;
  }

  // this is the Tube.Network object
  //
  var Network = function (stationData, connectionData) {
    var s, c;
    var stationsByID = {};    // used for looking up connectivity info
    var stations = {};

    // the ids of all the stations that have connection data
    var connectedStations = {};

    var ld = {};                // lineData

    // create the station objects and also build the stationsByID
    // structure which is used during the connection stage
    stationData.forEach(function(stationConfig) {
      s = new Station(stationConfig);
      stations[s.lowercaseName] = s;
      stationsByID[s.id] = s;
    });

    
    var branch, segment, i;
    connectionData.forEach(function(connectionConfig) {
      var line = connectionConfig[0];
      var lineData = connectionConfig[1];

      ld[line] = lineData;

      for(branch = 2;branch < connectionConfig.length;branch++) {
        segment = connectionConfig[branch];

        for(i=0;i<segment.connections.length - 1;i++) {
          connectedStations[segment.connections[i]] = true;
          connectedStations[segment.connections[i+1]] = true;
          constructConnection(line, 
                              segment.direction, 
                              segment.opposingDirection, 
                              stationsByID[segment.connections[i]], 
                              stationsByID[segment.connections[i+1]]);
        }
      }
    });

    this.lineData = ld;

    this.connectedStations = []
    for(var key in connectedStations) {
      this.connectedStations.push(stationsByID[key]);
    }

    this.stations = stations;

    // update network representation with any disruptions
    this.update = function () {
      // todo: implement
    };

    // will have to build the journey backwards, from destination to source
    this.buildJourney = function (pathNode) {
      var lineData = this.lineData;
      var journey = [];
      var stage = {};

      while(pathNode.fromPathNode !== null) {
        
        stage.name = pathNode.station.name;
        // stage.line and stage.direction will come
        // from previous iterations of this loop
        journey.push(stage);

        // this special case will be true for the destination station
        // (which is first in the pathNode)
        if(stage.connection === undefined) {
          stage.connection = pathNode.connection;
        }

        stage = {};
        if(pathNode.connection) {
          stage.connection = pathNode.connection;
        }
        pathNode = pathNode.fromPathNode;
      } 

      stage.name = pathNode.station.name; // the start station
      journey.push(stage);

      return journey.reverse().map(function(n) {
        n.lineData = lineData[n.connection.line];
        return n;
      });
    }

    // from = name of from station
    // to = name of to station
    this.route = function (from, to) {
      var fromLower = from.toLowerCase();
      var toLower = to.toLowerCase();
      var fromStation = this.stations[fromLower];
      var toStation = this.stations[toLower];

      if(fromStation === undefined) {
        return {
          success: false,
          message: "unknown starting station: " + from
        };
      }

      if(toStation === undefined) {
        return {
          success: false,
          message: "unknown destination station: " + to
        };
      }

      var visited = {};         // stations already visited
      var open = createPriorityQueue();
      var g = 0;                    // cost from start
      var h = travelTime(fromStation, toStation);
      var currentPathNode, currentStation, connectingStation;
      var bestPathNode = null;


      var switchingLinesPenalty = 5;
      

      open.push(new PathNode([fromStation], g, h, null));

      while(open.length() > 0) {
        currentPathNode = open.pop();   // the pathNode with the lowest f score
        currentStation = currentPathNode.station;
        if(currentStation.lowercaseName === toLower) {
          // found a valid route, see if it's the best one
          if(bestPathNode === null || currentPathNode.g < bestPathNode.g) {
            bestPathNode = currentPathNode;
          } 
        }

        // add current to visited set
        visited[currentStation.name] = true;

        // iterate through the connections
        currentStation.connections.forEach(function(connection){

          connectingStation = connection.dest;

          if(visited.hasOwnProperty(connectingStation.name)) {
            // already visited this node
          } else if(!open.contains(connectingStation)) {
            // add to open queue if not already in there
            g = currentPathNode.g + travelTime(currentStation, 
                                               connectingStation);
            h = travelTime(connectingStation, toStation);

            if(switchingLines(currentPathNode, connection)) {
              h += switchingLinesPenalty;
            }

            open.push(new PathNode([connectingStation, connection], 
                                   g, 
                                   h, 
                                   currentPathNode));
          }
        });
      }

      

      if(bestPathNode === null) {
        return { 
          success: false,
          message: "unable to find path between " + from + " and " + to
        };
      } else {
        return {
          success: true,
          path: this.buildJourney(bestPathNode)
        };

      }
    };

    // only for testing purposes
    this._travelTime = travelTime;

  };

  return Network;


});
