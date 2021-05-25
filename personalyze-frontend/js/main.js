var traits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
var trait_scores = [];

function goToPage2(){

    if(($("#username").val().length == 0)){
        $("#usernameError").text("please input a valid username");
        return;
    }

    var username = $("#username").val();

    $("#usernameError").text("");


    var scores = {};
    $.getJSON("https://personalyze-api.herokuapp.com/api/v1/analyze/twitter?username=" + username, function(json_data){
        console.log(JSON.stringify(json_data));
        scores = json_data;

        if(jQuery.isEmptyObject(scores) == true){
            $("#usernameError").text(`Error Analyzing ${username}`);
        }
        else{

            trait_scores = [];
            $("#usernameError").text("");
            $('#exampleModal').modal('hide');
            $("#page1").hide();
            $("#page2").fadeIn("slow");

            console.log(scores.Openness);

            $("#scoreEntry").append(addRow("Openness", scores.Openness));
            $("#scoreEntry").append(addRow("Conscientiousness", scores.Conscientiousness));
            $("#scoreEntry").append(addRow("Extraversion", scores.Extraversion));
            $("#scoreEntry").append(addRow("Agreeableness", scores.Agreeableness));
            $("#scoreEntry").append(addRow("Neuroticism", scores.Neuroticism));

            

            linechart("score-chart", 'bar', 'Score', "Personality Traits");
        }
    });

}

function linechart(contentID, chartType, labelText, Title) {

    Chart.defaults.global.defaultFontColor = 'white';

    new Chart(document.getElementById(contentID), {
        type: chartType,
        data: {
            labels: traits,
            datasets: [{
                data: trait_scores,
                label: labelText,
                borderColor: "#fff",
                backgroundColor: "#fff",
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: Title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: Math.max.apply(null, trait_scores)
                    }
                }]
            }
        }
    });
}

function addRow(name, score){
    trait_scores.push(score.toFixed(2));
    var row = `<tr>
                        <td>${name}</td>
                        <td>${score.toFixed(2)}</td>
                    </tr>`;
    return row;
}



