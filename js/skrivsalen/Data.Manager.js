var ns = Skrivsalen.createNamespace("Data"); 

ns.Manager = function(editGrupperContainer){
	this.grupper = [];
	this.studenter = []; // generas av grupperna

	this.onchangeListeners = [];
}

ns.Manager.prototype.addOnChangeListener = function(listener){
	this.onchangeListeners.push(listener);
}

ns.Manager.prototype._doOnChangeListeners = function(){
	for(var i = 0; i < this.onchangeListeners.length; i++){
		this.onchangeListeners[i]();
	}
}

/*
ns.Manager.prototype.addOnChangeListener = function(listenerName, sourceObj){
	this.onchangeListeners.push({functionName: listener, source: sourceObj});
}

ns.Manager.prototype._doOnChangeListeners = function(){
	for(var i = 0; i < this.onchangeListeners.length; i++){
		var listener = this.onchangeListeners[i];
		listener.source[listener.functionName]();
	}
}
*/

ns.Manager.prototype.addGrupp = function(gruppObj){
	if((gruppObj == null)||(gruppObj.getAntal() == 0)){
		m = new Skrivsalen.UI.Modal();
		m.showError("Gruppen importerades inte", "Något stämmer inte med strukturen på filen.");
	} else {
		var me = this;
		gruppObj.setColor(Skrivsalen.Config.grupp_colors[this.grupper.length]); // borde inte trigga uppdatering, då listeners läggs till först nedan
		gruppObj.addOnChangeListener(function(){ // triggar onChange om gruppens data ändras
			Skrivsalen.debug("Data.Grupp onChange-listener i Data.Manager triggad", "Data.Manager");
			me._doOnChangeListeners();
		}); 

		this.grupper.push(gruppObj);
		this._generateStudentList();

		this._doOnChangeListeners();
	}
}

ns.Manager.prototype.removeGrupp = function(gruppId){

	for(var i = 0; i < this.grupper.length; i++){
		if(this.grupper[i].id == gruppId){
			this.grupper.splice(i, 1);
			Skrivsalen.debug("tar bort grupp "+gruppId+" (index "+i+")", "Data.Manager: removegrupp");
			break;
		}
	}
	this._generateStudentList();

	this._doOnChangeListeners();
}

ns.Manager.prototype.includeStudent = function(studentId, isIncluded){
	Skrivsalen.debug("SSka sätta include på student "+studentId+" till "+isIncluded, "Data.Manager:includeStudent")
	console.log(this.studenter);
	for(var i = 0; i < this.studenter.length; i++){
		if(this.studenter[i].id == studentId){
			this.studenter[i].include = isIncluded;
			Skrivsalen.debug("OK!", "Data.Manager:includeStudent");
			this.studenter[i].grupp.uppdatera();
			
			break;
		}
	}
	//this._generateStudentList();

	this._doOnChangeListeners();
}

ns.Manager.prototype.getAntalGrupper = function(){
	return this.grupper.length;
}


ns.Manager.prototype.getAntalStudenter = function(){
	var antal = 0;
	for(var i = 0; i < this.studenter.length; i++){
		if(this.studenter[i].include){
			antal++;
		}
	}
	return antal;
}

ns.Manager.prototype.getAntalAllaStudenter = function(){
	return this.studenter.length;
}

// tömmer och (åter)genererar den platta listan med studenter
// Kör efter tillagd eller borttagen grupp
ns.Manager.prototype._generateStudentList = function(){
	this.studenter = [];
	this.grupper.forEach(function(grupp){
		grupp.studenter.forEach(function(student){
			//if(student.include){
				this.studenter.push(student);
			//}
		}, this);
	}, this); // skickar med dataObj som går att använda som this i forEach 
}


ns.Manager.prototype.import = function(file){
	var imp = new Skrivsalen.Importer.Import(file, this);
}
