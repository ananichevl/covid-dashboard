export default class TableDataCountries {
    dataService;

    dataCountry;

    constructor(dataService, dataCountry) {
        this.dataService = dataService;
        this.dataCountry = dataCountry;
    }

    createTable() {
        const countriesList = this.dataService.getCountriesList();
        const tableCountries = document.createElement('table');
        for (let i = 0; i < countriesList.length; i += 1) {
            const row = tableCountries.insertRow(i);
            row.addEventListener('click', () => this.dataCountry.showCountryInfo(countriesList[i]));
            const tableHeader = tableCountries.createTHead();
            tableHeader.innerHTML = 'Total Cases';
            const cellTotalCases = row.insertCell(0);
            const cellTotalDeaths = row.insertCell(1);
            const cellTotalRecovered = row.insertCell(2);
            const cellCountry = row.insertCell(3);
            cellTotalCases.innerHTML = countriesList[i].TotalConfirmed;
            cellTotalRecovered.innerHTML = countriesList[i].TotalRecovered;
            cellTotalDeaths.innerHTML = countriesList[i].TotalDeaths;
            cellCountry.innerHTML = countriesList[i].Country;
        }

        return tableCountries;
    }
}
