import createElement from './domElementFactory';
import 'leaflet/dist/leaflet.css';
import legendIconFile from '../assets/legend.svg';
import closeIconFile from '../assets/close.svg';

const L = require('leaflet');

const new100Arr = [100, 80, 60, 40, 20, 10];
const newArr = [150000, 50000, 10000, 5000, 1000, 500];
const totalArr = [1000000, 500000, 100000, 50000, 10000, 1000];
const total100Arr = [5000, 4000, 3000, 2000, 1000, 500];

export default class Map {
    dataService;

    map;

    selectCountry;

    currentMarkers = [];

    legend;

    checkedNew;

    checked100k;

    markerColor;

    constructor(dataService, dashboard, selectCountry) {
        this.dataService = dataService;
        this.selectCountry = selectCountry.bind(dashboard);
    }

    createElement() {
        const map = createElement('div');
        map.classList.add('map');
        map.id = 'mapid';

        const legendIcon = createElement('img');
        legendIcon.classList.add('map__legend-icon');
        legendIcon.src = legendIconFile;

        this.legend = createElement('div');
        this.legend.classList.add('map__legend');

        map.append(legendIcon);
        map.append(this.legend);

        legendIcon.addEventListener('click', () => {
            this.legend.style.visibility = 'visible';
            this.createLegend();
        });

        return map;
    }

    initializeMap(checked100k, checkedNew, mapParam) {
        this.map = L.map('mapid')
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
            .addTo(this.map);

        this.createMarkers(checked100k, checkedNew, mapParam);

        return this.map;
    }

    createMarkers(checked100k, checkedNew, mapParam) {
        this.checkedNew = checkedNew;
        this.checked100k = checked100k;
        this.removeMarkers();

        const countries = Array.from(this.dataService.getCountriesList());

        countries.forEach((c) => {
            let mainParam;
            let firstParam;
            let secondParam;
            let thirdParam;

            if (checkedNew) {
                if (checked100k) {
                    if (mapParam === 'cases') {
                        mainParam = c.TotalConfirmedNew100;
                    } else if (mapParam === 'deaths') {
                        mainParam = c.TotalDeathsNew100;
                    } else {
                        mainParam = c.TotalRecoveredNew100;
                    }
                } else if (mapParam === 'cases') {
                    mainParam = c.NewConfirmed;
                } else if (mapParam === 'deaths') {
                    mainParam = c.NewDeaths;
                } else {
                    mainParam = c.NewRecovered;
                }
            } else if (checked100k) {
                if (mapParam === 'cases') {
                    mainParam = c.TotalConfirmed100;
                } else if (mapParam === 'deaths') {
                    mainParam = c.TotalDeaths100;
                } else {
                    mainParam = c.TotalRecovered100;
                }
            } else if (mapParam === 'cases') {
                mainParam = c.TotalConfirmed;
            } else if (mapParam === 'deaths') {
                mainParam = c.TotalDeaths;
            } else {
                mainParam = c.TotalRecovered;
            }

            if (checkedNew) {
                if (checked100k) {
                    firstParam = c.TotalConfirmedNew100;
                    secondParam = c.TotalDeathsNew100;
                    thirdParam = c.TotalRecoveredNew100;
                } else {
                    firstParam = c.NewConfirmed;
                    secondParam = c.NewDeaths;
                    thirdParam = c.NewRecovered;
                }
            } else if (checked100k) {
                firstParam = c.TotalConfirmed100;
                secondParam = c.TotalDeaths100;
                thirdParam = c.TotalRecovered100;
            } else {
                firstParam = c.TotalConfirmed;
                secondParam = c.TotalDeaths;
                thirdParam = c.TotalRecovered;
            }

            if (mapParam === 'cases') {
                this.markerColor = '#0E83C4';
            } else if (mapParam === 'deaths') {
                this.markerColor = '#FFFFFF';
            } else {
                this.markerColor = '#12E200';
            }

            const marker = L.circle([c.latitude, c.longitude], {
                color: this.markerColor,
                fillColor: this.markerColor,
                fillOpacity: 0.85,
                radius: Map.getRadius(
                    mainParam,
                    checked100k,
                    checkedNew,
                ),
            })
                .addTo(this.map);

            const content = createElement('div');

            const contentTitle = createElement('div');
            contentTitle.innerText = c.Country;
            const contentConfirmed = createElement('div');
            contentConfirmed.innerText = `Confirmed: ${firstParam}`;
            const contentDeaths = createElement('div');
            contentDeaths.innerText = `Deaths: ${secondParam}`;
            const contentRecovered = createElement('div');
            contentRecovered.innerText = `Recovered: ${thirdParam}`;

            content.append(contentTitle);
            content.append(contentConfirmed);
            content.append(contentDeaths);
            content.append(contentRecovered);

            marker.bindPopup(content);

            marker.on('mouseover', () => marker.openPopup());
            marker.on('mouseout', () => marker.closePopup());
            marker.on('click', () => this.selectCountry(c));

            this.currentMarkers.push(marker);
        });

        if (this.legend.style.visibility === 'visible') {
            this.createLegend();
        }
    }

