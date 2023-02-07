const mode_color = {
  ON: "#50e7f2",
  OFF: "#f25050",
  ECONOMY: "#53f250"
}

async function getRequest(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors"
  })
  return response
}

async function postRequest(url, body) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return response
}

async function getMode() {
  const response = await getRequest("https://smartswitch.gerhardadler.no/get_mode")
  const json = await response.json()
  return json.mode
}

async function setMode(mode) {
  const response = await postRequest("https://smartswitch.gerhardadler.no/set_mode", {
    mode: mode
  })
  return response
}

async function getArea() {
  const response = await getRequest("https://smartswitch.gerhardadler.no/get_area")
  const json = await response.json()
  return json.area
}

async function setArea(area) {
  const response = await postRequest("https://smartswitch.gerhardadler.no/set_area", {
    area: area
  })
  return response
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
