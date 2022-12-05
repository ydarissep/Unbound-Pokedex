function regexAbilities(textAbilities, abilities){
    const lines = textAbilities.split("\n")

    lines.forEach(line => {
        const matchAbility = line.match(/ABILITY_\w+/i)
        if(matchAbility !== null){
            ability = matchAbility[0]

            abilities[ability] = {}
            abilities[ability]["name"] = ability
            abilities[ability]["ingameName"] = sanitizeString(ability)
            abilities[ability]["description"] = ""
        }
    })
    return abilities
}



function regexVanillaAbilitiesDescription(textAbilitiesIngameName, abilities){
    const lines = textAbilitiesIngameName.split("\n")
    let conversionTable = {}

    for(let i = lines.length - 1; i >= 0; i--){
        let ability = lines[i].match(/(ABILITY_\w+)/i) //this is going to get confusing real quick :)
        if(ability !== null){
            ability = ability[0].replace(/_/g, "").replace(/ABILITY/i, "ABILITY_")

            if(abilities[ability] === undefined){
                abilities[ability] = {}
                abilities[ability]["name"] = ability
            }
            
            const matchAbilityIngameName = lines[i].match(/_ *\( *" *(.*)" *\) *,/i)
            if(matchAbilityIngameName !== null){
                const abilityIngameName = matchAbilityIngameName[1]

                abilities[ability]["ingameName"] = sanitizeString(abilityIngameName).replace("\n", " ")
            }
        }


        const matchConversionDescription = lines[i].match(/s\w+Description/i)
        if(matchConversionDescription !== null){
            const conversionDescription = matchConversionDescription[0]



            if(ability !== null){ // :=)


                if(conversionTable[conversionDescription] === undefined)
                    conversionTable[conversionDescription] = [ability]
                else
                    conversionTable[conversionDescription].push(ability)


            }
            else{
                const matchDescription = lines[i].match(/_ *\( *" *(.*)" *\) *;/i)
                if(matchDescription !== null){
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
        if(matchAbility !== null){
            ability = `ABILITY_${matchAbility[1]}`
            abilitySanitized = `ABILITY_${matchAbility[1].replace(/_/g, "")}`
        }

        if(abilities[ability] !== undefined)
            abilityFound = true
        else if(abilities[abilitySanitized] !== undefined)
            abilitySanitizedFound = true
    })



    return abilities
}






function regexAbilitiesDescription(textAbilitiesDescription, abilities){
    const lines = textAbilitiesDescription.split("\n")
    window.replaceAbilities = {}
    let abilityArray = []

    lines.forEach(line => {
        if(!line.includes("#ifdef")){
            let ability = "", abilitySanitized = ""

            const matchAbility = line.match(/DESC_(\w+)/i)
            if(matchAbility !== null){
                ability = `ABILITY_${matchAbility[1]}`
                abilitySanitized = `ABILITY_${matchAbility[1].replace(/_/g, "")}`
            }
            else{
                for (let i = 0; i < abilityArray.length; i++){
                    if(abilityArray[i] in abilities){
                        abilities[abilityArray[i]]["description"] = line.trim().replaceAll("\\n", " ")
                    }
                    else if(abilityArray[i] in replaceAbilities){
                        replaceAbilities[abilityArray[i]]["description"] = line.trim().replaceAll("\\n", " ")
                    }
                }
                abilityArray = []
            }

            if(abilities[ability] !== undefined)
                abilityArray.push(ability)
            else if(abilities[abilitySanitized] !== undefined)
                abilityArray.push(abilitySanitized)
            else if(/DESC_/i.test(line)){
                replaceAbilities[ability] = {}
                replaceAbilities[ability]["name"] = ability
                replaceAbilities[ability]["ingameName"] = sanitizeString(ability)
                replaceAbilities[ability]["description"] = ""
                abilityArray.push(ability)
            }
        }
    })

    return abilities
}




function regexNewAbilities(textNewAbilities, abilities){
    const lines = textNewAbilities.split("\n")
    let speciesName = "", ability = "", replaceAbility = "", replaceDescription = ""

    lines.forEach(line => {
        if(line.includes("{")){
            speciesName = ""
            ability = ""
            replaceAbility = ""
            replaceDescription = ""
        }
        const matchSpecies = line.match(/SPECIES_\w+/i)
        if(matchSpecies !== null){
            speciesName = matchSpecies[0]
        }
        const matchAbility = line.match(/ABILITY_\w+/i)
        if(matchAbility !== null){
            ability = matchAbility[0]
        }
        const matchReplaceAbility = line.match(/NAME_\w+/i)
        if(matchReplaceAbility !== null){
            replaceAbility = matchReplaceAbility[0].replace("NAME_", "ABILITY_")
        }
        const matchReplaceDescription = line.match(/DESC_\w+/i)
        if(matchReplaceDescription !== null){
            replaceDescription = matchReplaceDescription[0].replace("DESC_", "ABILITY_")

            if(replaceDescription in replaceAbilities){
                abilities[replaceDescription] = replaceAbilities[replaceDescription]
            }

        }

        if(speciesName !== "" && ability !== "" && replaceAbility !== ""){
            if(abilities[replaceAbility] == undefined){
                abilities[replaceAbility] = {}
                abilities[replaceAbility]["description"] = abilities[ability]["description"]
                abilities[replaceAbility]["ingameName"] = sanitizeString(replaceAbilityString(replaceAbility))
                abilities[replaceAbility]["name"] = replaceAbility
            }
            /*
            for (let i = 0; i < species[speciesName]["abilities"].length; i++){
                if(species[speciesName]["abilities"][i] === ability){
                    species[speciesName]["abilities"][i] = replaceAbility
                }
            }
            */
        }
    })

    delete replaceAbilities
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