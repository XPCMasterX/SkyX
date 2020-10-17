const fetch = require('node-fetch');
const publicIp = require('public-ip');

async function returnImageObject(data, images) {
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

async function setImageAndTextColor(data, images) {
    let img = await returnImageObject(data, images);
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

async function getReq(city, units, api_key) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`;
    let rawJSON = await fetch(url);
    let json = await rawJSON.json();
    return json;
}

async function getLocationByIP() {
    var ip = await publicIp.v4();
    var data = await fetch(`https://freegeoip.app/json/${ip}`);
    var json = await data.json();
    return json.city;
}
