var ns = Skrivsalen.createNamespace("UI");

ns.Grupp = function(dataGruppObj){
	this.grupp = dataGruppObj;
}

ns.Grupp.prototype.getListitemDOM = function(){
	var conf = Skrivsalen.Config;
	var me = this;

	var base = document.createElement("li");
	$(base).attr("class", "list-group-item");

	var studentsButton = document.createElement("a");
	//$(studentsButton).attr("class", "badge");
	$(studentsButton).attr("href", "#");
	studentsButton = Skrivsalen.UI.Factory.addTooltip(studentsButton, "Redgiera studentlista");
	var studentsButtonIcon = document.createElement("img");
	$(studentsButtonIcon).attr("src", conf.gfx_file_gruppedit);
	$(studentsButton).on("click", function(ev){
		me.showEditModal(me);
	});
	studentsButton.appendChild(studentsButtonIcon);


	var removeButton = document.createElement("a");
	//$(removeButton).attr("class", "badge");
	$(removeButton).attr("href", "#");
	$(removeButton).attr("data-grupp", this.grupp.id);
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
	$(badge).text(this.grupp.getAntal());
	
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
ns.Grupp.prototype.getEditDOM = function(){
	var base = document.createElement("div");
	var titel = document.createElement("h2");
	titel.innerHTML = this.grupp.namn;
	base.appendChild(titel);

	var desc = document.createElement("div");
	var p1 = document.createElement("p");
	p1.innerHTML = "Markerade studenter tas med i skrivsalsplaceringen";
	var p2= document.createElement("p");
	p2.innerHTML = "Ta bort markeringen för de studenter som <strong>inte</strong> ska delta i placeringen";
	desc.appendChild(p1);
	desc.appendChild(p2);
	base.appendChild(desc);

	var tb = document.createElement("table");
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>Deltar</th><th>Namn</th><th>Klass</th>";
	tb.appendChild(tr);
	for(var i = 0; i < this.grupp.studenterAlla.length; i++){
		var student = this.grupp.studenterAlla[i];
		var tr = document.createElement("tr");
		
		var checkTd = document.createElement("td");
		var check = document.createElement("input");
		$(check).attr("type", "checkbox");
		$(check).attr("name", student.id);
		check.checked = student.include; 
		$(check).on("change", function(ev){
			Skrivsalen.debug("CHECKBOX ON CHANGE", "UI.Grupp:GetEditDOM");
			//console.log(ev);
			Skrivsalen.data.includeStudent(ev.target.name, ev.target.checked);
		});
		checkTd.appendChild(check);
		tr.appendChild(checkTd);

		var namnTd = document.createElement("td");
		$(namnTd).attr("class", "namn");
		namnTd.innerHTML = student.forNamn + " " +student.efterNamn;
		tr.appendChild(namnTd);

		var klassTd = document.createElement("td");
		$(klassTd).attr("class", "klass");
		klassTd.innerHTML = student.klass;
		tr.appendChild(klassTd);

		tb.appendChild(tr);

	}
	base.appendChild(tb);

	return base;
}

ns.Grupp.prototype.showEditModal = function(){
	m = new Skrivsalen.UI.Modal();
	m.showInfo("Redigare deltagande stundenter", this.getEditDOM());
}