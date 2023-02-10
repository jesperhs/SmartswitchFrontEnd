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

export async function getMode() {
  const response = await getRequest("https://smartswitch.gerhardadler.no/get_mode")
  const json = await response.json()
  return json.mode
}

export async function setMode(mode) {
  const response = await postRequest("https://smartswitch.gerhardadler.no/set_mode", {
    mode: mode
  })
  return response
}

export async function getArea() {
  const response = await getRequest("https://smartswitch.gerhardadler.no/get_area")
  const json = await response.json()
  return json.area
}

export async function setArea(area) {
  const response = await postRequest("https://smartswitch.gerhardadler.no/set_area", {
    area: area
  })
  return response
}