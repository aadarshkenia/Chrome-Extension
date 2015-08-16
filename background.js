
//ArrayList of tracked url s
var last_short_url=null;
var cur_start=0;
var cur_end=0;


chrome.tabs.onActivated.addListener(function newTabSelection(activeInfo){
   console.log("Tab change recorded");
    if(last_short_url!=null){
        //Set end time of previously selected tab
        cur_end = new Date().getTime();
        var diff = cur_end - cur_start; 
        
        //IMP: If this is null, set total time to 0
        var temp = localStorage.getItem(last_short_url);
        if(!temp){
            temp = "0";
            localStorage.setItem(last_short_url, temp);
        }        
        var cum_spent = parseInt(temp);
        cum_spent+=diff;
        localStorage.setItem(last_short_url, cum_spent.toString());
        console.log("time_spent:"+last_short_url+" :"+cum_spent);        
        last_short_url=null;
   }
   
});

chrome.tabs.onUpdated.addListener(function bar(tabId, changeInfo, tab){
    var url=tab.url;
    if(url){
        //Check if whether this url is list of tracked urls
        if(isTracked(url) != -1){
            last_short_url = get_short_url(url);
            //Set start time of access            
            cur_start=new Date().getTime();
        }
        else
            last_short_url=null;
    }
});


//Returns true if b is a substring of a
function strContains(a, b)
{
    if(a.indexOf(b) > -1)
        return true;
    return false;
}

//Returns -1 if url is not tracked, 1 if tracked
function isTracked(long_url){
    var category = getCategory(long_url);
    if(!category)
        return -1;
    else
        return 1;
}


function get_short_url(long_url){
    var category = getCategory(long_url);
    if(category){
        var sites = getArray(category);
        var i=0;
        for(i=0;i<sites.length;i++){
            if(long_url.indexOf(sites[i])>-1)
                return sites[i];
        }
    }
    return null;
}

function getCategory(long_url){
    var cat_list = getArray("category_list");
    if(cat_list){
        var c=0;
        for(c=0;c<cat_list.length;c++){
            var sites = getArray(cat_list[c]);
            var s=0;
            for(s=0;s<sites.length;s++){
                if(long_url.indexOf(sites[s])>-1)
                    return cat_list[c];
            }
        }
    }
    return null;
}

//Get array from localStorage after deserialization
function getArray(key){
    var arr = JSON.parse(localStorage.getItem(key));
    return arr;
}