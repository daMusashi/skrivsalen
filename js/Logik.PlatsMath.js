var ns = Skrivsalen.createNamespace("Logik");

ns.PlatsMath = function(rows, cols, antalStudenter){
	this.rows = rows;
	this.cols = cols;
	this.platser = this.rows * this.cols;
	this.studenter = antalStudenter;

}

ns.PlatsMath.prototype.getBestStep = function(){
	// öka stegvis row- och colStep tills bäst fyllnad
	// ALGORITM
	// * Se hur många kolumner som behövs (colsNeeded)
	// * Skapa colStep (steg mellan fyllda kolumner) ab colsNedded
	// * Om colStep > 2 (mer än varannan)
	// * - prova om rowStep 2 funkar med colStep 2 (varannan rad)
	// ...
	// NYTT!! PROVA ATT BARA KÖRA BEST SPREAD REKURSIV MED START COLSTEP=1 ROWSTEP=1, med COLSTEP++ FÖRST
	// ...gör anpassningar för att fylla tomt i slutet i placeringar/när elever placeras ut?
	
	var steps = new Skrivsalen.Logik.PlatsMath.Steps();

	// Prioriterar luft mellan kolumner
	var colsNeeded = Math.ceil(this.studenter / this.rows);
	if(colsNeeded > this.cols){
		throw "För få platser!";
		return false;
	}

	steps.colStep = Math.floor(this.cols / colsNeeded); // minimum
	steps.rowStep = 1;
	steps.lastGood = new Skrivsalen.Logik.PlatsMath.Steps(steps.rowStep, steps.colStep);

	//console.log("PlatsMath: INNAN recirsive...");
	//console.log(steps);
	this._getBestStepRecursive(steps);
	//console.log("PlatsMath: EFTER recirsive...");
	//console.log(steps);
	return steps.lastGood;
}

ns.PlatsMath.prototype._getBestStepRecursive = function(steps){
	if(this._isStepSolutionValid(steps)){
		// i början cols redan ok, börjar därför rekurivt med rows
		//console.log(steps);
		// en "växel" som ökar step för row/col varannan gång
		// från är början cols ok (framräknad då prioriterad), börjar därför med rows
		if(steps.lastGood.rowStep == steps.rowStep){
			steps.lastGood.colStep = steps.colStep;
			steps.rowStep++;
		} else {
			steps.lastGood.rowStep = steps.rowStep;
			steps.colStep++;
		}
		this._getBestStepRecursive(steps);
	} else {
		console.log("PlatsMath: returnerar last good step...");
		console.log(steps.lastGood);
		return true;
	}
}

ns.PlatsMath.prototype._isStepSolutionValid = function(steps){
	var usedRows = Math.floor(this.rows/steps.rowStep);
	var usedCols = Math.floor(this.cols/steps.colStep);

	var usedPlatser = usedRows * usedCols;
	console.log("validering--");
	console.log(steps);
	console.log("usedPlatser/skrivsalsplatser "+usedPlatser+"/"+this.platser);
	console.log("usedPlatser/studenter "+usedPlatser+"/"+this.studenter);
	if((usedPlatser > this.studenter)&&(usedPlatser < this.platser)){
		console.log("valid");
		return true;
	} else {
		console.log("INTE valid");
		return false;
	}
}

ns.PlatsMath.Steps = function(rowStep, colStep){
	this.rowStep = rowStep || 1;
	this.colStep = colStep || 1;

	this.lastGood = null;
}