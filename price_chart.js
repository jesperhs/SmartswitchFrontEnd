import { getArea } from "./api_connect.js";

async function get_prices() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const area = await getArea()

    const response = await fetch("https://www.hvakosterstrommen.no/api/v1/prices/" + yyyy + "/" + mm + "-" + dd + "_" + area + ".json")
    const response_json = await response.json()
    let output = []
    for (const obj of response_json) {
        output.push(obj["NOK_per_kWh"])
    }
    return output
}

export async function createGraph() {
var xValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
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