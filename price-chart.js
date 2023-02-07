async function get_prices() {
response = await fetch("https://www.hvakosterstrommen.no/api/v1/prices/2023/02-06_NO5.json")
response_json = await response.json()
let output = []
for (const obj of response_json) {
    output.push(obj["NOK_per_kWh"])
}
return output
}

async function create_graph() {
var xValues = [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var yValues = await get_prices()

new Chart("myChart", {
    type: "line",
    data: {
    labels: xValues,
    datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
    }]
    },
    options: {
    legend: {display: false},
    scales: {
        yAxes: [{ticks: {min: 0, max:3}}],
    }
    }
});
}

create_graph()