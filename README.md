# Users editor

Simple demo users editor.
Reworked and extended Redux Real World Example .
Implemented almost without external libraries.

version 0.1 (beta)

Features:
* CRUD user, basic validation, secure password (by scrypt library)
* REST-api server on express
* auto-refresing logged user after full page reload
* routing by react-router
* json-file data storage (no database, no concurrency yet)
* es6, babel
* react + redux
* cookie-based authorization + localStorage-based logged user storage
* auto-syncronizing logged user with server by timer WITH any redux events
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

```sh
git clone git@github.com:AlexYegupov/users-demo.git
cd users-demo
npm i
npm run dev

chrome localhost:3000
```


## Dev
```sh
npm run dev
chrome localhost:3000
```

## Prod
```sh
npm run build
```

in parallel:

```sh
(cd build && python -m SimpleHTTPServer 9000)
npm run server
open localhost:9000
```

