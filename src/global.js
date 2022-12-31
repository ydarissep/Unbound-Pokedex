window.repo = "BuffelSaft/pokeemerald"
window.repo1 = "Skeli789/Complete-Fire-Red-Upgrade/dev"
window.repo2 = "Skeli789/Dynamic-Pokemon-Expansion/Unbound"

window.panelSpecies = ""

window.filterCount = 0
const tableFilter = document.getElementById("tableFilter")



const openCredits = document.getElementById("openCredits")
const closeCredits = document.getElementById("closeCredits")
const modal = document.getElementById("modal")
const update = document.getElementById("update")

const patchnoteModeCheckbox = document.getElementById("patchnoteModeCheckbox")
const onlyShowChangedPokemonCheckbox = document.getElementById("onlyShowChangedPokemonCheckbox")

const speciesFilterType = document.getElementById("speciesFilterType")
const speciesFilterAbility = document.getElementById("speciesFilterAbility")
const speciesFilterLearnset = document.getElementById("speciesFilterLearnset")
const speciesFilterHeldItem = document.getElementById("speciesFilterHeldItem")
const speciesFilterEggGroup = document.getElementById("speciesFilterEggGroup")
const speciesFilterHP = document.getElementById("speciesFilterHP")
const speciesFilterAtk = document.getElementById("speciesFilterAtk")
const speciesFilterDef = document.getElementById("speciesFilterDef")
const speciesFilterSpA = document.getElementById("speciesFilterSpA")
const speciesFilterSpD = document.getElementById("speciesFilterSpD")
const speciesFilterSpe = document.getElementById("speciesFilterSpe")
const speciesFilterBST = document.getElementById("speciesFilterBST")

const locationsFilterType = document.getElementById("locationsFilterType")

const movesFilterType = document.getElementById("movesFilterType")
const movesFilterFlag = document.getElementById("movesFilterFlag")
const movesFilterPriority = document.getElementById("movesFilterPriority")
const movesFilterEffect = document.getElementById("movesFilterEffect")
const movesFilterTarget = document.getElementById("movesFilterTarget")
const movesFilterPower = document.getElementById("movesFilterPower")







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
const locationsTableThead = document.getElementById("locationsTableThead")
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






headerLocationsSprite.addEventListener("click", () => {
    if(headerLocationsSprite.classList.contains("th-sort-desc"))
        sortTableByClassName(locationsTable, "species", asc = true, parseINT = false)
    else
        sortTableByClassName(locationsTable, "species", asc = false, parseINT = false)
})
headerLocationsSpecies.addEventListener("click", () => {
    if(headerLocationsSpecies.classList.contains("th-sort-desc"))
        sortTableByClassName(locationsTable, "species", asc = true, parseINT = false)
    else
        sortTableByClassName(locationsTable, "species", asc = false, parseINT = false)
})
headerLocationsRarity.addEventListener("click", () => {
    if(headerLocationsRarity.classList.contains("th-sort-desc"))
        sortTableByClassName(locationsTable, "rarity", asc = true, parseINT = true)
    else
        sortTableByClassName(locationsTable, "rarity", asc = false, parseINT = true)
})
headerLocationsZone.addEventListener("click", () => {
    if(headerLocationsZone.classList.contains("th-sort-desc"))
        sortTableByClassName(locationsTable, "zone", asc = true, parseINT = false)
    else
        sortTableByClassName(locationsTable, "zone", asc = false, parseINT = false)
})







