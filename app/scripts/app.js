define(['network', 'stations', 'connections'], function(Network, s, c) {

  var londonStations = s;
  var londonConnections = c;

  var tube;
  var fromUI;
  var toUI;

  var showRoute = function(path) {

    console.log(path);
    var results = $('#results');
    results.empty();

    var unorderedList = $("<ul/>");
    unorderedList.appendTo(results);

    path.forEach(function(node, i) {

      var listItem = $("<li/>");

      var stationInfo = $('<div/>', { 
        "text":  node.name,
        "class": node.lineData.cssName + " tube-line"});

      stationInfo.appendTo(listItem);


      if( i === 0 
          || i == path.length - 1
          || (path[i-1].connection.line !== node.connection.line)
          || (path[i-1].connection.direction !== node.connection.direction)) {

        var directionInfo = $('<span/>', {
          "class": "instruction",
          "text": node.connection.line + " Line (" + node.connection.direction + ")"
        }).appendTo(stationInfo);

        if (i > 0 && path[i-1].connection.line !== node.connection.line) {
          directionInfo.text("Change onto the " + directionInfo.text());
        }

        if (i > 0 
            && (path[i-1].connection.line === node.connection.line)
            && (path[i-1].connection.direction !== node.connection.direction)) {
          directionInfo.text("Make sure it's the " + node.connection.direction + " train");
        }

      } else {
        // shrink and dim the station name
        stationInfo.addClass("unimportant-station");
      };

      listItem.appendTo(unorderedList);


    });
  }

  var tubeFormSubmit = function(e) {
      var r = tube.route(fromUI.val(), toUI.val());
      if(r.success === true) {
        showRoute(r.path);
      } else {
        // display error message
        console.log(r.message);
      }
      return false;
    }

  return {
    init: function() {
      tube = new Network(londonStations, londonConnections);

      var data = tube.connectedStations.map(function(s) {
        return s.name;
      });

      fromUI = $("#startStation");
      toUI = $("#destStation");
      
//      fromUI.autocomplete({ source: data });
//      toUI.autocomplete({ source: data });

      // dev purposes only
      fromUI.val("Archway");
      toUI.val("Marble Arch");

      $("#tube-form").submit(tubeFormSubmit);
    }
  };

//  return {foo: 'hello'};
});
