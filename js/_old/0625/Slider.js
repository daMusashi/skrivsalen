function Slider(rangeId, defaultValue){ // range = inpute type=range, value = p-tagg lr liknande som visar värdet

	this.rangeDOM = document.getElementById(rangeId);
	this.valueDOM = Slider.getLabelDOM(this.rangeDOM);

	this.rangeDOM.onmousemove = this.update;


	//this.rangeDOM.value = defaultValue;
	//this.valueDOM.innerHTML = defaultValue;
	
	this.set(defaultValue);

	this.onChange = null;
}

// static
Slider.getLabelDOM = function(rangeDOM){
	var labelId = rangeDOM.getAttribute("data-label");
	return document.getElementById(labelId);
}

// non static
Slider.prototype.update = function(ev){
	ev = ev || null;
	if(ev){
		var label = Slider.getLabelDOM(ev.srcElement);
		label.innerHTML = ev.srcElement.value;
	} else {
		this.valueDOM.innerHTML = this.rangeDOM.value;
	}
}

Slider.prototype.get = function(){
	return this.rangeDOM.value;
}

Slider.prototype.set = function(val){
	this.rangeDOM.value = val;
	this.update();
}

Slider.prototype.setOnChangeListener = function(listener){
	this.rangeDOM.onchange = function(ev){
		//console.log(ev);
		listener(ev.srcElement.value);
	};
}