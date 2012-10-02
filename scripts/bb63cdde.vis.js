define(['vendor/d3.v2.min', 'tube'], function(d3, tube) {

  var parentElement;
  var vis;

  // the height of each station list element
  var stationGap = 50;

  var connectionBarWidth = 5;
  var longestRouteLength = 0;

  // the function used to render the route
  var showFn;

  function resizeSVG(route) {
    var height = (stationGap * route.length) + 20;
    vis.selectAll("svg")
      .attr("height", height)
      .attr("width", 560);
    parentElement.css("height", height);
  }

  function showWithSVG(route) {
    // resize svg element to fit entire route

    if(route.length > longestRouteLength) {
      longestRouteLength = route.length;
      resizeSVG(route);
    }

    // data join
    var nodes = vis.selectAll(".station").data(route);

    // enter
    var station = nodes.enter()
      .append("g")
      .attr("class", "station")
      .attr("transform", function(d, i) {
        var height = (i * stationGap) + 20;
        return "translate(" + 30 + "," + height + ")";
      });

    station.append("rect")
      .attr("class", "station-connection")
    station.append("circle")
      .attr("class", "station-stop")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 0.1)
      .attr("fill", "white")
      .attr("stroke-width", 5)      
    station.append("text")
      .attr("class", "station-name")
      .attr("dy", "0.4em")
      .attr("dx", "3em");
    station.append("text")
      .attr("class", "station-description-label")
      .attr("dy", "1.6em")
      .attr("dx", "3em");
    
    // exit
    nodes.exit()
      .transition()
      .duration(900)
      .style("fill-opacity", 1e-6)
      .remove();

    vis.selectAll(".station-connection")
      .data(route)
      .transition().duration(900).delay(function(s,i){return (i*90) + 20;})
      .attr("fill", function(s, i) {
        if(i<route.length-1) {
          return s.lineData.colour;
        } else { 
          return "orange";
        }
      })
      .attr("width", connectionBarWidth)
      .transition().duration(900).delay(function(s,i){return (i*90) + 20;})
      .attr("height", function(s, i) { 
        return (i===route.length-1) ? 0 : stationGap;
      })
      .attr("x", -connectionBarWidth/2);

    vis.selectAll(".station-stop")
      .data(route)
      .attr("stroke", function(s) { return s.lineData.colour})
      .transition().duration(500).delay(function(s,i){return (i*90) + 20;})
      .attr("r", 10);

    vis.selectAll(".station-name")
      .data(route)
      .transition().duration(500).delay(function(s,i){
        return (i*90) + 400;
      })
      .text(function(s) { return s.name; });

    vis.selectAll(".station-description-label")
      .data(route)
      .transition().duration(500).delay(function(s,i) {
        return (i*90) + 450;
      })
      .text(function(s, i) {
        return tube.routeDescription(i, route);
      });
  }

  function showWithTable(route) {
    // data join
    var nodes = vis.selectAll(".station").data(route);

    // enter
    var station = nodes.enter()
      .append("tr")
      .attr("class", "station");

    station.append("td")
      .attr("class", "station-td")
    station.append("td")
      .attr("class", "station-name")
    station.append("td")
      .attr("class", "station-description-label");
    
    // exit
    nodes.exit().remove();

    vis.selectAll(".station-td")
      .data(route)
      .attr("style", function(s) { return "background: " + s.lineData.colour;});
    vis.selectAll(".station-name")
      .data(route)
      .text(function(s) { console.log(s.name); return s.name;});
    vis.selectAll(".station-description-label")
      .data(route)
      .text(function(s, i) {
        return tube.routeDescription(i, route);
      });
  }

  return {
    init: function(parent) {

      // render the route with SVG if the browser supports it
      // otherwise create a table

      parentElement = $(parent);
      parentElement.empty();

      if(Modernizr.svg) {
        vis = d3.select(parent).append("svg").append("g");
        showFn = showWithSVG;
      } else {
        vis = d3.select(parent).append("div").append("table")
          .attr("class", "table table-bordered");
        showFn = showWithTable;
      }
    },

    showRoute: function(route) {
      return showFn(route);
    }
  }
});
