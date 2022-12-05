function displayLocations(){
    let tBody = locationsTableTbody
    const locationsArray = Object.keys(locations)
    tBody.innerText = ""
    let counter = 0

    for (let i = 0; i < locationsArray.length; i++){

        const methodArray = Object.keys(locations[locationsArray[i]])

        for(let j = 0; j < methodArray.length; j++){

            let rowZoneHeader = createRow(locationsArray[i], methodArray[j])
            tBody.append(rowZoneHeader)

            const speciesArray = Object.keys(locations[locationsArray[i]][methodArray[j]])

            for(let k = 0; k < speciesArray.length; k++){

                if(!(speciesArray[k] in species)){
                    continue
                }

                let row = document.createElement("tr")
                tBody.append(row)
                row.className = "locationsHover"

                let spriteContainer = document.createElement("td")
                spriteContainer.className = "sprite"
                let sprite = document.createElement("img")
                sprite.src = getSpeciesSpriteSrc(speciesArray[k])
                sprite.className = "miniSprite3"
                spriteContainer.append(sprite)
                row.append(spriteContainer)

                let speciesContainer = document.createElement("td")
                let speciesName = document.createElement("div")
                speciesName.className = "species hide"
                speciesName.innerText = speciesArray[k]
                speciesContainer.innerText = sanitizeString(speciesArray[k])
                rowZoneHeader.querySelector(".species").innerText = `${rowZoneHeader.querySelector(".species").innerText} ${sanitizeString(speciesArray[k])}`
                speciesContainer.append(speciesName)
                row.append(speciesContainer)

                let rarity = document.createElement("td")
                rarity.className = "rarity"
                rarity.innerText = `${locations[locationsArray[i]][methodArray[j]][speciesArray[k]]}%`
                rarity.style.color = `hsl(${locations[locationsArray[i]][methodArray[j]][speciesArray[k]]*2},85%,45%)`
                row.append(rarity)

                let zone = document.createElement("td")
                zone.className = "zone method hide"
                zone.innerText = `${locationsArray[i]}  ${methodArray[j]}`
                row.append(zone)

                row.addEventListener("click", () => {
                    createSpeciesPanel(speciesArray[k])
                    window.scrollTo(0, 0)
                })

                counter++
                if(counter >= 75){
                    row.classList.add("hideTemp")
                }

            }
            let blankRow = rowZoneHeader.cloneNode(true)
            blankRow.className = "hidden"
            blankRow.getElementsByClassName("zone")[0].innerText += "\nbreakline"
            tBody.append(blankRow)

            if(counter >= 75){
                rowZoneHeader.classList.add("hideTemp")
                blankRow.classList.add("hideTemp")
            }

        }
    }
}

function createRow(location, method){
    let rowZoneHeader = document.createElement("tr")
    rowZoneHeader.className = "rowZoneHeader"

    let spriteHeaderContainer = document.createElement("td")
    let spriteHeader = document.createElement("img")
    spriteHeaderContainer.className = "sprite"
    spriteHeader.src = `https://raw.githubusercontent.com/ydarissep/inflamed-red-pokedex/main/src/locations/sprites/${returnMethodSprite(method).replaceAll(" ", "_")}.png`
    spriteHeaderContainer.append(spriteHeader)
    rowZoneHeader.append(spriteHeaderContainer)

    let speciesHeader = document.createElement("td")
    speciesHeader.className = "species hide"
    rowZoneHeader.append(speciesHeader)

    let rarityHeader = document.createElement("td")
    rarityHeader.className = "rarity hide"
    rowZoneHeader.append(rarityHeader)

    let zoneHeader = document.createElement("td")
    zoneHeader.className = `zone method zoneHeader bold`
    zoneHeader.innerText = `${location} ${method}`
    zoneHeader.colSpan = "2"
    rowZoneHeader.append(zoneHeader)

    return rowZoneHeader
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