var ns = Skrivsalen.createNamespace("Logik");

ns.PlatsMath = function(rows, cols, antalStudenter){
	this.rows = rows;
	this.cols = cols;
	this.platser = this.rows * this.cols;
	this.studenter = antalStudenter;

}

ns.PlatsMath.prototype.getBestStep = function(stepObj){
	// öka stegvis row- och colStep tills bäst fyllnad
	// ALGORITM
	// * Se hur många kolumner som behövs (colsNeeded)
	// * Skapa colStep (steg mellan fyllda kolumner) ab colsNedded
	// * Om colStep > 2 (mer än varannan)
	// * - prova om rowStep 2 funkar med colStep 2 (varannan rad)
	// ...
	// NYTT!! PROVA ATT BARA KÖRA BEST SPREAD REKURSIV MED START COLSTEP=1 ROWSTEP=1, med COLSTEP++ FÖRST
	// ...gör anpassningar för att fylla tomt i slutet i placeringar/när elever placeras ut?
	
	var steps = stepObj || new Skrivsalen.Logik.PlatsMath.Steps();

	// Prioriterar luft mellan kolumner
	var colsNeeded = Math.ceil(this.studenter / this.rows);
	if(colsNeeded > this.cols){
		throw "För få platser!";
		return false;
	}

	steps.colStep = Math.floor(this.cols / colsNeeded); // minimum
	if(steps.colStep > 2){
		steps.colStep = 2;
		steps.rowStep = 2;
	} else {
		steps.colStep = 1;
		steps.rowStep = 1;
	}
	
	steps.lastGood = new Skrivsalen.Logik.PlatsMath.Steps(steps.rowStep, steps.colStep);

	//console.log("PlatsMath: INNAN recirsive...");
	//console.log(steps);
	this._getBestStepRecursive(steps);
	//console.log("PlatsMath: EFTER recirsive...");
	//console.log(steps);
	return steps.lastGood;
}

ns.PlatsMath.prototype._getBestStepRecursive = function(steps){
	if(this.isStepSolutionValid(steps)){
		// prioriterar colstep
		if(steps.lastGood.colStep == steps.colStep){
			steps.lastGood.rowStep = steps.rowStep;
			steps.colStep += steps.colIncrement;

			
		} else {
			steps.lastGood.colStep = steps.colStep;
			steps.rowStep += steps.rowIncrement;
		}
		this._getBestStepRecursive(steps);
	} else {
		//console.log("PlatsMath: returnerar last good step...");
		//console.log(steps.lastGood);
		return true;
	}
}

ns.PlatsMath.prototype.isStepSolutionValid = function(steps){
	var usedPlatser = this.getUsedPlatser(steps);
	//console.log("validering--");
	//console.log(steps);
	//console.log("usedPlatser/skrivsalsplatser "+usedPlatser+"/"+this.platser);
	//console.log("usedPlatser/studenter "+usedPlatser+"/"+this.studenter);
	if((usedPlatser >= this.studenter)&&(usedPlatser <= this.platser)){
		//console.log("valid");
		return true;
	} else {
		//console.log("INTE valid");
		return false;
	}
}

ns.PlatsMath.prototype.getUsedRows = function(steps){
	return Math.ceil(this.rows/steps.rowStep);
}

ns.PlatsMath.prototype.getUsedCols = function(steps){
	return Math.ceil(this.cols/steps.colStep);
}

ns.PlatsMath.prototype.getUsedPlatser = function(steps){
	return this.getUsedRows(steps) * this.getUsedCols(steps);
}

ns.PlatsMath.prototype.debug = function(steps, tag){
	var usedRows = Math.floor(this.rows/steps.rowStep);
	var usedCols = Math.floor(this.cols/steps.colStep);
	var usedPlatser = usedRows * usedCols;

	console.log("¤ MATH ¤ ["+tag+"] studenter:"+this.studenter+" platser:"+this.platser);
	console.log("¤ MATH ¤ ["+tag+"] colStep:"+steps.colStep +" rowStep:"+steps.rowStep);
	console.log("¤ MATH ¤ ["+tag+"] usedPlatser:"+this.getUsedPlatser(steps) +" (usedCols:"+this.getUsedCols(steps) +" usedRows:"+this.getUsedRows(steps)+")");
	console.log("¤ MATH ¤ ["+tag+"] valid:"+this.isStepSolutionValid(steps));
}

ns.PlatsMath.Steps = function(rowStep, colStep, rowIncrement, colIncrement){
	this.rowStep = rowStep || 1;
	this.colStep = colStep || 1;

	this.rowIncrement = rowIncrement || 1;
	this.colIncrement = colIncrement || 1;

	this.lastGood = null;
}

ns.PlatsMath.Steps.prototype.clone = function(){
	//console.log(this);
	var clone = new Skrivsalen.Logik.PlatsMath.Steps(this.rowStep, this.colStep);
	clone.lastGood = this.lastGood;

	return clone;
}

ns.PlatsMath.Steps.prototype.debug = function(stepNamn){
	console.log("¤ STEP ¤ ["+stepNamn+"] colStep:"+this.colStep +" rowStep:"+this.rowStep);
}