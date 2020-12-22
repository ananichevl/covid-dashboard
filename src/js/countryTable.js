import createElement from './domElementFactory';

export default class CountryTable {
    tableCountriesTotalCases;

    dataService;

    isChecked100;

    isCheckedNew;

    tableBody;

    selectCountry;

    constructor(dataService, isChecked100, isCheckedNew, dashboard, selectCountry) {
        this.dataService = dataService;
        this.isChecked100 = isChecked100;
        this.isCheckedNew = isCheckedNew;
        this.selectCountry = selectCountry.bind(dashboard);
    }

    createElement() {
        this.tableCountriesTotalCases = document.createElement('table');
        this.tableCountriesTotalCases.classList.add('tableGlobal');
        this.createTable();
        return this.tableCountriesTotalCases;
    }

    createTable() {
        this.tableCountriesTotalCases.innerHTML = '';
        const tableHeader = this.tableCountriesTotalCases.createTHead();
        this.tableBody = this.tableCountriesTotalCases.createTBody();

        const headerRow = tableHeader.insertRow();
        const countryHeader = createElement('th');
        countryHeader.innerText = 'Country';
        const totalCases = createElement('th');
        totalCases.innerText = 'Total Cases';

        headerRow.append(countryHeader);
        headerRow.append(totalCases);

        this.createRows();
    }

    createRows() {
        this.tableBody.innerHTML = '';
        const totalCountriesList = this.dataService.getCountriesList();
        console.log(totalCountriesList);
        for (let i = 0; i < totalCountriesList.length; i += 1) {
            const rowTotal = this.tableBody.insertRow(i);
            rowTotal.addEventListener('click', () => this.selectCountry(totalCountriesList[i]));
            const countryFlag = rowTotal.insertCell(0);
            countryFlag.classList.add('countryFlag');
            const imageCountryFlag = document.createElement('img');
            imageCountryFlag.setAttribute('src', totalCountriesList[i].flag);
            countryFlag.append(imageCountryFlag);
            const cellCountryTotal = rowTotal.insertCell(1);
            cellCountryTotal.classList.add('countryName');
            const cellTotalCountriesCases = rowTotal.insertCell(2);
            cellTotalCountriesCases.classList.add('countryInfo');
            cellCountryTotal.innerHTML = totalCountriesList[i].Country;
            cellTotalCountriesCases.innerHTML = totalCountriesList[i].TotalConfirmed;
        }
    }

    showRow(country) {
        this.tableBody.innerHTML = '';
        const row = this.tableBody.insertRow();
        row.addEventListener('click', () => this.selectCountry(country));
        const countryFlag = row.insertCell(0);
        countryFlag.classList.add('countryFlag');
        const imageCountryFlag = document.createElement('img');
        imageCountryFlag.setAttribute('src', country.flag);
        countryFlag.append(imageCountryFlag);
        const cellCountryTotal = row.insertCell(1);
        cellCountryTotal.classList.add('countryName');
        const cellTotalCountriesCases = row.insertCell(2);
        cellTotalCountriesCases.classList.add('countryInfo');
        cellCountryTotal.innerHTML = country.Country;
        cellTotalCountriesCases.innerHTML = country.TotalConfirmed;
    }
}
