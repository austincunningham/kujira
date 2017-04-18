/**
 * Created by austin on 18/04/2017.
 */
window.onload = function () {
  let averageage;
  $.getJSON('./js/averageage.json', function(data){
    averageage = data;

    var chart= new CanvasJS.Chart("chartContainer", {
      title:{
        text: "Average Age Chart"
      },
      axisX: {
        lineThickness: 2
      },
      data: [
        {
          type: "stackedColumn",
          dataPoints: []
        },
        {
          type: "spline",
          dataPoints: []
        }
      ]
    });

    function renderPoints(averageage){
      for (let key in averageage) {
        if(averageage.hasOwnProperty(key)) {
          chart.options.data[1].dataPoints.push({
            x: new Date(key),
            y: parseInt(averageage[key]),
            indexLabel: " " + parseInt(averageage[key]),
          });
          chart.options.data[0].dataPoints.push({
            x: new Date(key),
            y: averageage[key],
            indexLabel: " " +parseInt(averageage[key]),
          });
        }
      }
      chart.render();
    };
    renderPoints(averageage);
  });
}