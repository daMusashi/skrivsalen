var ns = Skrivsalen.createNamespace("UI"); 

ns.Plats = function(logikPlatsObj){ // constructor

	this.plats = logikPlatsObj;

}

ns.Plats.prototype.getKartDOM = function(widthProcent){
	
	var base = document.createElement("div");
	$(base).attr("class", "plats-wrapper");
	$(base).width(widthProcent+"%");
	$(base).css("display", "inline-block");

	var plats = document.createElement("div");
	base.appendChild(plats);

	$(plats).attr("class", "plats");
	$(plats).css("margin", "3%");
	if(this.plats.student){
		var color = this.plats.student.grupp.getColor();
		$(plats).css("background-color", color);

		$(plats).attr("title", this.plats.student.grupp.namn);
		var namnklass = this.plats.student.namn + " ("+this.plats.student.klass+")";
		$(plats).attr("data-content", namnklass);
		$(plats).attr("data-toggle", "popover");
		$(plats).attr("data-placement", "top");
		$(plats).popover({
			trigger: "hover",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 style="background-color:'+color+'" class="popover-title"></h3><div class="popover-content"></div></div>'
		});
		$(plats).css("cursor", "pointer");

	} else {
		$(plats).css("background-color", "#666");
		$(plats).attr("data-content", "Platsen är TOM");
	}
	

	var num = document.createElement("div");
	$(num).attr("class", "num");
	var badge = document.createElement("span");
	$(badge).attr("class", "badge");
	badge.innerHTML = this.plats.num;
	num.appendChild(badge);
	plats.appendChild(num);

	if(this.plats.student){
		//console.log(this.plats.student);

		/*
		FYTTAT TILL POPOVER 
		TODO Aktivera vid plats

		var namn = document.createElement("h4");
		$(namn).attr("class", "namn");
		namn.innerHTML = this.plats.student.namn;
		plats.appendChild(namn);

		var grupp = document.createElement("p");
		$(grupp).attr("class", "grupp");
		grupp.innerHTML = this.plats.student.grupp.namn;
		plats.appendChild(grupp);
		*/

	}


	return base;
}

ns.Plats.prototype.getListDOM = function(){
	
	var base;

	//console.log(this.plats);

	if(this.plats.student){
		base = document.createElement("tr");

		// placerings num
		var numTd = document.createElement("td");
		$(numTd).attr("class", "plats");
		$(numTd).text(this.plats.num);

		// namn
		var namnTd = document.createElement("td");
		$(namnTd).attr("class", "namn");
		$(namnTd).text(this.plats.student.namn);

		// grupp
		var gruppTd = document.createElement("td");
		$(gruppTd).attr("class", "grupp");
		$(gruppTd).text(this.plats.student.grupp.namn);

		// klass
		var klassTd = document.createElement("td");
		$(klassTd ).attr("class", "klass");
		$(klassTd ).text(this.plats.student.klass);

		base.appendChild(numTd);
		base.appendChild(namnTd);
		base.appendChild(gruppTd);
		base.appendChild(klassTd);

	} else {
		base = null;
	}

	return base;

}

