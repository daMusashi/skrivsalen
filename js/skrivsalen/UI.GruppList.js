var ns = Skrivsalen.createNamespace("UI");

ns.GruppList = function(container){
	this.container = container;
	
	this.listDOM = document.createElement("ul");
	$(this.listDOM).attr("class", "list-group");

	this.container.appendChild(this.listDOM);

	var me = this;

	//console.log(Skrivsalen.data);

	Skrivsalen.data.addOnChangeListener(function(){
		me.uppdatera();
	});
}

ns.GruppList.prototype.uppdatera = function(){
	Skrivsalen.debug("Uppdaterar grupplista...", "UI.GruppList");

	Skrivsalen.UI.Factory.empty(this.listDOM);

	for(var i = 0; i < Skrivsalen.data.grupper.length; i++){
		var grupp = Skrivsalen.data.grupper[i];
		this.listDOM.appendChild(grupp.getListitemDOM());
	}

	
	
}

