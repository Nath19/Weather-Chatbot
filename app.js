'use strict';

const Readline = require('readline'); 
const rl = Readline.createInterface({ 
  input : process.stdin,
  output: process.stdout,
  terminal:false
})
const matcher = require('./matcher'); 
const weather = require("./weather");
var colors = require('colors');


async function getWeather(city){
	try{
		let result = await weather(city);
		return result;
	}
	catch(err){
		return 'Error';
	}
}
rl.setPrompt('> ');
rl.prompt();
rl.on('line',reply=>{
  matcher(reply,cb => {
    switch(cb.intent){
      case "get weather" :
        console.log("weather");
        break;
      case "Exit" :
      console.log("See you later !".red);
        process.exit(0);
        break;
      case "Hello" :
        console.log(`${cb.entities.greeting}  you too! Nice to meet you!`.green);
        break;
      case "for today" :
        console.log("today");
        break;
      case "for week" :
        console.log("week");
        break;
        case "Help" :
        console.log("How Can I help you?".green);
        break;
          case "How are you" :
        console.log("I'm fine ! You?".green);
        break;
          case "Good" :
        console.log('Great ! How Can I help you?'.green);
        break;
         case "Out" :
        console.log("Good Idea !".green);
        break;
        case "Thank" :
        console.log("You are welcome ! I'm here for help you !".green);
        break;
         case "FirstAdvice" :
        console.log("Yes ! How about going to the cinema?".green);
        break;
          case "SecondAdvice" :
        console.log("You can maybe go eat an ice cream !".green);
        break;
          case "Name" :
        console.log("My name is NathanBot".green);
        break;
          case 'CurrentWeather':
          (async () => {
            var weath = await getWeather(cb.entities.city);
            if(weath != 'Error'){
              console.log(" Here is the current condition in " + cb.entities.city + " : " + weath.current.condition.text);
              var temp = weath.current.temp_c;
              if(temp<=5) console.log(" It's pretty cold ! Temperatures are around ".blue + temp + " degrees.".blue);
            else if(temp>5 && temp<=15) console.log(" It's moderately cold. Temperatures are around ".blue + temp + " degrees.".blue);
            else if(temp>15 && temp<=25) console.log(" It's pretty cool. Temperatures are around ".green + temp + " degrees.".green);
            else if(temp>25 && temp<=30) console.log(" It's quite warm. Temperatures are around ".yellow + temp + " degrees.".yellow);
            else if(temp>30 && temp <40) console.log(" It's very hot ! Temperatures are around ".red + temp + " degrees.".red);
            else
            {
              console.log(" Unsustainable! Temperatures are around " + temp + " degrees.");
            }
          }
          else{console.log('Error  : City Not Found.');}
          rl.prompt();
        })();
        break;
        case 'WeatherForecast':
				var days = 3; // initialize the variables for the differents forecast
				if(cb.entities.time == 'tomorrow') days = 1;
				else if(cb.entities.time == 'the day after tomorrow') days = 2;
				(async () => {
          console.log("Let me check for you...");
					var weath = await getWeather(cb.entities.city, days);
					if(weath != 'Error'){
						// So first let's analyse hot or cold
						if('hotcold'.includes(cb.entities.weather)){
							var temp = weath.forecast.forecastday[0].day.avgtemp_c;
							if(days == 3) temp = weath.current.temp_c; 
							if(temp < 5 && cb.entities.weather == 'cold') console.log(' Yes'.blue);
							else if(temp > 29 && cb.entities.weather == 'hot') console.log(' Yes'.red);
							else console.log(" No here is the actual temperature : " + temp + ".");
						}
						else{
							var cond = weath.forecast.forecastday[0].day.condition.text;
							if(days == 3) temp = weath.current.condition.text; 
							if(cond.toLowerCase().includes(cb.entities.weather)) console.log(' Yes indeed');
							else console.log(" No the condition will be : " + cond + ".");
						}
					}
					else{console.log('Error  : City Not Found');}
					rl.prompt();
				})();
				break;
				
      default :
        console.log("Sorry, I don't understand ! Can you repeat?");
        break;
    }
  });
});
