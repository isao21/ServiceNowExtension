let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

function openFirmUseTabs(){
  console.log("starting open firm use");
  chrome.tabs.create(
    {
      url: 'http://www.google.com',
    active: true
    }
  )
  console.log("creating tab");
  let tab = getCurrentTab();
  console.log("tab" + tab[0]);
}