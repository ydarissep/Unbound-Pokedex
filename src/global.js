window.repoDex = "ydarissep/Unbound-Pokedex"
window.repo1 = "Skeli789/Complete-Fire-Red-Upgrade/dev"
window.repo2 = "Skeli789/Dynamic-Pokemon-Expansion/Unbound"

window.tracker
window.panelSpecies = ""
window.scrollToSpecies = ""
window.historyObj = []

const tableFilter = document.getElementById("tableFilter")



const openCredits = document.getElementById("openCredits")
const closeCredits = document.getElementById("closeCredits")
const modal = document.getElementById("modal")
const update = document.getElementById("update")

const patchnoteModeCheckbox = document.getElementById("patchnoteModeCheckbox")
const onlyShowChangedPokemonCheckbox = document.getElementById("onlyShowChangedPokemonCheckbox")





const speciesInput = document.getElementById("speciesInput")
const speciesButton = document.getElementById("speciesButton")
const speciesTable = document.getElementById("speciesTable")
const speciesTableThead = document.getElementById("speciesTableThead")
const speciesTableTbody = document.getElementById("speciesTableTbody")


const abilitiesInput = document.getElementById("abilitiesInput")
const abilitiesButton = document.getElementById("abilitiesButton")
const abilitiesTable = document.getElementById("abilitiesTable")
const abilitiesTableThead = document.getElementById("abilitiesTableThead")
const abilitiesTableTbody = document.getElementById("abilitiesTableTbody")


const locationsInput = document.getElementById("locationsInput")
const locationsButton = document.getElementById("locationsButton")
const locationsTable = document.getElementById("locationsTable")
const locationsTableTbody = document.getElementById("locationsTableTbody")


const movesInput = document.getElementById("movesInput")
const movesButton = document.getElementById("movesButton")
const movesTable = document.getElementById("movesTable")
const movesTableThead = document.getElementById("movesTableThead")
const movesTableTbody = document.getElementById("movesTableTbody")



const abilitiesInputDataList = document.getElementById("abilitiesInputDataList")
const speciesInputDataList = document.getElementById("speciesInputDataList")
const movesInputDataList = document.getElementById("movesInputDataList")


const table = document.querySelector("#table")

const headerAbilitiesName = document.querySelector("#abilitiesTableThead th.ability")
const headerAbilitiesDescription = document.querySelector("#abilitiesTableThead th.description")

const headerMovesMove = document.querySelector("#movesTableThead th.move")
const headerMovesType = document.querySelector("#movesTableThead th.type")
const headerMovesSplit = document.querySelector("#movesTableThead th.split")
const headerMovesPower = document.querySelector("#movesTableThead th.power")
const headerMovesAccuracy = document.querySelector("#movesTableThead th.accuracy")
const headerMovesPP = document.querySelector("#movesTableThead th.PP")
const headerMovesEffect = document.querySelector("#movesTableThead th.effect")

const headerSpeciesID = document.querySelector("#speciesTableThead th.ID")
const headerSpeciesSprite = document.querySelector("#speciesTableThead th.sprite")
const headerSpeciesName = document.querySelector("#speciesTableThead th.species")
const headerSpeciesTypes = document.querySelector("#speciesTableThead th.types")
const headerSpeciesAbilities = document.querySelector("#speciesTableThead th.abilities")
const headerSpeciesHP = document.querySelector("#speciesTableThead th.baseHP")
const headerSpeciesAtk = document.querySelector("#speciesTableThead th.baseAttack")
const headerSpeciesDef = document.querySelector("#speciesTableThead th.baseDefense")
const headerSpeciesSpA = document.querySelector("#speciesTableThead th.baseSpAttack")
const headerSpeciesSpD = document.querySelector("#speciesTableThead th.baseSpDefense")
const headerSpeciesSpe = document.querySelector("#speciesTableThead th.baseSpeed")
const headerSpeciesBST = document.querySelector("#speciesTableThead th.BST")

const headerLocationsSprite = document.querySelector("#locationsTableThead th.sprite")
const headerLocationsSpecies = document.querySelector("#locationsTableThead th.species")
const headerLocationsRarity = document.querySelector("#locationsTableThead th.rarity")
const headerLocationsZone = document.querySelector("#locationsTableThead th.zone")

const utilityButton = document.querySelector('.utilityButton')



headerAbilitiesName.addEventListener("click", () => {
    if(headerAbilitiesName.classList.contains("th-sort-desc"))
        sortTableByClassName(abilitiesTable, abilities, ["name"], "ability", asc = true)
    else
        sortTableByClassName(abilitiesTable, abilities, ["name"], "ability", asc = false)
})
headerAbilitiesDescription.addEventListener("click", () => {
    if(headerAbilitiesDescription.classList.contains("th-sort-desc"))
        sortTableByClassName(abilitiesTable, abilities, ["description"], "description", asc = true)
    else
        sortTableByClassName(abilitiesTable, abilities, ["description"], "description", asc = false)
})






