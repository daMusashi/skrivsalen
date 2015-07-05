var ns = Skrivsalen.createNamespace("Data"); 

ns.Manager = function(editGrupperContainer){
	this.grupper = [];
	this.studenter = [];

	this.gruppUI = new Skrivsalen.UI.GruppEditList(document.getElementById(Skrivsalen.Config.domId_editGruppListContainer), this);

	this.onchangeListener = null;
}

ns.Manager.prototype.addGrupp = function(gruppObj){
	if((gruppObj == null)||(gruppObj.getAntal() == 0)){
		m = new Skrivsalen.UI.Modal();
		m.showError("Gruppen importerades inte", "Något stämmer inte med strukturen på filen.");
	} else {
		this.grupper.push(gruppObj);
		this._generateStudentList();
		this.gruppUI.uppdatera();
		//gruppObj.showEditModal();
		if(this.onchangeListener){
			this.onchangeListener();
		}
	}
}

ns.Manager.prototype.getAntalGrupper = function(){
	return this.grupper.length;
}


ns.Manager.prototype.getAntalStudenter = function(){
	return this.studenter.length;
}

// tömmer och (åter)genererar den platta listan med studenter
// Kör efter tillagd eller borttagen grupp
ns.Manager.prototype._generateStudentList = function(){
	this.studenter = [];
	this.grupper.forEach(function(grupp){
		grupp.studenter.forEach(function(student){
			if(student.include){
				this.studenter.push(student);
			}
		}, this);
	}, this); // skickar med dataObj som går att använda som this i forEach 
}


ns.Manager.prototype.import = function(file){
	var imp = new Skrivsalen.Importer.Import(file, this);
}
