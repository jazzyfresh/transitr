var stopId,
    routeId,
    stopName,
    prediction,
    predictions,
    predictionRequest;

$("#prediction-arrival-late").hide();
$("#prediction-arrival-soon").hide();

$(".stop-row").click(function(event) {
  stopId = $(this).closest('tr').attr('stop-id');
  routeId = $(this).closest('tr').attr('route-id');
  stopName = $(this).closest('tr').attr('stop-name');
  predictionRequest = "http://api.metro.net/agencies/lametro/stops/" + stopId + "/predictions/";
  // console.log("route id: " + routeId);
  // console.log("stop id: " + stopId);
  // console.log(predictionRequest);
  $.get(predictionRequest, function (data) {
    predictions = data.items;
    console.log(predictions);
    predictions = predictions.filter(function (p) {
      return p.route_id === routeId;
    });
    prediction = predictions[0];
    predictions.forEach(function (p) {
      if (p.minutes <= prediction.minutes) prediction = p;
    });
    console.log(prediction);
    if (parseInt(prediction.minutes) >= 10) {
      $("#prediction-arrival-late").hide();
      $(".stop-heading").text(stopName);
      $(".prediction").text(prediction.minutes + " minutes.");
      $("#prediction-arrival-soon").show();
    } else {
      $("#prediction-arrival-soon").hide();
      $(".stop-heading").text(stopName);
      $(".prediction").text(prediction.minutes + " minutes.");
      $("#prediction-arrival-late").show();
    }
  });
});