headerMovesMove.addEventListener("click", () => {
    if(headerMovesMove.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["name"], "move", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["name"], "move", asc = false)
})
headerMovesType.addEventListener("click", () => {
    if(headerMovesType.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["type", "split"], "type", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["type", "split"], "type", asc = false)
})
headerMovesSplit.addEventListener("click", () => {
    if(headerMovesSplit.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["split", "type"], "split", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["split", "type"], "split", asc = false)
})
headerMovesPower.addEventListener("click", () => {
    if(headerMovesPower.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["power"], "power", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["power"], "power", asc = false)
})
headerMovesAccuracy.addEventListener("click", () => {
    if(headerMovesAccuracy.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["accuracy"], "accuracy", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["accuracy"], "accuracy", asc = false)
})
headerMovesPP.addEventListener("click", () => {
    if(headerMovesPP.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["PP"], "PP", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["PP"], "PP", asc = false)
})
headerMovesEffect.addEventListener("click", () => {
    if(headerMovesEffect.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, moves, ["effect"], "effect", asc = true)
    else
        sortTableByClassName(movesTable, moves, ["effect"], "effect", asc = false)
})







headerSpeciesID.addEventListener("click", () => {
    if(headerSpeciesID.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["ID"], "ID", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["ID"], "ID", asc = false)
})
headerSpeciesSprite.addEventListener("click", () => {
    if(headerSpeciesID.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["ID"], "ID", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["ID"], "ID", asc = false)
})
headerSpeciesName.addEventListener("click", () => {
    if(headerSpeciesName.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["name"], "species", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["name"], "species", asc = false)
})
headerSpeciesTypes.addEventListener("click", () => {
    if(headerSpeciesTypes.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["type1", "type2"], "types", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["type1", "type2"], "types", asc = false)
})
headerSpeciesAbilities.addEventListener("click", () => {
    if(headerSpeciesAbilities.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["abilities"], "abilities", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["abilities"], "abilities", asc = false)
})
headerSpeciesHP.addEventListener("click", () => {
    if(headerSpeciesHP.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["baseHP"], "baseHP", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["baseHP"], "baseHP", asc = false)
})
headerSpeciesAtk.addEventListener("click", () => {
    if(headerSpeciesAtk.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["baseAttack"], "baseAttack", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["baseAttack"], "baseAttack", asc = false)
})
headerSpeciesDef.addEventListener("click", () => {
    if(headerSpeciesDef.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["baseDefense"], "baseDefense", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["baseDefense"], "baseDefense", asc = false)
})
headerSpeciesSpA.addEventListener("click", () => {
    if(headerSpeciesSpA.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["baseSpAttack"], "baseSpAttack", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["baseSpAttack"], "baseSpAttack", asc = false)
})
headerSpeciesSpD.addEventListener("click", () => {
    if(headerSpeciesSpD.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["baseSpDefense"], "baseSpDefense", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["baseSpDefense"], "baseSpDefense", asc = false)
})
headerSpeciesSpe.addEventListener("click", () => {
    if(headerSpeciesSpe.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["baseSpeed"], "baseSpeed", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["baseSpeed"], "baseSpeed", asc = false)
})
headerSpeciesBST.addEventListener("click", () => {
    if(headerSpeciesBST.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, species, ["BST"], "BST", asc = true)
    else
        sortTableByClassName(speciesTable, species, ["BST"], "BST", asc = false)
})








speciesInput.addEventListener("input", e => {
    const value = e.target.value
    filterFilters(value)
    filterTableInput(value, species, ["name", "abilities"])
})
abilitiesInput.addEventListener("input", e => {
    const value = e.target.value
    if(abilitiesIngameNameArray.includes(value)){
        abilitiesInput.blur()
    }
    filterFilters(value)
    filterTableInput(value, abilities, ["name", "ingameName", "description"])
})
movesInput.addEventListener("input", e => {
    const value = e.target.value
    filterFilters(value)
    filterTableInput(value, moves, ["name", "ingameName", "effect", "description"])
})
locationsInput.addEventListener("input", e => {
    const value = e.target.value
    filterFilters(value)
    filterLocationsTableInput(value, species, ["evolutionLine"])
})


