function Karta(parent){

	this.parent = parent || null;

	this.rows = 10;
	this.cols = 10;

}

Karta.prototype.render = function(){
	if(this.parent === null){
		throw "Kartan har ingen DOM-förälder";
		return false;
	} 
	
	var elem = document.createElement("div");
	var name = "<h3>" + this.forNamn + this.efterNamn + "(" + this.prov + ")</h3>";
	var prov = "<p>prov: <strong>" + this.prov + "</strong></p>";

}
