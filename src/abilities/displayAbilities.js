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
        ability.className = "ability"
        ability.innerText = abilities[abilitiesName]["ingameName"]
        row.append(ability)

        let description = document.createElement("td")
        description.className = "description"
        description.innerText = abilities[abilitiesName]["description"]
        row.append(description)
    }
}