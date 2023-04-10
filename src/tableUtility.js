async function displaySetup(){    
    await footerP("")


    await tableInput.classList.remove("hide")

    await tableButton.classList.remove("hide")

    await tableFilter.classList.remove("hide")

    await table.classList.remove("hide")

    await utilityButton.classList.remove("hide")
}









function sortTableByClassName(table, className, asc = true, parseINT = false) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        let aColText = a.querySelector(`.${className}`).textContent.trim();
        let bColText = b.querySelector(`.${className}`).textContent.trim();

        if(parseINT)
        {
            aColText = parseInt(aColText)
            if(isNaN(aColText))
                aColText = 0
            bColText = parseInt(bColText)
            if(isNaN(bColText))
                bColText = 0
        }

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    lazyLoading(true)

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th.${className}`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th.${className}`).classList.toggle("th-sort-desc", !asc);
}







function filterTableInput(input, obj, keyArray){
    const sanitizedInput = input.trim().replaceAll(/-|'| |_/g, "").toLowerCase()
    const regexInput = new RegExp(sanitizedInput, "i")
    const table = document.getElementsByClassName("activeTable")[0]
    const rows = table.querySelectorAll("tbody > tr")
    for (let j = 0; j < rows.length; j++){
        const key = rows[j].querySelector(".key").innerHTML
        rows[j].classList.add("hide")
        for (let i = 0; i < keyArray.length; i++){
            if(/^\./i.test(keyArray[i])){
                const compare = rows[j].getElementsByClassName(keyArray[i].replace(".", ""))[0].innerText.replaceAll(/-|'| |_/g, "").toLowerCase()
                if(compare.includes(sanitizedInput)){
                    rows[j].classList.remove("hide")
                    break
                }
            }
            else{
                if(regexInput.test(obj[key][keyArray[i]].toString().replaceAll(/-|'| |_/g, ""))){
                    rows[j].classList.remove("hide")
                    break
                }
            }
        }
    }
    lazyLoading(true)
}






function refreshLocationsTables(){
    if(!locationsTable.classList.contains("hide")){
        const locationsTables = locationsTableTbody.children
        for(let i = 0; i < locationsTables.length; i++){
            locationsTables[i].classList.add("hide")
            const tableTbody = locationsTables[i].children[1]
            for(let j = 0; j < tableTbody.children.length; j++){
                if(!tableTbody.children[j].className.includes("hide")){
                    locationsTables[i].classList.remove("hide")
                    break
                }
            }
        }
    }
}







function lazyLoading(reset = false){
    const activeTable = document.getElementsByClassName("activeTable")[0]
    if(activeTable)
    {
        const rows = activeTable.querySelectorAll("tbody > tr")
        let count = 0
        for(let i = 0; i < rows.length; i++){
            if(reset){
                if(count <= 75){
                    if(!rows[i].classList.contains("hide") && !rows[i].className.includes("hideFilter") && !rows[i].className.includes("hideChanged")){
                        rows[i].classList.remove("hideTemp")
                        count++
                    }
                }
                else
                    rows[i].classList.add("hideTemp")
            }
            else{
                if(!rows[i].classList.contains("hide") && !rows[i].className.includes("hideFilter")){
                    if(rows[i].classList.contains("hideTemp")){
                        count++
                        rows[i].classList.remove("hideTemp")
                    }
                }
                if(count >= 75)
                    break
            }
        }
        refreshLocationsTables()
    }
}






async function tableButtonClick(input){
    const activeTable = await document.querySelectorAll(".activeTable")
    const activeButton = await document.querySelectorAll(".activeButton")
    const activeInput = await document.querySelectorAll(".activeInput")
    const activeFilter = await document.querySelectorAll(".activeFilter")

    activeTable.forEach(table => {
        table.classList.remove("activeTable")
        table.classList.add("hide")
    })


    activeButton.forEach(button => {
        button.classList.remove("activeButton")
    })

    activeInput.forEach(input => {
        input.classList.remove("activeInput")
        input.classList.add("hide")
    })

    activeFilter.forEach(filter => {
        filter.classList.remove("activeFilter")
        filter.classList.add("hide")
    })


    const targetTable = await document.getElementById(`${input}Table`)
    const targetButton = await document.getElementById(`${input}Button`)
    const targetInput = await document.getElementById(`${input}Input`)
    const targetFilter = await document.getElementById(`${input}Filter`)

    targetTable.classList.remove("hide")
    targetTable.classList.add("activeTable")

    targetButton.classList.add("activeButton")

    targetInput.classList.remove("hide")
    targetInput.classList.add("activeInput")

    targetFilter.classList.remove("hide")
    targetFilter.classList.add("activeFilter")

    await lazyLoading(reset = true)
}
