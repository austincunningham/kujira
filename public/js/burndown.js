/**
 * Created by austin on 18/04/2017.
 */
window.onload = function () {
  let actualBurndown;
  let expectedBurndown;
  $.getJSON('./js/burndown.json', function(data){
    actualBurndown = data.actualBurndown;
    expectedBurndown = data.expectedBurndown;

    var chart= new CanvasJS.Chart("chartContainer", {
      title:{
        text: "Burndown Chart"
      },
      axisX: {
        lineThickness: 2
      },
      data: [
        {
          type: "stepLine",
          dataPoints: []
        },
        {
          type: "line",
          dataPoints: []
        }
      ]
    });

    function renderPoints(actualBurndown, expectedBurndown){
      for (let i = 0 ;i < actualBurndown.length; i++) {
        chart.options.data[0].dataPoints.push({
          x: new Date(actualBurndown[i].date),
          y: actualBurndown[i].points,
          indexLabel: " "+actualBurndown[i].points,
        });
        chart.options.data[1].dataPoints.push({
          x: new Date(expectedBurndown[i].date),
          y: expectedBurndown[i].points,
          indexLabel: " "+parseInt(expectedBurndown[i].points),
        });
      }
      chart.render();
    }
    renderPoints(actualBurndown, expectedBurndown);
  });
};