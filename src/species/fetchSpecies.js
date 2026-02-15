async function getSpecies(species){
    footerP("Fetching species")
    const rawSpecies = await fetch(`https://raw.githubusercontent.com/${repo1}/include/constants/species.h`)
    const textSpecies = await rawSpecies.text()

    return regexSpecies(textSpecies, species)
}


async function getBaseStats(species){
    const rawBaseStats = await fetch(`https://raw.githubusercontent.com/${repo2}/src/Base_Stats.c`)
    const textBaseStats = await rawBaseStats.text()
    return regexBaseStats(textBaseStats, species)
}

async function getLevelUpLearnsets(species){
    const rawLevelUpLearnsets = await fetch(`https://raw.githubusercontent.com/${repo2}/src/Learnsets.c`)
    const textLevelUpLearnsets = await rawLevelUpLearnsets.text()

    const rawLevelUpLearnsetsPointers = await fetch(`https://raw.githubusercontent.com/${repo2}/src/Learnsets.c`)
    const textLevelUpLearnsetsPointers = await rawLevelUpLearnsetsPointers.text()


    const levelUpLearnsetsConversionTable = getLevelUpLearnsetsConversionTable(textLevelUpLearnsetsPointers)


    return regexLevelUpLearnsets(textLevelUpLearnsets, levelUpLearnsetsConversionTable, species)
}

async function getTMHMLearnsets(species){
    const rawTMHMLearnsets = await fetch(`https://raw.githubusercontent.com/${repo2}/src/TM_Tutor_Tables.c`)
    const textTMHMLearnsets = await rawTMHMLearnsets.text()

    return regexTMHMLearnsets(textTMHMLearnsets, species, "gTMHMMoves", "gMoveTutorMoves")
}

async function getTutorLearnsets(species){
    const rawTutorLearnsets = await fetch(`https://raw.githubusercontent.com/${repo2}/src/TM_Tutor_Tables.c`)
    const textTutorLearnsets = await rawTutorLearnsets.text()

    return regexTutorLearnsets(textTutorLearnsets, species, "gMoveTutorMoves", "gTMHMMoves")
}

async function getEvolution(species){
    const rawEvolution = await fetch(`https://raw.githubusercontent.com/${repo2}/src/Evolution%20Table.c`)
    const textEvolution = await rawEvolution.text()

    return regexEvolution(textEvolution, species)
}

async function getForms(species){
    const rawForms = await fetch(`https://raw.githubusercontent.com/${repo}/src/data/pokemon/form_species_tables.h`)
    const textForms = await rawForms.text()

    return regexForms(textForms, species)
}

async function getEggMovesLearnsets(species){
    const rawEggMoves = await fetch(`https://raw.githubusercontent.com/${repo2}/src/Egg_Moves.c`)
    const textEggMoves = await rawEggMoves.text()

    return regexEggMovesLearnsets(textEggMoves, species)
}

async function getSprite(species){
    const rawSprite = await fetch(`https://raw.githubusercontent.com/${repo2}/src/Front_Pic_Table.c`)
    const textSprite = await rawSprite.text()

    return regexSprite(textSprite, species)
}

async function getReplaceAbilities(species){
    const rawReplaceAbilities = await fetch(`https://raw.githubusercontent.com/${repoDex}/main/src/abilities/duplicate_abilities.json`)
    const jsonReplaceAbilities = await rawReplaceAbilities.json()

    return regexReplaceAbilities(jsonReplaceAbilities, species)
}

async function getChanges(species, url){
    const rawAbilitiesChanges = await fetch("https://raw.githubusercontent.com/Skeli789/Complete-Fire-Red-Upgrade/master/include/constants/abilities.h")
    const textAbilitiesForChanges =  await rawAbilitiesChanges.text()

    const abilitiesArrayForChanges = await regexAbilitiesArrayForChanges(textAbilitiesForChanges)


    const rawChanges = await fetch(url)
    const textChanges = await rawChanges.text()

    return regexChanges(textChanges, species, abilitiesArrayForChanges)
}

