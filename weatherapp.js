let http = require("http"),
    rp=require("request-promise"),
    chalk=require("chalk"),
    apiUrl = "",
    readline=require("readline");

const APIKEY = "0d611e448d3563db4ad5f56aeca79bf5",
      r1 = readline.createInterface({input:process.stdin,
      	output:process.stdout});

 r1.question(chalk.bgRed.bold("Please enter the name of your city e.g Ikeja \n"),
 	(city) =>{
 		apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" +  "&appid=" + APIKEY;
 		weather();
 		r1.close();
 	});

function weather(){
	let options = {
		uri: apiUrl,
		json: true
	};
	rp(options)
	    .then((response) =>{
	    	if(!response){
	    		Weather();
	    	}
	    	let weatherInfo = response;
	    	printWeather(weatherInfo);
	    })
	    .catch((err)=>{
	    	console.log(chalk.red("Sorry, we could not give the weather details ", err))
	    })
}

function printWeather(weatherInfo){
	console.log("");
	console.log(chalk.yellow("The weather details for " + weatherInfo["name"] + " in " + weatherInfo["sys"].country ));
	for(let x in weatherInfo){
		if(x == "coord"){
			console.log("");
			console.log(chalk.green("The longitude is ") + chalk.yellow(weatherInfo[x].lon));
			console.log(chalk.green("The latitude is " + chalk.yellow(weatherInfo[x].lat)));

		}
		if(x == "main"){
			console.log("");
			console.log(chalk.green("The temperature in degree celsius is ") + chalk.yellow(weatherInfo[x].temp));
			console.log(chalk.green("The pressure is ") + chalk.yellow(weatherInfo[x].pressure));
			console.log(chalk.green("The humidity is ") + chalk.yellow(weatherInfo[x].humidity));
		}
	} 
}