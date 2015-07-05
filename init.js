Skrivsalen.load();

var DATA = new Data();
DATA.editGrupperContainer = document.getElementById("edit-grupper");
var placeringar = new Placeringar(CONFIG.ROWS, CONFIG.COLS);

$(document).ready(function(){

	/* ladda-knapp */
	$("#select-elever-submit").on("click", function(){
		var file = $("#select-elever-file").get(0).files[0];
		//console.log(file);
		if(file == ""){
			var m = new Modal();
			m.showWarning("Ingen fil vald", "Du måste välja en fil innan du kan ladda den.");
			//console.log("VARNING: Måste välja en fil");
		} else {
			DATA.import(file);
		}
	});

	/* sliders */	
	var sliderRows = new Slider("select-rows", placeringar.rows);
	var sliderCols = new Slider("select-cols", placeringar.cols);

	sliderRows.setOnChangeListener(placeringar.setRows);
	sliderCols.setOnChangeListener(placeringar.setCols);

	// kompabilitet
	if (!FileReader){
		var m = new Modal();
		m.showWarning("Du har en för gammal webbläsare", "Den här applikationen behöver en modern webbläsare för att fungera. Uppdatera den här, eller prova en annan, om du har fler webbläsare installerade.");
	}

});

