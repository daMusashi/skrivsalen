function Placeringar(rows, cols){

	this.rows = rows; // Y
	this.cols = cols; // X

	this.cells = [];

	var index = 1;
	for(var x = 0; x < this.cols; x++){
		this.cells[x] = [];
		for(var y = 0; y < this.rows; y++){
			this.cells[x][y] = new Plats(index);
			index++;
		}
	}

}

Placeringar.prototype.setRows = function(val){
	this.rows = val;
	console.log("Placeringar >> Rader satt till: "+ this.rows);
}

Placeringar.prototype.setCols = function(val){
	this.cols = val;
	console.log("Placeringar >> Kolumner satt till: "+ this.cols);
}
