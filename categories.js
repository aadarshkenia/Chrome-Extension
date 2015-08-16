document.addEventListener('DOMContentLoaded', function(){
    
    create_category_dropdown();
    create_site_dropdown();
    display_categories();
    
    //Listener for adding new category
    document.getElementById("btn_new_category").addEventListener("click", function (e) {	
	var category_name = document.getElementById("text_new_category").value;	
        //Get JSON string if it exists
        var categories = localStorage.getItem("category_list");
        
        if(!categories){
            var category_list = [];
            category_list.push(category_name);
            setArray("category_list", category_list);
            alert("Added "+category_name+" to Categories.");
        }
        else
            addToArray("category_list", category_name);
        
    });

    //Listener for adding new site
    document.getElementById("btn_new_site").addEventListener("click", function(e){
        var site_name = document.getElementById("text_new_site").value;
        var dropdown = document.getElementById("category_dropdown");
        var category = dropdown.options[dropdown.selectedIndex].text;
        //alert("Category for site: "+category);
        if(site_name && category){
            addToArray(category, site_name);
        }
    
    });
    
    //Listener for removing a tracked site
    document.getElementById("btn_remove_site").addEventListener("click", function(e){
        var dropdown = document.getElementById("site_dropdown");
        var site = dropdown.options[dropdown.selectedIndex].text;
        if(site)
            remove_site(site);
    });

});


//Dropdown of all categories
function create_category_dropdown(){
    var categories = getArray("category_list");
    
    if(categories){
        var dropdown = document.getElementById("category_dropdown");
        var i=0;
        for(i=0;i<categories.length;i++){
            var option = document.createElement("option");
            option.text = categories[i];
            dropdown.add(option);
        }
    }
}

//Dropdown of all tracked sites
function create_site_dropdown(){
    var categories = getArray("category_list");
    var dropdown = document.getElementById("site_dropdown");
    var i=0;
    for(i=0;i<categories.length;i++){
        var sites = getArray(categories[i]);
        var j=0;
        for(j=0;j<sites.length;j++){
            var option = document.createElement("option");
            option.text = sites[j];
            dropdown.add(option);
        }
    }
}



function display_categories(){
    var cat_list = getArray("category_list"); 
    if(cat_list){
        var ol = document.createElement("ol");
        document.getElementById("display_category").appendChild(ol);
        
        var i=0;
        for(i=0;i<cat_list.length;i++){
            var category_node = document.createElement("li");
            var text = document.createTextNode(cat_list[i]);
            category_node.appendChild(text);
            ol.appendChild(category_node);            
            //Show sites in this category
            show_sites(cat_list[i], category_node);
        }
    }
}

function show_sites(category_name, parent_node){
    var sites = getArray(category_name);
    if(sites){
        var list = document.createElement("ul");
        list.style.listStyle="disc inside";
        var i=0;
        for(i=0;i<sites.length;i++){           
            var item = document.createElement("li");
            var text = document.createTextNode(sites[i]);
            item.appendChild(text);
            list.appendChild(item);
        }
        parent_node.appendChild(list);
    }
    else{
        var no_list = document.createElement("p");
        var text = document.createTextNode("NO SITES TRACKED");
        no_list.appendChild(text);
        parent_node.appendChild(no_list);
    }
}

function remove_site(sitename){
    if(sitename){
        var category = getCategoryFromSite(sitename);
        if(category){
            removeFromArray(category, sitename);
            localStorage.removeItem(sitename);
        }
        else
            alert("No category found while deleting this site.");
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

function getCategoryFromSite(site_name){
    var categories = getArray("category_list");
    var i=0;
    for(i=0;i<categories.length;i++){
        var sites = getArray(categories[i]);
        var j=0;
        for(j=0;j<sites.length;j++){
            if(site_name===sites[j])
                return categories[i];
        }
    }
    return null;
}