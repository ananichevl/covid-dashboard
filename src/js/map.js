import createElement from './domElementFactory';
import 'leaflet/dist/leaflet.css';

const L = require('leaflet');

export default class Map {
    dataService;

    map;

    selectCountry;

    currentMarkers = [];

    constructor(dataService, dashboard, selectCountry) {
        this.dataService = dataService;
        this.selectCountry = selectCountry.bind(dashboard);
    }

    static createElement() {
        const map = createElement('div');
        map.classList.add('map');
        map.id = 'mapid';

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

            let color;

            if (mapParam === 'cases') {
                color = '#0E83C4';
            } else if (mapParam === 'deaths') {
                color = '#FFFFFF';
            } else {
                color = '#12E200';
            }

            const marker = L.circle([c.latitude, c.longitude], {
                color,
                fillColor: color,
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

    static getRadius(cases, checked100k, checkedNew) {
        if (checked100k) {
            if (checkedNew) {
                if (cases > 100) {
                    return 200000;
                }
                if (cases > 80) {
                    return 150000;
                }
                if (cases > 60) {
                    return 100000;
                }
                if (cases > 40) {
                    return 50000;
                }
                if (cases > 20) {
                    return 25000;
                }
                if (cases > 10) {
                    return 10000;
                }

                return 1000;
            }

            if (cases > 5000) {
                return 200000;
            }
            if (cases > 4000) {
                return 150000;
            }
            if (cases > 3000) {
                return 100000;
            }
            if (cases > 2000) {
                return 50000;
            }
            if (cases > 1000) {
                return 25000;
            }
            if (cases > 500) {
                return 10000;
            }

            return 1000;
        }

        if (checkedNew) {
            if (cases > 150000) {
                return 200000;
            }
            if (cases > 50000) {
                return 150000;
            }
            if (cases > 10000) {
                return 100000;
            }
            if (cases > 5000) {
                return 50000;
            }
            if (cases > 1000) {
                return 25000;
            }
            if (cases > 500) {
                return 10000;
            }

            return 1000;
        }

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
