var ns = Skrivsalen.createNamespace(""); // direkt i Skrivsalen

ns.Config = function(){}

/** Applikationens path sparas direkt i Skrivsalen-objektet och sätts vid init i main HTML */

ns.Config.default_rows = 15;
ns.Config.default_cols = 15;

ns.Config.show_log = true; // visa log-meddelanden
ns.Config.show_debug = true; // visa debug-meddelanden

// Grafikfiler
ns.Config.gfx_path = "gfx/"; 
ns.Config.gfx_file_gruppedit = ns.Config.gfx_path + "icon_list_24.png"; 
ns.Config.gfx_file_gruppdelete = ns.Config.gfx_path + "icon_delete_24.png"; 

// buttons, sliders etc. - NAMNGES I HTML
ns.Config.domId_importFileButton = "skrivsalen-select-file"; // anges i HTML
ns.Config.domId_sliderRows = "skrivsalen-select-rows"; // anges i HTML
ns.Config.domId_sliderCols = "skrivsalen-select-cols"; // anges i HTML

// Containers - NAMNGES I HTML
ns.Config.domId_gruppListContainer = "skrivsalen-edit-grupper"; // anges i HTML
ns.Config.domId_karta_container = "skrivsalen-karta-container"; // anges i HTML

// Containers - namn skapas av kod
ns.Config.domId_karta = "skrivsalen-karta"; // genereras

ns.Config.grupp_colors = [
	"#00BFFF", 
	"#483D8B", 
	"#ADFF2F", 
	"#CD5C5C", 
	"#FFFF00", 
	"#2F4F4F", 
	"#6B8E23"
];
