define(['network', 'stations', 'connections'], function(Network, stations, connections) {

  // create a Network using the London Underground's stations and connections
  var underground = new Network(stations, connections);

  function debug(route) {
    var i;
    var changes = 0;

    for(i=1;i<route.length;i++) {
      var station = route[i];
      var prev = route[i-1];
      if(prev.connection.line !== station.connection.line) {
        changes += 1;
      }      
    }
    console.log("changes = " + changes);
  }


  var notability = {
    last: 4,
    first: 3,
    changeLine: 2,
    changeDirection: 1,
    none: 0
  };

  // is there anything interesting about the given station for this route?
  function stationNotability(station, index, route) {
    if(index === 0) {
      return notability.first;
    }
    if(index === route.length - 1) {
      return notability.last;
    }
    var prev = route[index - 1];
    if(prev.connection.line !== station.connection.line) {
      return notability.changeLine;
    }
    if(prev.connection.direction !== station.connection.direction) {
      return notability.changeDirection;
    }
    return notability.none;
  }

  return {
    stationNames: function() {
      var names = underground.connectedStations.map(function(station) {
        return station.name;
      });
      return names;
    },
    route: function(from, to) {
      var r = underground.route(from, to);
      debug(r.path);
      return r;
    },

    // return a description that should be displayed 
    // alongside the i'th station on the route
    routeDescription: function(i, route) {
      var station = route[i];
      var prev = route[i-1];

      switch(stationNotability(station, i, route)) {
        
      case notability.first:
        return station.connection.line + " line";
        break;

      case notability.last:
        return "Reached destination"
        break;

      case notability.changeLine:
        return "Change from " + prev.connection.line +  " line to the " + 
          station.connection.line + " line " + station.connection.direction;
        break;

      case notability.changeDirection:
        return "Make sure it's the " + station.connection.direction + " train";
        break;

      default: return "";
      }      
    }
  };
});
