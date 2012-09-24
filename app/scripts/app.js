define(['network', 'stations', 'connections', 'vis'], function(Network, stations, connections, vis) {

  var tube;

  var fromUI;
  var toUI;

  function findTubeRoute(e) {
    var r = tube.route(fromUI.val(), toUI.val());
    if(r.success === true) {
      vis.showRoute(r.path);
    } else {
      // display error message
      console.log(r.message);
    }
    return false;
  }

  return {
    init: function() {

      tube = new Network(stations, connections);
      vis.init("#sheet");

      var stationNames = tube.connectedStations.map(function(station) {
        return station.name;
      });

      fromUI = $("#startStation");
      fromUI.typeahead({ source: stationNames });
      fromUI.val("Archway");

      toUI = $("#destStation");
      toUI.typeahead({ source: stationNames });
      toUI.val("Marble Arch");

      $("#tube-form").submit(findTubeRoute);
      findTubeRoute();
    }
  };
});
