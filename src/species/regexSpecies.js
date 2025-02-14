function regexSpecies(textSpecies, species){
    const lines = textSpecies.split("\n")
    let ID = 0

    lines.forEach(line => {

        const matchSpecies = line.match(/#define *(SPECIES_\w+)/i)
        if(matchSpecies){
            const name = matchSpecies[1]

            matchID = line.match(/0[xX][0-9a-fA-F]+/i)
            if(matchID){
                ID = parseInt(matchID[0])

                species[name] = {}
                species[name]["name"] = name


                species[name]["ID"] = ID
            }
        }
    })
    return species
}









function regexBaseStats(textBaseStats, species){
    const lines = textBaseStats.split("\n")

    const regex = /baseHP|baseAttack|baseDefense|baseSpeed|baseSpAttack|baseSpDefense|type1|type2|item1|item2|eggGroup1|eggGroup2|ability1|ability2|hiddenAbility/
    let change = false, value, name

    lines.forEach(line => {

        if(/#else/i.test(line))
                change = true
        if(/#endif/i.test(line))
                change = false


        const matchSpecies = line.match(/SPECIES_\w+/i)
        if(matchSpecies){
            name = matchSpecies[0]
            change = false
        }


        const matchRegex = line.match(regex)
        if(matchRegex && name in species){ // name in species necessary, don't touch
            const match = matchRegex[0]



            if(match === "baseHP" || match === "baseAttack" || match === "baseDefense" || match === "baseSpeed" || match === "baseSpAttack" || match === "baseSpDefense"){
                const matchInt = line.match(/\d+/)
                if(matchInt)
                    value = parseInt(matchInt[0])
            }
            else if(match === "type1" || match === "type2" || match === "item1" || match === "item2" || match === "eggGroup1" || match === "eggGroup2" || match === "ability1" || match === "ability2" || match === "hiddenAbility"){
                value = line.match(/\w+_\w+/i)
                if(value)
                    value = value[0]
            }



            if(change === true)
                species[name]["changes"].push([match, value])
            else if(change === false){
                if(match === "ability1" || match === "ability2" || match === "hiddenAbility"){
                    species[name]["abilities"].push(value)
                }
                else{
                    species[name][match] = value
                }
            }
        }
    })
    return getBST(species)
}



function regexChanges(textChanges, species, abilitiesArrayForChanges){
    const lines = textChanges.split("\n")

    const regex = /baseHP|baseAttack|baseDefense|baseSpeed|baseSpAttack|baseSpDefense|type1|type2|ability1|ability2|hiddenAbility/i
    let value, name, abilitiesArray = []

    lines.forEach(line => {

        const matchSpecies = line.match(/SPECIES_\w+/i)
        if(matchSpecies){

            for(let i = 0; i < abilitiesArray.length; i++){
                const ability = species[name]["abilities"][i]
                if(!abilitiesArrayForChanges.includes(ability)){
                    abilitiesArray[i] = ability
                }
            }

            if(name in species && JSON.stringify(abilitiesArray) !== JSON.stringify(species[name]["abilities"])){
                species[name]["changes"].push(["abilities", abilitiesArray])
            }
            name = matchSpecies[0]
            abilitiesArray = []
        }


        if(name in species){
            const matchRegex = line.match(regex)
            if(matchRegex){
                const match = matchRegex[0]



                if(match === "baseHP" || match === "baseAttack" || match === "baseDefense" || match === "baseSpeed" || match === "baseSpAttack" || match === "baseSpDefense"){
                    const matchInt = line.match(/\d+/)
                    if(matchInt)
                        value = parseInt(matchInt[0])
                }
                else if(match === "type1" || match === "type2"){
                    value = line.match(/\w+_\w+/i)
                    if(value)
                        value = value[0]
                }
                else if(match === "ability1" || match === "ability2" || match === "hiddenAbility"){
                    value = line.match(/\w+_\w+/i)
                    if(value)
                        value = value[0]
                    abilitiesArray.push(value)
                }

                if(match in species[name] && species[name][match] !== value){
                    species[name]["changes"].push([match, value])
                }
            }
        }
    })
    return species
}









async function regexAbilitiesArrayForChanges(textAbilitiesForChanges){
    const lines = textAbilitiesForChanges.split("\n")
    let abilitiesArrayForChanges = []

    lines.forEach(line => {
        const matchAbility = line.match(/ABILITY_\w+/i)
        if(matchAbility){
            abilitiesArrayForChanges.push(matchAbility[0])
        }
    })

    return abilitiesArrayForChanges
}










function getLevelUpLearnsetsConversionTable(textLevelUpLearnsetsPointers){
    const lines = textLevelUpLearnsetsPointers.split("\n")
    let conversionTable = {}

    lines.forEach(line => {

        const matchSpecies = line.match(/SPECIES_\w+/i)
        if(matchSpecies){
            const value = matchSpecies[0]


            const matchConversion = line.match(/s\w+LevelUpLearnset/i)
            if(matchConversion){
                const index = matchConversion[0]


                if(conversionTable[index] === undefined) // DO NOT TOUCH THAT FUTURE ME, THIS IS THE WAY, DON'T QUESTION ME
                    conversionTable[index] = [value]
                else // DO NOT TOUCH THAT FUTURE ME, THIS IS THE WAY, DON'T QUESTION ME
                    conversionTable[index].push(value)
            }
        }
    })
    return conversionTable
}

function regexLevelUpLearnsets(textLevelUpLearnsets, conversionTable, species){
    const lines = textLevelUpLearnsets.split("\n")
    let speciesArray = []

    lines.forEach(line => {
        const matchConversion = line.match(/s\w+LevelUpLearnset/i)
        if(matchConversion){
            const index = matchConversion[0]
            if(index in conversionTable){
                speciesArray = conversionTable[index]
            }
        }


        const matchLevelMove = line.match(/(\d+) *, *(MOVE_\w+)/i)
        if(matchLevelMove){
            const level = parseInt(matchLevelMove[1])
            const move = matchLevelMove[2]
            for(let i = 0; i < speciesArray.length; i++)
                species[speciesArray[i]]["levelUpLearnsets"].push([move, level])
        }
    })
    for (const name of Object.keys(conversionTable)){

        if(conversionTable[name].length >= 2){
            for (let j = 0; j < conversionTable[name].length; j++){
                species[conversionTable[name][j]]["forms"] = conversionTable[name]
            }
        }
    }
    return species
}










function regexTMHMLearnsets(textTMHMLearnsets, species, start, end){
    const lines = textTMHMLearnsets.split("\n")
    let name = null, startFound = false, TMHM = 0, count = 0

    lines.forEach(line => {
        if(line.includes(start))
            startFound = true
        else if(line.includes(end))
            startFound = false


        if(startFound){
            const matchMove = line.trim().match(/^MOVE_\w+/i)
            if(matchMove){
                let move = moves[matchMove[0]]["ingameName"]
                count++

                if(move === "Solar Beam")
                    move = "Solarbeam"
                else if(move === "Will-O-Wisp")
                    move = "Will-o-Wisp"
                else if(move === "U-turn")
                    move = "U-Turn"
                else if(move === "Poweruppunch")
                    move = "Power-Up Punch"
                else if(move === "Dazzlinggleam")
                    move = "Dazzling Gleam"
                else if(move === "Drainingkiss")
                    move = "Draining Kiss"


                const rawTMHM = fetch(`https://raw.githubusercontent.com/${repo2}/src/tm_compatibility/${count} - ${move}.txt`)
                .then(promises => {
                    const textTMHM = promises.text()
                    .then(promises => {
                        const lines = promises.split("\n")

                        lines.forEach(line => {
                            const matchTMHM = line.match(/TM\d+|HM\d+/i)
                            if(matchTMHM)
                                TMHM = matchTMHM[0]


                            const matchSpecies = `SPECIES_${line.trim()}`
                            if(species[matchSpecies] !== undefined)
                                species[matchSpecies]["TMHMLearnsets"].push(matchMove[0])
                        })
                    })
                })
            }
        }
        
    })

    return species
    //return altFormsLearnsets(species, "forms", "TMHMLearnsets")
}







function regexTutorLearnsets(textTutorLearnsets, species, start, end){
    const lines = textTutorLearnsets.split("\n")
    let startFound = false, count = 0

    lines.forEach(line => {
        if(line.includes(start))
            startFound = true
        else if(line.includes(end))
            startFound = false


        if(startFound){
            const matchMove = line.trim().match(/^MOVE_\w+/i)
            if(matchMove){
                let move = moves[matchMove[0]]["ingameName"]
                count++

                if(move === "Jealous Burn")
                    move = "Burning Jealousy"
                else if(move === "Soft-Boiled")
                    move = "Softboiled"
                else if(move === "Stompingtantrum")
                    move = "Stomping Tantrum"
                else if(move === "Mistyterrain")
                    move = "Misty Terrain"
                else if(move === "Grassyterrain")
                    move = "Grassy Terrain"
                else if(move === "Psychicterrain")
                    move = "Psychic Terrain"
                else if(move === "Electricterrain")
                    move = "Electric Terrain"
                else if(move === "Break Swipe")
                    move = "Breaking Swipe"
                else if(move === "HiHorsepower")
                    move = "High Horsepower"
                else if(move === "ThunderPunch")
                    move = "Thunder Punch"
                else if(move === "Darkestlariat")
                    move = "Darkest Lariat"
                else if(move === "PhantomForce")
                    move = "Phantom Force"
                else if(move === "Mysticalfire")
                    move = "Mystical Fire"
                else if(move === "Psychicfangs")
                    move = "Psychic Fangs"
                else if(move === "Expand Force")
                    move = "Expanding Force"
                else if(move === "TerrainPulse")
                    move = "Terrain Pulse"
                else if(move === "Rising Volt")
                    move = "Rising Voltage"
                else if(move === "MistyExplode")
                    move = "Misty Explosion"
                else if(move === "Corrode Gas")
                    move = "Corrosive Gas"
                else if(move === "SkitterSmack")
                    move = "Skitter Smack"
                else if(move === "Scorch Sands")
                    move = "Scorching Sands"
                else if(move === "DualWingbeat")
                    move = "Dual Wingbeat"

                const rawTutor = fetch(`https://raw.githubusercontent.com/${repo2}/src/tutor_compatibility/${count} - ${move}.txt`)
                .then(promises => {
                    const textTutor = promises.text()
                    .then(promises => {

                        if(!/Tutor/.test(moves[matchMove[0]]["flags"].toString())){
                            moves[matchMove[0]]["flags"].push("BF Tutor")
                        }

                        const lines = promises.split("\n")
                        lines.forEach(line => {
                            const matchSpecies = `SPECIES_${line.trim()}`
                            if(species[matchSpecies] !== undefined)
                                species[matchSpecies]["tutorLearnsets"].push(matchMove[0])
                        })
                    })
                })
            }
        }
        
    })

    return species
    //return altFormsLearnsets(species, "forms", "tutorLearnsets")
}










function regexEvolution(textEvolution, species){
    const lines = textEvolution.split("\n")
    let name

    lines.forEach(line =>{

        const matchSpecies = line.match(/\[ *(SPECIES_\w+) *\]/i)
        if(matchSpecies)
            name = matchSpecies[1]



        const matchEvoInfo = line.match(/(\w+), *(\w+), *(\w+)/)
        if(matchEvoInfo){
            let method = matchEvoInfo[1]
            if(/ITEM_HISUI_ROCK/i.test(line)){
                method = method.replace(/HOLD_ITEM$/, "HOLD_HISUI_ROCK")
            }
            const condition = matchEvoInfo[2]
            const targetSpecies = matchEvoInfo[3]
            species[name]["evolution"].push([method, condition, targetSpecies])
        }
    })


    return getEvolutionLine(species)
}

async function getEvolutionLine(species){
    for (const name of Object.keys(species)){
        let evolutionLine = [name]

        for(let i = 0; i < evolutionLine.length; i++){
            const targetSpecies = evolutionLine[i]
            for(let j = 0; j < species[evolutionLine[i]]["evolution"].length; j++){
                const targetSpeciesEvo = species[targetSpecies]["evolution"][j][2]
                if(!evolutionLine.includes(targetSpeciesEvo)){
                    evolutionLine.push(targetSpeciesEvo)
                }
            }
        }

        for(let i = 0; i < evolutionLine.length; i++){
            const targetSpecies = evolutionLine[i]
            if(evolutionLine.length > species[targetSpecies]["evolutionLine"].length){
                species[targetSpecies]["evolutionLine"] = evolutionLine
            }
        }
    }

    for (const name of Object.keys(species)){
        species[name]["evolutionLine"] = Array.from(new Set(species[name]["evolutionLine"])) // remove duplicates
    }

    return species
}










function regexForms(textForms, species){
    const lines = textForms.split("\n")
    let speciesArray = []

    lines.forEach(line => {
        const matchSpecies = line.match(/SPECIES_\w+/i)
        
        if(/FORM_SPECIES_END/i.test(line)){
            for (let i = 0; i < speciesArray.length; i++)
                species[speciesArray[i]]["forms"] = speciesArray
            speciesArray = []
        }
        else if(matchSpecies){
            const name = matchSpecies[0]
            speciesArray.push(name)
        }
    })
    return species
}








function regexEggMovesLearnsets(textEggMoves, species){
    const lines = textEggMoves.split("\n")
    const speciesString = JSON.stringify(Object.keys(species))
    let name = null

    lines.forEach(line => {
        if(/egg_moves/i.test(line))
            name = null
        const matchMove = line.match(/MOVE_\w+/i)
        if(matchMove){
            const move = matchMove[0]
            if(name){
                species[name]["eggMovesLearnsets"].push(move)
            }
        }
        else if(name === null){
            const matchLine = line.match(/(\w+),/i)
            if(matchLine){
                const testSpecies = `SPECIES_${speciesString.match(matchLine[1])}`
                if(speciesString.includes(testSpecies))
                    name = testSpecies
            }
        }
    })


    return altFormsLearnsets(species, "evolutionLine", "eggMovesLearnsets")
}



function regexReplaceAbilities(replaceAbilities, species){
    Object.keys(replaceAbilities).forEach(oldAbility => {
        Object.keys(replaceAbilities[oldAbility]).forEach(newAbility => {
            for(let i = 0; i < replaceAbilities[oldAbility][newAbility].length; i++){
                for(let j = 0; j < 3; j++){
                    if(species[replaceAbilities[oldAbility][newAbility][i]]["abilities"][j] === oldAbility){
                        species[replaceAbilities[oldAbility][newAbility][i]]["abilities"][j] = newAbility
                    }
                }
            }
        })
    })    

    return species
}



function regexSprite(textSprite, species){
    const lines = textSprite.split("\n")

    lines.forEach(line => {
        let url = null
        const matchSpecies = line.match(/SPECIES_\w+/i)
        if(matchSpecies){
            let name = matchSpecies[0]
            if(name === "SPECIES_ENAMORUS_T")
                name = "SPECIES_ENAMORUS_THERIAN"

            const matchURL = line.match(/gFrontSprite\w+Tiles/i)
            if(matchURL || name === "SPECIES_SHADOW_WARRIOR"){
                if(name === "SPECIES_SHADOW_WARRIOR"){
                    url = `https://raw.githubusercontent.com/${repo2}/graphics/frontspr/gSpriteShadowWarrior.png`
                }
                else{
                    url = `https://raw.githubusercontent.com/${repo2}/graphics/frontspr/${matchURL[0].replace("Tiles", ".png")}`
                }

                if(name === "SPECIES_CASTFORM"){
                    url = `https://raw.githubusercontent.com/${repo2}/graphics/castform/gFrontSprite385Castform.png`
                }

                if(name in species){
                    species[name]["sprite"] = url
                }
            }
        }
    })
    return species
}













function altFormsLearnsets(species, input, output){
    for (const name of Object.keys(species)){

        if(species[name][input].length >= 2){


            for (let j = 0; j < species[name][input].length; j++){
                const targetSpecies = species[name][input][j]

                if(species[targetSpecies][output].length <= 0){
                    species[targetSpecies][output] = species[name][output]
                }
            }
        }
    }
    return species
}


function getBST(species){
    for (const name of Object.keys(species)){
        const baseHP = species[name]["baseHP"]
        const baseAttack = species[name]["baseAttack"]
        const baseDefense = species[name]["baseDefense"]
        const baseSpAttack = species[name]["baseSpAttack"]
        const baseSpDefense = species[name]["baseSpDefense"]
        const baseSpeed = species[name]["baseSpeed"]
        const BST = baseHP + baseAttack + baseDefense + baseSpAttack + baseSpDefense + baseSpeed

        species[name]["BST"] = BST

    }
    return species
}