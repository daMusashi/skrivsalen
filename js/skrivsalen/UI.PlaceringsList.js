var ns = Skrivsalen.createNamespace("UI"); 

ns.PlaceringsList = function(){

	Skrivsalen.log("Skapar placeringslista...", "UI.PlaceringsList");

	var container = document.getElementById(Skrivsalen.Config.domId_placeringslista_container);
	
	this.mainDOM = document.createElement("div");
	$(this.mainDOM).attr("id", Skrivsalen.Config.domId_placeringslista);
	//$(this.mainDOM).css("background-color", "green");
	container.appendChild(this.mainDOM);
}

ns.Karta.prototype.uppdatera = function(platsArr){
	Skrivsalen.log("Uppdaterar placeringslista...", "UI.PlaceringsList");
	
	var platser = platsArr;
	Skrivsalen.UI.Factory.empty(this.mainDOM);

	var table = this._getTableDOM();

	for(var i = 0; i < platser.length; i++){
		
		var plats = platser[i];
		console.log(plats);
		if(listDom = plats.getListaDOM()){
			table.appendChild(plats.getListaDOM());
		}
	}

	this.mainDOM.appendChild(table);

}

ns.Karta.prototype._getTableDOM = function(platsArr){
	var tableDom = document.createElement("table");
	$(this.tableDom).attr("class", "table table-striped table-condensed table-responsive");

	var platsTh = document.createElement("th");
	$(platsTh).text("Plats");
	$(platsTh).attr("class", "plats");
	
	var namnTh = document.createElement("th");
	$(namnTh).text("Namn");
	$(namnTh).attr("class", "namn");

	var gruppTh = document.createElement("th");
	$(gruppTh).text("Grupp");
	$(gruppTh).attr("class", "grupp");

	var klassTh = document.createElement("th");
	$(klassTh).text("Klass");
	$(klassTh).attr("class", "klass");

	tableDom.appendChild(platsTh);
	tableDom.appendChild(namnTh);
	tableDom.appendChild(gruppTh);
	tableDom.appendChild(klassTh);

	return tableDom;

}
