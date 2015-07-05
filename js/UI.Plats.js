var ns = Skrivsalen.createNamespace("UI"); 

ns.Plats = function(logikPlatsObj){ // constructor

	this.plats = logikPlatsObj;

}

ns.Plats.prototype.getDOM = function(widthProcent){
	
	var base = document.createElement("div");
	$(base).attr("class", "plats-wrapper");
	$(base).width(widthProcent+"%");
	$(base).css("display", "inline-block");

	var plats = document.createElement("div");
	$(plats).attr("class", "plats");
	$(plats).css("margin", "3%");
	if(this.plats.student){
		var color = this.plats.student.grupp.getColor();
		$(plats).css("background-color", color);

		$(plats).attr("title", this.plats.student.grupp.namn);
		var namnklass = this.plats.student.namn + " ("+this.plats.student.klass+")";
		$(plats).attr("data-content", namnklass);

	} else {
		$(plats).css("background-color", "#666");
		$(plats).attr("data-content", "Platsen är TOM");
	}
	base.appendChild(plats);

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

