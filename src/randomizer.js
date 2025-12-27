function encodeYID(num) {
	const charactersYID = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const base = charactersYID.length;
	let result = "";
	do {
		result = charactersYID[num % base] + result;
		num = Math.floor(num / base);
	} while (num > 0);
	while (result.length < 6) {
		result = "0" + result;
	}
	return result;
}

function decodeYID(str) {
	const charactersYID = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const base = charactersYID.length;
	let result = 0;
	for (let char of str) {
		const index = charactersYID.indexOf(char);
		if (index < 0) {
			return -1;
		}
		result = result * base + index;
	}
	return result;
}

function isUInt32(num) {
	return Number.isInteger(num) && num >= 0 && num <= 0xFFFFFFFF;
}

function findSector(view, id) {
	let latestOffset = -1;
	let latestSaveIndex = -1;
	for (let x = 0x0; x < 0x1C000; x += 0x1000) {
		const sectorId = view.getUint16(x + 0xFF4, true);
		const saveIndex = view.getUint32(x + 0xFFC, true);
		if (sectorId === id && saveIndex > latestSaveIndex) {
			latestOffset = x;
			latestSaveIndex = saveIndex;
		}
	}
	return latestOffset;
}

function readDataFromSaveFile(view) {
	for (let sectorId = 0; sectorId < 14; sectorId++) {
		if (findSector(view, sectorId) == -1) {
			return undefined;
		}
	}
	const trainerInfo = findSector(view, 0x0);
	return view.getUint32(trainerInfo + 0x00A, true);
}

function submitEnhancements() {
	const yid = document.getElementById("yidInput").value;
	const randomizedAbilitiesChecked = document.getElementById("saveRandomizedAbilitiesCheckbox").checked;
	const randomizedLearnsetChecked = document.getElementById("saveRandomizedLearnsetCheckbox").checked;
	const rebalancedStatsChecked = document.getElementById("saveRebalancedStatsCheckbox").checked;
	let data = {};
	let yidChanged = false;
	if (yid.length === 0) {
		if (randomizedAbilitiesChecked || randomizedLearnsetChecked) {
			alert("Randomizer options require a valid YID");
			return;
		} else {
			data = undefined;
		}
	} else {
		const trainerIdFull = decodeYID(yid);
		if (trainerIdFull <= 0 || !isUInt32(trainerIdFull)) {
			alert("Invalid YID");
			return;
		}
		const trainerId = trainerIdFull & 0xFFFF;
		const trainerSecretId = trainerIdFull >>> 16;
		data = {
			trainerIdFull,
			trainerId,
			trainerSecretId
		};
		if (typeof saveData !== 'undefined') {
			yidChanged = saveData.trainerIdFull != trainerIdFull;
		}
	}
	processSaveData(data);
	const saveRandomizedAbilities = settings.includes("saveRandomizedAbilities");
	const saveRandomizedLearnset = settings.includes("saveRandomizedLearnset");
	const saveRebalancedStats = settings.includes("saveRebalancedStats");
	changeSaveSetting("saveRandomizedAbilities", randomizedAbilitiesChecked);
	changeSaveSetting("saveRandomizedLearnset", randomizedLearnsetChecked);
	changeSaveSetting("saveRebalancedStats", rebalancedStatsChecked);
	if ((yidChanged && (randomizedAbilitiesChecked || randomizedLearnsetChecked)) || (randomizedAbilitiesChecked != saveRandomizedAbilities) || (randomizedLearnsetChecked != saveRandomizedLearnset) || (rebalancedStatsChecked != saveRebalancedStats)) {
		clearSpeciesReload();
	} else {
		overlay.click();
	}
}

