var ns = Skrivsalen.createNamespace("UI");

ns.Factory = function(){}

ns.Factory.addTooltip = function(domElem, tooltip, pos){
	
	var position = pos || "bottom";

	$(domElem).attr("data-toggle", "tooltip");
	$(domElem).attr("title", tooltip);
	$(domElem).attr("data-placement", position);
	$(domElem).tooltip(); 

	return domElem;	
}

ns.Factory.getSelectGruppColorDOM = function(gruppObj){
	// UI bygger på jQuery-plug Spectrum: https://bgrins.github.io/spectrum/
	// Jag har modiferat för mindre att få ett mindre UI (bara preview-ruta)

	var domId = "select-color-"+gruppObj.id+"-container";
	var inpId = "select-color-"+gruppObj.id;
	var dom = document.createElement("span");
	var inp = document.createElement("input");
	dom.appendChild(inp);

	$(dom).css("cursor", "pointer");


	$(inp).attr("type", "text");
	$(inp).attr("id", inpId);
	$(inp).attr("name", "color-"+gruppObj.id);
	//$(inp).attr("defaultValue", gruppObj.color);
	$(inp).attr("value", gruppObj.color);
	$(inp).spectrum({
		preferredFormat: "hex",
		chooseText: "Välj",
    	cancelText: "Avbryt"
	});
	$(inp).on("change", function(ev){
		var color = $("#"+inpId).spectrum("get");
		gruppObj.setColor(color);
		Skrivsalen.debug("Färg ändrad för grupp "+gruppObj.namn+" ["+gruppObj.id+"] till "+color, "UI.Factory:getGruppColorDOM");
	});
	var spectrumDom = dom.querySelector(".sp-preview");
	this.addTooltip(spectrumDom, "Ändra färgen");

	return dom;
}

/**
 * Tömmer ett DOM-objekt på innehåll
 * @param  {DOM} domElem element att tömma
 */
ns.Factory.empty = function(domElem){

	// "tömmer" kartan. Nedan snabbare än innerHTML = "", se http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
	while(domElem.firstChild) {
   		domElem.removeChild(domElem.firstChild);
	}
}

