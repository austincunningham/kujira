/**
 * Created by austin on 18/04/2017.
 */
window.onload = function () {
  let created;
  let resolved;
  $.getJSON('./js/createdResolved.json', function(data){
    created = data[0].created;
    resolved = data[1].resolved;

    var chart= new CanvasJS.Chart("chartContainer", {
      title:{
        text: "Created Vs Resolved Chart"
      },
      axisX: {
        lineThickness: 2
      },
      data: [
        {
          type: "line",
          dataPoints: []
        },
        {
          type: "line",
          dataPoints: []
        }
      ]
    });

    function renderPoints(created, resolved){
      for (let key in created) {
        if (created.hasOwnProperty(key)) {
          chart.options.data[0].dataPoints.push({
            x: new Date(key),
            y: created[key],
            //indexLabel: "" + parseInt(created[key]),
          });
        }
      }
      for (let key in resolved) {
        if (resolved.hasOwnProperty(key)) {
          chart.options.data[1].dataPoints.push({
            x: new Date(key),
            y: resolved[key],
            //indexLabel: "" + parseInt(resolved[key]),
          });
        }
      }
      chart.render();
    };
    renderPoints(created, resolved);
  });
}
