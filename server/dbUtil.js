// naive json file database implementation


// Experimenttally using lowdb + YAML

// const low = require('lowdb')
// const fileAsync = require('lowdb/lib/file-async')
// const yaml = require('js-yaml');
// 
// const YAMLFormat = {
//   serialize: (obj) => yaml.safeDump(obj),
//   deserialize: (data) => yaml.safeLoad(data)
// }


//import { isIntersected, isSubset } from './setUtil'

const fs = require('fs')
import slugify from 'slugify'

const DBFILE = 'server/db.json'

// const db = low('server/db.yaml', {
//   storage: fileAsync,
//   format: YAMLFormat
// })


// OOP is implemented without using classes. Used object prototype inheritance and instatiating based on Object.assign. Approach is inpired by Eric Elliot https://youtu.be/lKCCZTUx0sI?t=14m54s, also I've experimented there  https://github.com/AlexYegupov/test-js-classes.


// TODO: implement working with json file

//
// let UserProto = {
//   // TODO: validate available data fields   _fields: ['login', 'slug', 'pwd']
// 
//   _data: {},
// 
//   // update user data except password
//   update(newData) {
// 
//     delete newData.pwd
//     return Object.assign(this._data, newData)
//   },
// 
//   setPwd(old, new_) {
//     if (old === this._data.old) return false
// 
//     this._data.pwd = new_
//     return true
//   },
// 
//   // user data without pwd
//   dataSafe() {
//     return Object.assign({}, this._data, {pwd: undefined})
//   }
// 
// }


  // TODO: read Users json
let Users = {
  attrs: ['login', 'pwd', 'slug', 'name', 'info'],
  requiredAttrs: [],
  modifableAttrs: ['name', 'info', 'login'],

  _items: [],

  // create user and return safe copy
  createUser(data) {
    let user = {}

    user.login = slugify(data.login || data.name)
    user.slug = data.login

    for (let attr of ['name', 'info', 'pwd']) {
      user[attr] = data[attr]
    }

    // if (isIntersected(Object.keys(data)
    // for (let key of Object.keys(data)) {
    //   if (key
    // }

    this._items.push(user)
    return this._safeUser(user)
    // let newUser = Object.assign({}, UserProto, {_data: data})
    // let i = this._items.push(newUser)
    // return this._items[i - 1]

  },

  loadAll() {
    this._items = JSON.parse(fs.readFileSync(DBFILE)).users
    // this.create({login: 'fred', name: "Fred", pwd: '1', slug: 'fred'})
    // this.create({login: 'brian', name: "Brian",  pwd: '1', slug: 'brian'})
    // this.create({login: 'john', name: "John", pwd: '1', slug: 'john'})
    // this.create({login: 'roger', name: "Roger", pwd: '1', slug: 'roger'})
  },

  saveAll() {
    fs.writeFileSync(DBFILE, JSON.stringify({'users': this._items}))
  },

  //allDataSafe() {
  //  return this._items.map( (item) => item.dataSafe()  )
  //}

  all() {
    return this._items.map( user => this._safeUser(user) )
  },

  findUser(slug) {
    let user = this.findUserUnsafe(slug)
    return this._safeUser(user)
  },

  login(login, pwd) {
    let user = this._items.find(u => ((u.login === login) && (u.pwd === pwd)) )
    return this._safeUser(user)
  },

  // return user safe copy
  _safeUser(user) {
    if (!user) return null
    return Object.assign({}, user, {pwd: undefined})
  },

  findUserUnsafe(slug) {
    return this._items.find( u => u.slug === slug )
  },

  //deleteBySlug(slug) {
  deleteUser(slug) {
    const i = this._items.findIndex( (item) => item._data.slug === slug )
    if (i === -1) {
      return false
    }
    this._items.splice(i, 1)
    return true
  },

  // patch user and return safe copy
  patchUser(slug, data) {
    let user = this.findUserUnsafe(slug)
    if (!user) return null

    for (let attr of this.modifableAttrs) {
      user[attr] = data[attr]
    }

    return this._safeUser(user)
  },

  setUserPwd(slug, old, new_) {
    let user = this.findUserUnsafe(slug)
    if (old === user.pwd) return false
    user.pwd = new_
    return true
  },


}

// // here?
Users.loadAll()

export { Users }

