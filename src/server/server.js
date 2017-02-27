/* eslint-disable no-console, no-use-before-define */

import Express from 'express'

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
//import session from 'express-session'
import settings from '../settings'
//import { Users } from './dbUtil'

var cors = require('cors')
const app = new Express()

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


// check: ?global variables
let pgp = require('pg-promise')(/*options*/)

let db = pgp({
  database: process.env.SO_DB_NAME || 'stackover',
  password: process.env.SO_DB_PWD || 'secret',
  user: process.env.SO_DB_USER || process.env.USER,
  //host: process.env.SO_DB_HOST || 'localhost',
})

console.log('DB:', db)

// // Note: storing session in memory (ok for demo)
// app.use(session({
//   secret: 'myASQR$Rsecretasfdhkasdfhflkasjhfjqwef98p1y32',
//   resave: false,
//   saveUninitialized: false,
//   //cookie: { maxAge: 60000 }
//   name: 'THESESSION'
// }));

app.use(bodyParser.json())
//app.use(bodyParser.raw({type: '*/*'}))
app.use(bodyParser.urlencoded( { extended: true } ))

// to allow cors request (quick demo solution)
app.use(cors({credentials: true, origin: true}))


// function checkAuth(router) {
//   function secureRouter(req, res, next) {
//     //console.log('RS, RSU', req.session, req.session.user)
//     if (!req.session || !req.session.user) {
//       res.status(403).send('unauthorized').end()
//       return
//     }
//     return router(req, res, next)
//   }
// 
//   return secureRouter
// }

// // post = create session = login
// app.post('/api/session', function(req, res) {
//   const { login, pwd } = req.body
//   let user = Users.login(login, pwd)
//   if (!user) return res.status(401).json({'message': 'Wrong credentials'}).end()
// 
//   req.session.user = user
// 
//   //req.session.cookie
//   //return Promise.resolve(user);
// 
//   //req.session.message = 'Hello World ' + new Date()
//   res.json(user).end()
// })
// 
// // get current session user (to re-get already logged user credentials)
// app.get('/api/session', checkAuth(function(req, res, next) {
// 
//   res.json(req.session.user)
//   res.end()
// }))
// 
// 
// // ==logout
// app.delete('/api/session', function(req, res) {
// 
//   // nw for cookie-based
//   // req.session.destroy(function (err) {
//   //   if (err) console.log('Error:', err)
//   //   res.json({loggedOut: true}).end()
//   // })
// 
//   //nw for cookie-based
//   //delete req.session
// 
//   req.session.user = null
//   res.json(req.session.user).end()
// })
// 
// 
// app.get('/api/test', function(req, res, next) {
//   //console.log('T GET: RS, RSU', req.session, req.session.user)
//   res.json({loggedUser: req.session.user})
//   //res.send('Hello3')
//   //throw new Error("my error");
// 
//   //console.log('logged as:', req.session.user)
//   //next()
//   res.end()
// })


// app.get('/api/secure', checkAuth(function(req, res, next) {
//   res.send('SECURE DATA').end()
// }))

// app.get('/api/users', function(req, res) {
//   //console.log('/api/users', req.session, req.session.user)
//   //res.json(Users.allDataSafe()).end()
//   //return res.status(401).send('TEST error')  //text/html
//   //return res.status(401).json({a: 1}).end() // application/json
//   res.json(Users.all()).end()
// })


// Note: left sql/ddl hardcoded & processing db errors partially copypasted intentionally because in real projects those optimizations could depend on different project requirements

app.get('/api/users', function(req, res) {
  db.any(`select id, name from users`)
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      // NOTE: for simplicity don't distinguish 4xx, 5xx etc
      res.status(400).json(error).end()
    })
})

app.get('/api/users/:id', function(req, res) {
  db.oneOrNone(`select id, name
                  from users
                 where id = $1`, [req.params.id])
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      res.status(400).json(error).end()
    })
})


// use POST only for CREATING new users
app.post('/api/users', function(req, res) {
  let data = req.body

  db.one(`insert into users(name) values($<name>) returning id, name`, data)
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      res.status(400).json(error).end()
    })
})


// TODO: change camelCase to underlined_case everywhere because pg minimizes it

app.get('/api/questions', function(req, res) {
  db.any(`select question.id, min(question.text) as text,
                 min(question.userId) as userId,
                 min(users.name) as userName,
                 count(answer.id) as answerCount
            from question inner join users on question.userid = users.id
                 left join answer on answer.questionId = question.id
          group by question.id
          order by min(question.text)
         `)
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      res.status(400).json(error).end()
    })
})

