'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://medical123.cdhg123.club/api"'
  API_ROOT: '"http://192.168.2.119:8762/manage"'
  // API_ROOT: '"http://192.168.2.119:8762/manage"'
})
