async function getMoves(moves){
    footerP("Fetching moves")
    const rawMoves = await fetch(`https://raw.githubusercontent.com/${repo1}/src/Tables/battle_moves.c`)
    const textMoves = await rawMoves.text()

    return regexMoves(textMoves, moves)
}

async function getMovesDescription(moves){
    const rawMovesDescription = await fetch(`https://raw.githubusercontent.com/${repo1}/strings/attack_descriptions.string`)
    const textMovesDescription = await rawMovesDescription.text()

    return regexMovesDescription(textMovesDescription, moves)
}

async function getMovesIngameName(moves){
    const rawMovesIngameName = await fetch(`https://raw.githubusercontent.com/${repo1}/strings/attack_name_table.string`)
    const textMovesIngameName = await rawMovesIngameName.text()

    return regexMovesIngameName(textMovesIngameName, moves)
}

async function getVanillaMovesDescription(moves){
    const rawVanillaMovesDescription = await fetch("https://raw.githubusercontent.com/ProfLeonDias/pokefirered/decapitalization/src/move_descriptions.c")
    const textVanillaMovesDescription = await rawVanillaMovesDescription.text()

    return regexVanillaMovesDescription(textVanillaMovesDescription, moves)
}

async function getMovesFlags(moves){
    const rawMovesFlags = await fetch(`https://raw.githubusercontent.com/${repo1}/assembly/data/move_tables.json`)
    const jsonMovesFlags = await rawMovesFlags.json()

    const rawTutorFlags = await fetch(`https://raw.githubusercontent.com/ydarissep/Unbound-Pokedex/refs/heads/main/src/moves/tutor_flags.json`)
    const jsonTutorFlags = await rawTutorFlags.json()

    return regexMovesFlags(jsonMovesFlags, jsonTutorFlags, moves)
}



async function buildMovesObj(){
    let moves = {}
    moves = await getMoves(moves)
    //moves = await getFlags(moves) // file missing for unbound
    moves = await getVanillaMovesDescription(moves)
    moves = await getMovesDescription(moves)
    moves = await getMovesIngameName(moves)
    moves = await getMovesFlags(moves)

    Object.keys(moves).forEach(move => {
        if(moves[move]["priority"] > 0){
            moves[move]["flags"].push(`FLAG_PRIORITY_PLUS_${moves[move]["priority"]}`)
        }
        else if(moves[move]["priority"] < 0){
            moves[move]["flags"].push(`FLAG_PRIORITY_MINUS_${Math.abs(moves[move]["priority"])}`)
        }
    })

    await localStorage.setItem("moves", LZString.compressToUTF16(JSON.stringify(moves)))
    return moves
}


async function fetchMovesObj(){
    if(!localStorage.getItem("moves")){
        window.moves = await buildMovesObj()
    }
    else{
        window.moves = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("moves")))
    }

    window.movesTracker = []
    for(let i = 0, j = Object.keys(moves).length; i < j; i++){
        movesTracker[i] = {}
        movesTracker[i]["key"] = Object.keys(moves)[i]
        movesTracker[i]["filter"] = []
    }
}
