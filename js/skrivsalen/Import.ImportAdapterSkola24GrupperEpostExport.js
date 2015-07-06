/**
 *  Adapter för textfilsexport från skola 24
 *  - Standardrapport Grupper lista med epost
 *  - Export (text)
 */

var ns = Skrivsalen.createNamespace("Importer");

ns.ImportAdapter = function(){};

ns.ImportAdapter.startAtRow = 2; // 0 = första rad
ns.ImportAdapter.rowSplitter = "\t"; // = tab
ns.ImportAdapter.nameSplitter = "\,"; // = tab
ns.ImportAdapter.fields = [];

ns.ImportAdapter.fields[0] = null; // nr - hoppa över
ns.ImportAdapter.fields[1] = "grupp";
ns.ImportAdapter.fields[2] = null; // skola - hoppa över
ns.ImportAdapter.fields[3] = "klass"; 
ns.ImportAdapter.fields[4] = "namn"; // behöver splitas med ,