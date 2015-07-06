var ns = Skrivsalen.createNamespace("Logik");

/**
 * En iterator för studenterna i grupperna
 * Med getNextStudent plockas nästa relevanta student ut, enligt
 * - En från var grupp åt gången
 * 
 * @param {Array} gruppList Array av Data.Grupp-objekt
 */
ns.StudentManager = function(gruppList){
	/** Beroende på olika importformat, så får namnet (och andra props) sättas med set-funktion */

	this.grupper = gruppList.slice(); // slice skapar en klon av arrayn (objekten i den är dock fortfarande referenser)
	this.gruppMarker = 0; // Markör för aktuell grupp att plocka studenter ifrån

	// Flyttar alla gruppmarkörer (aktuell student) till början
	for(var i = 0; i < this.grupper.length; i++){
		this.grupper[i].marker = 0;
	}
}

ns.StudentManager.prototype.getNext = function(){
	if(this.grupper.length == 0){
		return false;
	}

	Skrivsalen.debug("grupper:"+this.grupper.length+" gruppMarkör:"+this.gruppMarker, "StudentManager");

	var grupp = this.grupper[this.gruppMarker];
	var antalStudenter = grupp.getAntal();
	
	var student = grupp.studenter[grupp.marker];
	grupp.marker++;
	if(grupp.marker >= antalStudenter){ // gruppen "tömd", ta bort
		this._removeGrupp(grupp.id);
	}

	if(this.gruppMarker < (this.grupper.length-1)){
		this.gruppMarker++;
	} else {
		this.gruppMarker = 0;
	}
	
	return student;
}

ns.StudentManager.prototype._removeGrupp = function(gruppId){

	for(var i = 0; i < this.grupper.length; i++){
		if(this.grupper[i].id == gruppId){
			this.grupper.splice(i, 1);
			Skrivsalen.debug("tar bort grupp "+gruppId+" (index "+i+")", "Logik.StudentManager: removegrupp");
			break;
		}
	}
}



