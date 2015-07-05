var ns = Skrivsalen.createNamespace("Logik"); 

ns.Placeringar = function(rows, cols, dataObj){

	var conf = Skrivsalen.Config;

	var me = this;

	this.data = dataObj;

	this.data.onchangeListener = function(){
		console.log(me);
		me.uppdatera();
	}

	this.rows = rows; // Y
	this.cols = cols; // X

	this.rowsUI = new Skrivsalen.UI.Slider(conf.domId_sliderRows, this.rows, function(val){
		me.setRows(val);
	});
	this.colsUI = new Skrivsalen.UI.Slider(conf.domId_sliderCols, this.cols, function(val){
		me.setCols(val);
	});

	this.platser = [];
	this._resetPlatser();

	this.karta = new Skrivsalen.UI.Karta();

	this.uppdatera();

}

ns.Placeringar.prototype.uppdatera = function(){
	console.log("SKRIVSALEN: Uppdaterar placeringar...");
	console.log(this);
	// ALGORITM
	// * Ta fram vilka platser som ska användas av de tillgngängliga
	// * - Få fram bästa spridningen, där avstånd i sidled (mellan kolumner) prioriteras
	// * - - Spridningen ges en colStep och rowStep (hur många som kan "hoppas över")
	// * - Spridningen räknas om till en lista med koordinater?
	// * Placera ut elever på platser-som-ska-användas (koordinaterna?)
	// * - Elever i samma grupp så långt ifrån varandra som möjligt.
	// * - - Placera ut i kolumner, varva en från varje grupp
	// * - - Vid ny kolumn, kolla 1:a förgående kolumna samma grupp
	// * - - - I så fall hoppa till nästa grupp
	// ** Någon algoritm behövs så att t.ex 1 stor grupp, 2 små, den stora placeras varann, mellan de små
	
	this._resetPlatser();

	var antalStudenter = this.data.getAntalStudenter();

	if(antalStudenter > 0){
		
		// Platser som beBästa spridningen på 
		var math = new Skrivsalen.Logik.PlatsMath(this.rows, this.cols, antalStudenter);

		try {
			var steps = math.getBestStep();
			//console.log("Placeringar: resultat-steps");
			//console.log(steps);
		} catch (err){
			//console.log(err);
			throw err.message;
			return false;
		}

		// fyll på med elever
		console.log("Placeringar: Placerar ut elever...");
		//console.log(this);
		index = 0;
		for(var col = 0; col < this.cols; col += steps.colStep){
			for(var row = 0; row < this.rows; row += steps.rowStep){
				if(index < antalStudenter){
					//console.log(this.platser);
					console.log("Placeringar: fyller elev på col:"+col+", row:"+row);
					//console.log(this.platser[col][row]);
					this.platser[col][row].student = this.data.studenter[index];
					index++;
				}
			}
		}
		
		
	} else {
		console.log("SKRIVSALEN: ...inga studenter än :(");
	}

	this.karta.uppdatera(this.platser);
}

ns.Placeringar.prototype.setRows = function(val){
	this.rows = val;
	console.log("Placeringar >> Rader satt till: "+ this.rows);
	this.uppdatera();
}

ns.Placeringar.prototype.setCols = function(val){
	this.cols = val;
	console.log("Placeringar >> Kolumner satt till: "+ this.cols);
	this.uppdatera();
}

ns.Placeringar.prototype._resetPlatser = function(){
	this.platser = [];

	var index = 1;
	for(var col = 0; col < this.cols; col++){
		this.platser[col] = [];
		for(var row = 0; row < this.rows; row++){
			//console.log("Placeringar: skapar plats på col:"+col+", row:"+row);
			this.platser[col][row] = new Skrivsalen.Logik.Plats(index, row, col);
			//console.log(this.platser[col][row]);
			index++;
		}
	}
}
