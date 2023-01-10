function filterSpeciesForm(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    for(let i = 0; i < rows.length; i++){
        const key = rows[i].getElementsByClassName("key")[0].innerText
        if(value === "Mega"){
            if(!/_MEGA$|_MEGA_Y$|_MEGA_X$/i.test(key)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }
        }
        else if(value === "Alolan"){
            if(!/_A$/i.test(key) || /UNOWN/i.test(key)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Galarian"){
            if(!/_G$|PERRSERKER$|SIRFETCHD$|MR_RIME$|CURSOLA$|OBSTAGOON$|RUNERIGUS$/i.test(key) || /UNOWN/i.test(key)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Hisuian"){
            if(!/_H$|OVERQWIL$|SNEASLER$|BASCULEGION$/i.test(key) || /UNOWN/i.test(key)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        rows[i].classList.remove("hide")
    }
}

function filterSpeciesItem(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    for(let i = 0; i < rows.length; i++){
        const key = rows[i].getElementsByClassName("key")[0].innerText
        if(!(sanitizeString(species[key]["item1"]) === value) && !(sanitizeString(species[key]["item2"]) === value)){
            rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
        }
        rows[i].classList.remove("hide")
    }
}

function filterSpeciesAbility(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    let name = null
    Object.keys(abilities).forEach(ability => {
        if(abilities[ability]["ingameName"] === value){
            name = ability
        }
    })
    if(name){
        for(let i = 0; i < rows.length; i++){
            const key = rows[i].getElementsByClassName("key")[0].innerText
            if(!species[key]["abilities"].includes(name)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }
            rows[i].classList.remove("hide")
        }
    }
}

function filterSpeciesMove(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    let name = null
    Object.keys(moves).forEach(move => {
        if(moves[move]["ingameName"] === value){
            name = move
        }
    })
    if(name){
        for(let i = 0; i < rows.length; i++){
            const key = rows[i].getElementsByClassName("key")[0].innerText
            if(!speciesCanLearnMove(species[key], name)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }
            rows[i].classList.remove("hide")
        }
    }
}

function filterSpeciesEggGroup(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    for(let i = 0; i < rows.length; i++){
        const key = rows[i].getElementsByClassName("key")[0].innerText
        if(!(sanitizeString(species[key]["eggGroup1"]) === value) && !(sanitizeString(species[key]["eggGroup2"]) === value)){
            rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
        }
        rows[i].classList.remove("hide")
    }
}

function filterType(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    for(let i = 0; i < rows.length; i++){
        const key = rows[i].getElementsByClassName("key")[0].innerText
        if(table === speciesTable || table === locationsTable){
            if(!(sanitizeString(species[key]["type1"]) === value) && !(sanitizeString(species[key]["type2"]) === value)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }
        }
        else if(table === movesTable){
            if(!(sanitizeString(moves[key]["type"]) === value)){
                rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        rows[i].classList.remove("hide")
    }
}

function filterMovesSplit(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    for(let i = 0; i < rows.length; i++){
        const key = rows[i].getElementsByClassName("key")[0].innerText
        if(!(sanitizeString(moves[key]["split"]) === value)){
            rows[i].classList.add(`hideFilter${label}${value}`.replaceAll(" ", ""))
        }
        rows[i].classList.remove("hide")
    }
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
}






async function setFilters(){
    createFilterGroup(["Mega", "Alolan", "Galarian", "Hisuian"], "Form", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["type"], moves), "Type", [speciesFilterList, movesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["split"], moves), "Split", [movesFilterList])
    createFilterGroup(createFilterArray(["item1", "item2"], species), "Item", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["ingameName"], abilities, false), "Ability", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["ingameName"], moves, false), "Move", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["eggGroup1", "eggGroup2"], species), "Egg Group", [speciesFilterList, locationsFilterList])
}











































function hideFilterList(){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const filters = activeFilter.getElementsByClassName("tableFilter")
    
    for(let i = 0; i < filters.length; i++){
        filters[i].classList.add("hide")
    }

    document.getElementsByClassName("activeInput")[0].value = ""
}






function createFilterGroup(values, labelValue, tableFilterListArray){
    for(let i = 0; i < tableFilterListArray.length; i++){
        const mainContainer = document.createElement("div")
        values.forEach(value => {
            const container = document.createElement("span")
            const label = document.createElement("span")
            const valueContainer = document.createElement("span")

            label.innerText = `${labelValue}: `
            label.className = `${labelValue.replaceAll(" ", "")}`

            container.className = `tableFilter hide`

            valueContainer.innerText = sanitizeString(value)
            valueContainer.className = "filterValue"
            if(labelValue.includes("Type")){
                valueContainer.className = `TYPE_${value.toUpperCase()} background4 filterValue`
            }

            container.append(label)
            container.append(valueContainer)

            mainContainer.append(container)
            mainContainer.className = "filterListContainer"

            container.addEventListener("click", () => {
                createFilter(value, labelValue)
            })
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
            if(sanitizedInput.length >= 3 && filterValue[0].innerText.replaceAll(/-|'| |_/g, "").toLowerCase().includes(sanitizedInput)){
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
        const currentTable = document.getElementsByClassName("activeTable")[0]
        const rows = currentTable.getElementsByClassName(`hideFilter${label}${value}`.replaceAll(" ", ""))
        while(rows.length){
            rows[0].classList.remove(`hideFilter${label}${value}`.replaceAll(" ", ""))
        }
        newFilter.remove()
        refreshLocationsTables()
        lazyLoading(true)
    })

    hideFilterList()
    refreshLocationsTables()
    lazyLoading(true)
}



function deleteFiltersFromTable(){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]

    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")

    for (let i = 0; i < rows.length; i++){
        if(rows[i].classList.contains("hideChanged")){
            rows[i].className = "hideChanged hideTemp"
        }
        else{
            rows[i].className = "hideTemp"
        }
    }

    while(tableFilterContainer.firstChild)
        tableFilterContainer.removeChild(tableFilterContainer.firstChild)
}

