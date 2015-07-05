var ns = Skrivsalen.createNamespace("UI");

ns.GruppEditList = function(container, dataObj){
	this.container = container;
	this.data = dataObj;
	
	this.listDOM = document.createElement("ul");
	$(this.listDOM).attr("class", "list-group");

	this.container.appendChild(this.listDOM);
}

ns.GruppEditList.prototype.uppdatera = function(){
	console.log(this);

	for(var i = 0; i < this.data.grupper.length; i++){
		var grupp = this.data.grupper[i];
		grupp.setColor(Skrivsalen.Config.grupp_colors[i]);
		this.listDOM.appendChild(grupp.getListitemDOM());
	}

	
	
}

