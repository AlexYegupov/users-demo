const express = require('express')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/file-async')

const bodyParser = require('body-parser')

const yaml = require('js-yaml');


// Create server
const app = express()

app.use(bodyParser.json())
//app.use(bodyParser.raw({type: '*/*'}))
app.use(bodyParser.urlencoded( { extended: true } ))



// Start database using file-async storage
// const db = low('db.json', {
//   storage: fileAsync
// })
const YAMLFormat = {
  serialize: (obj) => yaml.safeDump(obj),
  deserialize: (data) => yaml.safeLoad(data)
}

const db = low('db.yaml', {
  storage: fileAsync,
  format: YAMLFormat
})


// Init
db.defaults({ posts: [] })
  .value()


// Routes
// GET /posts/:id
app.get('/posts/:id', (req, res) => {

  const posts = db.get('posts')

  const post = posts
    .find({ id: req.params.id })
    .value()

  console.log(post)
  res.send(post)
})

// POST /posts
app.post('/posts', (req, res) => {
  const posts = db.get('posts')

  console.log(req.body)
  // Some basic id generation, use uuid ideally
  req.body.id = Date.now()

  // post will be created asynchronously in the background
  const post = posts
    .push(req.body)
    .last()
    .value()

  res.send(post)
})

app.listen(3000, () => console.log('Server is listening'))
