"use strict";
const axios = require("axios");

const apikey = "10518c8eb0af4988a58130259193101" ; 

const getWeather = location => {
return new Promise(async (resolve, reject) => {
try{
	const weatherConditions = await axios.get( //get weather info from the api
	"http://api.apixu.com/v1/forecast.json", {
	params: {
	key: apikey ,
	q: location ,
	days: 3 }
	});
	resolve(weatherConditions.data) 
	} catch(error){
	reject(error); }
	});
	}





module.exports = getWeather;
