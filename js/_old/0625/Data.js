function Data(editGrupperContainer){
	this.grupper = [];
	this.studenter = [];

	this.editGrupperContainer = editGrupperContainer;
	this.editGruperListDOM = this.get

	this.mapContainer = null;
	this.placeringslistaContainer = null;
}

Data.prototype.addGrupp = function(gruppObj){
	if((gruppObj == null)||(gruppObj.getAntal() == 0)){
		m = new Modal();
		m.showError("Gruppen importerades inte", "Något stämmer inte med strukturen på filen.");
	} else {
		this.grupper.push(gruppObj);
		this._generateStudentList();
		gruppObj.showEditModal();
	}
}

Data.prototype.getAntalGrupper = function(){
	return this.grupper.length;
}


Data.prototype.getAntalStudenter = function(){
	return this.studenter.length;
}

// tömmer och (åter)genererar den platta listan med studenter
// Kör efter tillagd eller borttagen grupp
Data.prototype._generateStudentList = function(){
	this.studenter = [];
	this.grupper.forEach(function(grupp){
		grupp.studenter.forEach(function(student){
			if(student.include){
				this.studenter.push(student);
			}
		}, this);
	}, this); // skickar med dataObj som går att använda som this i forEach 
}

Data.prototype.getEditGruppListDOM = function(){
	var base = document.createElement("ul");
	$(base).attr("class", "list-group");

	this.grupper.forEach(function(grupp){
		grupp.appendEditGruppListLiDOM(base);
	});

	return base;
}


Data.prototype.import = function(file){
	var imp = new Import(file, this);
}
