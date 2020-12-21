export default class CountryTable {
    tableCountriesTotalCases;

    dataService;

    isChecked100;

    isCheckedNew;

    tableCountries;

    constructor(dataService, isChecked100, isCheckedNew, tableCountries) {
        this.dataService = dataService;
        this.isChecked100 = isChecked100;
        this.isCheckedNew = isCheckedNew;
        this.tableCountries = tableCountries;
    }

    createElement() {
        this.tableCountriesTotalCases = document.createElement('table');
        this.tableCountriesTotalCases.classList.add('tableGlobal');
        this.createRowsTotalCases();
        return this.tableCountriesTotalCases;
    }

    createRowsTotalCases() {
        this.tableCountriesTotalCases.innerHTML = '';
        const totalCountriesList = this.dataService.getCountriesList();
        for (let i = 0; i < totalCountriesList.length; i += 1) {
            const rowTotal = this.tableCountriesTotalCases.insertRow(i);
            rowTotal.addEventListener('click', () => this.tableCountries.showCountryInfo(totalCountriesList[i]));
            const tableHeaderTotal = this.tableCountriesTotalCases.createTHead();
            tableHeaderTotal.innerHTML = 'Confirmed Cases by Country';
            const cellCountryTotal = rowTotal.insertCell(0);
            cellCountryTotal.classList.add('countryName');
            const cellTotalCountriesCases = rowTotal.insertCell(1);
            cellTotalCountriesCases.classList.add('countryInfo');
            cellCountryTotal.innerHTML = totalCountriesList[i].Country;
            cellTotalCountriesCases.innerHTML = totalCountriesList[i].TotalConfirmed;
        }
    }
}
