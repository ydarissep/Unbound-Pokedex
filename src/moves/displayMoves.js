function appendMovesToTable(moveName){

    if(moves[moveName]["PP"] <= 0 || moves[moveName]["description"] == ""){
        return
    }

    let tBody = movesTableTbody

    let row = document.createElement("tr")

    row.setAttribute("id", `${moveName}`)

    let nameContainer = document.createElement("td")
    let name = document.createElement("div")
    let ingameName = document.createElement("div")
    nameContainer.className = "nameContainer"
    name.className = "key hide"
    name.innerText = moves[moveName]["name"]
    ingameName.className = "move"
    ingameName.innerText = moves[moveName]["ingameName"]
    nameContainer.append(name)
    nameContainer.append(ingameName)

    row.append(nameContainer)




    let typeContainer = document.createElement("td")
    let type = document.createElement("div")
    let hiddenSplit = document.createElement("div")
    typeContainer.className = "type"
    type.className = `${moves[moveName]["type"]} background`
    type.innerText = sanitizeString(moves[moveName]["type"])
    hiddenSplit.innerText = sanitizeString(moves[moveName]["split"])
    hiddenSplit.className = "hide"
    typeContainer.append(type)
    typeContainer.append(hiddenSplit)
    row.append(typeContainer)


    let splitContainer = document.createElement("td")
    let split = document.createElement("div")
    let hiddenType = document.createElement("div")
    let splitIcon = document.createElement("img")
    splitContainer.className = "split"
    split.className = "hide"
    split.innerText = sanitizeString(moves[moveName]["split"])
    hiddenType.innerText = moves[moveName]["type"]
    hiddenType.className = "hide"
    splitIcon.className = `${sanitizeString(moves[moveName]["split"])} splitIcon`
    splitIcon.src = `src/moves/${moves[moveName]["split"]}.png`
    splitContainer.append(split)
    splitContainer.append(hiddenType)
    splitContainer.append(splitIcon)
    row.append(splitContainer)




    const moveObj = moves[moveName]

    row.append(createInputContainer("Power", "power", moveObj))

    row.append(createInputContainer("Acc", "accuracy", moveObj))

    row.append(createInputContainer("PP", "PP", moveObj))





    let effectContainer = document.createElement("td")
    let descriptionContainer = document.createElement("div")


    descriptionContainer.className = "description"
    for(let j = 0; j < moves[moveName]["description"].length; j++){
        let description = document.createElement("div")
        description.innerText += moves[moveName]["description"][j].replace(/\\n/g, " ").replace(/\\/g, "")
        descriptionContainer.append(description)
    }

    effectContainer.append(descriptionContainer)

    let effect = document.createElement("div")
    effect.className = "effect"
    effect.innerText = `${sanitizeString(moves[moveName]["effect"])}`


    let chance = moves[moveName]["chance"]
    if(chance > 0 && chance < 100){
        effect.innerText += ` ${chance}%`
    }
    else{
        effect.classList.add("hide")
    }

    effectContainer.append(effect)

    row.append(effectContainer)

    row.addEventListener("click", async() => {
        if(!speciesButton.classList.contains("activeButton")){
            tracker = speciesTracker
            await tableButtonClick("species")
        }
        window.scrollTo({ top: 0})
        deleteFiltersFromTable()
        createFilter(moves[moveName]["ingameName"], "Move")
    }) 

    tBody.append(row)
}


function createInputContainer(headerText, input, moveObj){
    let inputContainer = document.createElement("td")
    let inputValue = document.createElement("div")
    let inputHeader = document.createElement("div") //only used for mobile view


    inputHeader.innerText = headerText //only used for mobile view
    inputHeader.style.display = "none" //only used for mobile view
    inputHeader.className = "movesHeader" //only used for mobile view

    inputValue.className = `movesBold ${input}` //only used for mobile view

    if(moveObj[input] == 0 || moveObj[input] === undefined)
        inputValue.innerText = "-"
    else
        inputValue.innerText = moveObj[input]

    inputContainer.append(inputHeader)
    inputContainer.append(inputValue)
    inputContainer.className = `${input}Container`

    return inputContainer
}