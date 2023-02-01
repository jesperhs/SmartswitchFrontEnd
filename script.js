/* HENTER INFORMASJON */
var xmlhttp = new XMLHttpRequest();
var url = "https://www.hvakosterstrommen.no/api/v1/prices/2023/01-31_NO5.json";

xmlhttp.onreadystatechange =
function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    out += arr[i].NOK_per_kWh.toString();
    out += "<br>"
  }
  document.getElementById("id01").innerHTML = out;
}
