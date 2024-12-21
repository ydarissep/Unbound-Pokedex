window.repoDex = "ydarissep/Unbound-Pokedex"
window.repo1 = "Skeli789/Complete-Fire-Red-Upgrade/dev"
window.repo2 = "Skeli789/Dynamic-Pokemon-Expansion/Unbound"
window.checkUpdate = "14 Unbound"


fetch('https://raw.githubusercontent.com/ydarissep/dex-core/main/index.html').then(async response => {
	return response.text()
}).then(async rawHTMLText => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(rawHTMLText, 'text/html')
    document.querySelector('html').innerHTML = doc.querySelector('html').innerHTML




    document.title = "Unbound Dex"
    document.getElementById("footerName").innerText = "Unbound\nYdarissep Pokedex"



    await fetch("https://raw.githubusercontent.com/ydarissep/dex-core/main/src/global.js").then(async response => {
        return response.text()
    }).then(async text => {
        text = text.replace("Credit to ris", "Credit to DMan16\n- Enhancements settings\n\nCredit to ris")
        await eval.call(window,text)
    }).catch(error => {
        console.warn(error)
    })    

}).catch(error => {
	console.warn(error)
})


