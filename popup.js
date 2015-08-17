document.addEventListener('DOMContentLoaded', function(){

	display_curr_proj();
	//var temp = getArray("Test1.D1");
        //if(temp)
        //    alert(temp[0]);
        document.getElementById("btn_categories").addEventListener("click", function (e) {
		
		var create_filter={url: chrome.extension.getURL("categories.html"), active:true};
		chrome.tabs.create(create_filter);
			
	});

	document.getElementById("btn_projects").addEventListener("click", function (e) {
		
		var create_filter={url: chrome.extension.getURL("projects.html"), active:true};
		chrome.tabs.create(create_filter);
			
	});
        
        document.getElementById("btn_productivity_stats").addEventListener("click", function(e){
                chrome.tabs.create({url: "stats.html", active: true});
        });

});


function display_curr_proj(){
	
        //Get deliverables of current project
        var current_proj = localStorage.getItem("current_project");
    	if(current_proj){
            document.getElementById("proj_name").innerHTML=current_proj;	
            var delivs = getArray(current_proj);
            if(delivs){
                var i=0;
                for(i=0;i<delivs.length;i++){
                    if(i==2)
                        alert(delivs[i]);    
                    display_deliverable(delivs[i], current_proj);
                }
            }            
    	}
    	else{
    		alert("No active project");	    
	} 
}

function display_deliverable(d_name, p_name){
    var name = p_name+"."+d_name;
    var d_arr = getArray(name);
    if(!d_arr)
        alert("No details found for this deliverable!");
    else{
        var item = document.createElement("li");
        var text_el = document.createElement("p");
        text_el.innerHTML  = d_name;
        var button_el = document.createElement("button");
        button_el.innerHTML=toggle(d_arr[0]);
        button_el.setAttribute("id",name);
        item.appendChild(text_el);
        item.appendChild(button_el);
        document.getElementById("deliverables").appendChild(item);
        
        //On click listener for button element
        document.getElementById(name).addEventListener("click", function(e){
            deliverableClickHandler(name);
        });
    }
    
}

function deliverableClickHandler(name){
    var arr = getArray(name);
    
    if(arr){
        if(arr[0]==="stop"){
           
            arr[1]= new Date().getTime();//set last access time
            arr[0]="start";
            setArray(name, arr);
        }
        else{
            var time_spent = new Date().getTime() - arr[1];
            arr[0]="stop";
            arr[1]=0;
            arr[2]+=time_spent;
            setArray(name,arr);
        }
    }        
}

function toggle(status){
    if(status==="start")
        return "stop";
    if(status==="stop")
        return "start";
    alert("Wrong status");
}

//Get array from localStorage after deserialization
function getArray(key){
    var arr = JSON.parse(localStorage.getItem(key));
    return arr;
}

//Set array to localStorage after serialization
function setArray(key, arr){
    localStorage.setItem(key, JSON.stringify(arr));
}