import CountryService from './countryService';

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
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            this.global = this.content.Global;

            const countries = await this.countryService.getAll();

            this.countries = this.content.Countries.map((country) => {
                const countryInfo = countries.find((c) => c.alpha2Code === country.CountryCode);
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
                };
            });

            console.log(this.countries);
        } catch (error) {
            throw new Error('Cannot get data');
        }
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
