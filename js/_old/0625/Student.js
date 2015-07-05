function Student(fornamn, efternamn, klass, include){

	this.forNamn = fornamn || "";
	this.efterNamn = efternamn || "";
	this.klass = klass || "";
	this.include =  include || true; // om studenten ska tas med beräkningen/delta i skrivningen

	this.prov = "";
}

Student.prototype.render = function(){
	var elem = document.createElement("div");
	var name = "<h3>" + this.forNamn + this.efterNamn + "(" + this.prov + ")</h3>";
	var prov = "<p>prov: <strong>" + this.prov + "</strong></p>";
}

Student.prototype.getTrDOM = function(){
	var elem = document.createElement("tr");
	elem.innerHTML = "<td class=\"namn\">"+this.forNamn + " " +this.efterNamn+"</td><td class=\"klass\">"+this.klass+"</td>";

	return elem;
}