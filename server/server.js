/* eslint-disable no-console, no-use-before-define */

//import path from 'path'
import Express from 'express'
//import qs from 'qs'

// import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackConfig from '../webpack.config'

//import React from 'react'
//import { renderToString } from 'react-dom/server'
//import { Provider } from 'react-redux'

//import configureStore from '../common/store/configureStore'
//import App from '../common/containers/App'
//import { fetchCounter } from '../common/api/counter'
import bodyParser from 'body-parser';
import session from 'express-session'

var cors = require('cors')

const app = new Express()
const port = 3001

import { Users } from './dbUtil'

// // Use this middleware to set up hot module reloading via webpack.
// const compiler = webpack(webpackConfig)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

// const low = require('lowdb')
// const fileAsync = require('lowdb/lib/file-async')
// const yaml = require('js-yaml');
// 
// const YAMLFormat = {
//   serialize: (obj) => yaml.safeDump(obj),
//   deserialize: (data) => yaml.safeLoad(data)
// }
// 
// const db = low('server/db.yaml', {
//   storage: fileAsync,
//   format: YAMLFormat
// })

// // Init
// db.defaults({ posts: [] })
//   .value()

// Define posts
//const posts = db.get('posts')
//const users = db.get('users')
// console.log('all posts:', posts.value())
// console.log('exact post:', posts.find({id: 1478198356002}).value())

app.use(session({
  secret: 'myASQR$Rsecretasfdhkasdfhflkasjhfjqwef98p1y32',
  resave: false,
  saveUninitialized: false,
  //cookie: { maxAge: 60000 }
  name: 'THESESSION'
}));

app.use(bodyParser.json())
//app.use(bodyParser.raw({type: '*/*'}))
app.use(bodyParser.urlencoded( { extended: true } ))

// to allow cors request (quick demo solution)
app.use(cors({credentials: true, origin: true}))

//app.use(checkAuth)

// // naive urls auth requiring url list
// const AUTH_URLS_PREFIX = [
//   '/api/secureTest',
//   '/api/users',
//   ]

//let url = require('url') //TODO: use import

// function checkAuth (req, res, next) {
//   console.log('checkAuth ', url.parse(req.url));
// 
//   // nw: req.path, req.originalUrl, req.url, req.route
//   // check unsafe (http://stackoverflow.com/a/19460598/1948511)
// 
//   let urlIsSecure = AUTH_URLS_PREFIX.find( item => req.url.startsWith(item) )
// 
// 
//   if (urlIsSecure && (!req.session || !req.session.user)) {
// 		res.render('unauthorised', { status: 403 });
//     return
// 	}
// 
//   next()
// 
//   // don't serve /secure to those not logged in
// 	// you should add to this list, for each and every secure url
//   if (AUTH_URLS.req.url === '/secure' && (!req.session || !req.session.authenticated)) {
// 		res.render('unauthorised', { status: 403 });
// 		return;
// 	}
// 
// 	next();
// }


// app.get('/user/:id?', function(req, res, next){
//   console.log('RR:', req.route);
//   next()
// });

// function login(req) {
//   const user = {
//     name: req.body.name
//   };
//   req.session.user = user;
//   return Promise.resolve(user);
// }


// // Routes
// // GET /posts/:id
// app.get('/posts/:id', (req, res) => {
//   console.log(req.params.id)
//   const thePost = posts.find({ id: Number(req.params.id) }).value()
// 
//   console.log(thePost)
//   res.send(thePost)
// })
// 
// // POST /posts
// app.post('/posts', (req, res) => {
//   console.log(req.body)
//   // Some basic id generation, use uuid ideally
//   req.body.id = Date.now()
// 
//   // post will be created asynchronously in the background
//   const post = posts
//     .push(req.body)
//     .last()
//     .value()
// 
//   res.send(post)
// })



// 
//   // nw: req.path, req.originalUrl, req.url, req.route
//   // check unsafe (http://stackoverflow.com/a/19460598/1948511)
// 
//   let urlIsSecure = AUTH_URLS_PREFIX.find( item => req.url.startsWith(item) )
// 
// 
//   if (urlIsSecure && (!req.session || !req.session.user)) {
// 		res.render('unauthorised', { status: 403 });
//     return
// 	}
// 
//   next()
// 
//   // don't serve /secure to those not logged in
// 	// you should add to this list, for each and every secure url
//   if (AUTH_URLS.req.url === '/secure' && (!req.session || !req.session.authenticated)) {
// 		res.render('unauthorised', { status: 403 });
// 		return;
// 	}
// 
// 	next();
// }
//
//
//}


