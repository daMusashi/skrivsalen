function Skrivsalen(){};

Skrivsalen.Loader = {};

Skrivsalen.Loader.loadApp = function(){
	
	var scripts = [];
	scripts.push("Config");
	
	scripts.push("Data.Manager");
	scripts.push("Data.Student");
	scripts.push("Data.Grupp");

	scripts.push("Import");
	scripts.push("Import.ImportAdapterSkola24GrupperEpostExport"); // ladda bara en adapter

	scripts.push("Logik.Placeringar");
	scripts.push("Logik.PlatsMath");
	scripts.push("Logik.Plats");

	scripts.push("UI.Modal");
	scripts.push("UI.Slider");
	scripts.push("UI.GruppEditList");
	scripts.push("UI.Grupp");
	scripts.push("UI.Plats");
	scripts.push("UI.Karta");

	Skrivsalen.Loader.scriptsLoaded = 0;
	Skrivsalen.Loader.scriptsNum = scripts.length;

	for(var i = 0; i < scripts.length; i++){
		Skrivsalen.Loader.loadScript(scripts[i], Skrivsalen.Loader);
	}

	
}

Skrivsalen.Loader.init = function(){
	
	console.log(Skrivsalen.prototype);
	console.log("SKRIVSALEN: Appen initieras...");

	var conf = Skrivsalen.Config;

	Skrivsalen.data = new Skrivsalen.Data.Manager();
	Skrivsalen.placeringar = new Skrivsalen.Logik.Placeringar(conf.default_rows, conf.default_cols, Skrivsalen.data);

	/* ladda-knapp */
	$("#select-elever-submit").on("click", function(){
		var file = $("#select-elever-file").get(0).files[0];
		//console.log(file);
		if(file == ""){
			var m = new Modal();
			m.showWarning("Ingen fil vald", "Du måste välja en fil innan du kan ladda den.");
			//console.log("VARNING: Måste välja en fil");
		} else {
			Skrivsalen.data.import(file);
		}
	});

	// kompabilitet
	if (!FileReader){
		var m = new Modal();
		m.showWarning("Du har en för gammal webbläsare", "Den här applikationen behöver en modern webbläsare för att fungera. Uppdatera den här, eller prova en annan, om du har fler webbläsare installerade.");
	}

	console.log("SKRIVSALEN: Appen initierad. Kör på!!!");
}

/* LOADER */
Skrivsalen.Loader.loadScript = function(file, loadObj){

    file = "js/"+file+".js";

    var script = document.createElement("script")
    //script.type = "text/javascript"; // behövs inte för HTML5

    script.onload = function(){
        loadObj.scriptsLoaded++;
        console.log("SKRIVSALEN: laddning av klassfil '"+file+"' färdig ["+loadObj.scriptsLoaded+" av "+loadObj.scriptsNum+"]");

        if(loadObj.scriptsNum == loadObj.scriptsLoaded){
        	loadObj.init();
        }
        
    };
    script.onabort = function(){
        console.log("SKRIVSALEN: laddning av klassfil '"+file+"' MISSLYCKADES");
    };

    script.src = file;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// efter http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
Skrivsalen.createNamespace = function(namespace){
	var nsparts = namespace.split(".");
    var parent = Skrivsalen;
 
    if (nsparts[0] === "Skrivsalen") {
        nsparts = nsparts.slice(1);
    }
 
    if(namespace != ""){
	    for (var i = 0; i < nsparts.length; i++) {
	        var partname = nsparts[i];

	        if (typeof parent[partname] === "undefined") {
	            parent[partname] = {};
	        }

	        parent = parent[partname];
	    }
	}

    return parent
}
