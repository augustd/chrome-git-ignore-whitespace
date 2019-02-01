// Copyright (c) 2019 August Detlefsen. All rights reserved.
// Use of this source code is governed by an Apache-style license that can be
// found in the LICENSE file.

var alwaysForward = true;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("chrome.tabs.onUpdated: url: " + tab.url + " json: " + JSON.stringify(tab));

  if (alwaysForward && gitMatch(tab.url)) {
    wUrl = tab.url + "?w=1";
    console.log("forwarding to: " + wUrl);

    //Update the url here.
    chrome.tabs.update(tab.id, {url: wUrl});
  }

});

chrome.browserAction.onClicked.addListener(function(tab) {
    alwaysForward = !alwaysForward;

    if (alwaysForward) {
      chrome.browserAction.setIcon({
        path : {
          "16" : "images/git-dark-16.png",
          "32" : "images/git-dark-32.png",
          "48" : "images/git-dark-48.png",
          "128" : "images/git-dark-128.png"
        }
      });
    } else {
      chrome.browserAction.setIcon({
        path : {
          "16" : "images/git-light-16.png",
          "32" : "images/git-light-32.png",
          "48" : "images/git-light-48.png",
          "128" : "images/git-light-128.png"
        }
      });
    }
});

/**
 * Test if a URL is a git file compare
 */
function gitMatch(str) {
  var gitPullRegex = new RegExp("^.*git.*\/pull\/[0-9]*\/files$");
  var gitCommitRegex = new RegExp("^.*git.*\/commit\/[0-9a-f]*$");

  return gitPullRegex.test(str) || gitCommitRegex.test(str);
}
