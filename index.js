// declare global variables
window.api_key = "ed520403e0b35edbb8d5cebdf9d349a2"; //modify this to use a new API key
window.photoset_id = "72157626579923453"; // modify this to use a new photoset ID
window.photos = Array(); // this will store URLs and titles of our photos
window.current_photo = 0; // this integer will store the index of the currently-displayed photo
window.loading = false; // this boolean indicates whether the application is in a "loading" state


/*
 *  Master Control Program (MCP)
 */
window.onload = () => {
  // Assign gallery events and states
  gallery_initialize();

  // Begin loading data from the Flickr API,
  // then begin loading the first photo.
  api_execute(gallery_begin_photo_load_process);
}