function randomizeAbility(trainerIdFull, trainerId, trainerSecretId, abilitiesCount, abilitiesById, abilitiesAlso, bannedOldAbilities, bannedNewAbilities, pokemonId, ability) {
	if (ability === "ABILITY_NONE" || bannedOldAbilities.includes(ability)) {
		return ability;
	}
	const abilityAlso = abilitiesAlso[ability];
	const abilityId = abilities[abilityAlso === undefined ? ability : abilityAlso].id;
	const startAt = ((trainerId % abilitiesCount) >>> 0) + pokemonId;
	const xorVal = trainerSecretId % 0xFF;
	let numAttempts = 0;
	let newAbilityId = abilityId + startAt;
	if (newAbilityId >= abilitiesCount) {
		newAbilityId = newAbilityId - (abilitiesCount - 2);
	}
	newAbilityId ^= xorVal;
	newAbilityId %= abilitiesCount;
	let newAbility = abilitiesById[newAbilityId];
	while ((newAbility === undefined || bannedNewAbilities.includes(newAbility)) && numAttempts < 100) {
		newAbilityId *= xorVal;
		newAbilityId %= abilitiesCount;
		newAbility = abilitiesById[newAbilityId];
		numAttempts++;
	}
	if (newAbility === undefined || ability === "ABILITY_NONE" || (numAttempts >= 100 && bannedNewAbilities.includes(newAbility))) {
		newAbility = ability;
	}
	return newAbility;
}

function randomizeMove(trainerIdFull, trainerId, trainerSecretId, bannedNewMoves, movesById, move) {
	if (move === "MOVE_NONE") {
		return move;
	}
	const moveId = moves[move].id;
	const movesCountRegular = moves["MOVE_GLACIALLANCE"].id + 1;
	const startAt = (trainerId % movesCountRegular) >>> 0;
	const xorVal = trainerSecretId % 0x300;
	let numAttempts = 0;
	let newMoveId = moveId + startAt;
	if (newMoveId >= movesCountRegular) {
		newMoveId = newMoveId - (movesCountRegular - 2);
	}
	newMoveId ^= xorVal;
	newMoveId %= movesCountRegular;
	let newMove = movesById.get(newMoveId);
	while ((newMove === undefined || bannedNewMoves.includes(newMove)) && numAttempts < 100) {
		newMoveId *= xorVal;
		newMoveId %= movesCountRegular;
		newMove = movesById.get(newMoveId);
		numAttempts++;
	}
	if (newMove === undefined || (numAttempts >= 100 && bannedNewMoves.includes(newMove))) {
		newMove = "MOVE_TACKLE";
	}
	return newMove;
}

function rebalanceStat(statBase, pokemon) {
	return Math.min(Math.floor((statBase * (600 - pokemon.baseHP)) / (pokemon.BST - pokemon.baseHP)), 0xFF);
}

async function getJSONFromURL(url){
    const raw = await fetch(url);
    const text = await raw.text();
    return JSON.parse(text);
}

