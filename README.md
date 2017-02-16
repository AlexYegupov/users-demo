# Users editor

Simple demo users editor.

version 0.1 (developing)

Originally based on redux real world example.


## Features
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

## Requirements:
Tested on Ubuntu 14.04, node 7.0.

## TODO
* beautiful css
* try react-forms or something similar to simplify processing logic
* server rendering
* try yaml-based storage with libs like js-yaml + r/w concurency
* see also TODO file


## Auth system
Cookie authrization.

Store the loggedUser and the loggedUserRefreshTime in redux storage

On ANY redux action check loggedUserRefreshTime and optionally refresh loggedUser by server

On any page componentWillMount force to call refreshLoggedUser


# Quick start

```sh
git clone git@github.com:AlexYegupov/users-demo.git
cd users-demo
npm i
npm run dev
```
and open http://localhost:3000 in browser



### Dev
```sh
npm run dev
chrome localhost:3000
```

### Prod

```sh
npm run build
(cd build && python -m SimpleHTTPServer 9000)
npm run server
```
and open http://localhost:9000 in browser

​
## Screenshots
![screenshots](https://raw.githubusercontent.com/AlexYegupov/users-demo/master/screenshots.png)

