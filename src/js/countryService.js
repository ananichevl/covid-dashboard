export default class CountryService {
    url;

    constructor(url) {
        this.url = url;
    }

    async getAll() {
        try {
            const response = await fetch(this.url);
            const result = await response.json();

            return result;
        } catch (error) {
            throw new Error('Cannot get data');
        }
    }
}