async function applyEnhancements(species) {
	const storedSaveData = localStorage.getItem("saveData");
	const randomAbilities = settings.includes("saveRandomizedAbilities");
	const randomLearnset = settings.includes("saveRandomizedLearnset");
	const rebalancedStats = settings.includes("saveRebalancedStats");
	if (rebalancedStats) {
		Object.keys(species).forEach(name => {
			const pokemon = species[name];
			if (pokemon.ID > 0 && pokemon.baseHP > 1 && (pokemon.evolution.length == 0 || pokemon.evolution.every(evo => evo[0] === "EVO_MEGA" || evo[0] === "EVO_GIGANTAMAX"))) {
				pokemon.baseAttack = rebalanceStat(pokemon.baseAttack, pokemon);
				pokemon.baseDefense = rebalanceStat(pokemon.baseDefense, pokemon);
				pokemon.baseSpAttack = rebalanceStat(pokemon.baseSpAttack, pokemon);
				pokemon.baseSpDefense = rebalanceStat(pokemon.baseSpDefense, pokemon);
				pokemon.baseSpeed = rebalanceStat(pokemon.baseSpeed, pokemon);
				pokemon.BST = pokemon.baseHP + pokemon.baseAttack + pokemon.baseDefense + pokemon.baseSpAttack + pokemon.baseSpDefense + pokemon.baseSpeed;
			}
		});
		Object.keys(species).forEach(name => species[name]["changes"] = species[name]["changes"].filter(change => change[0] != "BST" && change[0] != "baseAttack" && change[0] != "baseDefense" && change[0] != "baseHP" && change[0] != "baseSpAttack" && change[0] != "baseSpDefense" && change[0] != "baseSpeed"));
	}
	if (!storedSaveData || storedSaveData == "undefined" || (!randomAbilities && !randomLearnset)) {
		return species;
	}
	const saveData = JSON.parse(storedSaveData);
	if (!saveData) {
		return species;
	}
	const trainerIdFull = saveData.trainerIdFull;
	const trainerId = saveData.trainerId;
	const trainerSecretId = saveData.trainerSecretId;
	if (randomAbilities) {
		const abilitiesCount = abilities["ABILITY_PASTELVEIL"].id + 1;
		const abilityTables = await getJSONFromURL(`https://raw.githubusercontent.com/${repo1}/assembly/data/ability_tables.json`);
		const abilitiesById = Object.fromEntries(Object.entries(abilities).filter(([ability, values]) => values.id != undefined).map(([ability, value]) => [value.id, ability]));
		const abilitiesAlso = Object.fromEntries(Object.entries(abilities).filter(([ability, values]) => values.also != undefined).flatMap(([ability, values]) => values.also.map(also => [also, ability])));
		Object.keys(species).forEach(name => {
			const pokemon = species[name];
			if (pokemon.ID > 0 && pokemon.baseHP > 0) {
				pokemon.abilities = pokemon.abilities.map(ability => randomizeAbility(trainerIdFull, trainerId, trainerSecretId, abilitiesCount, abilitiesById, abilitiesAlso, abilityTables.gRandomizerBannedOriginalAbilities, abilityTables.gRandomizerBannedNewAbilities, pokemon.ID, ability));
			}
		});
		Object.keys(species).forEach(name => {
			species[name]["changes"] = species[name]["changes"].filter(change => change[0] != "abilities")
		});
	}
	if (randomLearnset) {
		const moveTables = await getJSONFromURL(`https://raw.githubusercontent.com/${repo1}/assembly/data/move_tables.json`);
		const movesById = new Map(Object.entries(moves).map(([move, value]) => [value.id, move]));
		Object.keys(species).forEach(name => {
			const pokemon = species[name];
			if (pokemon.ID > 0 && pokemon.baseHP > 0) {
				pokemon.levelUpLearnsets = pokemon.levelUpLearnsets.map(([move, level]) => [randomizeMove(trainerIdFull, trainerId, trainerSecretId, moveTables.gRandomizerBanTable, movesById, move), level]);
			}
		});
	}
	return species;
}

async function fixFormAbilities(species) {
	Object.entries(species).filter(([name, pokemon]) => species[name + "_F"] != undefined && pokemon.forms.length == 2).forEach(([name, male]) => {
		const female = species[name + "_F"];
		female.id = male.id;
		female.abilities = male.abilities.slice();
	});
	Object.entries(species).filter(([name, pokemon]) => species[name + "_FEMALE"] != undefined && pokemon.forms.length == 2).forEach(([name, male]) => {
		const female = species[name + "_FEMALE"];
		female.id = male.id;
		female.abilities = male.abilities.slice();
	});
	species["SPECIES_UNOWN"].forms.forEach(form => species[form].abilities = species["SPECIES_UNOWN"].abilities.slice());
	return species;
}

async function cleanSpecies(species){
    footerP("Cleaning up...")
    Object.keys(species).forEach(name => {
        if(species[name]["baseSpeed"] <= 0){
            for (let i = 0; i < species[name]["forms"].length; i++){
                const targetSpecies = species[name]["forms"][i]
                for (let j = 0; j < species[targetSpecies]["forms"].length; j++){
                    if(species[targetSpecies]["forms"][j] === name){
                        species[targetSpecies]["forms"].splice(j, 1)
                    }
                }
            }
            for (let i = 0; i < species[name]["evolutionLine"].length; i++){
                const targetSpecies = species[name]["evolutionLine"][i]
                for (let j = 0; j < species[targetSpecies]["evolutionLine"].length; j++){
                    if(species[targetSpecies]["evolutionLine"][j] === name){
                        species[targetSpecies]["evolutionLine"].splice(j, 1)
                    }
                }
            }
        }
        else if(name.match(/_GIGA$/i) && species[name]["evolution"].toString().includes("EVO_MEGA")){
            const replaceName = name.replace(/_GIGA$/i, "_MEGA")
            species[name]["name"] = replaceName
            species[name]["changes"] = []
            species[name]["evolution"] = []
            species[replaceName] = species[name]
            let arraySpeciesToClean = []
            species[name]["forms"].forEach(targetSpecies => {
                if(!arraySpeciesToClean.includes(targetSpecies)){
                    arraySpeciesToClean.push(targetSpecies)
                }
            })
            species[name]["evolutionLine"].forEach(targetSpecies => {
                if(!arraySpeciesToClean.includes(targetSpecies)){
                    arraySpeciesToClean.push(targetSpecies)
                }
            })
            arraySpeciesToClean.forEach(speciesToClean => {
                species[speciesToClean]["forms"] = JSON.parse(JSON.stringify(species[speciesToClean]["forms"]).replaceAll(name, replaceName))
                species[speciesToClean]["evolution"] = JSON.parse(JSON.stringify(species[speciesToClean]["evolution"]).replaceAll(name, replaceName))
                species[speciesToClean]["evolutionLine"] = JSON.parse(JSON.stringify(species[speciesToClean]["evolutionLine"]).replaceAll(name, replaceName))
            })
            species[replaceName] = species[name]
            delete species[name]
        }
        else if(name.match(/_MEGA$|_MEGA_Y$|_MEGA_X$|_GIGA$/i)){
            species[name]["evolution"] = []
        }
    })

    return species
}