app.get('/api/questions/:id', function(req, res) {
  db.oneOrNone(`select question.id, question.text, question.userId,
                       users.name as userName
                  from question inner join users on question.userid = users.id
                 where question.id = $1`, [req.params.id])
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      res.status(400).json(error).end()
    })
})


function upsertUser(name) {
  // NOTE: temporary solution. For latest postgres should use INSERT INTO ... ON CONFLICT

  return db.one('insert into users (name) values ($1) returning id, name', [name] )
    .catch(
      (error) => {
        if (error.detail.includes('already exists')) {
          return db.one('select id, name from users where name = $1', [name])
        } else {
          throw error
        }
      })
}


// use POST only for CREATING new questions
app.post('/api/questions', function(req, res) {
  console.log('body', req.body)

  Promise.resolve(
  ).then( () => {
    // naive checking
    if (!req.body.userName) throw new Error('Question user should be non-empty')
    if (!req.body.text) throw new Error('Question text should be non-empty')
  }).then( () => {
    return upsertUser(req.body.userName)
  }).then(
    userData => db.one(
      `insert into question(text, userId) values($<text>, $<userId>)
             returning id, text, userid`,
      {
        text: req.body.text,
        userId: userData.id
      }
    )
  ).then(
    data => {
      res.json(data).end()
    }
  ).catch( e => {
    console.log('e:', e, JSON.stringify(e))
    res.status(400).json({'error': e, 'message': e.message}).end()
  })


  // db.one(`insert into question(text, userId) values($<text>, $<userId>) returning id, text, userid`, data)
  //   .then( data => {
  //     res.json(data).end()
  //   })
  //   .catch( error => {
  //     res.status(400).json(error).end()
  //   })

})





app.get('/api/questions/:id/answers', function(req, res) {
  db.any(`select answer.*, users.name as userName
            from answer inner join users on answer.userId = users.id
           where answer.questionId = $1`, [req.params.id])
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      res.status(400).json(error).end()
    })
})

// app.get('/api/questions/:questionId/answers/:answerId', function(req, res) {
//   db.oneOrNone(`select question.id, question.text, question.userId,
//                        users.name as userName
//                   from question inner join users on question.userid = users.id
//                  where question.id = $1`, [req.params.id])
//     .then( data => {
//       res.json(data).end()
//     })
//     .catch( error => {
//       res.status(400).json(error).end()
//     })
// })


// use POST only for CREATING new answers
app.post('/api/questions/:questionId/answers', function(req, res) {
  let data = Object.assign({}, req.body, {questionId: req.params.questionId})

  db.one(`insert into answer(questionId, text, userId)
          values ($<questionId>, $<text>, $<userId>) returning id, text, userid`, data)
    .then( data => {
      res.json(data).end()
    })
    .catch( error => {
      res.status(400).json({'error': e, 'message': e.message}).end()
    })
})

// // NOTE: experimentally use :slug as :id
// app.get('/api/users/:slug', function(req, res) {
//   let user = Users.findUser(req.params.slug)
//   if (!user) return res.status(204).end() //send('User not found').
// 
//   res.json(user).end()
// })


// app.patch('/api/users/:slug', checkAuth(function(req, res) {
//   // let user = Users.findUser(req.params.slug)
//   // if (!user) return res.status(404).end()
//   let slug = req.params.slug //req.body.slug
// 
//   try {
//     var user = Users.patchUser(slug, req.body)
//   } catch (e) {
//     return res.status(406).json({'error': e, 'message': e.message}).end()
//   }
// 
//   if (user) {
//     Users.saveAll()
//     return res.json(user).end()
//   } else {
//     return res.status(404).end()
//   }
// 
// }))
// 
// 
// // use POST only for CREATING new users
// app.post('/api/users', checkAuth(function(req, res) {
//   let data = req.body
//   //console.log('POST /api/users', req.session, req.session.user)
// 
//   try {
//     var user = Users.createUser(data)
//   } catch (e) {
//     return res.status(406).json({'error': e, 'message': e.message}).end()
//   }
// 
//   Users.saveAll()
//   res.status(201).json(user).end()
// }))
// 
// 
// app.delete('/api/users/:slug', checkAuth(function(req, res) {
//   if (Users.deleteUser(req.params.slug)) {
//     Users.saveAll()
//     return res.status(200).json({deletedUserSlug: req.params.slug}).end() // 204
//   } else {
//     return res.status(404).end()
//   }
// }))


app.get('', function handleRender(req, res) {
  res.send('it works').end()
})



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

app.listen(settings.apiPort, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> API server started at http://${settings.apiHost}:${settings.apiPort}`)
  }
})
