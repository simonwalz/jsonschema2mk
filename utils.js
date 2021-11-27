const fs = require("fs")
const path = require("path")
const { assign, merge, keys, isFunction, isString, isArray, isDate, isNumber, isBoolean, set } = require("lodash")
const deepExtend = require('deep-extend')

const deepFilter = ( object, predicate, path) => {
  let result =  []

  path = path || []

  if ( predicate(object) ) result.push({
    path: path.map( d => d),
    instance: object
  })

  if( isString(object) || isBoolean(object) || isNumber(object) || isDate(object)) return result  

  if( isArray(object) ) {
    object.forEach( (f, index) => {
      path.push(index)
      if(!isFunction(f))  result = result.concat(deepFilter(f, predicate, path))
      path.pop()  
    })
  } else {

    keys(object).forEach( k => {
    path.push(k)
    if(!isFunction(object[k]))  result = result.concat(deepFilter(object[k], predicate, path))
    path.pop()  
  
  })
} 
  
  
  return result 
} 

const processFolderRecursive =  (dir, fileCallback) => Promise.all(
    fs.readdirSync(dir).map( async element => {
          if (fs.lstatSync(path.join(dir, element)).isFile()) {
              await fileCallback(path.join(dir, element))
          } else {
              await processFolderRecursive(path.join(dir, element), fileCallback);
          }
      })  
  )



module.exports = {
  deepExtend,
  deepFilter,
  processFolderRecursive
}