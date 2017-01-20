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


import { intersect } from '../utils/setUtil'

const fs = require('fs')
const slugify = require('slugify')

const DBFILE = 'src/server/db.json'

import { crypt, verify } from './cryptUtil'
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
  requiredAttrs: ['login', 'pwd', 'slug', 'name'],
  modifableAttrs: ['name', 'info', 'login', 'pwd'],
  uniqueAttrs: ['login', 'slug'],

  _items: [],

  getUserError(user, isExisting) {
    let error = ''
    for (let field of this.requiredAttrs) {
      if (!user[field]) {
        error += `${field} should have value;`
      }
    }

    if (verify(user.pwd, '000')) {
      error += 'Test server error: pwd cannot be 000;'
    }

    if (user.login === '000') error += 'Test server error: login cannot be 000;'

    // check unique attrs
    //let maxAllowed = isExisting ? 1 : 0
    for (let attr of this.uniqueAttrs) {
      let foundOther = this._items.filter(
        u => u[attr] === user[attr]).length

      if ((foundOther >= 2) || (foundOther == 1 && !isExisting)) {
        error += `"${user[attr]}" ${attr} is busy;`
      }
    }

    return error
  },

  // create user and return safe copy
  createUser(data) {
    let user = {}

    for (let attr of intersect(this.attrs, Object.keys(data))) {
      user[attr] = data[attr]
    }

    user.login = user.slug = slugify(data.login)

    let error = this.getUserError(user, false)
    if (error) {
      throw new Error(`Cannot create user: ${error}`)
    }

    // crypt AFTER validating
    if (user.pwd) user.pwd = crypt(user.pwd)

    this._items.push(user)
    return this._safeUser(user)
  },

  // patch user (in memory only) and return safe copy
  patchUser(slug, data) {
    let user = this.findUserUnsafe(slug)
    if (!user) return null

    let modifiedUser = Object.assign({}, user)
    for (let attr of intersect(this.modifableAttrs, Object.keys(data))) {
      if (attr === 'pwd' && data['pwd']) {
        modifiedUser['pwd'] = crypt(data['pwd'])
      } else {
        modifiedUser[attr] = data[attr]
      }
    }

    let error = this.getUserError(modifiedUser, true)
    if (error) {
      throw new Error(`Cannot modify user: ${error}`)
    }

    Object.assign(user, modifiedUser)
    return this._safeUser(user)
  },

  loadAll() {
    this._items = JSON.parse(fs.readFileSync(DBFILE)).users
    // this.create({login: 'fred', name: "Fred", pwd: '1', slug: 'fred'})
    // this.create({login: 'brian', name: "Brian",  pwd: '1', slug: 'brian'})
    // this.create({login: 'john', name: "John", pwd: '1', slug: 'john'})
    // this.create({login: 'roger', name: "Roger", pwd: '1', slug: 'roger'})
  },

  // save all users (memory -> file)
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
    let user = this._items.find(u => ((u.login === login) && verify(u.pwd, pwd)) )
    return this._safeUser(user)
  },

  // return user safe copy
  _safeUser(user) {
    if (!user) return null
    return Object.assign({}, user, {pwd: undefined}) //without password
  },

  findUserUnsafe(slug) {
    return this._items.find( u => u.slug === slug )
  },

  // patch user (in memory only) and return true if ok
  deleteUser(slug) {
    const i = this._items.findIndex( (item) => item.slug === slug )
    if (i === -1) {
      return false
    }
    this._items.splice(i, 1)
    return true
  },

  // w but no need
  // setUserPwd(slug, old, new_) {
  //   let user = this.findUserUnsafe(slug)
  //   if (old === user.pwd) return false
  //   user.pwd = new_
  //   return true
  // },


}

// // here?
Users.loadAll()

export { Users }