    removeMarkers() {
        for (let i = 0; i < this.currentMarkers.length; i += 1) {
            this.map.removeLayer(this.currentMarkers[i]);
        }

        this.currentMarkers = [];
    }

    showCountry(country) {
        this.map.setView({
            lon: country.longitude,
            lat: country.latitude,
        }, 5);
    }

    createLegend() {
        this.legend.innerHTML = '';
        const button = createElement('button');
        button.classList.add('button-close');
        const closeIcon = createElement('img');
        closeIcon.src = closeIconFile;
        button.append(closeIcon);

        closeIcon.addEventListener('click', () => {
            this.legend.style.visibility = 'hidden';
        });
        const closeRow = createElement('div');
        closeRow.classList.add('legend-row');

        closeRow.append(button);

        this.legend.append(closeRow);

        let array;

        if (this.checkedNew) {
            if (this.checked100k) {
                array = new100Arr;
            } else {
                array = total100Arr;
            }
        } else if (this.checked100k) {
            array = newArr;
        } else {
            array = totalArr;
        }

        for (let i = 0; i < array.length; i += 1) {
            const row = createElement('div');
            row.classList.add('legend-row');
            const marker = createElement('div');
            marker.classList.add('marker');
            marker.style.width = `${18 - i * 2}px`;
            marker.style.height = `${18 - i * 2}px`;
            marker.style.background = this.markerColor;
            const text = createElement('h10');
            text.innerText = `> ${array[i]}`;

            row.append(marker);
            row.append(text);

            this.legend.append(row);
        }

        const row = createElement('div');
        row.classList.add('legend-row');
        const marker = createElement('div');
        marker.classList.add('marker');
        marker.style.width = '6px';
        marker.style.height = '6px';
        marker.style.background = this.markerColor;
        const text = createElement('h10');
        text.innerText = `< ${array[array.length - 1]}`;

        row.append(marker);
        row.append(text);

        this.legend.append(row);
    }

    static getRadius(cases, checked100k, checkedNew) {
        if (checked100k) {
            if (checkedNew) {
                if (cases > new100Arr[0]) {
                    return 200000;
                }
                if (cases > new100Arr[1]) {
                    return 150000;
                }
                if (cases > new100Arr[2]) {
                    return 100000;
                }
                if (cases > new100Arr[3]) {
                    return 50000;
                }
                if (cases > new100Arr[4]) {
                    return 25000;
                }
                if (cases > new100Arr[5]) {
                    return 10000;
                }

                return 1000;
            }

            if (cases > total100Arr[0]) {
                return 200000;
            }
            if (cases > total100Arr[1]) {
                return 150000;
            }
            if (cases > total100Arr[2]) {
                return 100000;
            }
            if (cases > total100Arr[3]) {
                return 50000;
            }
            if (cases > total100Arr[4]) {
                return 25000;
            }
            if (cases > total100Arr[5]) {
                return 10000;
            }

            return 1000;
        }

        if (checkedNew) {
            if (cases > newArr[0]) {
                return 200000;
            }
            if (cases > newArr[1]) {
                return 150000;
            }
            if (cases > newArr[2]) {
                return 100000;
            }
            if (cases > newArr[3]) {
                return 50000;
            }
            if (cases > newArr[4]) {
                return 25000;
            }
            if (cases > newArr[5]) {
                return 10000;
            }

            return 1000;
        }

        if (cases > totalArr[0]) {
            return 200000;
        }
        if (cases > totalArr[1]) {
            return 150000;
        }
        if (cases > totalArr[2]) {
            return 100000;
        }
        if (cases > totalArr[3]) {
            return 50000;
        }
        if (cases > totalArr[4]) {
            return 25000;
        }
        if (cases > totalArr[5]) {
            return 10000;
        }

        return 1000;
    }
}
