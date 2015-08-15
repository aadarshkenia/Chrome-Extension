document.addEventListener('DOMContentLoaded', function(){

	display_projects();
	document.getElementById("btn_categories").addEventListener("click", function (e) {
		
		var create_filter={url: chrome.extension.getURL("categories.html"), active:true};
		chrome.tabs.create(create_filter);
			
	});

	document.getElementById("btn_projects").addEventListener("click", function (e) {
		
		var create_filter={url: chrome.extension.getURL("projects.html"), active:true};
		chrome.tabs.create(create_filter);
			
	});

});


function display_projects(){
	
	// Check browser support
	if (typeof(Storage) != "undefined") {
	    var delivs = [];

	    delivs.push("Deliverable 1");
	    delivs.push("Deliverable 2");
	    var cp="Project1";
	    
	    localStorage.setItem("current_project", cp);
	    localStorage.setItem(cp, JSON.stringify(delivs));

	    //Get deliverables of current project
	    var current_proj = localStorage.getItem("current_project");
    	if(current_proj){
    		var json_deliverables = JSON.parse(localStorage.getItem(cp));			    
    		var i=0;
    		for(i=0;i<json_deliverables.length;i++){
    			var item = json_deliverables[i];
    			
    			var para = document.createElement("p");
			    var node = document.createTextNode(item);
			    para.appendChild(node);
			    document.body.appendChild(para);
    		
    		}    		
    	}
    	else
    		alert("No project selected as active project.");	    
	} 
	else {
		alert("Error");
	}

	
	 
}