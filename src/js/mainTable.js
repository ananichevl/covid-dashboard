import createElement from './domElementFactory';

export default class MainTable {
    dataService;

    isChecked100;

    isCheckedNew;

    tableCountries;

    constructor(dataService, isChecked100, isCheckedNew) {
        this.dataService = dataService;
        this.isChecked100 = isChecked100;
        this.isCheckedNew = isCheckedNew;
    }

    createTable() {
        this.tableCountries = document.createElement('table');
        this.createRows();
        return this.tableCountries;
    }

    createRows() {
        this.tableCountries.innerHTML = '';
        const countriesList = this.dataService.getCountriesList();

        const tableHeader = this.tableCountries.createTHead();

        const headerRow = tableHeader.insertRow();
        const totalCasesHeader = createElement('th');
        totalCasesHeader.innerText = 'Total Cases';
        const totalDeathsHeader = createElement('th');
        totalDeathsHeader.innerText = 'Total Deaths';
        const totalRecoveredHeader = createElement('th');
        totalRecoveredHeader.innerText = 'Total Recovered';

        headerRow.append(totalCasesHeader);
        headerRow.append(totalDeathsHeader);
        headerRow.append(totalRecoveredHeader);
        tableHeader.append(headerRow);
        for (let i = 0; i < countriesList.length; i += 1) {
            const row = this.tableCountries.insertRow(i + 1);

            const cellCountry = row.insertCell(0);
            const cellTotalCases = row.insertCell(1);
            const cellTotalDeaths = row.insertCell(2);
            const cellTotalRecovered = row.insertCell(3);
            cellCountry.innerHTML = countriesList[i].Country;

            if (this.isCheckedNew) {
                if (this.isChecked100) {
                    cellTotalCases.innerHTML = countriesList[i].TotalConfirmedNew100;
                    cellTotalRecovered.innerHTML = countriesList[i].TotalRecoveredNew100;
                    cellTotalDeaths.innerHTML = countriesList[i].TotalDeathsNew100;
                } else {
                    cellTotalCases.innerHTML = countriesList[i].NewConfirmed;
                    cellTotalRecovered.innerHTML = countriesList[i].NewRecovered;
                    cellTotalDeaths.innerHTML = countriesList[i].NewDeaths;
                }
            } else if (this.isChecked100) {
                cellTotalCases.innerHTML = countriesList[i].TotalConfirmed100;
                cellTotalRecovered.innerHTML = countriesList[i].TotalRecovered100;
                cellTotalDeaths.innerHTML = countriesList[i].TotalDeaths100;
            } else {
                cellTotalCases.innerHTML = countriesList[i].TotalConfirmed;
                cellTotalRecovered.innerHTML = countriesList[i].TotalRecovered;
                cellTotalDeaths.innerHTML = countriesList[i].TotalDeaths;
            }
        }
    }

    check100(isChecked100) {
        this.isChecked100 = isChecked100;
        this.createRows();
    }

    checkNew(isCheckedNew) {
        this.isCheckedNew = isCheckedNew;
        this.createRows();
    }

    showCountryInfo(country) {
        console.log(this);
        this.tableCountries.innerHTML = '';
        const countryName = createElement('div');
        countryName.append(country.Country);

        const totalCases = createElement('div');
        totalCases.append(country.TotalConfirmed);

        const totalDeaths = createElement('div');
        totalDeaths.append(country.TotalDeaths);

        const totalRecovered = createElement('div');
        totalRecovered.append(country.TotalRecovered);

        this.tableCountries.append(countryName);
        this.tableCountries.append(totalCases);
        this.tableCountries.append(totalDeaths);
        this.tableCountries.append(totalRecovered);
    }
}