async function reloadPopupEnhancements() {
	while (popup.firstChild){
		popup.removeChild(popup.firstChild);
	}
	const saveOptions = document.createElement("div");
	saveOptions.id = "saveOptions";
	saveOptions.style.display = "inline-block";
	const saveOptionsWrapper = document.createElement("div");
	saveOptionsWrapper.id = "saveOptionsWrapper";
	saveOptionsWrapper.style.width = "fit-content";
	const saveOptionsFieldset = document.createElement("fieldset");
	saveOptionsFieldset.style.textAlign = "center";
	const saveOptionsLegend = document.createElement("legend");
	saveOptionsLegend.innerText = "Enhancements";
	saveOptionsFieldset.append(saveOptionsLegend);
	const yidFieldset = document.createElement("fieldset");
	yidFieldset.style.textAlign = "center";
	const yidLegend = document.createElement("legend");
	yidLegend.innerText = "YID";
	yidFieldset.append(yidLegend);
	const yidInput = document.createElement("input");
	yidInput.id = "yidInput";
	yidInput.type = "search";
	yidInput.style.cssText = "width: 120px; text-align: center !important";
	yidInput.setAttribute("maxlength",6);
	yidFieldset.append(yidInput);
	yidFieldset.style.display = "flex";
	yidFieldset.style.flexDirection = "column";
	yidFieldset.style.textAlign = "center";
	yidFieldset.style.alignItems = "center";
	const saveFileInputButton = document.createElement("button");
	saveFileInputButton.id = "saveFileInputButton";
	saveFileInputButton.type = "button";
	saveFileInputButton.textContent = "Upload";
	saveFileInputButton.onclick = openSaveFileDialog;
	saveFileInputButton.style.width = "fit-content";
	yidFieldset.append(saveFileInputButton);
	const saveFileInput = document.createElement("input");
	saveFileInput.id = "saveFileInput";
	saveFileInput.classList.add("hide");
	saveFileInput.type = "file";
	saveFileInput.accept = ".sav";
	saveFileInput.addEventListener("change", function() {
		var [file] = saveFileInput.files;
		if (file) {
			saveFileInput.value = null;
			file.arrayBuffer().then(buffer => {
				const view = new DataView(buffer);
				const trainerIdFull = readDataFromSaveFile(view);
				if (trainerIdFull) {
					yidInput.value = encodeYID(trainerIdFull);
				} else {
					alert("Unable to read save data! Please ensure you've selected a save and not a save state.");
				}
			})
		}
	});
	yidFieldset.append(saveFileInput);
	if (typeof saveData !== 'undefined') {
		yidInput.value = encodeYID(saveData.trainerIdFull);
	}
	saveOptionsFieldset.append(yidFieldset);
	saveOptionsFieldset.append(returnSaveSettingEl("saveRandomizedAbilities", "Randomized Abilities"));
	saveOptionsFieldset.append(returnSaveSettingEl("saveRandomizedLearnset", "Randomized Learnset"));
	saveOptionsFieldset.append(returnSaveSettingEl("saveRebalancedStats", "Rebalanced Stats"));
	const dataWrapper = document.createElement("div");
	dataWrapper.id = "dataWrapper";
	dataWrapper.style.display = "flex";
	dataWrapper.style.justifyContent = "center";
	const updateData = document.createElement("button");
	updateData.id = "updateData";
	updateData.type = "button";
	updateData.textContent = "Update";
	updateData.onclick = submitEnhancements;
	dataWrapper.append(updateData);
	const clearData = document.createElement("button");
	clearData.id = "clearData";
	clearData.type = "button";
	clearData.textContent = "Clear";
	clearData.onclick = clearCurrentSave;
	dataWrapper.append(clearData);
	saveOptionsFieldset.append(dataWrapper);
	saveOptionsWrapper.append(saveOptionsFieldset);
	saveOptions.append(saveOptionsWrapper);
	popup.append(saveOptions);
	overlay.style.display = "flex";
	body.classList.add("fixed");
}

function processSaveData(data) {
	window.saveData = data;
	localStorage.setItem("saveData", JSON.stringify(saveData));
}

function openSaveFileDialog() {
	document.getElementById("saveFileInput").click();
}

function clearCurrentSave() {
	document.getElementById("yidInput").value = "";
	document.getElementById("saveRandomizedAbilitiesCheckbox").checked = false;
	document.getElementById("saveRandomizedLearnsetCheckbox").checked = false;
	document.getElementById("saveRebalancedStatsCheckbox").checked = false;
}

async function clearSpeciesReload() {
	localStorage.removeItem("species");
	window.location.reload();
}

async function changeSaveSetting(setting, enable) {
	if (enable) {
		if (!settings.includes(setting)) {
			settings.push(setting)
		}
	} else {
		settings = settings.filter(value => value != setting);
	}
	localStorage.setItem("DEXsettings", JSON.stringify(settings));
}

function returnSaveSettingEl(setting, settingText) {
	const settingEl = document.createElement("div");
	const settingCheckbox = document.createElement("input");
	settingCheckbox.setAttribute("type", "checkbox");
	settingCheckbox.setAttribute("id", `${setting}Checkbox`);
	const settingLabel = document.createElement("label");
	settingLabel.setAttribute("for", `${setting}Checkbox`);
	settingLabel.innerText = settingText;
	settingEl.append(settingCheckbox);
	settingEl.append(settingLabel);
	if (settings.includes(setting)) {
		settingCheckbox.checked = true;
	}
	return settingEl;
}

new Promise(resolve => {
	const selector = "#tableButton";
	if (typeof species !== 'undefined' && document.querySelector(selector)) {
		return resolve(document.querySelector(selector));
	}
	const observer = new MutationObserver(mutations => {
		if (typeof species !== 'undefined' && document.querySelector(selector)) {
			observer.disconnect();
			resolve(document.querySelector(selector));
		}
	});
	observer.observe(document, {
		childList: true,
		subtree: true
	});
}).then((tableButton) => {
	const enhancementsWrapper = document.createElement("div");
	enhancementsWrapper.id = "enhancementsWrapper";
	const buttonEnhancements = document.createElement("button");
	buttonEnhancements.id = "buttonEnhancements";
	buttonEnhancements.type = "button";
	buttonEnhancements.textContent = "Enhancements";
	buttonEnhancements.style.width = "140px";
	buttonEnhancements.onclick = reloadPopupEnhancements;
	enhancementsWrapper.append(buttonEnhancements);
	tableButton.append(enhancementsWrapper);
	
	const storedSaveData = localStorage.getItem("saveData");
	if (storedSaveData && storedSaveData != "undefined") {
		processSaveData(JSON.parse(storedSaveData));
	}
});
