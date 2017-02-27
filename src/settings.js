export default {
  apiPort: process.env.NODE_API_PORT || 3001,
  apiHost: process.env.NODE_API_HOST || 'localhost',
  dbName: process.env.SO_DB_NAME || 'stackover',
  dbPassword: process.env.SO_DB_PWD || 'secret',
  dbUser: process.env.SO_DB_USER || process.env.USER,
  //dbHost: process.env.SO_DB_HOST || 'localhost',
}
