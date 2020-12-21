import createElement from './domElementFactory';
import 'leaflet/dist/leaflet.css';

const L = require('leaflet');

export default class Map {
    static createElement() {
        const map = createElement('div');
        map.classList.add('map');
        map.id = 'mapid';

        return map;
    }

    static initializeMap(countries) {
        const mymap = L.map('mapid')
            .setView({
                lon: 0,
                lat: 0,
            }, 2);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYW5hbmljaGV2bCIsImEiOiJja2l4NGNkY2gwenQzMnptZWltc2Q5OW1xIn0.BxrkdOMCyU8-7TZL8zwpGg',
        })
            .addTo(mymap);

        countries.forEach((c) => {
            L.circle([c.latitude, c.longitude], {
                color: '#0E83C4',
                fillColor: '#0E83C4',
                fillOpacity: 0.85,
                radius: this.getRadius(c.TotalConfirmed),
            })
                .addTo(mymap);
        });
    }

    static getRadius(cases) {
        if (cases > 1000000) {
            return 200000;
        }
        if (cases > 500000) {
            return 150000;
        }
        if (cases > 100000) {
            return 100000;
        }
        if (cases > 50000) {
            return 50000;
        }
        if (cases > 10000) {
            return 25000;
        }
        if (cases > 1000) {
            return 10000;
        }

        return 1000;
    }
}
