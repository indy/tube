define(['tube', 'vis'], function(tube, vis) {

  function getRoute(from, to) {
    var r = tube.route(from, to);
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
      fromUI.val("Marble Arch");

      var toUI = $("#destStation");
      toUI.typeahead({ source: stationNames });
      toUI.val("Aldgate");

      $("#tube-form").submit(function() {
        getRoute(fromUI.val(), toUI.val());
        return false;
      });
    }
  };
});
