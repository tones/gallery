/*
 *  @file Contains functions to manage the Flickr API call.
 *        Uses the api_ namespace.
 */


 /*
  *   Prepare and perform the API call, then proceed with the program.
  *   @param {function} callback - Function to be called when the AJAX is complete.
  */
function api_execute(callback){
  api_get(api_create_url()).then(function(response) {
    api_build_photo_array(response);
    callback();
  // This would be a good place to do some error-handling, if it were in-scope for this assignment.
  })
}

/*
 *  This function calls a URL, and returns a Promise to manage the call.
 *  (Obviously this requires a browser that supports ECMAScript 6.)
 *  I shamelessly copied it from https://developers.google.com/web/fundamentals/getting-started/primers/promises
 *  @param {string} url - The URL to be called.
 */
function api_get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

/*
 *  This function builds and returns a Flickr API URL
 */
function api_create_url(){
  // Store our API URL parameters in this utility object
  var params = {
    "method":         "flickr.photosets.getPhotos",
    "api_key":        window.api_key,
    "photoset_id":    window.photoset_id,
    "format":         "json",
    "nojsoncallback": "1",
    "extras":         "url_m"
  };

  // Construct the URL from the params
  var url = "https://api.flickr.com/services/rest/?";
  for (var prop in params){ url += prop+"="+params[prop]+"&"; }

  return url;
}

/*
 *  This function accepts data returned by the flickr API,
 *  then parses it into a global variable, for use by the gallery_ functions.
 *  @param {string} results - A string containing JSON data to be parsed.
 */
function api_build_photo_array(response){
  // parse the JSON string into a JS object
  var results = JSON.parse(response);

  // walk through the results and add them to the global variable
  for (var i in results['photoset']['photo']){
    var photo = {
      "title":  results['photoset']['photo'][i]['title'],
      "url":    results['photoset']['photo'][i]['url_m']
    }
    window.photos.unshift(photo);
  }
}
