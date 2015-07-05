function Grupp(gruppnamn){
	this.namn = gruppnamn;
	this.studenter = [];
}

Grupp.prototype.addStudent = function(fnamn, enamn, klass){
	this.studenter.push(new Student(fnamn, enamn, klass));
}

Grupp.prototype.getAntal = function(){
	return this.studenter.length;
}

Grupp.prototype.getInfoDOM = function(){
	var base = document.createElement("div");
	var titel = document.createElement("h2");
	titel.innerHTML = this.namn;
	base.appendChild(titel);

	var tb = document.createElement("table");
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>Namn</th><th>Klass</th>";
	tb.appendChild(tr);
	for(var i = 0; i < this.studenter.length; i++){
		tb.appendChild(this.studenter[i].getTrDOM());

	}
	base.appendChild(tb);

	return base;
}

Grupp.prototype.appendEditGruppListLiDOM = function(container){
	var base = document.createElement("li");
	$(base).attr("class", "list-group-item");
	$(base).text(this.namn);

	var badge = document.createElement("span");
	$(badge).attr("class", "badge");
	$(badge).text(this.studenter.length);

	var studentsButton = document.createElement("a");
	//$(studentsButton).attr("class", "badge");
	$(studentsButton).attr("href", "#");
	$(studentsButton).text("s");

	var removeButton = document.createElement("a");
	//$(removeButton).attr("class", "badge");
	$(removeButton).attr("href", "#");
	$(removeButton).text("r");

	base.appendChild(badge);
	base.appendChild(studentsButton);
	base.appendChild(removeButton);
	

	container.appendChild(base);
}

Grupp.prototype.showEditModal = function(){
	m = new Modal();
	m.showInfo("Importerad grupp", this.getInfoDOM());
}