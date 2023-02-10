import { getMode, setMode, getArea, setArea } from "./api_connect.js";
import { createGraph } from "./price_chart.js";

const mode_color = {
  ON: "#50e7f2",
  OFF: "#f25050",
  ECONOMY: "#53f250"
}

function modeBtnClick(setmode) {
  setMode(setmode)
    .then((response) => {
      if (response.status === 201) {
        for (const mode in mode_color) {
          if (mode === setmode) {
            document.getElementById(mode.toLowerCase() + "_btn").style.backgroundColor = mode_color[mode]
          } else {
            document.getElementById(mode.toLowerCase() + "_btn").style.backgroundColor = "white"
          }
        }
      } else {
        alert("error")
      }
    })
}

document.getElementById("on_btn").addEventListener("click", () => modeBtnClick("ON"))
document.getElementById("off_btn").addEventListener("click", () => modeBtnClick("OFF"))
document.getElementById("economy_btn").addEventListener("click", () => modeBtnClick("ECONOMY"))

document.getElementById("region-select").addEventListener("change", (event) => {
  event.target.disabled = true
  setArea(event.target.value)
    .then((response) => {
      if (response.status === 201) {
        event.target.disabled = false
        createGraph()
      } else {
        alert("error")
      }
    })
})

getMode()
  .then((mode) => {
    document.getElementById(mode.toLowerCase() + "_btn").style.backgroundColor = mode_color[mode]
  })

getArea()
  .then((area) => {
    document.getElementById("region-select").disabled = false
    document.getElementById("region-select").value = area
  })

createGraph()