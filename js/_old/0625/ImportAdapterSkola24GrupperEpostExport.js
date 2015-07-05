function ImportAdapter(){};

ImportAdapter.startAtRow = 2; // 0 = första rad
ImportAdapter.rowSplitter = "\t"; // = tab
ImportAdapter.nameSplitter = "\,"; // = tab
ImportAdapter.fields = [];

ImportAdapter.fields[0] = null; // nr - hoppa över
ImportAdapter.fields[1] = "grupp";
ImportAdapter.fields[2] = null; // skola - hoppa över
ImportAdapter.fields[3] = "klass"; 
ImportAdapter.fields[4] = "namn"; // behöver splitas med ,