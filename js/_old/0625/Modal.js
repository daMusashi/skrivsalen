function Modal(){
	this.id = "skrivsalen-modal";
	this.container = document.getElementById("modal");
	

	this.DOM = document.createElement("div");
	$(this.DOM).attr("class", "modal fade");
	$(this.DOM).attr("id", this.id);
	$(this.DOM).attr("role", "dialog");
	$(this.DOM).attr("aria-labelledby", "skrivsalenModalLabel");

	var innerBase = document.createElement("div");
	$(innerBase).attr("class", "modal-dialog");
	$(innerBase).attr("role", "document");
	$(innerBase).attr("id", this.id+"-base");

	this.contentDOM = document.createElement("div");
	$(this.contentDOM).attr("class", "modal-content");
	$(this.contentDOM).attr("id", this.id+"-content");

	innerBase.appendChild(this.contentDOM);
	this.DOM.appendChild(innerBase);
}

Modal.prototype.showInfo = function(titel, content){
	titel = titel || false;

	if(titel){
		this._addHeader(titel);
	}
	this._addBody(content);
	this._addFooter("Stäng");
	
	this.contentDOM.className = this.contentDOM.className + " info";

	this._addModalToPage();

	$("#"+this.id).modal('show');
}

Modal.prototype.showWarning = function(titel, content){
	titel = titel || false;

	if(titel){
		this._addHeader(titel);
	}
	this._addBody(content);
	this._addFooter("Ok");

	this.contentDOM.className = this.contentDOM.className + " warning";

	this._addModalToPage();

	$("#"+this.id).modal('show');
}

Modal.prototype.showError = function(titel, content){
	titel = titel || false;

	if(titel){
		this._addHeader(titel);
	}
	this._addBody(content);
	this._addFooter("Stäng");

	this.contentDOM.className = this.contentDOM.className + " error";

	this._addModalToPage();

	$("#"+this.id).modal('show');
}

Modal.prototype.showUnkownError = function(titel, errorEvent){
	titel = titel || false;

	if(titel){
		this._addHeader(titel);
	}
	
	var content = "<p>Ett okänt fel uppstod. Webbläsaren rapporterar:</p><pre>"+errorEvent.message+"</pre>";


	this._addBody(content);
	this._addFooter("Stäng");

	this.contentDOM.className = this.contentDOM.className + " error";

	this._addModalToPage();

	$("#"+this.id).modal('show');
}




Modal.prototype._addModalToPage = function(){
	this.container.innerHTML = "";
	this.container.appendChild(this.DOM);
}

Modal.prototype._addHeader = function(titel){
	var header = document.createElement("div");
	$(header).attr("class", "modal-header");

	var tl = document.createElement("h4");
	$(tl).attr("class", "modal-title");
	$(tl).attr("id", "skrivsalenModalLabel");
	tl.innerHTML = titel;

	header.appendChild(tl);

	this.contentDOM.appendChild(header);
}

Modal.prototype._addBody = function(content){
	var body = document.createElement("div");
	$(body).attr("class", "modal-body");
	if(typeof content === "string"){
		body.innerHTML = content;
	} else {
		body.appendChild(content);
	}

	this.contentDOM.appendChild(body);
}

Modal.prototype._addFooter = function(okLabel, cancelButton, cancelLabel){
	okLabel = okLabel || "Ok";
	cancelButton = cancelButton || false;
	cancelLabel = cancelLabel || "Avbryt";

	var footer = document.createElement("div");
	$(footer).attr("class", "modal-footer");

	var ok = document.createElement("button");
	$(okLabel).attr("type", "button");
	ok.innerHTML = okLabel;

	var cancel = document.createElement("button");
	$(cancel).attr("type", "button");
	cancel.innerHTML = cancelLabel;

	if(cancelButton){
		$(ok).attr("class", "btn btn-success");

		$(cancel).attr("class", "btn btn-warning");
		$(cancel).attr("data-dismiss", "modal");

		footer.appendChild(cancel);
		footer.appendChild(ok);
	} else {
		$(ok).attr("class", "btn btn-primary");
		$(ok).attr("data-dismiss", "modal");

		footer.appendChild(ok);
	}

	this.contentDOM.appendChild(footer);
}