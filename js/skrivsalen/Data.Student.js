var ns = Skrivsalen.createNamespace("Data");

ns.Student = function(fornamn, efternamn, klass, gruppObj, include){

	this.forNamn = fornamn || "";
	this.efterNamn = efternamn || "";
	this.klass = klass || "";
	this.grupp = gruppObj || null;
	this.include =  include || true; // om studenten ska tas med beräkningen/delta i skrivningen

	this.namn = this.forNamn + " " + this.efterNamn;

	if(this.grupp){
		var grupp = this.grupp.id;
	} else {
		var grupp = "";
	}
	this.id = this.forNamn+"-"+this.efterNamn+"-"+this.klass+"-"+grupp;

	this.prov = "";
}

ns.Student.prototype.render = function(){
	var elem = document.createElement("div");
	var name = "<h3>" + this.forNamn + this.efterNamn + "(" + this.prov + ")</h3>";
	var prov = "<p>prov: <strong>" + this.prov + "</strong></p>";
}

ns.Student.prototype.getTrDOM = function(){
	var elem = document.createElement("tr");
	elem.innerHTML = "<td class=\"namn\">"+this.forNamn + " " +this.efterNamn+"</td><td class=\"klass\">"+this.klass+"</td>";

	return elem;
}
