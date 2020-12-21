import createElement from './domElementFactory';

export default class MainTable {
    dataService;

    isChecked100;

    isCheckedNew;

    tableCountries;

    tableBody;

    selectCountry;

    constructor(dataService, isChecked100, isCheckedNew, dashboard, selectCountry) {
        this.dataService = dataService;
        this.isChecked100 = isChecked100;
        this.isCheckedNew = isCheckedNew;
        this.selectCountry = selectCountry.bind(dashboard);
    }

    createElement() {
        this.tableCountries = document.createElement('table');
        this.createTable();
        return this.tableCountries;
    }

    createTable() {
        this.tableCountries.innerHTML = '';

        const tableHeader = this.tableCountries.createTHead();
        this.tableBody = this.tableCountries.createTBody();

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

        this.createRows();
    }

    createRows() {
        const countriesList = this.dataService.getCountriesList();
        for (let i = 0; i < countriesList.length; i += 1) {
            const row = this.tableBody.insertRow(i);
            row.addEventListener('click', () => this.selectCountry(countriesList[i]));

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

    showRow(country) {
        this.tableBody.innerHTML = '';
        const row = this.tableBody.insertRow();
        row.addEventListener('click', () => this.selectCountry(country));

        const cellCountry = row.insertCell(0);
        const cellTotalCases = row.insertCell(1);
        const cellTotalDeaths = row.insertCell(2);
        const cellTotalRecovered = row.insertCell(3);
        cellCountry.innerHTML = country.Country;

        if (this.isCheckedNew) {
            if (this.isChecked100) {
                cellTotalCases.innerHTML = country.TotalConfirmedNew100;
                cellTotalRecovered.innerHTML = country.TotalRecoveredNew100;
                cellTotalDeaths.innerHTML = country.TotalDeathsNew100;
            } else {
                cellTotalCases.innerHTML = country.NewConfirmed;
                cellTotalRecovered.innerHTML = country.NewRecovered;
                cellTotalDeaths.innerHTML = country.NewDeaths;
            }
        } else if (this.isChecked100) {
            cellTotalCases.innerHTML = country.TotalConfirmed100;
            cellTotalRecovered.innerHTML = country.TotalRecovered100;
            cellTotalDeaths.innerHTML = country.TotalDeaths100;
        } else {
            cellTotalCases.innerHTML = country.TotalConfirmed;
            cellTotalRecovered.innerHTML = country.TotalRecovered;
            cellTotalDeaths.innerHTML = country.TotalDeaths;
        }
    }
}
