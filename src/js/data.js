import CountryService from './countryService';

const n = require('country-js');
const summary = require('../assets/summary.json');
const countriesGeo = require('../assets/countrycode-latlong-array.json');

export default class DataService {
    content;

    global;

    countries;

    countryService;

    constructor(url) {
        this.url = url;
        this.countryService = new CountryService('https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code');
    }

    async getContent() {
        let response;

        try {
            response = await fetch(this.url);
            this.content = await response.json();
        } catch (error) {
            this.content = summary;
        }

        this.global = this.content.Global;

        const countries = await this.countryService.getAll();

        this.countries = this.content.Countries.map((country) => {
            const countryInfo = countries.find((c) => c.alpha2Code === country.CountryCode);
            let countryGeo = n.search(country.CountryCode)[0];
            if (!countryGeo) {
                console.log(country);
                countryGeo = countriesGeo[country.CountryCode.toLowerCase()];
                console.log(countryGeo);
                countryGeo = {
                    geo: {
                        latitude: countryGeo[0],
                        longitude: countryGeo[1],
                    },
                };
            }

            return {
                ...country,
                TotalConfirmed100: ((country.TotalConfirmed * 100000) / countryInfo.population)
                    .toFixed(2),
                TotalConfirmedNew100: ((country.NewConfirmed * 100000) / countryInfo.population)
                    .toFixed(2),
                TotalDeaths100: ((country.TotalDeaths * 100000) / countryInfo.population)
                    .toFixed(2),
                TotalDeathsNew100: ((country.NewDeaths * 100000) / countryInfo.population)
                    .toFixed(2),
                TotalRecovered100: ((country.TotalRecovered * 100000) / countryInfo.population)
                    .toFixed(2),
                TotalRecoveredNew100: ((country.NewRecovered * 100000) / countryInfo.population)
                    .toFixed(2),
                latitude: countryGeo.geo.latitude,
                longitude: countryGeo.geo.longitude,
            };
        });
    }

    getDate() {
        return this.content.Date;
    }

    getTotalCases() {
        return this.global.TotalConfirmed;
    }

    getTotalDeaths() {
        return this.global.TotalDeaths;
    }

    getTotalRecovered() {
        return this.global.TotalRecovered;
    }

    getCasesPerDay() {
        return this.global.NewConfirmed;
    }

    getDeathsPerDay() {
        return this.global.NewDeaths;
    }

    getRecoveredPerDay() {
        return this.global.NewRecovered;
    }

    getCountriesList() {
        return this.countries;
    }
}
