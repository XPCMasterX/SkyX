const fetch = require('node-fetch');
const publicIp = require('public-ip');
async function getLocation() {
    var ip = await publicIp.v4();
    var data = await fetch(`https://freegeoip.app/json/${ip}`);
    var json = await data.json();
    return json.city;
}

const api_key = '50e4f70c56b00853879e0416cc949949';
let units = 'metric';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`;
console.log(url);

let images = {
    thunderstorm: {
        image: 'images/noaa-p9BRX1mBfe4-unsplash.jpg',
        textColor: 'white'
    },
    drizzle: {
        image: 'images/gabriele-diwald-Kwi60PbAM9I-unsplash.jpg',
        textColor: 'black'
    },
    rain: {
        image: 'images/gabriele-diwald-Kwi60PbAM9I-unsplash.jpg',
        textColor: 'black'
    },
    snow: {
        image: 'images/todd-trapani-FRa84GgwMA4-unsplash.jpg',
        textColor: 'black'
    },
    clear: {
        image: 'images/jailam-rashad-Qe58SmRMcH4-unsplash.jpg',
        textColor: 'black'
    },
    clouds: {
        image: 'images/lanah-nel-e0P5fkUTRFg-unsplash.jpg',
        textColor: 'black'
    },
    mist: {
        image: 'images/thomas-tixtaaz-RA6vbIVis2Y-unsplash.jpg',
        textColor: 'black'
    },
};

async function getReq() {
    let rawJSON = await fetch(url);
    let json = await rawJSON.json();
    return json;
}

async function refreshWeather() {
    let data = await getReq();

    setBlur();
    setImageAndTextColor(data);

    let temperature = ` The temperature is ${
        Math.floor(data.main.temp) + '°C'
    }, it feels like ${Math.floor(data.main.feels_like) + '°C'}. 
    Today it can be upto ${
        Math.floor(data.main.temp_max) + '°C'
    } and the coldest temperature will be ${
        Math.floor(data.main.temp_min) + '°C'
    }.`;
    document.getElementById('temp').innerHTML = temperature;
}

async function returnImageObject(data) {
    switch (data.weather[0].main) {
        case 'Thunderstorm':
            return images.thunderstorm;
            break;
        case 'Drizzle':
            return images.drizzle;
            break;
        case 'Rain':
            return images.rain;
            break;
        case 'Snow':
            return images.snow;
            break;
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Fog':
        case 'Sand':
        case 'Dust':
        case 'Ash':
        case 'Squall':
        case 'Tornado':
            return images.mist;
            break;
        case 'Clear':
            return images.clear;
            break;
        case 'Clouds':
            return images.clouds;
            break;
        default:
            throw 'Cannot find weather data in the given data';
    }
}

async function setImageAndTextColor(data) {
    let img = await returnImageObject(data);
    document.getElementsByClassName('content')[0].style[
        'background-image'
    ] = `url(${img.image})`;
    
    var p = document.getElementsByTagName('p');
    for (let i = 0; i < p.length; i++) {
        p[i].style['color'] = img.textColor;
    }
}

function setBlur() {
    /**
     * Uses Slider
     */
    var blurStrength = document.getElementById('slider').value;
    document.getElementById('content').style['filter'] = `blur(${blurStrength}px)`;
}

refreshWeather();
