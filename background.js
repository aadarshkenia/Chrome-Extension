


//Mappings from tabId to url
var mappings = {};

//Mappings from url to time spend
var time_spent = {};

//ArrayList of tracked url s
var tracked_urls = [];
var last_short_url=null;
var cur_start=0;
var cur_end=0;

add_url_to_tracked("facebook.com");
add_url_to_tracked("stackoverflow.com");

chrome.tabs.onActivated.addListener(function newTabSelection(activeInfo){
   console.log("Tab change recorded");
    if(last_short_url!=null){
    //Set end time of previously selected tab
    cur_end = new Date().getTime();
    var diff = cur_end - cur_start;
    var cur_spent = time_spent[last_short_url];
    cur_spent+=diff;
    time_spent[last_short_url]=cur_spent;    
    console.log("time_spent:"+last_short_url+" :"+cur_spent);
    last_short_url=null;
   }
   
});

chrome.tabs.onUpdated.addListener(function bar(tabId, changeInfo, tab){
    var url=tab.url;
    if(url){
        //Check if whether this url is list of tracked urls.
        var index = isTracked(url);
        if(index != -1){
            mappings[tabId.toString()]=url; 
            last_short_url = tracked_urls[index];
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

//Function to add a url to tracked_url list and intialize times to zero
function add_url_to_tracked(url){
    tracked_urls.push(url);
    time_spent[url] = 0;
}

function remove_url_from_tracked(){
    tracked_urls.pop();
}

function isTracked(url){
    for(i=0;i<tracked_urls.length;i++){
        if(url.indexOf(tracked_urls[i])>-1){
            return i;
        }
    }
    return -1;
}
