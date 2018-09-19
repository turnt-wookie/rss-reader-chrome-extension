chrome.runtime.onInstalled.addListener(() => {
  console.log('installed')
  chrome.storage.sync.set({color: '#3aa757'}, () => {
    console.log("The color is green.");
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      pageManagerRule()
    ])
  })
})


var pageManagerRule = () => {
  return {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher(true)
    ],
    
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
  }
}
