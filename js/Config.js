var ns = Skrivsalen.createNamespace(""); // direkt i Skrivsalen

ns.Config = function(){}

ns.Config.default_rows = 15;
ns.Config.default_cols = 15;

ns.Config.domId_editGruppListContainer = "skrivsalen-edit-grupper"; // anges i HTML
ns.Config.domId_sliderRows = "skrivsalen-select-rows"; // anges i HTML
ns.Config.domId_sliderCols = "skrivsalen-select-cols"; // anges i HTML
ns.Config.domId_karta_container = "skrivsalen-karta-container"; // anges i HTML
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
