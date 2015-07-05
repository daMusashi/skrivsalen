var ns = Skrivsalen.createNamespace("UI");

ns.Grupp = function(dataGruppObj){
	this.grupp = dataGruppObj;
	this.color = "pink";
}

ns.Grupp.prototype.getListitemDOM = function(){
	var base = document.createElement("li");
	$(base).attr("class", "list-group-item");

	var color = document.createElement("input");
	$(color).attr("type", "color");
	$(color).attr("name", "color-"+this.grupp.namn);
	$(color).attr("value", this.color);

	var studentsButton = document.createElement("a");
	//$(studentsButton).attr("class", "badge");
	$(studentsButton).attr("href", "#");
	$(studentsButton).text("s");

	var removeButton = document.createElement("a");
	//$(removeButton).attr("class", "badge");
	$(removeButton).attr("href", "#");
	$(removeButton).text("r");

	var namn = document.createElement("span");
	$(namn).attr("class", "namn");
	$(namn).text(this.grupp.namn);

	var badge = document.createElement("span");
	$(badge).attr("class", "badge");
	$(badge).text(this.grupp.studenter.length);
	
	base.appendChild(color);
	base.appendChild(studentsButton);
	base.appendChild(removeButton);
	base.appendChild(namn);
	base.appendChild(badge);
	
	return base;
}

ns.Grupp.prototype.getInfoDOM = function(){
	var base = document.createElement("div");
	var titel = document.createElement("h2");
	titel.innerHTML = this.namn;
	base.appendChild(titel);

	var tb = document.createElement("table");
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>Namn</th><th>Klass</th>";
	tb.appendChild(tr);
	for(var i = 0; i < this.grupp.studenter.length; i++){
		tb.appendChild(this.grupp.studenter[i].getTrDOM());

	}
	base.appendChild(tb);

	return base;
}

ns.Grupp.prototype.showEditModal = function(){
	m = new Skrivsalen.UI.Modal();
	m.showInfo("Importerad grupp", this.getInfoDOM());
}