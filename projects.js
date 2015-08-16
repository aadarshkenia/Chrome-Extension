











//Dropdown of all tracked sites
function create_project_dropdown(){
    var projs = getArray("project_list");
    var dropdown = document.getElementById("project_dropdown");
    var i=0;
    for(i=0;i<projs.length;i++){
        var option = document.createElement("option");
        option.text = projs[i];
        dropdown.add(option);        
    }
}