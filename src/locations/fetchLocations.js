async function getWildLocations(locations){
    footerP("Fetching wild locations")
    const rawWildLocations = await fetch(`https://raw.githubusercontent.com/${repo1}/src/Tables/wild_encounter_tables.c`)
    const textWildLocations = await rawWildLocations.text()

    return regexWildLocations(textWildLocations, locations)   
}

async function getRaidLocations(locations){
    footerP("Fetching raid locations")
    const rawRaidLocations = await fetch(`https://raw.githubusercontent.com/${repo1}/src/Tables/raid_encounters.h`)
    const textRaidLocations = await rawRaidLocations.text()

    return regexRaidLocations(textRaidLocations, locations)   
}

async function buildLocationsObj(){
    let locations = {}

    locations = await getWildLocations(locations)
    locations = await getRaidLocations(locations)


    await localStorage.setItem("locations", LZString.compressToUTF16(JSON.stringify(locations)))
    return locations
}


async function fetchLocationsObj(){
    if(!localStorage.getItem("locations"))
        window.locations = await buildLocationsObj()
    else
        window.locations = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("locations")))
    
    await displayLocations()
}