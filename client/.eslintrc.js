const path = require('path')

module.exports = {
  parser: 'babel-eslint',
  rules: {
    'graphql/template-strings': ['error', {
      env: 'literal',
      schemaJsonFilepath: path.resolve(__dirname, './server-schema.json'),
    }]
  },
  plugins: [
    'graphql'
  ]
}
