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
        this.tableCountries.classList.add('mainTable');
        this.createTable();
        return this.tableCountries;
    }

    createTable() {
        this.tableCountries.innerHTML = '';

        const tableHeader = this.tableCountries.createTHead();
        this.tableBody = this.tableCountries.createTBody();
        const headerRow = tableHeader.insertRow();
        const totalCasesHeader = createElement('th');
        totalCasesHeader.classList.add('totalCasesHeader');
        const headerCasesText = createElement('span');
        headerCasesText.innerText = 'Total Cases';
        totalCasesHeader.append(headerCasesText);
        const headerCasesAmount = createElement('p');
        headerCasesAmount.innerText = this.dataService.getTotalCases();
        totalCasesHeader.append(headerCasesAmount);
        const totalDeathsHeader = createElement('th');
        totalDeathsHeader.classList.add('totalDeathsHeader');
        const headerDeathsText = createElement('span');
        headerDeathsText.innerText = 'Total Deaths';
        totalDeathsHeader.append(headerDeathsText);
        const headerDeathsAmount = createElement('p');
        headerDeathsAmount.innerText = this.dataService.getTotalDeaths();
        totalDeathsHeader.append(headerDeathsAmount);
        const totalRecoveredHeader = createElement('th');
        totalRecoveredHeader.classList.add('totalRecoveredHeader');
        const headerRecoveredText = createElement('span');
        headerRecoveredText.innerText = 'Total Recovered';
        totalRecoveredHeader.append(headerRecoveredText);
        const headerRecoveredAmount = createElement('p');
        headerRecoveredAmount.innerText = this.dataService.getTotalRecovered();
        totalRecoveredHeader.append(headerRecoveredAmount);

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
            const cellTotalCases = row.insertCell(0);
            const cellTotalCasesAmount = createElement('p');
            const cellCountry = createElement('span');
            cellCountry.innerHTML = countriesList[i].Country;
            cellTotalCases.append(cellTotalCasesAmount);
            cellTotalCases.append(cellCountry);
            const cellTotalDeaths = row.insertCell(1);
            const cellTotalDeathsAmount = createElement('p');
            cellTotalDeaths.append(cellTotalDeathsAmount);
            cellTotalDeaths.append(cellCountry);
            const cellTotalRecovered = row.insertCell(2);
            const cellTotalRecoveredAmount = createElement('p');
            cellTotalRecovered.append(cellTotalRecoveredAmount);
            cellTotalRecovered.append(cellCountry);
            if (this.isCheckedNew) {
                if (this.isChecked100) {
                    cellTotalCasesAmount.innerHTML = countriesList[i].TotalConfirmedNew100;
                    cellTotalRecoveredAmount.innerHTML = countriesList[i].TotalRecoveredNew100;
                    cellTotalDeathsAmount.innerHTML = countriesList[i].TotalDeathsNew100;
                } else {
                    cellTotalCasesAmount.innerHTML = countriesList[i].NewConfirmed;
                    cellTotalRecoveredAmount.innerHTML = countriesList[i].NewRecovered;
                    cellTotalDeathsAmount.innerHTML = countriesList[i].NewDeaths;
                }
            } else if (this.isChecked100) {
                cellTotalCasesAmount.innerHTML = countriesList[i].TotalConfirmed100;
                cellTotalRecoveredAmount.innerHTML = countriesList[i].TotalRecovered100;
                cellTotalDeathsAmount.innerHTML = countriesList[i].TotalDeaths100;
            } else {
                cellTotalCasesAmount.innerHTML = countriesList[i].TotalConfirmed;
                cellTotalRecoveredAmount.innerHTML = countriesList[i].TotalRecovered;
                cellTotalDeathsAmount.innerHTML = countriesList[i].TotalDeaths;
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

        // const cellCountry = row.insertCell(0);
        const cellTotalCases = row.insertCell(0);
        const cellTotalDeaths = row.insertCell(1);
        const cellTotalRecovered = row.insertCell(2);
        // cellCountry.innerHTML = country.Country;

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
