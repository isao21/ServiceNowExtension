// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
 // chrome.runtime.sendMessage({greeting: "openPage", documents:document}, function(response) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

 // });
 chrome.scripting.executeScript({
  target: { tabId: tab.id, allFrames : true },
  function: getAllFirmUse
  
});

//  getAllFirmUse();

  //openFirmUseTabs()
  /*
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
console.log(tab);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  }); df
  */
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

//clicks email button
const emailButton = document.getElementById("email_client_open");
//gets first name of requester
const requesterName = document.getElementById("sys_display.incident.caller_id") //.value.split(' ')[0];
/**
 * writes work notes in SN and presses post
 * @param {} notes data you want to write into work notes
 */
function writeWorkNotes (notes){
  //writes into work notes
document.getElementById("activity-stream-textarea").value = notes;
//clicks post button
document.getElementsByClassName("btn btn-default activity-submit")[0].click()
}

/**
 * gets all firm use and returns a url of all contents in firm use
 */
 function getAllFirmUse(){
  //document.body.style.backgroundColor = 'orange';
  console.log(window.frameElement.name)
  console.log(document)
  console.log(document.title)
  let amountInFirmUse = document.getElementsByClassName("linked formlink").length 
  console.log("length of amount " + amountInFirmUse)
  console.log("test " + document.getElementsByClassName("linked formlink")[0].getAttribute("href"))
  let firmLinks = [];
  for (let i = 0; i <amountInFirmUse; i ++){
 firmLinks[i] = "https://intelliteach.service-now.com/" +
  document.getElementsByClassName("linked formlink")[i].getAttribute("href");
 
  //creates a new tab for each firm use, 
  /*
  chrome.tabs.create({
    url:firmLinks[i],
    active: false
  });
*/
  console.log("firm link at" + i + "  " + firmLinks[i]);
  }
  return firmLinks;
 }
function openFirmUseTabs(){
  chrome.tabs.create({
    url:"https://google.com",
    active: false
  }
    
  )
}
async function getCurrentTab() {
  console.log("running getcurr tab ");
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  //console.log("current tab is " + tab[0])
  return tab;
}

//write in email 
//document.getElementById('message.text_ifr').contentDocument.write("test");
