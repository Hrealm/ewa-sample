import { request } from "./httpUtils"
const api = require("./interface.js")

// getUserInfo
export const getUserInfo = function(params){
  return request(api.getUserInfo,"POST",params)
}

// ...