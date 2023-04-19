function appendSpeciesToTable(speciesName){

    if(species[speciesName]["baseSpeed"] <= 0){
        return
    }

    const tBody = speciesTableTbody
    let row = document.createElement("tr")
    row.setAttribute("id", `${speciesName}`)
    tBody.append(row)

    let IDcontainer = document.createElement("td")
    let ID = document.createElement("div")
    IDcontainer.className = "ID"
    ID.innerText = species[speciesName]["ID"]
    IDcontainer.append(ID)
    row.append(IDcontainer)


    let spriteContainer = document.createElement("td")
    spriteContainer.className = "sprite"
    let sprite = document.createElement("img")
    sprite.src = getSpeciesSpriteSrc(speciesName)
    spriteContainer.append(sprite)
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
            if(species[speciesName]["type1"] !== species[speciesName]["changes"][k][1] && patchnoteModeCheckbox.checked){
                type1.classList.add("typeChanged")
            }
        }
        else if(species[speciesName]["changes"][k][0] === "type2"){
            if(species[speciesName]["type2"] !== species[speciesName]["changes"][k][1] && patchnoteModeCheckbox.checked){
                type2.classList.add("typeChanged")
            }
        }
    }

    types.append(type1)
    if(species[speciesName]["type1"] !== species[speciesName]["type2"]){
        types.append(type2)
    }
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
                    if(species[speciesName]["abilities"][j] !== species[speciesName]["changes"][k][1][j] && patchnoteModeCheckbox.checked){
                        const changelogAbilities = document.createElement("span")
                        changelogAbilities.className = "changelogAbilities"
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
        scrollToSpecies = row.id
        window.scrollTo(0, 0)
    })
}



function createBaseStatsContainer(headerText, stats, speciesObj){
    let baseStatsContainer = document.createElement("td")
    let baseStats = document.createElement("div")
    let baseStatsHeader = document.createElement("em")


    baseStatsHeader.innerText = headerText

    baseStats.className = `baseStatsBold ${stats}`

    baseStats.innerText = speciesObj[stats]


    for (let k = 0; k < speciesObj["changes"].length; k++){
        if(speciesObj["changes"][k][0] === stats && patchnoteModeCheckbox.checked){
            if(speciesObj[stats] > speciesObj["changes"][k][1]){
                baseStats.classList.add("buff", "bold")
                baseStatsHeader.classList.add("buff", "bold")
            }
            else{
                baseStats.classList.add("nerf", "bold")
                baseStatsHeader.classList.add("nerf", "bold")
            }
        }
    }

    baseStatsContainer.append(baseStatsHeader)
    baseStatsContainer.append(baseStats)
    baseStatsContainer.className = `${stats}Container`

    return baseStatsContainer
}



async function spriteRemoveBgReturnBase64(speciesName, species){
    let sprite = new Image()
    let canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    sprite.crossOrigin = 'anonymous'
    sprite.src = species[speciesName]["sprite"]

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    sprite.onload = async () => {
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

        if(!localStorage.getItem(`${speciesName}`)){
            await localStorage.setItem(`${speciesName}`, LZString.compressToUTF16(canvas.toDataURL()))
            sprites[speciesName] = canvas.toDataURL()
        }
    }
}