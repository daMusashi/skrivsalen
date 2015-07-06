var ns = Skrivsalen.createNamespace("UI");

ns.Grupp = function(dataGruppObj){
	this.grupp = dataGruppObj;
}

ns.Grupp.prototype.getListitemDOM = function(){
	var conf = Skrivsalen.Config;

	var base = document.createElement("li");
	$(base).attr("class", "list-group-item");

	var studentsButton = document.createElement("a");
	//$(studentsButton).attr("class", "badge");
	$(studentsButton).attr("href", "#");
	studentsButton = Skrivsalen.UI.Factory.addTooltip(studentsButton, "Redgiera studentlista");
	var studentsButtonIcon = document.createElement("img");
	$(studentsButtonIcon).attr("src", conf.gfx_file_gruppedit);
	studentsButton.appendChild(studentsButtonIcon);


	var removeButton = document.createElement("a");
	//$(removeButton).attr("class", "badge");
	$(removeButton).attr("href", "#");
	$(removeButton).attr("data-grupp", this.grupp.namn);
	$(removeButton).on("click", function(ev){
		var gruppId = $(this).attr("data-grupp");
		Skrivsalen.data.removeGrupp(gruppId);
	});
	removeButton = Skrivsalen.UI.Factory.addTooltip(removeButton, "Ta bort undervisningsgrupp");
	var removeButtonIcon = document.createElement("img");
	$(removeButtonIcon).attr("src", conf.gfx_file_gruppdelete);
	removeButton.appendChild(removeButtonIcon);

	var namn = document.createElement("span");
	$(namn).attr("class", "namn");
	$(namn).text(this.grupp.namn);

	var badge = document.createElement("span");
	$(badge).attr("class", "badge");
	$(badge).text(this.grupp.studenter.length);
	
	base.appendChild(Skrivsalen.UI.Factory.getSelectGruppColorDOM(this.grupp));
	base.appendChild(studentsButton);
	base.appendChild(removeButton);
	base.appendChild(namn);
	base.appendChild(badge);
	
	return base;
}

/**
 * [getInfoDOM description]
 * @return {[type]} [description]
 */
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