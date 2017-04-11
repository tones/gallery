Photo gallery
==========================

**Written by Tim Jones for Patreon, April 2017**

## Structure and Conventions

  * I divided the logic into two main concerns — the API and the Gallery.
  * The API functions handle the Flickr API. They are prefixed by `api_` and live in the `api.js` file.
  * The Gallery functions handle the user interactions with the photo gallery. They are prefixed with `gallery_` and live in the `gallery.js` file.
  * A short `index.js` file contains global variables and initializes the API and gallery code.
  * The code is commented in [JSDoc](http://usejsdoc.org/) format.

  ## Ruminations

  * It's a fun refresher to write client-side javascript with no framework or third-party libraries!
  * It might be a little controversial to use global variables (or `window` properties). It would make these functions tricky to write tests for, and it muddies the separation of responsibilities between the Gallery and API concerns. A more scalable and proper method might have been to pass a state object between the functions, or to adopt an OOP approach and store variables in `Gallery` and `API` objects. But, seeing as we're building a small app with a short lifespan and no proscriptive framework, I decided globals were a reasonable shortcut.


## Scope and Assumptions

I cut some corners here to keep this assignment to an appropriate size. In particular:

  * It assumes an up-to-date modern web browser. There are no polyfills, and it uses a few ECMAScript 6 features and conventions that older browsers will not support. I have tested it on the latest Chrome and Firefox, but nothing else.
  * It assumes a desktop browser; it does not currently seem to work on mobile devices.
  * It performs no error-handling. In particular, it assumes the Flickr API and photo servers are all working quickly, reliably, and as-expected.

## Perks

A few minor features not explicitly called for:

  * The loading state looks pretty nice, thanks to CSS3 keyframe animations. It's not very evident on a fast internet connection, though.
  * The gallery can be browsed with the keyboard, using the left and right arrows.
