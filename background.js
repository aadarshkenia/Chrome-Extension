
var fb_url = "facebook.com";
chrome.tabs.onCreated.addListener(function foo(tab){   
    //chrome.tabs.update(tab.tabId, {active : true, url: "display.html"}, function foo(){
    //});   
});


chrome.tabs.onUpdated.addListener(function bar(tabId, changeInfo, tab){
    var url=tab.url;
    if(url){
    if(strContains(url, fb_url)){
           
    }
     }
});

chrome.tabs.onRemoved.addListener(function cleanup(tabId, removeInfo){
    //Cannot access tab url as this has been already deleted.
    console.log("REMOVED: "+tabId);
});

function incrementFbCount(){
    var count = parseInt(localStorage.getItem("fbcount"));
    if(count==null)
        count=0;    
    count+=1;
    localStorage.setItem("fbcount", count.toString());
}

function strContains(a, b)
{
    if(a.indexOf(b) > -1)
        return true;
    return false;
}