function filterSpeciesForm(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(value === "Mega"){
            if(!/_MEGA$|_MEGA_Y$|_MEGA_X$/i.test(key)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
        else if(value === "Alolan"){
            if(!/_A$/i.test(name) || /UNOWN/i.test(name)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Galarian"){
            if(!/_G$|PERRSERKER$|SIRFETCHD$|MR_RIME$|CURSOLA$|OBSTAGOON$|RUNERIGUS$/i.test(key) || /UNOWN/i.test(key)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Hisuian"){
            if(!/_H$|OVERQWIL$|SNEASLER$|BASCULEGION$/i.test(key) || /UNOWN/i.test(key)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
    }
}

function filterSpeciesItem(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(!(sanitizeString(species[name]["item1"]) === value) && !(sanitizeString(species[name]["item2"]) === value)){
            tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
        }
    }
}

function filterSpeciesAbility(value, label){
    let abilityName = null
    Object.keys(abilities).forEach(ability => {
        if(abilities[ability]["ingameName"] === value){
            abilityName = ability
        }
    })
    if(abilityName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(!species[name]["abilities"].includes(abilityName)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
    }
}

function filterSpeciesMove(value, label){
    let moveName = null
    Object.keys(moves).forEach(move => {
        if(moves[move]["ingameName"] === value){
            moveName = move
        }
    })
    if(moveName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(!speciesCanLearnMove(species[name], moveName)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
    }
}

function filterSpeciesEggGroup(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(!(sanitizeString(species[name]["eggGroup1"]) === value) && !(sanitizeString(species[name]["eggGroup2"]) === value)){
            tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
        }
    }
}

function filterType(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(table === speciesTable || table === locationsTable){
            if(!(sanitizeString(species[name]["type1"]) === value) && !(sanitizeString(species[name]["type2"]) === value)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
        else if(table === movesTable){
            if(!(sanitizeString(moves[name]["type"]) === value)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
    }
}

function filterMovesSplit(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]

        if(!(sanitizeString(moves[name]["split"]) === value)){
            tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
        }
    }
}

function filterBaseStats(value, label){
    if(value === "HP"){
        value = "baseHP"
        label = "HP"
    }
    else if(value === "Atk"){
        value = "baseAttack"
        label = "Atk"
    }
    else if(value === "Def"){
        value = "baseDefense"
        label = "Def"
    }
    else if(value === "SpA"){
        value = "baseSpAttack"
        label = "SpA"
    }
    else if(value === "SpD"){
        value = "baseSpDefense"
        label = "SpD"
    }
    else if(value === "Spe"){
        value = "baseSpeed"
        label = "Speed"
    }
    else if(value === "BST"){
        value = "BST"
        label = "BST"
    }

    filterOperators(value, label, species)
}





































function selectFilter(value, label){
    if(label === "Item"){
        filterSpeciesItem(value, label)
    }
    else if(label === "Move"){
        filterSpeciesMove(value, label)   
    }
    else if(label === "Type"){
        filterType(value, label)
    }
    else if(label === "Ability"){
        filterSpeciesAbility(value, label)   
    }
    else if(label === "Egg Group"){
        filterSpeciesEggGroup(value, label)   
    }
    else if(label === "Form"){
        filterSpeciesForm(value, label)   
    }
    else if(label === "Split"){
        filterMovesSplit(value, label)
    }
    else if(label === "Base Stats"){
        filterBaseStats(value, label)
    }
}






async function setFilters(){
    createFilterGroup(["Mega", "Alolan", "Galarian", "Hisuian"], "Form", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["type"], moves), "Type", [speciesFilterList, movesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["split"], moves), "Split", [movesFilterList])
    createFilterGroup(createFilterArray(["item1", "item2"], species), "Item", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["ingameName"], abilities, false), "Ability", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["ingameName"], moves, false), "Move", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["eggGroup1", "eggGroup2"], species), "Egg Group", [speciesFilterList, locationsFilterList])
    createFilterGroup(["HP", "Atk", "Def", "SpA", "SpD", "Spe", "BST"], "Base Stats", [speciesFilterList, locationsFilterList], true)
}











































function filterList(){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const filters = activeFilter.getElementsByClassName("tableFilter")
    
    for(let i = 0; i < filters.length; i++){
        filters[i].classList.add("hide")
    }

    document.getElementsByClassName("activeInput")[0].value = ""


    for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
    }
}






function createFilterGroup(values, labelValue, tableFilterListArray, operator = false){
    for(let i = 0; i < tableFilterListArray.length; i++){
        const mainContainer = document.createElement("div")
        values.forEach(value => {
            const container = document.createElement("span")
            const label = document.createElement("span")
            const valueContainer = document.createElement("span")

            label.innerText = `${labelValue}: `
            label.className = `${labelValue.replaceAll(" ", "")}`

            container.className = `tableFilter hide`

            valueContainer.innerText = value
            valueContainer.className = "filterValue"
            if(labelValue.includes("Type")){
                valueContainer.className = `TYPE_${value.toUpperCase()} background4 filterValue`
            }

            container.append(label)
            container.append(valueContainer)

            mainContainer.append(container)
            mainContainer.className = "filterListContainer"

            if(operator){
                container.classList.add("operator")
                container.addEventListener("click", () => {
                    selectFilter(value, labelValue)
                })
            }
            else{
                container.addEventListener("click", () => {
                    createFilter(value, labelValue)
                })
            }
        })
        tableFilterListArray[i].append(mainContainer)
    }
}





function filterFilters(input){
    const sanitizedInput = input.replaceAll(/-|'| |_/g, "").toLowerCase()
    const activeFilter = document.getElementsByClassName("activeFilter")
    if(activeFilter.length > 0){
        const filters = activeFilter[0].getElementsByClassName("tableFilter")
        for(let i = 0; i < filters.length; i++){
            const filterValue = filters[i].getElementsByClassName("filterValue")
            if(filters[i].classList.contains("operator") && /\d+/.test(input)){
                filters[i].classList.remove("hide")
            }
            else if(sanitizedInput.length >= 3 && filterValue[0].innerText.replaceAll(/-|'| |_/g, "").toLowerCase().includes(sanitizedInput) && !filters[i].classList.contains("operator")){
                filters[i].classList.remove("hide")
            }
            else{
                filters[i].classList.add("hide")   
            }
        }
    }
}






function createFilterArray(objInputArray, obj, sanitize = true){
    let list = []
    for (const name of Object.keys(obj)){
        for (let i = 0; i < objInputArray.length; i++){
            let value = obj[name][objInputArray[i]]
            if(sanitize){
                value = sanitizeString(value)
            }
            if(!list.includes(value)){
                list.push(value)
            }
        }
    }
    return list
}



function createFilter(value, label){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]
    const newFilter = document.createElement("div")
    newFilter.innerText = `${label}: ${value}`
    newFilter.classList = "filter crossOnHover newFilter"
    selectFilter(value, label)
    tableFilterContainer.append(newFilter)

    newFilter.addEventListener("click", () => {
        for(let i = 0, j = tracker.length; i < j; i++){
            for(let k = 0; k < tracker[i]["filter"].length; k++){
                if(tracker[i]["filter"][k] == `filter${label}${value}`.replaceAll(" ", "")){
                    tracker[i]["filter"].splice(k, 1)
                }
            }
        }
        newFilter.remove()
        lazyLoading(true)
    })

    filterList()
    lazyLoading(true)
}



function createOperatorFilter(label, operator, number){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]
    const newFilter = document.createElement("div")
    newFilter.innerText = `${label} ${operator} ${number}`
    newFilter.classList = "filter crossOnHover newFilter"
    tableFilterContainer.append(newFilter)

    newFilter.addEventListener("click", () => {
        for(let i = 0, j = tracker.length; i < j; i++){
            tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== `filter${label}${operator}${number}`.replaceAll(" ", ""))
        }
        newFilter.remove()
        lazyLoading(true)
    })

    filterList()
    lazyLoading(true)
}



function deleteFiltersFromTable(){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]

    for(let i = 0, j = tracker.length; i < j; i++){
        for(let k = 0; k < tracker[i]["filter"].length; k++){
            if(tracker[i]["filter"][k].includes("filter")){
                tracker[i]["filter"].splice(k, 1)
            }
        }
    }

    while(tableFilterContainer.firstChild)
        tableFilterContainer.removeChild(tableFilterContainer.firstChild)
}








































































function filterOperators(value, label, obj){
    let operator = document.getElementsByClassName("activeInput")[0].value.match(/>=|<=|=>|=<|=|>|</)
    if(!operator){
        operator = ">="
    }
    else{
        operator = operator[0]   
    }
    const number = document.getElementsByClassName("activeInput")[0].value.match(/\d+/)[0]

    for(let i = 0, j = tracker.length; i < j; i++){
        
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }

        if(operator === ">=" || operator === "=>"){
            if(!(obj[name][value] >= number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === "<=" || operator === "=<"){
            if(!(obj[name][value] <= number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === "="){
            if(!(obj[name][value] == number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === ">"){
            if(!(obj[name][value] > number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === "<"){
            if(!(obj[name][value] < number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
    }

    createOperatorFilter(label, operator, number)
}