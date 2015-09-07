var ns = Skrivsalen.createNamespace("Logik"); 

ns.Placeringar = function(rows, cols){

	var conf = Skrivsalen.Config;

	var me = this;

	Skrivsalen.data.addOnChangeListener(function(){
		Skrivsalen.debug("Data.Manager onChange-listener i Logik.Placeringar triggad", "Logik.Placeringar");
		me.uppdatera();
	});

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

	this.output = new Skrivsalen.Output.Ui();

	this.uppdatera();

}

ns.Placeringar.prototype.uppdatera = function(){
	Skrivsalen.log("Uppdaterar placeringar...", "Logik.Placeringar");

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

	var antalStudenter = Skrivsalen.data.getAntalStudenter();

	if(antalStudenter > 0){
		
		/* ta reda på platser att använda */
		var math = new Skrivsalen.Logik.PlatsMath(this.rows, this.cols, antalStudenter);

		try {
			//Skrivsalen.debug("Studenter:"+antalStudenter);
			var steps = math.getBestStep();
			//math.debug(steps, "main");
			//console.log("Placeringar: resultat-steps");
			//console.log(steps);
		} catch (err){
			//console.log(err);
			throw err.message;
			return false;
		}

		/* 
			steps baseras på kvadratisk form, om avlångt kan det gå att pressa ut fler rader/kolumner  
			testar att "pressa ut" ut fler cols resp rows
		*/
		//Skrivsalen.debug("Tar reda på vilka platser som ska användas...", "Logik.Placeringar");

		var testMoreColStep = steps.clone();
		//testMoreColStep.debug("testMoreColStep");
		Skrivsalen.debug(math.isStepSolutionValid(testMoreColStep));
		var i = -1;
		while(math.isStepSolutionValid(testMoreColStep)){
			testMoreColStep.colStep++;
			//math.debug(testMoreColStep, "testMoreColStep++");
			//testMoreColStep.debug("testMoreColStep++");
			i++;
		}
		if(i > 0){
			steps = testMoreColStep;
			//steps.debug("main MORE cols");
		}

		var testMoreRowStep = steps.clone();
		//testMoreRowStep.debug("testMoreRowStep");
		var i = -1;
		while(math.isStepSolutionValid(testMoreRowStep)){
			testMoreRowStep.rowStep++;
			//testMoreRowStep.debug("testMoreRowStep++");
			i++;
		}
		if(i > 0){
			steps = testMoreRowStep;
			//steps.debug("main MORE rowa");
		}
		//math.debug(steps, "END");

		/* Placerar ut elever på framtagna platser */
		//Skrivsalen.debug("Placerar ut elever...", "Logik.Placeringar");

		var studenter = new Skrivsalen.Logik.StudentManager(Skrivsalen.data.grupper);

		index = 0;
		var student;
		for(var col = 0; col < this.cols; col += steps.colStep){
			for(var row = 0; row < this.rows; row += steps.rowStep){
				if(student = studenter.getNext()){
					
					this.platser[col][row].student = student;
					
				} else {
					break;
				}
			}
		}
		
		
	} else {
		Skrivsalen.log("inga studenter än :(", "Logik.Placeringar");
	}

	this.output.uppdatera(this.platser);
}

ns.Placeringar.prototype.setRows = function(val){
	this.rows = val;
	Skrivsalen.debug("Placeringar >> Rader satt till: "+ this.rows, "Logik.Placeringar: setRows");
	this.uppdatera();
}

ns.Placeringar.prototype.setCols = function(val){
	this.cols = val;
	Skrivsalen.debug("Placeringar >> Kolumner satt till: "+ this.cols, "Logik.Placeringar: setRows");
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
