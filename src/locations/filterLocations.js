function createLocationsFilter(list , obj, objInputArray, filterCount, element, labelString, isInt = false, isOperator = false){


    const activeTables = document.getElementsByClassName("activeTable")
    if(activeTables.length > 0){
        const rows = activeTables[0].tBodies[0].rows

        const filter = document.createElement("div")
        const label = document.createElement("label")
        const input = document.createElement("input")
        const datalist = document.createElement("datalist")
        const button = document.createElement("button")

        filter.setAttribute("id", `filter${filterCount}`)
        filter.className = "flex tableFilter"

        label.setAttribute("for", `input${filterCount}`)
        label.className = "filterLabel"
        label.innerText = labelString

        input.setAttribute("type", "search")
        input.setAttribute("id", `input${filterCount}`)
        input.setAttribute("list", `datalist${filterCount}`)
        input.className = "filterInput"
        
        datalist.setAttribute("id", `datalist${filterCount}`)


        for (let i = 0; i < list.length; i++){
            const option = document.createElement("option")
            option.innerText = list[i]
            datalist.append(option)
        }


        button.setAttribute("type", "button")
        button.setAttribute("id", `button${filterCount}`)
        button.innerText = "X"

        if(isOperator){
            input.value = ">= "
        }

        input.addEventListener("input", e => {
            let value = e.target.value

            if(list.includes(e.target.value) && e.target.value !== "" && !isOperator){
                input.setAttribute("placeholder", `${value}`)
                input.blur()
                filterLocationsInput(value, objInputArray, rows, filterCount, obj, isInt, isOperator)
            }
            else if(isOperator)
                filterLocationsInput(value, objInputArray, rows, filterCount, obj, isInt, isOperator)

        })

        button.addEventListener("click", () => {
            for (let i = 0; i < rows.length; i++){
                rows[i].classList.remove(`hideFilter${filterCount}`)
            }
            filter.remove()
            refreshLocations()
        })

        filter.append(label)
        filter.append(input)
        filter.append(datalist)
        filter.append(button)
        element.append(filter)
    }
}



function filterLocationsInput(value, objInputArray, rows, filterCount, obj, isInt, isOperator){
    let hideRows = {}

    for (let j = 0; j < rows.length; j++){
        const name = rows[j].querySelector(".species").textContent
        if(name in species){
            if(sanitizeString(species[name]["type1"]) === value || sanitizeString(species[name]["type2"]) === value){
                hideRows[j] = "show"
            }
        }
    }
    for(let i = 0; i < rows.length; i++){
        if(hideRows[i] !== "show")
            rows[i].classList.add(`hideFilter${filterCount}`)
        else
            rows[i].classList.remove(`hideFilter${filterCount}`)
    }
    refreshLocations()
}

function refreshLocations(){
    const rows = locationsTableTbody.rows
    let header = 0, show = false
    for(let i = 0; i < rows.length; i++){
        if(rows[i].classList.contains("rowZoneHeader")){
            header = i
            show = false
        }
        else if(rows[i].classList.contains("hidden")){
            if(show === true){
                rows[i].className = "hidden"
                rows[header].className = "rowZoneHeader"
            }
            else{
                rows[i].classList.add("hide")
                rows[header].classList.add("hide")
            }
        }
        else{
            if(!rows[i].classList.contains("hide") && !rows[i].className.includes("hideFilter")){
                show = true
            }
        }
    }
    lazyLoading(true)
}