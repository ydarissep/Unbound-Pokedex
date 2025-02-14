function regexAbilities(textAbilities, abilities){
    const lines = textAbilities.split("\n")
    let idx = 0

    lines.forEach(line => {
        const matchAbility = line.match(/ (ABILITY_\w+)/i)
        if(matchAbility){
            ability = matchAbility[1]
			if (ability == "ABILITY_DRILLBEAK") {
				ability = "ABILITY_DRILL_BEAK"
			}
            let isNew = abilities[ability] === undefined
            abilities[ability] = {}
            abilities[ability]["name"] = ability
            abilities[ability]["ingameName"] = sanitizeString(ability)
            abilities[ability]["description"] = ""
			const matchAlso1 = line.match(/\/\/Also (.*)/i)
			const matchAlso2 = line.match(/ ABILITY_\w+ (ABILITY_\w+)/i)
			if (matchAlso1) {
				if (abilities[ability]["also"] === undefined) {
					abilities[ability]["also"] = []
				}
				const also = matchAlso1[1].trim().toUpperCase()
				abilities[ability]["also"].push("ABILITY_" + also.replace(" ", ""))
				abilities[ability]["also"].push("ABILITY_" + also.replace(" ", "_"))
			} else if (matchAlso2) {
				isNew = false
				const og = matchAlso2[1]
				if (abilities[og]["also"] === undefined) {
					abilities[og]["also"] = []
				}
				abilities[og]["also"].push(ability)
			}
            if (isNew) {
                abilities[ability]["id"] = idx++
            }
        }
    })
    return abilities
}



function regexVanillaAbilitiesDescription(textAbilitiesIngameName, abilities){
    const lines = textAbilitiesIngameName.split("\n")
    let conversionTable = {}
	let idx = Object.entries(abilities).filter(([ability, values]) => values.id != undefined).length
	const abilitiesAlso = Object.fromEntries(Object.entries(abilities).filter(([ability, values]) => values.also != undefined).flatMap(([ability, values]) => values.also.map(also => [also, ability])))

    for(let i = lines.length - 1; i >= 0; i--){
        let ability = lines[i].match(/\[ABILITY_(\w+)\]/i) //this is going to get confusing real quick :)
        if(ability){
            ability = "ABILITY_" + ability[1].replace(/_/g, "")
			if (ability == "ABILITY_DRILLBEAK") {
				ability = "ABILITY_DRILL_BEAK"
			}

            if(abilities[ability] === undefined){
                abilities[ability] = {}
                abilities[ability]["name"] = ability
				if (abilitiesAlso[ability] === undefined) {
					abilities[ability]["id"] = idx++
				}
            }
            
            const matchAbilityIngameName = lines[i].match(/_ *\( *" *(.*)" *\) *,/i)
            if(matchAbilityIngameName){
                const abilityIngameName = matchAbilityIngameName[1]

                abilities[ability]["ingameName"] = sanitizeString(abilityIngameName).replace("\n", " ")
            }
        }


        const matchConversionDescription = lines[i].match(/s\w+Description/i)
        if(matchConversionDescription){
            const conversionDescription = matchConversionDescription[0]



            if(ability){ // :=)


                if(conversionTable[conversionDescription] === undefined)
                    conversionTable[conversionDescription] = [ability]
                else
                    conversionTable[conversionDescription].push(ability)


            }
            else{
                const matchDescription = lines[i].match(/_ *\( *" *(.*)" *\) *;/i)
                if(matchDescription){
                    const description = matchDescription[1]
                    if(conversionTable[conversionDescription] !== undefined){
                        for(let j = 0; j < conversionTable[conversionDescription].length; j++)
                            abilities[conversionTable[conversionDescription][j]]["description"] = description
                    }
                }
            }
        }
    }
    return abilities
}







function regexAbilitiesIngameName(textAbilitiesIngameName, abilities){
    const lines = textAbilitiesIngameName.split("\n")
    let abilityFound = false, abilitySanitizedFound = false, ability = "", abilitySanitized = ""

    lines.forEach(line => {

        if(abilityFound === true)
            abilities[ability]["ingameName"] = line.trim()
        else if(abilitySanitizedFound === true)
            abilities[abilitySanitized]["ingameName"] = line.trim()


        abilitySanitizedFound = false
        abilityFound = false
        ability = ""
        abilitySanitized = ""

        const matchAbility = line.match(/NAME_(\w+)/i)
        if(matchAbility){
            ability = `ABILITY_${matchAbility[1]}`.toUpperCase()
            abilitySanitized = `ABILITY_${matchAbility[1].replace(/_/g, "")}`.toUpperCase()
        }

        if(ability in abilities)
            abilityFound = true
        else if(abilitySanitized in abilities)
            abilitySanitizedFound = true
    })



    return abilities
}






function regexAbilitiesDescription(textAbilitiesDescription, abilities){
    const lines = textAbilitiesDescription.split("\n")
    let abilityArray = []

    lines.forEach(line => {
        if(!line.includes("#ifdef")){
            let ability = "", abilitySanitized = ""

            const matchAbility = line.match(/DESC_(\w+)/i)
            if(matchAbility){
                ability = `ABILITY_${matchAbility[1]}`
                abilitySanitized = `ABILITY_${matchAbility[1].replace(/_/g, "")}`
            }
            else{
                for (let i = 0; i < abilityArray.length; i++){
                    if(abilityArray[i] in abilities){
                        abilities[abilityArray[i]]["description"] = line.trim().replaceAll("\\n", " ")
                    }
                }
                abilityArray = []
            }

            if(abilities[ability] !== undefined)
                abilityArray.push(ability)
            else if(abilities[abilitySanitized] !== undefined)
                abilityArray.push(abilitySanitized)
            else if(/DESC_/i.test(line)){
                abilityArray.push(ability)
            }
        }
    })

    return abilities
}




function regexNewAbilities(replaceAbilities, abilities){
    Object.keys(replaceAbilities).forEach(oldAbility => {
        Object.keys(replaceAbilities[oldAbility]).forEach(newAbility => {
			if (newAbility == "ABILITY_DRILLBEAK") {
				newAbility = "ABILITY_DRILL_BEAK"
			}
            if(oldAbility in abilities && !(newAbility in abilities)){
                abilities[newAbility] = {}
                abilities[newAbility]["name"] = newAbility
                abilities[newAbility]["ingameName"] = sanitizeString(newAbility)
                abilities[newAbility]["description"] = abilities[oldAbility]["description"]
				if (abilities[oldAbility]["also"] === undefined) {
					abilities[oldAbility]["also"] = []
				}
				abilities[oldAbility]["also"].push(newAbility)
            }
        })
    })
    
    return abilities
}







function replaceAbilityString(ability){
    const replaceStringObject = {
        "test": "test",
    }
    if(ability in replaceStringObject){
        return replaceStringObject[ability]
    }
    else{
        return ability
    }
}