/**
 * Created by austin on 06/05/2017.
 */
window.onload = function () {
  $.getJSON('./js/burndown.json', function(data) {
    populateTableRow(data);
  });

    function clearTable() {
      document.getElementById('tablebody').innerHTML = '';
    }

    function populateTableRow(data) {
      clearTable();
      for (let i = 0; i < data.issueList.length; i++) {
        let Status;
        let Assignee;
        let StoryPointsTo;
        let StoryPointsFrom;
        let Summary;
        try{
          const j = data.issueList[i].events.Status.length -1;
          Status = data.issueList[i].events.Status[j].to;
        } catch(err) {
          Status = " ";
        }
        try {
          const k =  data.issueList[i].events.Assignee.length -1;
          Assignee = data.issueList[i].events.Assignee[k].to;
        } catch(err) {
          Assignee = " ";
        }
        try {
          const l = data.issueList[i].events["Story Points"].length -1;
          StoryPointsTo = data.issueList[i].events["Story Points"][l].to;
          StoryPointsFrom = data.issueList[i].events["Story Points"][l].from;
        } catch (err){
          StoryPointsTo = " ";
          StoryPointsFrom = " ";
        }
        try {
          const m = data.issueList[i].events.Summary.length -1;
          Summary = data.issueList[i].events.Summary[m].to;
        } catch (err){
          Summary = " ";
        }


        $('.tablebody ').append('<tr><td><b>' + data.issueList[i].issue + "</b> </td><td>"
            + Status + "</td><td>" + Assignee + '</td><td>' + StoryPointsFrom + " <i class=\"arrow circle right icon\"></i> " + StoryPointsTo + '</td>' +
            '<td>' + Summary + '</td><\/tr>');
      }
    }

};