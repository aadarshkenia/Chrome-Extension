var DEFAULT_STATUS = "stop"; //default status for deliverable
var DEFAULT_LAT=0;//default last access time
var DEFAULT_DUR=0;//default total time

document.addEventListener('DOMContentLoaded', function(){
    
    create_project_dropdown("change_project_dropdown");
    create_project_dropdown("add_deliverable_project_dropdown");
    create_project_dropdown("remove_project_dropdown");
    
    //Listener for adding new project
    document.getElementById("btn_new_project").addEventListener("click", function (e) {	
	var project_name = document.getElementById("text_new_project").value;	
        //Get JSON string if it exists
        var projects = localStorage.getItem("project_list");
        
        if(!projects){
            var project_list = [];
            project_list.push(project_name);
            setArray("project_list", project_list);
            alert("Added "+project_name+" to Projects.");
        }
        else
            addToArray("project_list", project_name);
    });

    //Listener for adding new deliverable
    document.getElementById("btn_new_deliverable").addEventListener("click", function (e) {	
        var deliv_name = document.getElementById("text_new_deliverable").value;
        var dropdown = document.getElementById("add_deliverable_project_dropdown");
        var proj_name = dropdown.options[dropdown.selectedIndex].text;
        addDeliverable(deliv_name, proj_name);
    });
    
    //Listener for changing curr project
    document.getElementById("btn_track_project").addEventListener("click", function (e) {
        var dropdown = document.getElementById("change_project_dropdown");
        var proj_name = dropdown.options[dropdown.selectedIndex].text;
        localStorage.setItem("current_project", proj_name);        
    });    
    
    //Listener for removing a project
    document.getElementById("btn_remove_project").addEventListener("click", function(e){
        var dropdown = document.getElementById("remove_project_dropdown");
        var proj_name = dropdown.options[dropdown.selectedIndex].text;
        if(proj_name)
            remove_project(proj_name);
    });

});

function addDeliverable(deliv, proj){
    var delivs = getArray(proj);
    if(!delivs)
        delivs = [];
    delivs.push(deliv);
    setArray(proj, delivs);
    init_deliverable(deliv, proj);
    alert("Added Deliverable "+deliv+" to Project "+proj);
}

//Create array for deliverable and set to defaults
function init_deliverable(deliv, proj){
    var dname = proj + "." + deliv;
    var darr = [];
    darr.push(DEFAULT_STATUS);//status
    darr.push(DEFAULT_LAT);//last access time
    darr.push(DEFAULT_DUR);//total duration
    setArray(dname, darr);
}


function remove_project(proj_name){
    //Remove proj and all its deliverables
    if(proj_name===localStorage.getItem("current_project"))
        localStorage.removeItem("current_project");
    var projs = getArray("project_list");
    if(projs){
        var newarr = [];
        var i=0;
        for(i=0;i<projs.length;i++){
            if(projs[i]!=proj_name)
                newarr.push(projs[i]);
        }
        setArray("project_list", newarr);
        alert("Removed "+proj_name);
    }
    //Delete each deliverable
    var delivs = getArray(proj_name);
    if(delivs){
        var j=0;
        for(j=0;j<delivs.length;j++){
            localStorage.removeItem(proj_name+"."+delivs[i]);
        }
        
        localStorage.removeItem(proj_name);//del delivs array
    }    
}

//Dropdown of all tracked sites
function create_project_dropdown(dropdown_id){
    var projs = getArray("project_list");
    if(projs){
        var dropdown = document.getElementById(dropdown_id);
        var i=0;
        for(i=0;i<projs.length;i++){
            var option = document.createElement("option");
            option.text = projs[i];
            dropdown.add(option);        
        }
    }    
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

function addToArray(key, newval){
    var arr = getArray(key);
    if(arr){
        arr.push(newval);
        setArray(key,arr);
        alert("Added "+newval);
    }
    else{
        //Create new array and push val
        arr = [];
        arr.push(newval);
        setArray(key,arr);
    }
}

function removeFromArray(key, val){
    var arr = getArray(key);
    var newarr = [];
    var i = 0;
    for(i=0;i<arr.length;i++){
        if(arr[i]!==val)
            newarr.push(arr[i]);
    }
    setArray(key, newarr);
}