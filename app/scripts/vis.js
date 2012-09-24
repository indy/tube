define(['vendor/d3.v2.min', 'tube'], function(d3, tube) {

  var svgParentElement;
  var svg;

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
        return tube.routeDescription(i, route);
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
