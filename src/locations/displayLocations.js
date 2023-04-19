function appendLocationsToTable(key){

    const location = key.split("\\")[0]
    const method = key.split("\\")[1]
    const speciesKey = key.split("\\")[2]

    let table = document.getElementById(`${location}${method}`)
    let tableThead = document.createElement("thead")
    let tableTbody = document.createElement("tbody")
    if(table){
        tableThead = table.children[0]
        tableTbody = table.children[1]
    }
    else{
        const table = document.createElement("table")
        
        let locationTableHeader = createRowHeader(location, method)
        table.setAttribute("id", `${location}${method}`)
        tableThead.append(locationTableHeader)
        table.append(tableThead)
        table.append(tableTbody)
        locationsTableTbody.append(table)
        table.classList = "locationsTable"
    }

    if(!(speciesKey in species)){
        return
    }

    let row = document.createElement("tr")
    row.setAttribute("id", `${key}`)

    let spriteContainer = document.createElement("td")
    spriteContainer.className = "sprite"
    let sprite = document.createElement("img")
    sprite.src = getSpeciesSpriteSrc(speciesKey)
    sprite.className = `sprite${speciesKey} miniSprite3`
    spriteContainer.append(sprite)
    row.append(spriteContainer)

    let speciesContainer = document.createElement("td")
    let speciesName = document.createElement("div")
    speciesName.className = "key hide"
    speciesName.innerText = speciesKey
    speciesContainer.innerText = sanitizeString(speciesKey)
    speciesContainer.append(speciesName)
    row.append(speciesContainer)

    let rarity = document.createElement("td")
    const locationsInfo = document.createElement("div")
    rarity.className = "rarity"
    rarity.innerText = `${locations[location][method][speciesKey]}%`
    rarity.style.color = `hsl(${locations[location][method][speciesKey]*2},85%,45%)`
    locationsInfo.innerText = `${location} ${method}`
    locationsInfo.className = "locationsInfo hide"
    rarity.append(locationsInfo)
    row.append(rarity)

    row.addEventListener("click", () => {
        scrollToSpecies = row.id
        createSpeciesPanel(speciesKey)
        window.scrollTo(0, 0)
    })
    
    tableTbody.append(row)
}

function createRowHeader(location, method){
    let locationTableHeader = document.createElement("tr")
    locationTableHeader.className = "locationTableHeader"

    let spriteHeaderContainer = document.createElement("th")
    let spriteHeader = document.createElement("img")
    spriteHeaderContainer.className = "sprite"
    spriteHeader.src = `https://raw.githubusercontent.com/${repoDex}/main/src/locations/sprites/${returnMethodSprite(method).replaceAll(" ", "_")}.png`
    spriteHeaderContainer.append(spriteHeader)
    locationTableHeader.append(spriteHeaderContainer)

    let headerContainer = document.createElement("th")
    headerContainer.innerText = `${location} ${method}`
    headerContainer.colSpan = "2"
    headerContainer.className = "headerContainer"
    locationTableHeader.append(headerContainer)

    return locationTableHeader
}





function returnMethodSprite(method){
    if(method.match(/raid/i)){
        return "Raid"
    }
    else if(method.match(/shard/i)){
        return "Egg"
    }
    else if(method.match(/sprouted|taller|flowering|berries/i)){
        return "Berry"
    }
    else{
        return method
    }
}