window.repoDex = "ydarissep/Unbound-Pokedex"
window.repo1 = "Skeli789/Complete-Fire-Red-Upgrade/dev"
window.repo2 = "Skeli789/Dynamic-Pokemon-Expansion/Unbound"

window.panelSpecies = ""

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
        sortTableByClassName(abilitiesTable, "ability", asc = true)
    else
        sortTableByClassName(abilitiesTable, "ability", asc = false)
})
headerAbilitiesDescription.addEventListener("click", () => {
    if(headerAbilitiesDescription.classList.contains("th-sort-desc"))
        sortTableByClassName(abilitiesTable, "description", asc = true)
    else
        sortTableByClassName(abilitiesTable, "description", asc = false)
})






headerMovesMove.addEventListener("click", () => {
    if(headerMovesMove.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "move", asc = true)
    else
        sortTableByClassName(movesTable, "move", asc = false)
})
headerMovesType.addEventListener("click", () => {
    if(headerMovesType.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "type", asc = true)
    else
        sortTableByClassName(movesTable, "type", asc = false)
})
headerMovesSplit.addEventListener("click", () => {
    if(headerMovesSplit.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "split", asc = true)
    else
        sortTableByClassName(movesTable, "split", asc = false)
})
headerMovesPower.addEventListener("click", () => {
    if(headerMovesPower.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "power", asc = true, parseINT = true)
    else
        sortTableByClassName(movesTable, "power", asc = false, parseINT = true)
})
headerMovesAccuracy.addEventListener("click", () => {
    if(headerMovesAccuracy.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "accuracy", asc = true, parseINT = true)
    else
        sortTableByClassName(movesTable, "accuracy", asc = false, parseINT = true)
})
headerMovesPP.addEventListener("click", () => {
    if(headerMovesPP.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "PP", asc = true, parseINT = true)
    else
        sortTableByClassName(movesTable, "PP", asc = false, parseINT = true)
})
headerMovesEffect.addEventListener("click", () => {
    if(headerMovesEffect.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "effect", asc = true)
    else
        sortTableByClassName(movesTable, "effect", asc = false)
})







headerSpeciesID.addEventListener("click", () => {
    if(headerSpeciesID.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "ID", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "ID", asc = false, parseINT = true)
})
headerSpeciesSprite.addEventListener("click", () => {
    if(headerSpeciesID.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "ID", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "ID", asc = false, parseINT = true)
})
headerSpeciesName.addEventListener("click", () => {
    if(headerSpeciesName.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "species", asc = true)
    else
        sortTableByClassName(speciesTable, "species", asc = false)
})
headerSpeciesTypes.addEventListener("click", () => {
    if(headerSpeciesTypes.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "types", asc = true)
    else
        sortTableByClassName(speciesTable, "types", asc = false)
})
headerSpeciesAbilities.addEventListener("click", () => {
    if(headerSpeciesAbilities.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "abilities", asc = true)
    else
        sortTableByClassName(speciesTable, "abilities", asc = false)
})
headerSpeciesHP.addEventListener("click", () => {
    if(headerSpeciesHP.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseHP", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseHP", asc = false, parseINT = true)
})
headerSpeciesAtk.addEventListener("click", () => {
    if(headerSpeciesAtk.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseAttack", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseAttack", asc = false, parseINT = true)
})
headerSpeciesDef.addEventListener("click", () => {
    if(headerSpeciesDef.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseDefense", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseDefense", asc = false, parseINT = true)
})
headerSpeciesSpA.addEventListener("click", () => {
    if(headerSpeciesSpA.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseSpAttack", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseSpAttack", asc = false, parseINT = true)
})
headerSpeciesSpD.addEventListener("click", () => {
    if(headerSpeciesSpD.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseSpDefense", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseSpDefense", asc = false, parseINT = true)
})
headerSpeciesSpe.addEventListener("click", () => {
    if(headerSpeciesSpe.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseSpeed", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseSpeed", asc = false, parseINT = true)
})
headerSpeciesBST.addEventListener("click", () => {
    if(headerSpeciesBST.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "BST", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "BST", asc = false, parseINT = true)
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
    filterTableInput(value, species, ["evolutionLine", ".locationsInfo"])
})


speciesButton.addEventListener("click", () => {
    if(!speciesButton.classList.contains("activeButton"))
        tableButtonClick("species")
})
abilitiesButton.addEventListener("click", () => {
    if(!abilitiesButton.classList.contains("activeButton"))
        tableButtonClick("abilities")
})
locationsButton.addEventListener("click", () => {
    if(!locationsButton.classList.contains("activeButton"))
        tableButtonClick("locations")
})
movesButton.addEventListener("click", () => {
    if(!movesButton.classList.contains("activeButton"))
        tableButtonClick("moves")
})







patchnoteModeCheckbox.addEventListener("change", e => {
    if(e.target.checked){
        document.querySelectorAll(".changelogType").forEach(el => el.classList.add("typeChanged"))
        document.querySelectorAll(".changelogAbilities").forEach(el => el.classList.remove("hide"))
        document.querySelectorAll(".changelogBuff").forEach(el => el.classList.add("buff", "bold"))
        document.querySelectorAll(".changelogNerf").forEach(el => el.classList.add("nerf", "bold"))
    }
    else{
        document.querySelectorAll(".changelogType").forEach(el => el.classList.remove("typeChanged"))
        document.querySelectorAll(".changelogAbilities").forEach(el => el.classList.add("hide"))
        document.querySelectorAll(".changelogBuff").forEach(el => el.classList.remove("buff", "bold"))
        document.querySelectorAll(".changelogNerf").forEach(el => el.classList.remove("nerf", "bold"))
    }
    lazyLoading(reset = true)
})

onlyShowChangedPokemonCheckbox.addEventListener("change", e => {
    Object.keys(species).forEach(name => {
        const row = document.getElementById(name)
        if(e.target.checked){
            if(species[name]["changes"].length <= 0){
                row.classList.add("hideChanged")
            }
            else{
                row.classList.remove("hideChanged")
            }
        }
        else{
            row.classList.remove("hideChanged")
        }
    })
    lazyLoading(reset = true)
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

        speciesPanelMainContainer.classList.add("hide")

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
            speciesPanelMainContainer.classList.toggle("hide")
            window.scrollTo({ top: 0})
        }
        else if(e.code === "Backspace" || e.code === "Escape" || e.code === "Delete"){
            speciesPanelMainContainer.classList.add("hide")
        }
    }
})
function utilityButtonOnClick(){
    if(utilityButton.innerText === "↓"){
        speciesPanelMainContainer.classList.add("hide")
        document.getElementById(`${panelSpecies}`).scrollIntoView({ block: "center" })
    }
    else if(utilityButton.innerText === "☰" && panelSpecies !== ""){
        speciesPanelMainContainer.classList.remove("hide")
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


fetchData()



