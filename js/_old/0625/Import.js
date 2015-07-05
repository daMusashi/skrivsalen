function Import(filepath, dataObj){
	Import.readFile(filepath, this._parseFile, dataObj);
}

Import.prototype._parseFile = function(rawText, dataObj){
	//console.log(rawText);
	// http://www.aspsnippets.com/Articles/Read-Parse-and-display-CSV-Text-file-using-JavaScript-jQuery-and-HTML5.aspx
	
	var gruppObj = new Grupp("ospec");

	var rows = rawText.split("\n"); 
	for (var i = ImportAdapter.startAtRow; i < rows.length; i++) {
		var fields = rows[i].split(ImportAdapter.rowSplitter);
		var grupp;
		var fnamn;
		var enamn;
		var klass;
		for (var j = 0; j < fields.length; j++) {
			//console.log("*("+j+") - ["+fields[j]+"]");
			if(ImportAdapter.fields[j] == "grupp"){
				grupp = fields[j];
			}
			if(ImportAdapter.fields[j] == "klass"){
				klass = fields[j];
			}
			if(ImportAdapter.fields[j] == "namn"){
				if(ImportAdapter.nameSplitter != ""){
					var namn = fields[j].split(ImportAdapter.nameSplitter);
					enamn = namn[0];
					fnamn = namn[1];
				}
			}
			
		}
		//console.log(">>"+fnamn+" "+enamn+","+klass+"("+grupp+")");
		gruppObj.addStudent(fnamn, enamn, klass);
		gruppObj.namn = grupp;
	}
	dataObj.addGrupp(gruppObj);
}

/* statics */
// http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
// http://www.javascripture.com/FileReader
Import.readFile = function(file, onload, dataObj)
{
    var reader = new FileReader();

	reader.onload = function(e) {
		result = event.target.result;
		onload(result, dataObj);
		//console.log(result);
	}

	reader.onerror = function(e) {
		var m = new Modal();
		m.showUnkownError("Laddningen av filen misslyckades", e);
	}

	try {
		reader.readAsText(file); // finns 2 arg för encoding, UTF8 default
	} catch (err) {
		//console.log(err);
	 	var m = new Modal();
		m.showUnkownError("Det gick inte att ladda filen", err);
	}
}