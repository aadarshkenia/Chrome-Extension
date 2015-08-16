document.addEventListener('DOMContentLoaded', function(){
    display_categories_time();
});

//Get array from localStorage after deserialization
function getArray(key){
    var arr = JSON.parse(localStorage.getItem(key));
    return arr;
}

function display_categories_time(){
    var cat_list = getArray("category_list"); 
    if(cat_list){
        var ol = document.createElement("ol");
        document.getElementById("display_stats").appendChild(ol);
        
        var i=0;
        for(i=0;i<cat_list.length;i++){
            var category_node = document.createElement("li");
            var disp = cat_list[i]+" : "+msToTime(category_time(cat_list[i]));
            var text = document.createTextNode(disp);
            category_node.appendChild(text);
            ol.appendChild(category_node);            
            //Show sites in this category
            show_sites_time(cat_list[i], category_node);
        }
    }
}

//Attaches a ul of sites and time spent to concerned parent node
function show_sites_time(category_name, parent_node){
    var sites = getArray(category_name);
    if(sites){
        var list = document.createElement("ul");
        list.style.listStyle="disc inside";
        var i=0;
        for(i=0;i<sites.length;i++){           
            var item = document.createElement("li");
            var disp = sites[i]+" : "+msToTime(site_time(sites[i]));
            var text = document.createTextNode(disp);
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

function category_time(category_name){
    var arr = getArray(category_name);
    if(arr){
        var total=0;
        var i=0;
        for(i=0;i<arr.length;i++){
            var stime = localStorage.getItem(arr[i]);
            if(stime)
                total+=parseInt(stime);
        }
        return total;
    }
    else{
        alert("Coudnt find category while evaluating total time.");
        return 0;
    }
}

function site_time(site_name){
    var time = localStorage.getItem(site_name);
    if(time)
        return parseInt(time);
    else{
        alert("Site not found while evaluating time spent.");
        return 0;
    }
}

function msToTime(duration) {
    var minutes = parseInt((duration/(1000*60))%60);
    var hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + " hrs " + minutes + " mins";
}