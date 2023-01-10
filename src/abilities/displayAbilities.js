function displayAbilities(){
    let tBody = abilitiesTableTbody
    const abilitiesArray = Object.keys(abilities)
    tBody.innerText = ""

    for (let i = 0; i < abilitiesArray.length; i++){
        const abilitiesName = abilitiesArray[i]
        let row = document.createElement("tr")
        tBody.append(row)

        if(i >= 75)
            row.className = "hideTemp"


        let ability = document.createElement("td")
        const abilityName = document.createElement("span")
        ability.className = "ability"
        ability.innerText = abilities[abilitiesName]["ingameName"]
        abilityName.className = "key hide"
        abilityName.innerText = abilities[abilitiesName]["name"]
        ability.append(abilityName)
        row.append(ability)

        let description = document.createElement("td")
        description.className = "description"
        description.innerText = abilities[abilitiesName]["description"]
        row.append(description)

        row.addEventListener("click", async() => {
            if(!speciesButton.classList.contains("activeButton"))
                await tableButtonClick("species")
            window.scrollTo({ top: 0})
            deleteFiltersFromTable()
            createFilter(abilities[abilitiesName]["ingameName"], "Ability")
        })
    }
}