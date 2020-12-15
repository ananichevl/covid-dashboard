export default class DataService {
    content;

    constructor(url) {
        this.url = url;
    }

    async getContent() {
        try {
            const response = await fetch(this.url);
            const result = await response.json();

            return result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getDate() {
        if (this.content) {
            return this.content.Date;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getTotalCases() {
        if (this.content) {
            return this.content.Global.TotalConfirmed;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getTotalDeaths() {
        if (this.content) {
            return this.content.Global.TotalDeaths;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getTotalRecovered() {
        if (this.content) {
            return this.content.Global.TotalRecovered;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getCasesPerDay() {
        if (this.content) {
            return this.content.Global.NewConfirmed;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getDeathsPerDay() {
        if (this.content) {
            return this.content.Global.NewDeaths;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getRecoveredPerDay() {
        if (this.content) {
            return this.content.Global.NewRecovered;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }

    async getCountriesList() {
        if (this.content) {
            return this.content.Countries;
        }
        try {
            const response = await fetch(this.url);
            this.content = await response.json();

            return this.content.result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }
}