function checkAuth(router) {

  function secureRouter(req, res, next) {
    if (!req.session || !req.session.user) {
      res.status(403).send('unauthorized').end()
      return
    }
    return router(req, res, next)
  }

  return secureRouter
}

// =login
app.post('/api/session', function(req, res) {
  const { login, pwd } = req.body
  let user = Users.login(login, pwd)
  if (!user) return res.status(401).json({'message': 'Wrong credentials'}).end()

  req.session.user = user

  //req.session.cookie
  //return Promise.resolve(user);

  //req.session.message = 'Hello World ' + new Date()
  res.json({user}).end()
})

// ==logout
app.delete('/api/session', function(req, res) {

  // nw for cookie-based
  // req.session.destroy(function (err) {
  //   if (err) console.log('Error:', err)
  //   res.json({loggedOut: true}).end()
  // })

  //nw for cookie-based
  //delete req.session

  req.session.user = null
  res.json({user: null}).end()
})


app.get('/api/test', function(req, res, next) {

  res.json({a: "test", login: req.session.user})
  //res.send('Hello3')
  //throw new Error("my error");

  //console.log('logged as:', req.session.user)

  //next()
  res.end()
})


app.get('/api/secure', checkAuth(function(req, res, next) {
  res.send('SECURE DATA').end()
}))

app.get('/api/users', function(req, res) {
  //res.json(Users.allDataSafe()).end()
  res.json(Users.all()).end()
})


// alt: could use :id instead of :slug
app.get('/api/users/:slug', function(req, res) {
  let user = Users.findUser(req.params.slug)
  if (!user) return res.status(204).end()

  res.json({user: user}).end()
})

app.patch('/api/users/:slug', checkAuth(function(req, res) {
  // let user = Users.findUser(req.params.slug)
  // if (!user) return res.status(404).end()
  let slug = req.body.slug

  try {
    var user = Users.patchUser(slug, req.body)
  } catch (e) {
    return res.json({'error': e, 'message': e.message}).status(406).end()
  }

  if (user) {
    Users.saveAll()
    return res.json({ user }).end()
  } else {
    return res.status(404).end()
  }

}))


// use POST only for creating new users
app.post('/api/users', checkAuth(function(req, res) {
  let data = req.body

  try {
    var user = Users.createUser(data)
  } catch (e) {
    return res.json({'error': e, 'message': e.message}).status(406).end()
  }

  Users.saveAll()
  res.json({user}).status(201).end()
}))


app.delete('/api/users/:slug', checkAuth(function(req, res) {
  if (Users.deleteBySlug(req.params.slug)) {
    return res.status(204).end()
  } else {
    return res.status(404).end()
  }
}))


app.get('', function handleRender(req, res) {
  res.send('it works').end()
})



// app.get('/api/user', function(req, res) {
//   // TODO: read from json
//   res.json(USERS).end()
// })



// app.get('', function handleRender(req, res) {
//   console.log('RENDERING')
//   // Query our mock API asynchronously
//   fetchCounter(apiResult => {
//     // Read the counter from the request, if provided
//     const params = qs.parse(req.query)
//     const counter = parseInt(params.counter, 10) || apiResult || 0
// 
//     // Compile an initial state
//     const preloadedState = { counter }
// 
//     // Create a new Redux store instance
//     const store = configureStore(preloadedState)
// 
//     // Render the component to a string
//     const html = renderToString(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
// 
//     // Grab the initial state from our Redux store
//     const finalState = store.getState()
// 
//     // Send the rendered page back to the client
//     res.send(renderFullPage(html, finalState))
//   })
// })
//
// function renderFullPage(html, preloadedState) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>Users test</title>
//       </head>
//       <body>
//         <div id="app">${html}</div>
//         <script>
//           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
//         </script>
//         <script src="/static/bundle.js"></script>
//       </body>
//     </html>
//     `
// }

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
