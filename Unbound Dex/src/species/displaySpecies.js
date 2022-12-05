function displaySpecies(){
    let tBody = speciesTableTbody
    const speciesArray = Object.keys(species)
    tBody.innerText = ""
    for (let i = 0; i < speciesArray.length; i++){
        const speciesName = speciesArray[i]
        let row = document.createElement("tr")
        row.setAttribute("id", `${speciesName}`)
        tBody.append(row)

        if(i >= 75)
            row.className = "hideTemp"


        let IDcontainer = document.createElement("td")
        let ID = document.createElement("div")
        IDcontainer.className = "ID"
        ID.innerText = species[speciesName]["ID"]
        IDcontainer.append(ID)
        row.append(IDcontainer)


        let spriteContainer = document.createElement("td")
        spriteContainer.className = "sprite"
        if(localStorage.getItem("sprites")){
            let sprite = document.createElement("img")
            sprite.src = spritesObj[speciesName]
            sprite.className = "src"
            spriteContainer.append(sprite)
            if(i === speciesArray.length - 1){
                delete spritesObj
            }
        }
        else{
            let canvas = renderSprite(speciesName)
            canvas.className = "src"
            spriteContainer.append(canvas)
        }
        row.append(spriteContainer)
        


        let nameContainer = document.createElement("td")
        let name = document.createElement("div")
        let ingameName = document.createElement("div")
        nameContainer.className = "nameContainer"
        name.className = "key hide"
        name.innerText = species[speciesName]["name"]
        ingameName.className = "species"
        ingameName.innerText = sanitizeString(species[speciesName]["name"])
        nameContainer.append(ingameName)
        nameContainer.append(name)
        row.append(nameContainer)


        let typesContainer = document.createElement("td")
        let types = document.createElement("div")
        let type1 = document.createElement("div")
        let type2 = document.createElement("div")
        typesContainer.className = "types"
        type1.innerText = `${sanitizeString(species[speciesName]["type1"])} `
        type2.innerText = `${sanitizeString(species[speciesName]["type2"])} `
        type1.className = `${species[speciesName]["type1"]} background`
        type2.className = `${species[speciesName]["type2"]} background`


        for (let k = 0; k < species[speciesName]["changes"].length; k++){
            if(species[speciesName]["changes"][k][0] === "type1"){
                if(species[speciesName]["type1"] !== species[speciesName]["changes"][k][1]){
                    type1.classList.add("changelogType")
                }
            }
            else if(species[speciesName]["changes"][k][0] === "type2"){
                if(species[speciesName]["type2"] !== species[speciesName]["changes"][k][1]){
                    type2.classList.add("changelogType")
                }
            }
        }

        
        types.append(type1)
        if(species[speciesName]["type1"] !== species[speciesName]["type2"])
            types.append(type2)
        typesContainer.append(types)
        row.append(typesContainer)



        let abilitiesContainer = document.createElement("td")
        abilitiesContainer.className = "abilities"
        for (let j = 0; j < species[speciesName]["abilities"].length; j++){
            let ability = document.createElement("div")
            let abilityName = species[speciesName]["abilities"][j]
            if(j === 1 && abilityName === species[speciesName]["abilities"][0]){
                continue
            }
            else if(j === 2 && (abilityName === species[speciesName]["abilities"][0] || abilityName === "ABILITY_NONE") && (abilityName === species[speciesName]["abilities"][1] || abilityName === "ABILITY_NONE")){
                continue
            }
            if(abilityName !== "ABILITY_NONE"){
                ability.innerText = `${abilities[abilityName]["ingameName"]} `
                if(j === 2){
                    ability.style.fontWeight = "bold"
                }


                for (let k = 0; k < species[speciesName]["changes"].length; k++){
                    if(species[speciesName]["changes"][k][0] === "abilities"){
                        if(species[speciesName]["abilities"][j] !== species[speciesName]["changes"][k][1][j]){
                            const changelogAbilities = document.createElement("span")
                            changelogAbilities.className = "changelogAbilities hide"
                            changelogAbilities.innerText = "new"
                            ability.append(changelogAbilities)
                        }
                    }
                }


                abilitiesContainer.append(ability)
            }
        }
        row.append(abilitiesContainer)



        let speciesObj = species[speciesName]

        row.append(createBaseStatsContainer("HP", "baseHP", speciesObj))

        row.append(createBaseStatsContainer("Atk", "baseAttack", speciesObj))

        row.append(createBaseStatsContainer("Def", "baseDefense", speciesObj))

        row.append(createBaseStatsContainer("SpA", "baseSpAttack", speciesObj))

        row.append(createBaseStatsContainer("SpD", "baseSpDefense", speciesObj))

        row.append(createBaseStatsContainer("Spe", "baseSpeed", speciesObj))

        row.append(createBaseStatsContainer("BST", "BST", speciesObj))

        row.addEventListener("click", () => {
            createSpeciesPanel(speciesName)
            window.scrollTo(0, 0)
        })
    }
}


function createBaseStatsContainer(headerText, stats, speciesObj){
    let baseStatsContainer = document.createElement("td")
    let baseStats = document.createElement("div")
    let baseStatsHeader = document.createElement("em")


    baseStatsHeader.innerText = headerText

    baseStats.className = `baseStatsBold ${stats}`

    baseStats.innerText = speciesObj[stats]


    for (let k = 0; k < speciesObj["changes"].length; k++){
        if(speciesObj["changes"][k][0] === stats){
            if(speciesObj[stats] > speciesObj["changes"][k][1]){
                baseStats.classList.add("changelogBuff")
                baseStatsHeader.classList.add("changelogBuff")
            }
            else{
                baseStats.classList.add("changelogNerf")
                baseStatsHeader.classList.add("changelogNerf")
            }
        }
    }


    baseStatsContainer.append(baseStatsHeader)
    baseStatsContainer.append(baseStats)
    baseStatsContainer.className = `${stats}Container`

    return baseStatsContainer
}



function renderSprite(speciesName){
    let sprite = new Image()
    let canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    sprite.crossOrigin = 'anonymous'
    sprite.src = species[speciesName]["sprite"]

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    sprite.onload = () => {
        context.drawImage(sprite, 0, 0)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const backgroundColor = []
        for (let i = 0; i < 4; i++) {
          backgroundColor.push(imageData.data[i])
        }
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (
            imageData.data[i] === backgroundColor[0] &&
            imageData.data[i + 1] === backgroundColor[1] &&
            imageData.data[i + 2] === backgroundColor[2]
          ) imageData.data[i + 3] = 0
        }
        context.putImageData(imageData, 0, 0) 

        spritesObj[speciesName] = LZString.compressToUTF16(canvas.toDataURL())

        if(Object.keys(spritesObj).length == Object.keys(species).length){
            setItemSprites(spritesObj)
            delete spritesObj
        }
    }
    return canvas
}


async function setItemSprites(spritesObj){
    await localStorage.setItem("sprites", JSON.stringify(spritesObj))
}