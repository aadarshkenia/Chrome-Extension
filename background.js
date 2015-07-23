

var count_temp = localStorage.getItem("fbcount");
count_temp=1;
localStorage.setItem("fbcount", count_temp.toString());


chrome.tabs.onCreated.addListener(function foo(tab){
    
    var viewTabUrl = chrome.extension.getURL('display.html');
    
    var count = parseInt(localStorage.getItem("fbcount"));
    
    count +=1;
    localStorage.setItem("fbcount", count.toString());
    
    chrome.tabs.update(tab.tabId, {active : true, url: "display.html"}, function foo(){
    });
   
});