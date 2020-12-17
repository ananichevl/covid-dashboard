export default class DataService {
    content;

    constructor(url) {
        this.url = url;
    }

    async getContent() {
        try {
            const response = await fetch(this.url);
            this.content = await response.json();
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    getDate() {
        return this.content.Date;
    }

    getTotalCases() {
        return this.content.Global.TotalConfirmed;
    }

    getTotalDeaths() {
        return this.content.Global.TotalDeaths;
    }

    getTotalRecovered() {
        return this.content.Global.TotalRecovered;
    }

    getCasesPerDay() {
        return this.content.Global.NewConfirmed;
    }

    getDeathsPerDay() {
        return this.content.Global.NewDeaths;
    }

    getRecoveredPerDay() {
        return this.content.Global.NewRecovered;
    }

    getCountriesList() {
        return this.content.Countries;
    }
}
