// NOT YET USED

function DOM_FACTORY(){}

// kör jQuery .attr() istället
DOM_FACTORY._addAttr = function(elem, attr, value){
	var att = document.createAttribute(attr);  
	att.value = value;                         
	elem.setAttributeNode(att); 
}