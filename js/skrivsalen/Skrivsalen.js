function Skrivsalen(){};

Skrivsalen.show_load_msg = true; // Visa lading-log (innan Config.show_log är känd)

Skrivsalen.Loader = {};

Skrivsalen.Loader.loadApp = function(appPath){
	
	console.log("SKRIVSALEN [loadApp]: Appen laddas..."); // Skrivsalen.log änni inte definerad.

	Skrivsalen.appPath = appPath;

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
	scripts.push("Logik.StudentManager");

	scripts.push("UI.Factory");
	scripts.push("UI.Modal");
	scripts.push("UI.Slider");
	scripts.push("UI.GruppList");
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
	
	//Trackpad Scroll Emulator jQuery plugin: https://github.com/jnicol/trackpad-scroll-emulator
	$('.tse-scrollable').TrackpadScrollEmulator();

	/** Definierar dessa console.log-funktioner i init, då de behöver Skrivsalen.Config */

	Skrivsalen.log = function(msg, source){
		if(Skrivsalen.Config.show_log){
			var source = " ["+source+"]" || "";
			console.log("SKRIVSALEN"+source+": "+msg);
		}
	}

	Skrivsalen.debug = function(msg, source){
		if(Skrivsalen.Config.show_debug){
			var source = " ["+source+"]" || "";
			console.log("*DEBUG* SKRIVSALEN"+source+": "+msg);
		}
	}

	Skrivsalen.warning = function(msg, source){
		if(Skrivsalen.Config.show_log){
			var source = " ["+source+"]" || "";
			console.log("!!VARNING!! SKRIVSALEN"+source+": "+msg);
		}
	}


	Skrivsalen.log("Appen initieras...", "init");

	var conf = Skrivsalen.Config;

	Skrivsalen.data = new Skrivsalen.Data.Manager();
	Skrivsalen.placeringar = new Skrivsalen.Logik.Placeringar(conf.default_rows, conf.default_cols);

	var gruppUI = new Skrivsalen.UI.GruppList(document.getElementById(Skrivsalen.Config.domId_gruppListContainer), this);

	/* Bootstrap tooltips */
   	$('[data-toggle="tooltip"]').tooltip(); 

	/* ladda-knapp */ 
	$("#"+conf.domId_importFileButton).on("change", function(){
		var file = $(this).get(0).files[0];
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

	Skrivsalen.log("Appen initierad. Kör på!!!", "init");
}


/* LOADER */
Skrivsalen.Loader.loadScript = function(file, loadObj){

    file = Skrivsalen.appPath+file+".js";

    var script = document.createElement("script")
    //script.type = "text/javascript"; // behövs inte för HTML5

    script.onload = function(){
        loadObj.scriptsLoaded++;
        if(Skrivsalen.show_load_msg){
        	console.log("SkRIVSALEN: Laddning av klassfil '"+file+"' färdig ["+loadObj.scriptsLoaded+" av "+loadObj.scriptsNum+"]");
    	}

        if(loadObj.scriptsNum == loadObj.scriptsLoaded){
        	loadObj.init();
        }
        
    };
    script.onabort = function(){
        Sconsole.log("!!VARNING!! SKRIVSALEN: laddning av klassfil '"+file+"' MISSLYCKADES");
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
