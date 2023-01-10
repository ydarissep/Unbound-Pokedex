function displayLocations(){
    const locationsArray = Object.keys(locations)
    let count = 0

    for (let i = 0; i < locationsArray.length; i++){

        const methodArray = Object.keys(locations[locationsArray[i]])

        for(let j = 0; j < methodArray.length; j++){

            const table = document.createElement("table")
            const tableThead = document.createElement("thead")
            const tableTbody = document.createElement("tbody")

            let locationTableHeader = createRowHeader(locationsArray[i], methodArray[j])
            tableThead.append(locationTableHeader)
            table.append(tableThead)

            const speciesArray = Object.keys(locations[locationsArray[i]][methodArray[j]])

            for(let k = 0; k < speciesArray.length; k++){

                if(!(speciesArray[k] in species)){
                    continue
                }

                let row = document.createElement("tr")
                tableTbody.append(row)

                let spriteContainer = document.createElement("td")
                spriteContainer.className = "sprite"
                let sprite = document.createElement("img")
                sprite.src = getSpeciesSpriteSrc(speciesArray[k])
                sprite.className = "miniSprite3"
                spriteContainer.append(sprite)
                row.append(spriteContainer)

                let speciesContainer = document.createElement("td")
                let speciesName = document.createElement("div")
                speciesName.className = "key hide"
                speciesName.innerText = speciesArray[k]
                speciesContainer.innerText = sanitizeString(speciesArray[k])
                speciesContainer.append(speciesName)
                row.append(speciesContainer)

                let rarity = document.createElement("td")
                const locationsInfo = document.createElement("div")
                rarity.className = "rarity"
                rarity.innerText = `${locations[locationsArray[i]][methodArray[j]][speciesArray[k]]}%`
                rarity.style.color = `hsl(${locations[locationsArray[i]][methodArray[j]][speciesArray[k]]*2},85%,45%)`
                locationsInfo.innerText = `${locationsArray[i]} ${methodArray[j]}`
                locationsInfo.className = "locationsInfo hide"
                rarity.append(locationsInfo)
                row.append(rarity)

                row.addEventListener("click", () => {
                    createSpeciesPanel(speciesArray[k])
                    window.scrollTo(0, 0)
                })

                count++
                if(count >= 75){
                    row.classList.add("hideTemp")
                }
            }

            table.append(tableTbody)
            locationsTableTbody.append(table)
            table.classList = "locationsTable"

        }
    }
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
    if(method.match(/raid/i) !== null){
        return "Raid"
    }
    else if(method.match(/shard/i) !== null){
        return "Egg"
    }
    else if(method.match(/sprouted|taller|flowering|berries/i) !== null){
        return "Berry"
    }
    else{
        return method
    }
}