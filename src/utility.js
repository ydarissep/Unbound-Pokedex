function sanitizeString(string){
    const regex = /^SPECIES_|^TYPE_|ABILITY_NONE|ABILITY_|^SPECIES_NONE|^MOVE_|^SPLIT_|FLAG_|^EFFECT_|^Z_EFFECT_|^ITEM_|^EGG_GROUP_|^EVO_/ig
    const unsanitizedString = string.toString().replace(regex, "")
    let matchArray = unsanitizedString.match(/\w+/g)
    if(matchArray !== null){
        for (i = 0; i < matchArray.length; i++){
            matchArray[i] = matchArray[i].split('_')
            for (j = 0; j < matchArray[i].length; j++){
                matchArray[i][j] = matchArray[i][j][0].toUpperCase() + matchArray[i][j].slice(1).toLowerCase()
            }
            matchArray[i] = matchArray[i].join(" ")
        }
        return matchArray.join(" ")
    }
    else
        return unsanitizedString
}








async function fetchData(){
    await forceUpdate()

    await fetchMovesObj()
    await fetchAbilitiesObj()
    await fetchSpeciesObj()
    await fetchLocationsObj()
    
    await fetchTypeChart()


    await setDataList()
    await setFilters()
    await displaySetup()

    await window.scrollTo(0, 0)
}



async function fetchTypeChart(){
    const rawTypeChart = await fetch("https://raw.githubusercontent.com/ydarissep/inclement-emerald-pokedex/main/src/typeChart.json")
    window.typeChart = await rawTypeChart.json()
}




async function forceUpdate(){
    const update = 1
    if(localStorage.getItem("update") != `${update} Unbound`){
        await localStorage.clear()
        await localStorage.setItem("update", `${update} Unbound`)
        await footerP("Fetching data please wait... this is only run once")
    }
}





function footerP(input){
    if(input === "")
        document.querySelectorAll("#footer > p").forEach(paragraph => paragraph.remove())

    const paragraph = document.createElement("p")
    const footer = document.getElementById("footer")
    paragraph.innerText = input
    footer.append(paragraph)
}





function setDataList(){
    window.speciesIngameNameArray = []
    Object.keys(species).forEach(speciesName => {
        const option = document.createElement("option")
        option.innerText = sanitizeString(speciesName)
        speciesIngameNameArray.push(option.innerText)
        speciesPanelInputSpeciesDataList.append(option)
    })

    window.abilitiesIngameNameArray = []
    Object.keys(abilities).forEach(abilityName => {
        const option = document.createElement("option")
        option.innerText = abilities[abilityName]["ingameName"]
        abilitiesIngameNameArray.push(option.innerText)
        abilitiesInputDataList.append(option)
    })
}





function speciesCanLearnMove(speciesObj, moveName){
    if("levelUpLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["levelUpLearnsets"].length; i++){
            if(typeof(speciesObj["levelUpLearnsets"][i]) == "object"){
                if(speciesObj["levelUpLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["levelUpLearnsets"][i] == "string")){
                if(speciesObj["levelUpLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    if("TMHMLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["TMHMLearnsets"].length; i++){
            if(typeof(speciesObj["TMHMLearnsets"][i]) == "object"){
                if(speciesObj["TMHMLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["TMHMLearnsets"][i] == "string")){
                if(speciesObj["TMHMLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    if("eggMovesLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["eggMovesLearnsets"].length; i++){
            if(typeof(speciesObj["eggMovesLearnsets"][i]) == "object"){
                if(speciesObj["eggMovesLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["eggMovesLearnsets"][i] == "string")){
                if(speciesObj["eggMovesLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    if("tutorLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["tutorLearnsets"].length; i++){
            if(typeof(speciesObj["tutorLearnsets"][i]) == "object"){
                if(speciesObj["tutorLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["tutorLearnsets"][i] == "string")){
                if(speciesObj["tutorLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    return false
}