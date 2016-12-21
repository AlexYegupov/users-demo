let scrypt = require('scrypt')
let scryptParameters = scrypt.paramsSync(0.1)

export function crypt(s) {
  return scrypt.kdfSync(s, scryptParameters).toString('Base64')
}

export function verify(encoded, s) {
  return scrypt.verifyKdfSync(new Buffer(encoded, 'Base64'), s)
}
