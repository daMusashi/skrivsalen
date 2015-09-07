var ns = Skrivsalen.createNamespace("Output"); 

ns.Utskrift = function(){

	Skrivsalen.log("Skapar Output.Utskrift..", "Output.Utskrift");

	var kartaContainer; // sätts i this._createMainDOM() nedan
	var listaContainer; // sätts i this._createMainDOM() nedan
	var mainDOM = this._createMainDOM();
	
}

ns.Utskrift.prototype.skrivut = function(platsArr){
	this._createContentDOM(platsArr);

	var h = parseInt($(window).height());
	var w = parseInt(0.72 * h); // aspect ration för A4


	var doc = window.open("", "utskrift", "width="+w+", height="+h);
	doc.document.title("SKRIVSALEN > Utskrift");
	doc.document.write(this.mainDOM.toString());
}

ns.Utskrift.prototype._createContentDOM = function(platsArr){

	Skrivsalen.log("Uppdaterar Output.Utskrift", "Output.Utskrift");
	
	var platser = platsArr;

	var cols = platser.length;
	var rows = platser[0].length;
	//console.log("SKRIVSALEN: cols:"+cols+", rows:"+rows);

	Skrivsalen.UI.Factory.empty(this.contentContainer);

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
		this.kartaContainer.appendChild(kartRow);
	}

	this.listaContainer.appendChild(table);
}

ns.Utskrift.prototype._getTableDOM = function(platsArr){
	var tableDom = document.createElement("table");

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

ns.Utskrift.prototype._createMainDOM = function(){
	this.mainDOM = document.createElement("html");
	var head = document.createElement("head");
	var body = document.createElement("body");

	this.mainDOM.appendChild(head);
	this.mainDOM.appendChild(body);


	// body
	$(body).attr("class", "utskrift");

	var bodyHeadDiv = document.createElement("div");
	$(bodyHeadDiv).attr("id", "head");
	var bodyHeadDiv.innerHTML = '
		<h1>Placeringslista</h1>
		<p>Placeringar för XYXYXY</p>
	';

	this.contentContainer = document.createElement("div");
	$(this.contentContainer).attr("id", "content");


	body.appendChild(bodyHeadDiv);
	body.appendChild(this.contentContainer);
}
