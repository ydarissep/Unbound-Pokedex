function regexWildLocations(textWildLocations, locations){
	const lines = textWildLocations.split("\n")
	let zone = null, method = "-", index = 0

    lines.forEach(line => {
    	const matchWildPokemon = line.match(/WildPokemon *s?(\w+)_(\w+)/i)
    	if(matchWildPokemon !== null){
    		zone = matchWildPokemon[1].replace(/([A-Z])/g, " $1").replace(/(\d+)/g, " $1").trim()
    		method = matchWildPokemon[2]

    		if(!(zone in locations)){
    			locations[zone] = {}
    		}
    		index = 0
    	}
    	const matchSpecies = line.match(/SPECIES_\w+/i)
    	if(matchSpecies !== null){
    		const tempMethod = replaceMethodString(method, index)
    		if(!(tempMethod in locations[zone])){
    			locations[zone][tempMethod] = {}
    		}
    		let name = matchSpecies[0]
    		if(name in locations[zone][tempMethod]){
    			locations[zone][tempMethod][name] += returnRarity(tempMethod, index)
    		}
    		else{
    			locations[zone][tempMethod][name] = returnRarity(tempMethod, index)
    		}
    		index++
    	}
    })

    return locations
}




function regexRaidLocations(textRaidLocations, locations){
	const lines = textRaidLocations.split("\n")
	let zone = null, method = "Raid"

    lines.forEach(line => {
    	const matchRaid = line.match(/Raid *s(\w+)Raids(\d+Star)/i)
    	if(matchRaid !== null){
    		zone = matchRaid[1].replace(/([A-Z])/g, " $1").replace(/(\d+)/g, " $1").trim()
    		method = `Raid ${matchRaid[2].replace(/([A-Z])/g, " $1").replace(/(\d+)/g, " $1").trim()}`

    		if(!(zone in locations)){
    			locations[zone] = {}
    		}
    	}
    	const matchSpecies = line.match(/SPECIES_\w+/i)
    	if(matchSpecies !== null){
    		if(!(method in locations[zone])){
    			locations[zone][method] = {}
    		}
    		let name = matchSpecies[0]
    		if(name in locations[zone][method]){
    			locations[zone][method][name] += 1
    		}
    		else{
    			locations[zone][method][name] = 1
    		}
    	}
    	if(/};/.test(line)){
    		if(zone in locations){
    			if(method in locations[zone]){
    				const keys = Object.keys(locations[zone][method])
    				let total = 0
    				for(let i = 0; i < keys.length; i++){
    					total += locations[zone][method][keys[i]]
    				}
    				for(let i = 0; i < keys.length; i++){
    					locations[zone][method][keys[i]] = parseInt(100/(total/locations[zone][method][keys[i]]))
    				}
    			}
    		}
    	}
    })

    return locations
}






function replaceMethodString(method, index){
	if(method.match(/fish/i) !== null){
		if(index >=0 && index <= 1)
			return "Old Rod"
		else if(index >= 2 && index <= 4)
			return "Good Rod"
		else if(index >= 5 && index <= 9)
			return "Super Rod"
		else
			return "Fishing"
	}
	else if(method.match(/surf/i) !== null){
		return "Surfing"
	}
	else if(method.match(/smash/i) !== null){
		return "Rock Smash"
	}
	else if(method.match(/night/i) !== null){
		return "Night"
	}
	else if(method.match(/day/i) !== null){
		return "Day"
	}
	else if(method.match(/LandMons/i) !== null){
		return "Day"
	}
    else{
    	console.log(method)
        return method
    }
}


function returnRarity(method, index){
	if(method === "Night" || method === "Day"){
		if(index === 0 || index === 1)
			return 20
		else if(index >= 2 && index <= 5){
			return 10
		}
		else if(index >= 6 && index <= 7){
			return 5
		}
		else if(index >= 8 && index <= 9){
			return 4
		}
		else if(index >= 10 || index <= 11){
			return 1
		}
		else
			return 100
	}
	else if(method === "Surfing" || method === "Rock Smash"){
		if(index === 0)
			return 60
		else if(index === 1)
			return 30
		else if(index === 2)
			return 5
		else if(index === 3)
			return 4
		else if(index === 4)
			return 1
		else
			return 100
	}
	else if(method === "Old Rod"){
		if(index === 0)
			return 70
		else if(index === 1)
			return 30
		else 
			return 100
	}
	else if(method === "Good Rod"){
		if(index === 2)
			return 60
		else if(index === 3 || index === 4)
			return 20
		else 
			return 100
	}
	else if(method === "Super Rod"){
		if(index === 5 || index === 6)
			return 40
		else if(index === 7)
			return 15
		else if(index === 8)
			return 4
		else if(index === 9)
			return 1
		else 
			return 100
	}
    else{
        return 100
    }
}