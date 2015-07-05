var ns = Skrivsalen.createNamespace("Data");

ns.Grupp = function(gruppnamn){
	this.namn = gruppnamn;
	this.studenter = [];

	this.UI = new Skrivsalen.UI.Grupp(this);
}

ns.Grupp.prototype.addStudent = function(fnamn, enamn, klass){
	this.studenter.push(new Skrivsalen.Data.Student(fnamn, enamn, klass, this));
}

ns.Grupp.prototype.getAntal = function(){
	return this.studenter.length;
}

ns.Grupp.prototype.getListitemDOM = function(color){
	return this.UI.getListitemDOM(color);
}

ns.Grupp.prototype.setColor = function(color){
	this.UI.color = color;
}

ns.Grupp.prototype.getColor = function(){
	return this.UI.color;
}


