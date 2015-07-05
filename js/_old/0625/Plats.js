function Plats(num, width, bgColor, text){ // constructor

	this.num = num;

	this.width = width || 0;
	this.bgColor = bgColor || "#fff";
	this.text = text || "TOM";

	this.borderColor = "#000";
	this.textColor = "#fff";

}

Plats.prototype.getDOM = function(){
	var elem = document.createElement("td");
	if(this.width > 0){
		elem.width = this.width + "%";
	}
	elem.style.backgroundColor = this.bgColor;
	elem.style.color = this.textColor;

	elem.style.borderColor = this.borderColor;
	elem.style.borderStyle = "solid";
	elem.style.borderWidth = "1px";

	var p = document.createElement("p");
	p.innerHTML = this.text;

	elem.appendChild(p);

	return elem;
}