async function buildSpeciesObj(){
    let species = {}
    species = await getSpecies(species)
    
    species = await initializeSpeciesObj(species)
    species = await getEvolution(species)
    //species = await getForms(species) // should be called in that order until here    // done in getLevelUpLearnsets for CFRU
    await Promise.all([
        getBaseStats(species),
        getLevelUpLearnsets(species),
        getTMHMLearnsets(species),
        getEggMovesLearnsets(species),
        getTutorLearnsets(species),
        getSprite(species)
    ])
    species = await getReplaceAbilities(species)
    species = await altFormsLearnsets(species, "forms", "tutorLearnsets")
    species = await altFormsLearnsets(species, "forms", "TMHMLearnsets")
    species = await getChanges(species, "https://raw.githubusercontent.com/Skeli789/Dynamic-Pokemon-Expansion/master/src/Base_Stats.c"),

    species = await cleanSpecies(species)

    Object.keys(species).forEach(name => {
        if((species[name]["type1"] === "TYPE_DRAGON" || species[name]["type2"] === "TYPE_DRAGON") && !species[name]["tutorLearnsets"].includes("MOVE_DRACOMETEOR")){
            species[name]["tutorLearnsets"].push("MOVE_DRACOMETEOR")
        }
    })
	
	species = await applyEnhancements(species)
	species = await fixFormAbilities(species)
    await localStorage.setItem("species", LZString.compressToUTF16(JSON.stringify(species)))
    await localStorage.setItem("moves", LZString.compressToUTF16(JSON.stringify(moves)))
    return species
}


function initializeSpeciesObj(species){
    footerP("Initializing species")
    for (const name of Object.keys(species)){
        species[name]["baseHP"] = 0
        species[name]["baseAttack"] = 0
        species[name]["baseDefense"] = 0
        species[name]["baseSpAttack"] = 0
        species[name]["baseSpDefense"] = 0
        species[name]["baseSpeed"] = 0
        species[name]["BST"] = 0
        species[name]["abilities"] = []
        species[name]["type1"] = ""
        species[name]["type2"] = ""
        species[name]["item1"] = ""
        species[name]["item2"] = ""
        species[name]["eggGroup1"] = ""
        species[name]["eggGroup2"] = ""
        species[name]["changes"] = []
        species[name]["levelUpLearnsets"] = []
        species[name]["TMHMLearnsets"] = []
        species[name]["eggMovesLearnsets"] = []
        species[name]["tutorLearnsets"] = []
        species[name]["evolution"] = []
        species[name]["evolutionLine"] = [name]
        species[name]["forms"] = []
        species[name]["sprite"] = ""
    }
    return species
}


async function fetchSpeciesObj(){
    if(!localStorage.getItem("species"))
        window.species = await buildSpeciesObj()
    else
        window.species = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("species")))


    window.sprites = {}
    window.speciesTracker = []

    for(let i = 0, j = Object.keys(species).length; i < j; i++){
        speciesTracker[i] = {}
        speciesTracker[i]["key"] = Object.keys(species)[i]
        speciesTracker[i]["filter"] = []
    }

    tracker = speciesTracker
}

