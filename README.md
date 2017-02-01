# Users editor

Simple demo users editor.
Reworked Redux Real World Example demo.
Implemented almost without external libraries.

Features:
* CRUD user, basic validation, secure password (by scrypt library)
* REST-api server on express
* auto-syncronizing logged user with server by timer WITH any redux events
* auto-refresing logged user after full page reload
* json-file data storage (no database, no concurrency yet)
* es6, babel
* react + redux
* cookie-based authorization, localStorage-bases logged user storage
* no special react forms used
* dev & prod versions
* set host & port by env variables

Requirements:
* nodejs 7+ (tested on)

TODO:
* beautiful css
* try react-forms or something similar to simplify processing logic
* server rendering
* try yaml-based storage with libs like js-yaml + r/w concurency
* see also TODO file


# Quick start

 ## Dev
npm run dev
open localhost:3000

 ## Prod
npm run build

in parallel:
1) (cd build && python -m SimpleHTTPServer 9000)
2) npm run server
3) open localhost:9000

