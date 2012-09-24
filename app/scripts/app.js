define(['tube', 'vis'], function(tube, vis) {

  function findTubeRoute(e) {
    var r = tube.route($("#startStation").val(), $("#destStation").val());

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
      vis.init("#sheet");

      var stationNames = tube.stationNames();

      var fromUI = $("#startStation");
      fromUI.typeahead({ source: stationNames });
      fromUI.val("Upminster");

      var toUI = $("#destStation");
      toUI.typeahead({ source: stationNames });
      toUI.val("Marble Arch");

      $("#tube-form").submit(findTubeRoute);
      findTubeRoute();
    }
  };
});
