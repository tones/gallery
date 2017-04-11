/*
 *  @file Contains functions to manage the photo gallery interactions.
 *        Uses the gallery_ namespace.
 */


 /*
  *  This function initializes the gallery interactions.
  *  Its run just once, at page loadtime, by the MCP.
  */
function gallery_initialize(){
  // assume we are still loading API data when this function is called
  gallery_enable_loadstate();

  // assign events to buttons
  document.getElementById("prev_button").addEventListener("click", gallery_goto_previous_photo);
  document.getElementById("next_button").addEventListener("click", gallery_goto_next_photo);

  // assign events to keyboard arrow keys
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) gallery_goto_previous_photo();
    if (event.keyCode == 39) gallery_goto_next_photo();
  });

  // create a callback for when new images finish loading
  document.getElementById('photo').addEventListener('load', gallery_end_photo_load_process);
}

/*
 *  This function is run before performing slow data-loading actions.
 *  (e.g. making the API call, or loading a new photo)
 *  It places the application into a "loading" state.
 */
function gallery_enable_loadstate(){
  window.loading = true;
  document.getElementById('page').className = "loading";
}

/*
 *  This function is run when loading actions are complete.
 *  It removes the application's "loading" state.
 */
function gallery_disable_loadstate(){
  window.loading = false;
  document.getElementById('page').className = "loaded";

  document.getElementById('prev_button').className = (window.current_photo == 0) ? "button disabled" : "button";
  document.getElementById('next_button').className = (window.current_photo == window.photos.length - 1) ? "button disabled" : "button";
}

/*
 *  This function tries to browse the gallery forward to the next photo.
 *  It is triggered by the "next" button or a right-arrow keyboard press.
 */
function gallery_goto_next_photo(){
  if (window.current_photo == window.photos.length - 1) return; // do not run if there is no next photo
  if (window.loading) return; // do not run if we are in the load-state
  window.current_photo++;
  gallery_begin_photo_load_process();
}

/*
 *  This function tries to browse the gallery backwards to the previous photo.
 *  It is triggered by the "previous" button or a left-arrow keyboard press.
 */
function gallery_goto_previous_photo(){
  if (window.current_photo == 0) return; // do not run if there is no previous photo
  if (window.loading) return; // do not run if we are in the load-state
  window.current_photo--;
  gallery_begin_photo_load_process();
}

/*
 *  This function begins the process of loading a new photo.
 *  It is triggered on page load, and by the "gallery_goto" functions.
 */
function gallery_begin_photo_load_process(){
  gallery_enable_loadstate();
  document.getElementById('photo').src = window.photos[window.current_photo]['url'];
  document.getElementById('title').innerHTML = "&nbsp;";
  document.getElementById('index').innerHTML = "&nbsp;";
}

/*
 *  This function begins the process of loading a new photo.
 *  It is called by an event listener, which is created in gallery_initialize().
 */
function gallery_end_photo_load_process(){
  gallery_disable_loadstate();
  document.getElementById('title').innerHTML = window.photos[window.current_photo]['title'];
  document.getElementById('index').innerHTML = window.current_photo;
}
