const api_key = '50e4f70c56b00853879e0416cc949949';
let units = 'metric';

let images = {
    thunderstorm: {
        image: 'images/noaa-p9BRX1mBfe4-unsplash.jpg',
        textColor: 'white',
    },
    drizzle: {
        image: 'images/gabriele-diwald-Kwi60PbAM9I-unsplash.jpg',
        textColor: 'black',
    },
    rain: {
        image: 'images/gabriele-diwald-Kwi60PbAM9I-unsplash.jpg',
        textColor: 'black',
    },
    snow: {
        image: 'images/todd-trapani-FRa84GgwMA4-unsplash.jpg',
        textColor: 'black',
    },
    clear: {
        image: 'images/jailam-rashad-Qe58SmRMcH4-unsplash.jpg',
        textColor: 'black',
    },
    clouds: {
        image: 'images/lanah-nel-e0P5fkUTRFg-unsplash.jpg',
        textColor: 'black',
    },
    mist: {
        image: 'images/thomas-tixtaaz-RA6vbIVis2Y-unsplash.jpg',
        textColor: 'black',
    },
};

(async function() {
    let city = await getLocation();
    let data = await getReq(city, units, api_key);

    setBlur();
    setImageAndTextColor(data, images);

    let temperature = ` The temperature is ${
        Math.floor(data.main.temp) + '°C'
    }, it feels like ${Math.floor(data.main.feels_like) + '°C'}. 
    Today it can be upto ${
        Math.floor(data.main.temp_max) + '°C'
    } and the coldest temperature will be ${
        Math.floor(data.main.temp_min) + '°C'
    }.`;
    document.getElementById('temp').innerHTML = temperature;
})();
