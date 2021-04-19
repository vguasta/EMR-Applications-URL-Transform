document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let tab = tabs[0];
        let oldURL = tab.url;
        // use `url` here inside the callback because it's asynchronous!

        let newURL = trasformURL(oldURL);

        chrome.tabs.update(tab.id, { url: newURL });
    });

    function trasformURL(oldURL){

        let https = true;
        if (oldURL.search("https://") == -1) {
            oldURL = oldURL.replace("http://","");
            https = false;
        } else {
            oldURL = oldURL.replace("https://","");
            https = true;
        }

        let colonPos = oldURL.search("/");
        let substringURL = oldURL.substring(0,colonPos);
        substringURL = substringURL.replace("ip-","").replace(".ec2.internal","").replaceAll("-",".");

        let newURL = ""
        if(!https) {
            newURL = "http://" + substringURL + oldURL.substring(colonPos);
        } else {
            newURL = "https://" + substringURL + oldURL.substring(colonPos);
        }

        return newURL;
    }

})