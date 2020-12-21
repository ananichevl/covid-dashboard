const population = require('../assets/population.json');

export default class CountryService {
    url;

    constructor(url) {
        this.url = url;
    }

    async getAll() {
        let response;
        let result;

        try {
            response = await fetch(this.url);
            result = await response.json();
        } catch (error) {
            result = population;
        }

        return result;
    }
}
