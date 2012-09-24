define(['vendor/d3.v2.min'], function(d3) {

  var svgParentElement;
  var svg;

  var notability = {
    last: 4,
    first: 3,
    changeLine: 2,
    changeDirection: 1,
    none: 0
  };

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

  // the height of each station list element
  var stationGap = 50;

  function createStationContainer(stationNodes) {
    return stationNodes.enter()
      .append("g")
      .attr("class", "station")
      .attr("transform", function(d, i) {
        var height = (i * stationGap) + 20;
        return "translate(" + 30 + "," + height + ")";
      });
  }

  function appendConnection(node, route) {
    var connectionBarWidth = 5;
    return node.append("rect")
      .attr("fill", function(s, i) {
        if(i<route.length-1) {
          return s.lineData.colour;
        } else { 
          return "orange";
        }
      })
      .attr("width", connectionBarWidth)
      .attr("height", function(s, i) { 
        return (i===route.length-1) ? 0 : stationGap;
      })
      .attr("x", -connectionBarWidth/2);
  };

  function appendStop(node) {
    return node.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 10)
      .attr("fill", "white")
      .attr("stroke", function(s) { return s.lineData.colour})
      .attr("stroke-width", 5);
  };

  function appendLabel(node, route) {
    return node.append("text")
      .attr("class", "station-name")
      .text(function(s, i) {
        return s.name;
      })
//      .attr("stroke", function(s, i) {
//        return stationNotability(s, i, route) > 0 ? "#444444" : "#aaaaaa";
//      })
      .attr("dy", "0.4em")
      .attr("dx", "3em");
  };

  function appendDescriptionLabel(node, route) {
    return node.append("text")
      .attr("class", "description")
      .text(function(s, i) {

        var prev = route[i-1];

        switch(stationNotability(s, i, route)) {
        
        case notability.first:
          return s.connection.line + " line";
          break;

        case notability.last:
          return "Reached destination"
          break;

        case notability.changeLine:
          var info = s.connection.line + " line " + s.connection.direction;
          return "Change from " + prev.connection.line +  " line to the " + info;
          break;

        case notability.changeDirection:
          return "Make sure it's the " + s.connection.direction + " train";
          break;

        default: return "";
        }
        
      })
//      .attr("stroke", "#888888")
      .attr("dy", "1.6em")
      .attr("dx", "3em");
  };

  function resizeSVG(route) {
    var height = (stationGap * route.length) + 20;
    svg.selectAll("svg")
      .attr("height", height)
      .attr("width", 560);
    svgParentElement.css("height", height);
  }

  function clearStations() {
    var nodes = svg.selectAll("g.station").data([]);
    nodes.exit().remove();
  }

  return {
    init: function(parentElement) {
      svgParentElement = $(parentElement);
      svgParentElement.empty();
      svg = d3.select(parentElement).append("svg").append("g");
    },

    showRoute: function(route) {

      // resize svg element to fit entire route
      resizeSVG(route);

      clearStations();

      var nodes = svg.selectAll("g.station").data(route);

      var stationContainer = createStationContainer(nodes);
      // every other element is a child of the stationContainer
      appendConnection(stationContainer, route);
      appendStop(stationContainer);
      appendLabel(stationContainer, route);
      appendDescriptionLabel(stationContainer, route);
      
      nodes.exit().remove();
    }
  }
});
