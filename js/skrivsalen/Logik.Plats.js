var ns = Skrivsalen.createNamespace("Logik"); 

ns.Plats = function(num, row, col, student){ // constructor

	this.num = num;
	this.row = row;
	this.col = col;

	this.student = student || null; // ingen estudent = tom plats

	this.UI = new Skrivsalen.UI.Plats(this);
}

ns.Plats.prototype.getKartaDOM = function(width){
	return this.UI.getKartDOM(width);
}

ns.Plats.prototype.getListaDOM = function(){
	return this.UI.getListDOM();
}


