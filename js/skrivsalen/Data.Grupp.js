var ns = Skrivsalen.createNamespace("Data");

ns.Grupp = function(){
	/** Beroende på olika importformat, så får namnet (och andra props) sättas med set-funktion */

	this.namn = "ospec";
	this.color = "#444444";
	this.studenterAlla = [];
	this.studenter = []; // genereras, bara stunder med includeed = true
	this.id = this.namn;

	/**
	 * Markör att användas vid utplacering. Anger vid vilken student utplaceringslogiken befinner sig
	 * @type {Number}
	 */
	this.marker = 0;
	

	this.UI = new Skrivsalen.UI.Grupp(this);

	this.onchangeListeners = [];
}

ns.Grupp.prototype.uppdatera = function(){
	this._genIncludedList();
	
	Skrivsalen.debug("Uppdaterat grupp "+this.namn+": elever "+this.getAntal()+" (alla "+this.getAntalAlla()+")", "Data.Grupp");
	this._doOnChangeListeners();
}

ns.Grupp.prototype._genIncludedList = function(){
	this.studenter = [];
	for(var i = 0; i < this.studenterAlla.length; i++){
		if(this.studenterAlla[i].include){
			this.studenter.push(this.studenterAlla[i]); 
		}
	}

}

ns.Grupp.prototype.setNamn = function(namn){
	this.namn = namn;
	this.id = this.namn.replace(/\//g, "-");
	//Skrivsalen.debug("Namngivit gruppen "+this.namn+ " med id "+this.id, "Data.Grupp");
}

ns.Grupp.prototype.addOnChangeListener = function(listener){
	this.onchangeListeners.push(listener);
}

ns.Grupp.prototype._doOnChangeListeners = function(){
	for(var i = 0; i < this.onchangeListeners.length; i++){
		this.onchangeListeners[i]();
	}
}

ns.Grupp.prototype.addStudent = function(fnamn, enamn, klass){
	this.studenterAlla.push(new Skrivsalen.Data.Student(fnamn, enamn, klass, this));
	this.uppdatera();
	/** Har ingen onChange-trigger här, då denna funktion bara ska användas "internt" vid import och inga enskilda uppdateringar av t.ex UI då behövs */
}

ns.Grupp.prototype.setStudentInclude = function(studentId, include){
	for(var i = 0; i < this.studenterAlla.length; i++){
		if(this.studenterAlla[i].id == studentId){
			this.studenterAlla[i].include = include; 
			/** triggar onChange */
			
			break;
		}
	}
	this.uppdatera();
	this._doOnChangeListeners();
}

ns.Grupp.prototype.getAntalAlla = function(){
	return this.studenterAlla.length;
}

ns.Grupp.prototype.getAntal = function(){
	return this.studenter.length;
}

ns.Grupp.prototype.getNext = function(){
	//Skrivsalen.debug("marker: "+this.marker+" antal(alla):"+this.getAntalAlla(), "Data.Grupp");
	
	if(this.marker >= this.getAntal()){
		return false;
	}
	var student = this.studenter[this.marker];
	//Skrivsalen.debug("student", "Data.Grupp");
	//console.log(student);
	this.marker++;

	return student;
}

ns.Grupp.prototype.getListitemDOM = function(color){
	return this.UI.getListitemDOM(color);
}

ns.Grupp.prototype.setColor = function(color){
	this.color = color;
	/** triggar onChange */
	this._doOnChangeListeners();
}

ns.Grupp.prototype.getColor = function(){
	return this.color;
}


