var ns = Skrivsalen.createNamespace("Data");

ns.Grupp = function(){
	/** Beroende på olika importformat, så får namnet (och andra props) sättas med set-funktion */

	this.namn = "ospec";
	this.color = "#444444";
	this.studenter = [];
	this.id = this.namn;

	/**
	 * Markör att användas vid utplacering. Anger vid vilken student utplaceringslogiken befinner sig
	 * @type {Number}
	 */
	this.marker = 0;
	

	this.UI = new Skrivsalen.UI.Grupp(this);

	this.onchangeListeners = [];
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
	this.studenter.push(new Skrivsalen.Data.Student(fnamn, enamn, klass, this));
	/** Har ingen onChange-trigger här, då denna funktion bara ska användas "internt" vid import och inga enskilda uppdateringar av t.ex UI då behövs */
}

ns.Grupp.prototype.excludeStudent = function(studentId){
	for(var i = 0; i < this.studenter.length; i++){
		if(this.studenter[i].id == studentId){
			this.studenter[i].include = false; 
			/** triggar onChange */
			this._doOnChangeListeners();
			break;
		}
	}
}

ns.Grupp.prototype.getAntal = function(){
	return this.studenter.length;
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


