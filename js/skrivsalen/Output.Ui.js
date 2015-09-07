var ns = Skrivsalen.createNamespace("Output"); 

ns.Ui = function(){

	Skrivsalen.log("Skapar Output.Ui..", "Output.Ui");

	var kartaContainer = document.getElementById(Skrivsalen.Config.domId_karta_container);
	
	this.kartaMainDOM = document.createElement("div");
	$(this.kartaMainDOM).attr("id", Skrivsalen.Config.domId_karta);
	$(this.kartaMainDOM).attr("class", "nano-content");
	//$(this.mainDOM).css("background-color", "green");
	kartaContainer.appendChild(this.kartaMainDOM);

	var listaContainer = document.getElementById(Skrivsalen.Config.domId_placeringslista_container);
	
	this.listaMainDOM = document.createElement("div");
	$(this.listaMainDOM).attr("id", Skrivsalen.Config.domId_placeringslista);
	$(this.listaMainDOM).attr("class", "nano-content");
	//$(this.mainDOM).css("background-color", "green");
	listaContainer.appendChild(this.listaMainDOM);

}

ns.Ui.prototype.uppdatera = function(platsArr){

	Skrivsalen.log("Uppdaterar Output.UI", "Output.UI");
	
	var platser = platsArr;

	var cols = platser.length;
	var rows = platser[0].length;
	//console.log("SKRIVSALEN: cols:"+cols+", rows:"+rows);

	Skrivsalen.UI.Factory.empty(this.kartaMainDOM);
	Skrivsalen.UI.Factory.empty(this.listaMainDOM);

	var table = this._getTableDOM();

	//var table = document.createElement("table");
	var cellWidth = Math.floor((1/cols)*100); // i %
	//console.log(cols);
	//console.log(1/cols);
	//console.log((1/cols)*100);
	//console.log(cellWidth);

	for(var row = 0; row < rows; row++){
		//var tr = document.createElement("tr");
		var kartRow = document.createElement("div");
		$(kartRow).attr("class", "kart-rad");

		for(var col = 0; col < cols; col ++){
				// TODO rita med div width % och diplay table-cell
				//console.log(this.platser[col][row]);
				var plats = platser[col][row];
				
				kartRow.appendChild(plats.getKartaDOM(cellWidth));

				if(listDom = plats.getListaDOM()){
					table.appendChild(plats.getListaDOM());
				}
		}
		//var tr = document.createElement("tr");
		this.kartaMainDOM.appendChild(kartRow);
	}

	this.listaMainDOM.appendChild(table);

	//$('.tse-scrollable').TrackpadScrollEmulator('recalculate');

}

ns.Ui.prototype._getTableDOM = function(platsArr){
	var tableDom = document.createElement("table");
	$(tableDom).attr("class", "table table-striped table-condensed table-responsive");

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
