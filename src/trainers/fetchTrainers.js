async function getScripts(trainers){
    footerP("Fetching trainers")
    const rawScripts = await fetch(`https://raw.githubusercontent.com/${repo}/data/event_scripts.s`)
    const textScripts = await rawScripts.text()

    return await regexScripts(textScripts, trainers)   
}

async function getTrainers(trainers){
    const rawTrainers = await fetch(`https://raw.githubusercontent.com/${repo}/src/data/trainers.h`)
    const textTrainers = await rawTrainers.text()

    const rawTrainersParties = await fetch(`https://raw.githubusercontent.com/${repo}/src/data/trainer_parties.h`)
    const textTrainersParties = await rawTrainersParties.text()

    return await regexTrainersParties(textTrainersParties, await regexTrainers(textTrainers, trainers))
}

async function buildTrainersObj(){
    let trainers = {}

    //trainers = await getScripts(trainers)
    //trainers = await getTrainers(trainers)
    
    trainers = await bugFixTrainers(trainers)

    await localStorage.setItem("trainers", LZString.compressToUTF16(JSON.stringify(trainers)))
    return trainers
}


async function fetchTrainersObj(){
    if(!localStorage.getItem("trainers")){
        window.trainers = await buildTrainersObj()
    }
    else{
        window.trainers = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("trainers")))   
    }

    let counter = 0
    window.trainersTracker = []
    Object.keys(trainers).forEach(zone => {
        Object.keys(trainers[zone]).forEach(trainer => {
            trainersTracker[counter] = {}
            trainersTracker[counter]["key"] = `${zone}\\${trainer}`
            trainersTracker[counter]["filter"] = []
            counter++

            for(difficulty in trainers[zone][trainer]["party"]){
                if(difficulty !== "Normal" && !document.getElementById(`difficulty${difficulty}`)){
                    const newDifficulty = document.createElement("input"); newDifficulty.setAttribute("id", `difficulty${difficulty}`); newDifficulty.setAttribute("type", "checkbox")
                    const difficultyLabel = document.createElement("label"); difficultyLabel.setAttribute("for", `difficulty${difficulty}`); difficultyLabel.innerText = difficulty
                    difficultyCheckboxContainer.append(difficultyLabel)
                    difficultyCheckboxContainer.append(newDifficulty)

                    newDifficulty.addEventListener("change", () => {
                        trainerSpeciesMatchFilter(true)
                        filterTrainersTableInput(trainersInput.value)
                    })
                }
            }

            const sprite = trainers[zone][trainer]["sprite"]
            if(localStorage.getItem(sprite)){
                sprites[sprite] = LZString.decompressFromUTF16(localStorage.getItem(sprite))
                if(sprites[sprite].length < 500){
                    localStorage.removeItem(sprite)
                    spriteRemoveBgReturnBase64(sprite, `https://raw.githubusercontent.com/${repo}/graphics/trainers/front_pics/${sprite.replace(/^TRAINER_PIC_/, "").toLowerCase()}_front_pic.png`)
                }
            }
        })
    })
}










async function bugFixTrainers(trainers){
    let trainerToZone = {}
    let stop = false
    let correctZone = false
    Object.keys(trainers).forEach(zone => {
        Object.keys(trainers[zone]).forEach(trainer => {
            if(!trainerToZone[trainer]){
                trainerToZone[trainer] = zone
            }
            else{
                const baseTrainerName = trainer.split("_").splice(0, 2).join("_")
                const fullTrainerName = trainer.split("_").slice(0, -1).join("_")
                Object.keys(trainers[zone]).forEach(trainerName => {
                    if(trainerName.split("_").splice(0, 2).join("_") == baseTrainerName && trainerName.split("_").slice(0, -1).join("_") != fullTrainerName){
                        correctZone = trainerToZone[trainer]
                        stop = true
                    }
                })
                if(!stop){
                    Object.keys(trainers[trainerToZone[trainer]]).forEach(trainerName => {
                        if(trainerName.split("_").splice(0, 2).join("_") == baseTrainerName && trainerName.split("_").slice(0, -1).join("_") != fullTrainerName){
                            correctZone = zone
                        }
                    })
                }
                stop = false
            }


            if(correctZone){
                if(correctZone === zone){
                    if(Object.keys(trainers[zone][trainer]["party"]).length === 0){
                        trainers[zone][trainer] = JSON.parse(JSON.stringify(trainers[trainerToZone[trainer]][trainer]))
                        delete trainers[trainerToZone[trainer]][trainer]
                    }
                }
                else{
                    if(Object.keys(trainers[trainerToZone[trainer]][trainer]["party"]).length === 0){
                        trainers[trainerToZone[trainer]][trainer] = JSON.parse(JSON.stringify(trainers[zone][trainer]))
                        delete trainers[zone][trainer]
                    }
                }
                correctZone = false
            }
        })
    })






    Object.keys(trainers).forEach(zone => {
        let rematchObj = {}
        let sortedZoneObj = {}
        Object.keys(trainers[zone]).sort(function(a, b) {
            return (a < b) ? -1 : (a > b) ? 1 : 0
        }).forEach(trainer => {
            sortedZoneObj[trainer] = trainers[zone][trainer]
        })
        trainers[zone] = JSON.parse(JSON.stringify(sortedZoneObj))

        Object.keys(trainers[zone]).forEach(trainer => {
            if(trainers[zone][trainer]["rematch"]){
                rematchObj[trainer.split("_").slice(0, -1).join("_")] = trainers[zone][trainer]["rematch"]
            }
            else if(rematchObj[trainer.split("_").slice(0, -1).join("_")] && !trainers[zone][trainer]["rematch"]){
                trainers[zone][trainer]["rematch"] = rematchObj[trainer.split("_").slice(0, -1).join("_")]
                trainers[zone][rematchObj[trainer.split("_").slice(0, -1).join("_")]]["rematchArray"].push(trainer)

            }
            if(Object.keys(trainers[zone][trainer]["party"]).length === 0){
                try{
                    if(Object.keys(backupData[4][zone][trainer]["party"].length > 0)){
                        trainers[zone][trainer] = backupData[4][zone][trainer]
                        trainers[zone][trainer]["backup"] = true
                    }
                }
                catch{
                    if(trainers[zone][trainer]["rematch"]){
                        trainers[zone][trainers[zone][trainer]["rematch"]]["rematchArray"] = trainers[zone][trainers[zone][trainer]["rematch"]]["rematchArray"].filter(value => value !== trainer)
                    }
                    delete trainers[zone][trainer]
                }

                if(Object.keys(trainers[zone]).length === 0){
                    delete trainers[zone]
                }
            }
        })
    })

    return trainers
}