speciesInput.addEventListener("input", e => {
    const value = e.target.value
    if(speciesIngameNameArray.includes(value)){
        speciesInput.blur()
    }
    filterTableInputParse(value, species, ["name", "abilities", "type1", "type2", "item1", "item2", "evolution", "evolutionLine", "forms"], speciesTableTbody)
    //filterTableInput(value, [2, 3, 4], speciesTableTbody)
})
abilitiesInput.addEventListener("input", e => {
    const value = e.target.value
    if(abilitiesIngameNameArray.includes(value)){
        abilitiesInput.blur()
    }
    filterTableInput(value, [0, 1], abilitiesTableTbody)
})
locationsInput.addEventListener("input", e => {
    const value = e.target.value
    if(speciesIngameNameArray.includes(value)){
        locationsInput.blur()
    }
    filterTableInput(value, [1, 3], locationsTableTbody)
    refreshLocations()
})
movesInput.addEventListener("input", e => {
    const value = e.target.value
    if(movesIngameNameArray.includes(value)){
        movesInput.blur()
    }
    filterTableInput(value, [0, 1, 6], movesTableTbody)
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




speciesFilterType.addEventListener("click", () => {
    const list = createOptionArray(["type1", "type2"], species)
    createFilter(list, species, ["type1", "type2"], filterCount++, speciesFilterButton, "Type")
})
speciesFilterAbility.addEventListener("click", () => {
    const list = abilitiesIngameNameArray
    createFilter(list, species, ["abilities"], filterCount++, speciesFilterButton, "Ability")
})
speciesFilterLearnset.addEventListener("click", () => {
    const list = movesIngameNameArray
    createFilter(list, species, ["levelUpLearnsets", "TMHMLearnsets", "tutorLearnsets", "eggMovesLearnsets"], filterCount++, speciesFilterButton, "Learnset")
})
speciesFilterHeldItem.addEventListener("click", () => {
    const list = createOptionArray(["item1", "item2"], species)
    createFilter(list, species, ["item1", "item2"], filterCount++, speciesFilterButton, "Held Item")
})
speciesFilterEggGroup.addEventListener("click", () => {
    const list = createOptionArray(["eggGroup1", "eggGroup2"], species)
    createFilter(list, species, ["eggGroup1", "eggGroup2"], filterCount++, speciesFilterButton, "Egg Group")
})
speciesFilterHP.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseHP"], filterCount++, speciesFilterButton, "HP", isInt = true, isOperator = true)
})
speciesFilterAtk.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseAttack"], filterCount++, speciesFilterButton, "Atk", isInt = true, isOperator = true)
})
speciesFilterDef.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseDefense"], filterCount++, speciesFilterButton, "Def", isInt = true, isOperator = true)
})
speciesFilterSpA.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseSpAttack"], filterCount++, speciesFilterButton, "SpA", isInt = true, isOperator = true)
})
speciesFilterSpD.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseSpDefense"], filterCount++, speciesFilterButton, "SpD", isInt = true, isOperator = true)
})
speciesFilterSpe.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseSpeed"], filterCount++, speciesFilterButton, "Spe", isInt = true, isOperator = true)
})
speciesFilterBST.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["BST"], filterCount++, speciesFilterButton, "BST", isInt = true, isOperator = true)
})









locationsFilterType.addEventListener("click", () => {
    const list = createOptionArray(["type1", "type2"], species)
    createLocationsFilter(list, locations, ["BST"], filterCount++, locationsFilterButton, "Type", isInt = false, isOperator = false)
})







movesFilterType.addEventListener("click", () => {
    const list = createOptionArray(["type"], moves)
    createFilter(list, moves, ["type"], filterCount++, movesFilterButton, "Type")
})
movesFilterPower.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, moves, ["power"], filterCount++, movesFilterButton, "Power", isInt = true, isOperator = true)
})
movesFilterFlag.addEventListener("click", () => {
    let list = []
    for (const name of Object.keys(moves)){
        for (let i = 0; i < moves[name]["flags"].length; i++){
            const value = sanitizeString(moves[name]["flags"][i])
            if(!list.includes(value))
                list.push(value)
        }
    }
    createFilter(list, moves, ["flags"], filterCount++, movesFilterButton, "Flag")
})
movesFilterPriority.addEventListener("click", () => {
    const list = createOptionArray(["priority"], moves, isInt = true).sort()
    createFilter(list, moves, ["priority"], filterCount++, movesFilterButton, "Priority", isInt = true)
})
movesFilterEffect.addEventListener("click", () => {
    const list = createOptionArray(["effect"], moves)
    createFilter(list, moves, ["effect"], filterCount++, movesFilterButton, "Effect")
})
movesFilterTarget.addEventListener("click", () => {
    const list = createOptionArray(["target"], moves)
    createFilter(list, moves, ["target"], filterCount++, movesFilterButton, "Target")
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



