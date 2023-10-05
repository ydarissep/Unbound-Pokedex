async function getStrategies(strategies){
    footerP("Fetching strategies")
    const rawStrategies = await fetch(`https://raw.githubusercontent.com/ashytastic/Radical-Red-Pokedex/main/data/dex-strategy.md`)
    const textStrategies = await rawStrategies.text()

    return regexStrategies(textStrategies, strategies)
}




async function buildStrategiesObj(){
    let strategies = {}

    setTimeout(() => {
        timeout = true
    }, "3000");

    try{
        //strategies = await getStrategies(strategies)
    }
    catch(e){
        console.log(e.message)
        console.log(e.stack)
        footerP("Fetching backup strategies")
        strategies = backupData[4]
    }

    //await localStorage.setItem("strategies", LZString.compressToUTF16(JSON.stringify(strategies)))
    return strategies
}



async function fetchStrategiesObj(){
    if(!localStorage.getItem("strategies"))
        window.strategies = await buildStrategiesObj()
    else
        window.strategies = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("strategies")))
}

