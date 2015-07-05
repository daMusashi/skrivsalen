var ns = Skrivsalen.createNamespace("UI");

ns.Slider = function(rangeId, defaultValue, listener){ // range = inpute type=range, value = p-tagg lr liknande som visar värdet

	this.rangeDOM = document.getElementById(rangeId);

	this.valueDOM = Skrivsalen.UI.Slider.getLabelDOM(this.rangeDOM);

	this.rangeDOM.onmousemove = this._update;
	this.rangeDOM.onchange = function(ev){
		listener(ev.srcElement.value); // binder inte listener till this då det är ett annat här
	};

	this.set(defaultValue);

	this.onChange = null;
}

// static
ns.Slider.getLabelDOM = function(rangeDOM){
	var labelId = rangeDOM.getAttribute("data-label");
	return document.getElementById(labelId);
}

ns.Slider.prototype._update = function(ev){
	ev = ev || null;
	if(ev){
		var label = Skrivsalen.UI.Slider.getLabelDOM(ev.srcElement);
		label.innerHTML = ev.srcElement.value;
	} else {
		this.valueDOM.innerHTML = this.rangeDOM.value;
	}
}

ns.Slider.prototype.get = function(){
	return this.rangeDOM.value;
}

ns.Slider.prototype.set = function(val){
	this.rangeDOM.value = val;
	this._update();
}
