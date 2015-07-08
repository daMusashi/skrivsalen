var ns = Skrivsalen.createNamespace("UI"); 

ns.Karta = function(platserArr){

	Skrivsalen.log("Skapar karta..", "UI.Karta");

	var container = document.getElementById(Skrivsalen.Config.domId_karta_container);
	
	this.mainDOM = document.createElement("div");
	$(this.mainDOM).attr("id", Skrivsalen.Config.domId_karta);
	//$(this.mainDOM).css("background-color", "green");
	container.appendChild(this.mainDOM);

}

ns.Karta.prototype.uppdatera = function(platsArr){
	Skrivsalen.log("Uppdaterar karta..", "UI.Karta");
	
	var platser = platsArr;

	var cols = platser.length;
	var rows = platser[0].length;
	//console.log("SKRIVSALEN: cols:"+cols+", rows:"+rows);

	Skrivsalen.UI.Factory.empty(this.mainDOM);

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
				kartRow.appendChild(platser[col][row].getKartaDOM(cellWidth));
		}
		//var tr = document.createElement("tr");
		this.mainDOM.appendChild(kartRow);
	}

	$('.tse-scrollable').TrackpadScrollEmulator('recalculate');
}
