document.getElementById('display').textContent = "COUNT="+localStorage.getItem("fbcount");



















/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */     


/*
//Returns access count of fb.com as Integer
function getAccessCount(){
    var count = localStorage.getItem("fbcount");
    if(count!=null)
        return parseInt(count);
    else
        return 0;
}   

function stringContains(a, b){
    if(a.indexOf(b)>-1)
        return true;
    return false;
}

chrome.tabs.onCreated.addListener(function foo(tab){
    
    
    var count = localStorage.getItem("fbcount");
    console.log("Count = "+count);
    
    if(count==null)
        localStorage.setItem("fbcount", "1");
    else{
        alert("foo");
        var cur_count = parseInt(localStorage.getItem("fbcount"));
        cur_count +=1;
        localStorage.setItem("fbcount", cur_count.toString());
        alert(cur_count);
    }
        
   
    
});


var start_stop = document.getElementById("start_stop");

start_stop.addEventListener('click', function toggle(){
    
    console.log("event listener for toggle.");
    var toggleval = localStorage.getItem("toggle");
    if(toggleval==null)
        toggleval="Start Tracking";
    else{
        if(toggleval=="Start Tracking"){
            
            toggleval = "Stop Tracking";
        }
        else{
            toggleval = "Start Tracking";
            //Remove listeners
        }
    }
    localStorage.setItem("toggle", toggleval);
    
    start_stop.value = toggleval;
});



var stats = document.getElementById("stats");
stats.addEventListener('click', function displayCount(){
    console.log("Event listener for stats display")
    var count = getAccessCount();
    document.getElementById("display").textContent = count;
});




   



chrome.tabs.onUpdated.addListener(function bar(tabId, changeInfo, tab){

});




function renderStatus(statusText) {
  document.getElementById('display').textContent = statusText;
}

function openTab()
{
    console.log("here in opentab");

    var count=0;

    var queryInfo = {
        active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs){
    var i= 0;

    for(i=0;i<tabs.length;i++)
    {
        var cur_url = tabs[i].url;
        if(cur_url.indexOf("electricimp.com") > -1)
            count++;

    }
    renderStatus("Count="+count);

    });
  
}
*/