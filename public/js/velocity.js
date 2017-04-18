/**
 * Created by austin on 18/04/2017.
 */
window.onload = function () {
  let velocity;
  $.getJSON('./js/velocity.json', function(data){
    velocity = data;

    var chart= new CanvasJS.Chart("chartContainer", {
      title:{
        text: "Velocity Chart"
      },
      axisX: {
        lineThickness: 2
      },
      data: [
        {
          type: "column",
          dataPoints: []
        },
        {
          type: "column",
          dataPoints: []
        },
      ]
    });

    function renderPoints(velocity){
      for (let i = 0 ;i < velocity.length; i++) {
        chart.options.data[0].dataPoints.push({
          x: i+1,
          y: velocity[i].expected,
          label: "Expected "+velocity[i].sprint,
        });
        chart.options.data[1].dataPoints.push({
          x: i+1,
          y: velocity[i].actual,
          label: " Actual "+velocity[i].sprint,
        });
      }
      chart.render();
    }
    renderPoints(velocity);
  });
};