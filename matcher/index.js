'use strict';

var patternDict = require('../patterns'),
    XregExp     = require('xregexp');

let createEntities = (str,pattern) => {
  return XregExp.exec(str,XregExp(pattern,"i"));
}


let matchPattern = (str,cb) => {
  let getResult = patternDict.find( item => {
    if(XregExp.test(str,XregExp(item.pattern,"i"))){
      return true;
    }
  });

  if(getResult){
    return cb({
      intent: getResult.intent,
      entities: createEntities(str,getResult.pattern)
    });
  }else {
    return cb({});
  }
}


module.exports = matchPattern;