speciesButton.addEventListener("click", async () => {
    if(!speciesButton.classList.contains("activeButton")){
        await tableButtonClick("species")
    }
})
abilitiesButton.addEventListener("click", async () => {
    if(!abilitiesButton.classList.contains("activeButton")){
        await tableButtonClick("abilities")
    }
})
locationsButton.addEventListener("click", async () => {
    if(!locationsButton.classList.contains("activeButton")){
        await tableButtonClick("locations")
    }
})
movesButton.addEventListener("click", async () => {
    if(!movesButton.classList.contains("activeButton")){
        await tableButtonClick("moves")
    }
})







patchnoteModeCheckbox.addEventListener("change", e => {
    lazyLoading(true)
})

onlyShowChangedPokemonCheckbox.addEventListener("change", e => {
    for(let i = 0, j = speciesTracker.length; i < j; i++){
        if(e.target.checked){
            if(species[speciesTracker[i]["key"]]["changes"].length === 0){
                speciesTracker[i]["filter"].push("changed")
            }
        }
        else{
            tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "changed")
        }
    }
    lazyLoading(true)
})












openCredits.addEventListener("click", () => {
    modal.classList.remove("hide")
    if(typeof document.createElement('dialog').showModal === 'function'){
        modal.showModal()
    }
    else if(typeof document.createElement('dialog').show === 'function'){
        modal.show()
    }

})
closeCredits.addEventListener("click", () => {
    modal.classList.add("hide")
    if(typeof document.createElement('dialog').close === 'function'){
        modal.close()
    }
})














const options = {
        root: null,
        rootMargins: "0px",
        threshold: 0
}

function footerIsTouching(entries){
    if(entries[0].isIntersecting){
        lazyLoading(false)
        openCredits.classList.remove("hide")
        update.classList.remove("hide")
    }
    else{
        openCredits.classList.add("hide")   
        update.classList.add("hide")
    }
}


function speciesPanelIsTouching(entries){
    if(entries[0].isIntersecting){
        utilityButton.innerText = "↓"
    }
    else{

        speciesPanel("hide")

        if(table.getBoundingClientRect().top < 0){
            utilityButton.innerText = "↑"
        }
        else if(tableInput.getBoundingClientRect().top < 0){
            utilityButton.innerText = "☰"
        }
    }
}

function tableIsTouching(entries){
    if(entries[0].isIntersecting && tableInput.getBoundingClientRect().top <= 0){
        utilityButton.innerText = "☰"
    }
    else{
        if(table.getBoundingClientRect().top < 0){
            utilityButton.innerText = "↑"
        }
        else if(tableInput.getBoundingClientRect().top < 0){
            utilityButton.innerText = "☰"
        }
    }
}

function openCreditsIsTouching(entries){
    if(entries[0].isIntersecting){
        lazyLoading(false)
    }
}


const observerFooter = new IntersectionObserver(footerIsTouching, options)
observerFooter.observe(document.getElementById("footer"))

const observeTable = new IntersectionObserver(tableIsTouching, options)
observeTable.observe(document.getElementById("observerCheck"))

const observeSpeciesPanel = new IntersectionObserver(speciesPanelIsTouching, options)
observeSpeciesPanel.observe(speciesPanelMainContainer)

const observeOpenCredits = new IntersectionObserver(openCreditsIsTouching, options)
observeOpenCredits.observe(openCredits)




utilityButton.onclick = () => {
    utilityButtonOnClick()
}
document.addEventListener("keydown", e => {
    if(e.target.nodeName !== "INPUT"){
        //e.preventDefault()
        if(e.code === "Space"){
            e.preventDefault()
            utilityButtonOnClick()
        }    
        else if(e.code === "Enter" && panelSpecies !== ""){
            speciesPanel("toggle")
            window.scrollTo({ top: 0})
        }
        else if(e.code === "Backspace" || e.code === "Escape" || e.code === "Delete"){
            speciesPanel("hide")
        }
    }
})
function utilityButtonOnClick(){
    if(utilityButton.innerText === "↓"){
        speciesPanel("hide")
        if(document.getElementById(`${scrollToSpecies}`)){
            document.getElementById(`${scrollToSpecies}`).scrollIntoView({ block: "center" })
        }
    }
    else if(utilityButton.innerText === "☰" && panelSpecies !== ""){
        speciesPanel("show")
        window.scrollTo({ top: 0})
    }
    else{
        window.scrollTo({top: 0})
    }
}





update.addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})


window.onbeforeunload = () => {  
    window.scrollTo(0, 0)
}


window.addEventListener('popstate', async () => {
    historyObj.pop()
    const temp = historyObj.length
    await displayHistoryObj(historyObj.slice(-1)[0])
    if(historyObj.length > 0){
        window.history.pushState(null, null, await refreshURLParams())
    }
    else{
        window.history.replaceState(null, null, await refreshURLParams())
    }

    while(historyObj.length > temp && temp > 0){
        historyObj.pop()
    }
})


fetchData()



