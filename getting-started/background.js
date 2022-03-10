let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

async function getCurrentTab() {
  console.log("running getcurr tab ");
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("current tab is " + tab.id)
 // chrome.tabs.update(tab.id+1,{ active: true})
 chrome.scripting.executeScript({
  target: { tabId: tab.id },
  //function is the function we want to inject
  function: getAllFirmUse()
});
  return tab.id
}
async function injectScript() {
  const [tab] = await chrome.tabs.query({ active: false, currentWindow: true });
  await console.log("tab is " + tab.length)
  await chrome.scripting.executeScript({
  target: { tabId: tab.id },
  function: getAllFirmUse()
  });
  
}
/**
 * gets all the tabs except for the current active tab in window
 */
 function distributeFirmUse() {
  chrome.tabs.query({active: false, currentWindow: true}, function(tabs) {
    tabs.forEach(function (tab) {
      //goes to the tab
      chrome.tabs.update(tab.id, {active: true})
      let openedBy = document.getElementById("incident.opened_by_label").value;
      document.getElementById("sys_display.incident.assigned_to").setValue(openedBy);
      //sets state to in progress
      document.getElementById("incident.state").setValue(2);
      //on hold reason: none
      document.getElementById("incident.hold_reason").setValue(0);
      //press save button
    //  document.getElementById("sysverb_update_and_stay").click();



      // do whatever you want with the tab
      console.log("tab id is " + tab.id)
    });
  });
  /*
  console.log("running getcurr tab ");
  let queryOptions = { active: false, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  tab.foreach( (tab)=>{
    console.log("current tab is " + tab.id)
  })
  console.log("current tab is " + tab[0].id)
 // chrome.tabs.update(tab.id+1,{ active: true})
 */
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});

      else if(request.greeting ==='openPage'){
     
        //getCurrentTab()
        injectScript()
        //distributeFirmUse()
      }
  }
);

function getAllFirmUse(){
  body.style.backgroundColor = 'orange';
  
  let amountInFirmUse = document.getElementsByClassName("linked formlink").length 
  let firmLinks;
  for (let i = 0; i <amountInFirmUse; i ++){
 firmLinks[i] = "https://intelliteach.service-now.com/" +
  document.getElementsByClassName("linked formlink")[i].getAttribute("href");
 
  //creates a new tab for each firm use, 
  chrome.tabs.create({
    url:firmLinks[i],
    active: false
  });

  console.log("firm link at" + i + "  " + firmLinks[i]);
  }
  return firmLinks;
 }